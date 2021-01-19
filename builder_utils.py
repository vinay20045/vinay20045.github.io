"""Module containing all utility functions used by the builder"""

import os
import json
import csv
import re

def prettify(text):
    text = re.sub('[^A-Za-z0-9-_. ]+', '', text)
    text = re.sub('[-_]+', ' ', text)
    text = text.title()

    return text

def slugify(text):
    text = re.sub('[^A-Za-z0-9-_. ]+', '', text)
    text = re.sub('[_. ]+', '-', text)
    text = text.lower()

    return text

def get_first_line(body):
    line = body.splitlines()[0]
    
    return line

def parse_md(file_path, file_contents):
    from builder_libs import markdown

    html_body = markdown.markdown(file_contents)

    file_name = os.path.split(file_path)[1]
    file_name = os.path.splitext(file_name)[0]

    #for match in re.finditer('\[\$\$\{(\w*)\}\]\:', shell_contents):
    
    dataset = [{
        '_file_name_': file_name,
        '_body_md_': file_contents,
        '_body_html_': html_body
    }]

    return dataset

def parse_json(file_path, file_contents):
    dataset = json.loads(file_contents)

    return dataset

def parse_csv(file_path, file_contents):
    reader = csv.DictReader(file_contents.splitlines())

    dataset = []
    for row in reader:
        dataset.append(row)

    return dataset

