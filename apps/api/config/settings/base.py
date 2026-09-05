import os
import socket
from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-default-key-change-in-prod')
DEBUG = os.getenv('DEBUG', 'True') == 'True'
ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS', '*').split(',')

DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'django_filters',
    'drf_spectacular',
    'django_celery_beat',
]

LOCAL_APPS = [
    'apps.users',
    'apps.authentication',
    'apps.roles',
    'apps.students',
    'apps.industries',
    'apps.academicians',
    'apps.institutions',
    'apps.skills',
    'apps.assessments',
    'apps.skill_profiles',
    'apps.skill_gaps',
    'apps.career',
    'apps.learning',
    'apps.certifications',
    'apps.projects',
    'apps.micro_internships',
    'apps.opportunities',
    'apps.internships',
    'apps.placements',
    'apps.applications',
    'apps.mentorship',
    'apps.portfolios',
    'apps.skill_passports',
    'apps.gamification',
    'apps.analytics',
    'apps.notifications',
    'apps.documents',
    'apps.search',
    'apps.verification',
    'apps.audit',
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'common.middleware.audit.AuditLogMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'
ASGI_APPLICATION = 'config.asgi.application'

def _is_tcp_port_open(host: str, port: int, timeout: float = 0.5) -> bool:
    try:
        with socket.create_connection((host, int(port)), timeout=timeout):
            return True
    except (socket.timeout, ConnectionRefusedError, OSError):
        return False

POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'localhost')
POSTGRES_PORT = int(os.getenv('POSTGRES_PORT', 5432))
USE_SQLITE_ENV = os.getenv('USE_SQLITE', '').lower()

# Check if SQLite is explicitly requested or if PostgreSQL is offline
if USE_SQLITE_ENV in ('true', '1'):
    postgres_available = False
elif USE_SQLITE_ENV in ('false', '0'):
    postgres_available = True
else:
    postgres_available = _is_tcp_port_open(POSTGRES_HOST, POSTGRES_PORT)

if postgres_available:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('POSTGRES_DB', 'academia_industry_db'),
            'USER': os.getenv('POSTGRES_USER', 'postgres'),
            'PASSWORD': os.getenv('POSTGRES_PASSWORD', 'postgres_secure_password_here'),
            'HOST': POSTGRES_HOST,
            'PORT': str(POSTGRES_PORT),
        }
    }
    print(f"[DATABASE] Connected to PostgreSQL at {POSTGRES_HOST}:{POSTGRES_PORT}")
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
    print(f"[DATABASE AUTO-FALLBACK] PostgreSQL not reachable at {POSTGRES_HOST}:{POSTGRES_PORT}. Using local SQLite database: {BASE_DIR / 'db.sqlite3'}")

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
AUTH_USER_MODEL = 'users.User'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_PAGINATION_CLASS': 'common.pagination.standard.StandardResultsSetPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'EXCEPTION_HANDLER': 'common.exceptions.handlers.custom_exception_handler',
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=int(os.getenv('JWT_ACCESS_TOKEN_LIFETIME_MINUTES', 60))),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=int(os.getenv('JWT_REFRESH_TOKEN_LIFETIME_DAYS', 7))),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'Academia-Industry Collaboration Portal API',
    'DESCRIPTION': 'Comprehensive REST API documentation for Students, Industries, Academicians, and Institutions.',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}

REDIS_HOST = os.getenv('REDIS_HOST', 'localhost')
REDIS_PORT = int(os.getenv('REDIS_PORT', 6379))
redis_available = _is_tcp_port_open(REDIS_HOST, REDIS_PORT)

if redis_available:
    CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', f'redis://{REDIS_HOST}:{REDIS_PORT}/1')
    CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND', f'redis://{REDIS_HOST}:{REDIS_PORT}/2')
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.redis.RedisCache',
            'LOCATION': os.getenv('REDIS_URL', f'redis://{REDIS_HOST}:{REDIS_PORT}/0'),
        }
    }
    CELERY_TASK_ALWAYS_EAGER = False
    print(f"[CELERY/REDIS] Connected to Redis broker at {REDIS_HOST}:{REDIS_PORT}")
else:
    CELERY_BROKER_URL = 'memory://'
    CELERY_RESULT_BACKEND = 'cache+memory://'
    CELERY_TASK_ALWAYS_EAGER = True
    CELERY_TASK_EAGER_PROPAGATES = True
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
            'LOCATION': 'portal-local-cache',
        }
    }
    print(f"[CELERY/REDIS AUTO-FALLBACK] Redis not reachable at {REDIS_HOST}:{REDIS_PORT}. Enabled in-memory Celery eager execution & local cache.")

CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = TIME_ZONE

CORS_ALLOW_ALL_ORIGINS = DEBUG
