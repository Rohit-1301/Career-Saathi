# Firebase User Data Integration

Your authentication system has been enhanced to store user data in Firebase Firestore. Here's everything you need to know about the new functionality.

## 🚀 Features Added

- **User Profile Storage**: Store comprehensive user profiles in Firestore
- **Automatic Profile Creation**: User profiles are created automatically during signup
- **Profile Management**: Full CRUD operations for user profiles
- **Admin System**: Admin users can manage all user accounts
- **Enhanced Authentication**: Token verification with user data loading

## 📊 User Data Structure

When a user signs up, the following data structure is stored in Firestore:

```javascript
{
  uid: "firebase_auth_uid",
  email: "user@example.com",
  displayName: "John Doe",
  phoneNumber: "+1234567890",
  photoURL: "https://...",
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1990-01-01",
  jobTitle: "Software Developer",
  company: "Tech Corp",
  experience: "5 years",
  skills: ["JavaScript", "React", "Node.js"],
  bio: "Passionate developer...",
  address: {},
  preferences: {},
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
  isActive: true
}
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/signup`
Creates a new user account with profile data.

**Request Body:**
```javascript
{
  "email": "user@example.com",
  "password": "securePassword123",
  "displayName": "John Doe",
  "phoneNumber": "+1234567890",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "jobTitle": "Software Developer",
  "company": "Tech Corp",
  "experience": "5 years",
  "skills": ["JavaScript", "React"],
  "bio": "Passionate developer",
  "photoURL": "https://..."
}
```

**Response:**
```javascript
{
  "message": "User created successfully",
  "uid": "firebase_auth_uid",
  "profile": { /* full user profile */ }
}
```

### User Profile Routes (`/api/users`)

All routes require authentication via Bearer token.

#### GET `/api/users/profile`
Get current user's profile.

**Headers:**
```
Authorization: Bearer <firebase_id_token>
```

**Response:**
```javascript
{
  "profile": { /* user profile data */ }
}
```

#### PUT `/api/users/profile`
Update current user's profile.

**Headers:**
```
Authorization: Bearer <firebase_id_token>
```

**Request Body:**
```javascript
{
  "displayName": "Updated Name",
  "jobTitle": "Senior Developer",
  "skills": ["JavaScript", "React", "Node.js", "Python"]
  // Any profile fields you want to update
}
```

#### GET `/api/users/profile/:uid`
Get specific user's profile (own profile or admin only).

#### PUT `/api/users/profile/:uid`
Update specific user's profile (own profile or admin only).

#### DELETE `/api/users/profile/:uid`
Delete user profile and auth account (own profile or admin only).

#### GET `/api/users/all` (Admin only)
Get all users with pagination.

**Query Parameters:**
- `limit`: Number of users to retrieve (default: 10)
- `lastDocId`: Last document ID for pagination

#### GET `/api/users/search` (Admin only)
Search users by email.

**Query Parameters:**
- `email`: Email to search for

## 🔐 Authentication Middleware

Three middleware functions are available:

### `verifyToken`
Basic token verification - adds `req.user` with decoded token.

### `verifyTokenWithProfile`
Enhanced middleware that also loads user profile data - adds both `req.user` and `req.userProfile`.

### `requireAdmin`
Admin-only middleware - ensures user has admin privileges.

## 👑 Admin System

### Making a User Admin

You can make users admin using the admin utilities:

```javascript
import { makeUserAdmin } from './src/utils/adminUtils.js';

// Make a user admin
await makeUserAdmin('user_uid_here');
```

### Admin Privileges

Admin users can:
- View all user profiles
- Update any user profile
- Delete any user account
- Access admin-only endpoints

## 🔧 Database Service

The `UserService` class handles all Firestore operations:

```javascript
import UserService from './src/services/userService.js';

// Create user profile
await UserService.createUserProfile(uid, userData);

// Get user profile
const profile = await UserService.getUserProfile(uid);

// Update user profile
const updated = await UserService.updateUserProfile(uid, updateData);

// Delete user profile
await UserService.deleteUserProfile(uid);

// Check if user exists
const exists = await UserService.userExists(uid);
```

## 🚨 Error Handling

The system includes comprehensive error handling:

- **Signup Cleanup**: If profile creation fails after auth account creation, the auth account is automatically cleaned up
- **Profile Not Found**: Graceful handling when profiles don't exist
- **Permission Checks**: Proper authorization checks for all operations
- **Token Verification**: Secure token validation with detailed error messages

## 🔄 Client-Side Integration

### Signup Example

```javascript
// Signup with profile data
const signupData = {
  email: "user@example.com",
  password: "password123",
  displayName: "John Doe",
  firstName: "John",
  lastName: "Doe",
  jobTitle: "Developer",
  skills: ["JavaScript", "React"]
};

const response = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(signupData)
});
```

### Getting Profile

```javascript
// Get current user's profile
const response = await fetch('/api/users/profile', {
  headers: {
    'Authorization': `Bearer ${firebaseIdToken}`
  }
});

const { profile } = await response.json();
```

### Updating Profile

```javascript
// Update profile
const updateData = {
  jobTitle: "Senior Developer",
  skills: ["JavaScript", "React", "Node.js"],
  bio: "Updated bio"
};

const response = await fetch('/api/users/profile', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${firebaseIdToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updateData)
});
```

## 🛠️ Environment Setup

Make sure your Firebase service account key is properly configured:

1. Place your `serviceAccountKey.json` in the `backend` folder
2. Ensure Firestore is enabled in your Firebase project
3. Set up proper security rules in Firestore

## 📝 Firestore Security Rules

Recommended security rules for your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Users can read and write their own profile
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Admin users can read and write all profiles
      allow read, write: if request.auth != null && 
        request.auth.token.admin == true;
    }
  }
}
```

## 🎯 Next Steps

1. **Test the Integration**: Use the provided endpoints to test user creation and profile management
2. **Frontend Integration**: Update your frontend to use the new profile endpoints
3. **Admin Dashboard**: Consider building an admin interface using the admin endpoints
4. **Data Validation**: Add more robust validation for profile data
5. **File Uploads**: Consider adding file upload functionality for profile pictures

Your Firebase integration is now complete and ready to use! 🎉