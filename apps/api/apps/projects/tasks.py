from celery import shared_task

@shared_task
def async_projects_task(item_id):
    # TODO: Async worker task for projects
    return f"Processed projects {item_id}"
