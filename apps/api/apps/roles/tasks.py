from celery import shared_task

@shared_task
def async_roles_task(item_id):
    # TODO: Async worker task for roles
    return f"Processed roles {item_id}"
