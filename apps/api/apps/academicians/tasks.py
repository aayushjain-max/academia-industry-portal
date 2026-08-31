from celery import shared_task

@shared_task
def async_academicians_task(item_id):
    # TODO: Async worker task for academicians
    return f"Processed academicians {item_id}"
