#!/bin/bash
set -e
echo "Running tests across all services..."
pnpm --filter "*" typecheck
python apps/api/manage.py test apps
pytest apps/ai/tests
echo "All tests passed!"
