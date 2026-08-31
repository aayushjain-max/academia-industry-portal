from celery import shared_task

@shared_task
def async_career_task(item_id):
    # TODO: Async worker task for career
    return f"Processed career {item_id}"
