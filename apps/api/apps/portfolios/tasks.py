from celery import shared_task

@shared_task
def async_portfolios_task(item_id):
    # TODO: Async worker task for portfolios
    return f"Processed portfolios {item_id}"
