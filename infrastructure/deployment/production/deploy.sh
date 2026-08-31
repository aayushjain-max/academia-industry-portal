#!/bin/bash
set -e
echo "Starting production deployment..."
docker-compose -f docker-compose.yml -f infrastructure/deployment/production/docker-compose.prod.yml up --build -d
echo "Deployment completed successfully."
