from celery import shared_task

@shared_task
def async_institutions_task(item_id):
    # TODO: Async worker task for institutions
    return f"Processed institutions {item_id}"
