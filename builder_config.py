"""Module containing all constants, globals and magic variable declarations for builder"""

BUILD_ID = '$$'
BUILD_PATH = 'build'

ASSETS = 'assets'
DATASETS = 'datasets'
PARTIALS = 'partials'
SHELLS = 'shells'
SITEMAP = 'sitemap.txt'

BUILD_ID_REGEX = '^\$\$'
FUNC_REGEX = '\$\$\{(\w*)\((\w*)\)\}'
PARTIALS_FUNC_REGEX = '\$\$\{apply_partial\((\w*)\)\}'
VAR_REGEX = '\$\$\{(\w*)\}'

CSV = '.csv'
JSON = '.json'
MD = '.md'
PARSE_FUNC = 'parse_'

ALL_DATASETS = {}
ALL_PARTIALS = {}
ALL_SHELLS = {}
