from app.api.resource.category_resource import CategoryResource


def get_all_categories():
    return CategoryResource().get_all_categories()


def list_category_details(days, category_id):
    return CategoryResource().get_category_details(days, category_id)
