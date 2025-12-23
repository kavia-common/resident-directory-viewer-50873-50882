#!/bin/bash
cd /home/kavia/workspace/code-generation/resident-directory-viewer-50873-50882/frontend_ui
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

