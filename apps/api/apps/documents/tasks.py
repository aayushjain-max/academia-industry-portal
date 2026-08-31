from celery import shared_task

@shared_task
def async_documents_task(item_id):
    # TODO: Async worker task for documents
    return f"Processed documents {item_id}"
