from celery import shared_task

@shared_task
def async_students_task(item_id):
    # TODO: Async worker task for students
    return f"Processed students {item_id}"
