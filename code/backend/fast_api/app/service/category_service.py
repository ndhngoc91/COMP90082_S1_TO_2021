from app.resource.category_resource import CategoryResource


def get_all_categories(query):
    return CategoryResource().get_all_categories(query)


def list_category_details(days, category_id):
    return CategoryResource().get_category_details(days, category_id)


def list_extras_details(days, age_group_id):
    return CategoryResource().get_extras_details(days, age_group_id)
