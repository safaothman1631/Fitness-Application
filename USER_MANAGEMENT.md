# User Management Scripts

## Ensure All Users Exist

This script checks and creates all required users in Firebase.

### Usage

```bash
node ensure-users.js
```

### What it does

1. Checks if each user exists in Firebase Auth
2. If not, creates the user with email verified
3. Checks if user document exists in Firestore
4. If not, creates the document with proper role
5. Ensures email is verified

### Required Users

All users have password: `123456`

- `superadmin@fitpro.com` - Role: superadmin
- `owner@fitpro.com` - Role: owner
- `doctor@fitpro.com` - Role: admin
- `physio@fitpro.com` - Role: physiotherapist
- `trainer@fitpro.com` - Role: trainer
- `user@fitpro.com` - Role: user (pre-approved)

### Run Before Deployment

Always run this script before deploying to ensure all test users are available:

```bash
npm run ensure-users
```

Or add to package.json:

```json
{
  "scripts": {
    "ensure-users": "node ensure-users.js",
    "predeploy": "npm run ensure-users"
  }
}
```
