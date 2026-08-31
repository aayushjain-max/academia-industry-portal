from celery import shared_task

@shared_task
def async_learning_task(item_id):
    # TODO: Async worker task for learning
    return f"Processed learning {item_id}"
