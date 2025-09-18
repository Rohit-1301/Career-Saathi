import admin from '../config/firebase.js';

export const signup = async (req, res) => {
  const { email, password, displayName, phoneNumber } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
      phoneNumber
    });

    // Here you can add additional logic to save more user details to your own database
    // For example, using Firestore:
    // await admin.firestore().collection('users').doc(userRecord.uid).set({ ...otherDetails });

    res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  // This is intentionally left blank. 
  // Client-side handles login with Firebase Auth.
  // The backend's role is to verify the ID token sent from the client
  // using the authMiddleware for protected routes.
  res.status(200).json({ message: 'Login status can be checked via token verification.' });
};
