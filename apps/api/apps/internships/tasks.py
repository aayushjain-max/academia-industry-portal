from celery import shared_task

@shared_task
def async_internships_task(item_id):
    # TODO: Async worker task for internships
    return f"Processed internships {item_id}"
