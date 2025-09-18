// Quick Firebase connection test
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const testFirebaseConnection = async () => {
  console.log('🔥 Testing Firebase connection...');
  console.log('Auth instance:', auth);
  console.log('App instance:', auth.app);
  console.log('Project ID:', auth.app.options.projectId);
  
  // Test if auth methods are available
  console.log('createUserWithEmailAndPassword available:', typeof createUserWithEmailAndPassword === 'function');
  
  return {
    connected: !!auth,
    projectId: auth.app.options.projectId,
    authDomain: auth.app.options.authDomain
  };
};