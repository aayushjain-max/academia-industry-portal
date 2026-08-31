from celery import shared_task

@shared_task
def async_search_task(item_id):
    # TODO: Async worker task for search
    return f"Processed search {item_id}"
