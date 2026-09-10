FROM python:3.11-slim
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH /app/apps/api
WORKDIR /app/apps/api
RUN apt-get update && apt-get install -y --no-install-recommends build-essential libpq-dev curl && rm -rf /var/lib/apt/lists/*
COPY apps/api/requirements.txt /app/apps/api/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY apps/api /app/apps/api
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
