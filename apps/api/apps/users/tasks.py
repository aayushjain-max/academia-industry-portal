from celery import shared_task

@shared_task
def async_users_task(item_id):
    # TODO: Async worker task for users
    return f"Processed users {item_id}"
