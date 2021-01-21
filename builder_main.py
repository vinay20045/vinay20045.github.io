#!/usr/bin/env python3

"""Easily Build Static Websites With Content From CSV/JSON/MD Files"""

import sys
import os
import shutil
import re

from builder_config import *

import builder_utils as utils

def decode_file_path(shell_path, dataset):
    file_name_with_ext = os.path.split(shell_path)[1]
    file_name = os.path.splitext(file_name_with_ext)[0]

    match = re.match(VAR_REGEX, file_name_with_ext)
    if match:
        new_file_name = dataset[match[1]]

    match = re.match(FUNC_REGEX, file_name_with_ext)
    if match:
        util_function = getattr(utils, match[1])
        new_file_name = util_function(dataset[match[2]])

    new_file_path = shell_path.replace(file_name, new_file_name)

    return new_file_path

def extract_data(data_file):
    dataset = []
    file_type = os.path.splitext(data_file)[1]

    if file_type in [CSV, MD, JSON] and os.path.isfile(data_file):
        with open(data_file, 'r', encoding='utf-8') as fp:
            contents = fp.read()

        extractor = PARSE_FUNC + file_type.split('.')[1]
        extractor = getattr(utils, extractor)

        try:
            dataset = extractor(data_file, contents)
        except Exception as e:
            print(e)

    return dataset

def extract_templates(location, destination):
    for item in os.listdir(location):
        item_path = os.path.join(location, item)
        item_name = os.path.splitext(item)[0]

        if os.path.isfile(item_path):
            with open(item_path, 'r', encoding='utf-8') as fp:
                try:
                    template = fp.read()
                except Exception as e:
                    template = ''
                    print(e)

            new_template = apply_partial_to_template(template)

            if destination == PARTIALS:
                ALL_PARTIALS[item_name] = new_template
            else:
                ALL_SHELLS[item_path] = new_template
        else:
            extract_templates(item_path, destination)

def apply_partial_to_template(template):
    for match in re.finditer(PARTIALS_FUNC_REGEX, template):
        try:
            contents = ALL_PARTIALS[match[1]]
        except:
            contents = ''

        template = template.replace(match[0], contents)

    return template

def apply_data_to_shell(data, shell_contents):
    for match in re.finditer(FUNC_REGEX, shell_contents):
        util_function = getattr(utils, match[1])
        try:
            contents = util_function(data[match[2]])
        except:
            contents = ''

        shell_contents = shell_contents.replace(match[0], contents)

    for match in re.finditer(VAR_REGEX, shell_contents):
        try:
            contents = data[match[1]]
        except:
            contents = ''

        shell_contents = shell_contents.replace(match[0], contents)

    return shell_contents

def write_to_build(shell_path, contents):
    destination = shell_path.replace(SHELLS, BUILD_PATH)
    destination_path = os.path.split(destination)[0]

    print('    Writing ' + shell_path + ' to ' + destination + '... ', end='')

    os.makedirs(destination_path, exist_ok=True)

    with open(destination, 'w', encoding='utf-8') as fp:
        fp.write(contents)

    print('Success')

def write_to_sitemap(file_path, site_url):
    file_path = file_path.replace(SHELLS, site_url)

    with open(os.path.join(BUILD_PATH, SITEMAP), 'a', encoding='utf-8') as fp:
        fp.write(file_path + '\n')

def copy_to_build(source, is_nested_dir=True):
    destination = os.path.join(BUILD_PATH, source) if is_nested_dir else BUILD_PATH

    print('Copying ' + source + ' folder to ' + destination + '... ', end='')
    shutil.copytree(source, destination)
    print('Success')

def is_named_file(path):
    file_name = os.path.split(path)[1]

    return False if re.match(BUILD_ID_REGEX, file_name) else True


if __name__ == "__main__":
    if os.path.isdir(BUILD_PATH):
        if input('Delete existing Build directory (y or n)? ') == 'y':
            shutil.rmtree(BUILD_PATH)
            print('Success')
        else:
            print('Exiting with no changes... Goodbye!')
            sys.exit()

    try:
        site_url = sys.argv[1]
    except:
        site_url = False

    copy_to_build(ASSETS, False)

    extract_templates(PARTIALS, PARTIALS)
    extract_templates(SHELLS, SHELLS)

    for shell_path in ALL_SHELLS:
        print('Processing ' + shell_path)

        if is_named_file(shell_path):
            write_to_build(shell_path, ALL_SHELLS[shell_path])
            write_to_sitemap(shell_path, site_url) if site_url else None
        else:
            dataset_path = shell_path.replace(SHELLS, DATASETS)
            dataset_path = os.path.split(dataset_path)[0]

            for data_file in os.listdir(dataset_path):
                data_file_path = os.path.join(dataset_path, data_file)

                if not os.path.isfile(data_file_path):
                    continue

                dataset = extract_data(data_file_path)

                for row in dataset:
                    page_content = apply_data_to_shell(row, ALL_SHELLS[shell_path])
                    new_file_path = decode_file_path(shell_path, row)

                    write_to_build(new_file_path, page_content)
                    write_to_sitemap(new_file_path, site_url) if site_url else None

        print('Completed')
