#!/bin/bash
echo "Deploying Firestore security rules..."
echo "This will enable open access for development"
echo ""
firebase deploy --only firestore:rules --project final-database-51935
echo ""
echo "Done! Your registration should work now."
