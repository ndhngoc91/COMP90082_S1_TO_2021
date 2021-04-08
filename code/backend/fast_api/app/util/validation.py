"""
Json(Dict) validator
"""


def lack_keys(data, required_keys, prefix=""):
    if prefix:
        prefix += "."
    if data is None:
        lacked_keys = required_keys
    else:
        lacked_keys = (filter(lambda key: key not in data, required_keys))

    return ', '.join([f'{prefix}{key}' for key in lacked_keys])


# Todo check type
def check_keys_type(data, key_type_map):
    pass
