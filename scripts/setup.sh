#!/bin/bash
set -e
echo "Setting up Academia-Industry Collaboration Platform..."
cp -n .env.example .env || true
pnpm install
pip install -r apps/api/requirements.txt
pip install -r apps/ai/requirements.txt
echo "Setup complete! Run 'docker-compose up --build' to start services."
