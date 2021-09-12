import React, { useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { db, auth } from '../firebase';
import User from '../models/user';

const collectionName = 'users';
const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Auth provider - global auth object for reuse in the application components
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  /**
   * Signup method get user object register the user to the firebase auth-service
   * add new document for this user in the users collection
   * accountId - mandatory
   * @param newUser<User>
   * @returns {Promise<void>}
   */
  async function signup(newUser = null, password) {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(newUser.email, password);
      if (user) {
        await db.collection(collectionName).doc(user.uid).set({ ...newUser });
      }
    } catch (error) {
      throw Error(error);
    }
  }

  /**
   * Login methode
   * @param email
   * @param password
   * @returns {Promise<firebase.auth.UserCredential>}
   */
  async function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  /**
   * Logout methode
   * @returns {Promise<void>}
   */
  function logout() {
    return auth.signOut();
  }

  // function resetPassword(email) {
  //   return auth.sendPasswordResetEmail(email);
  // }

  // function updateEmail(email) {
  //   // return currentUser.updateEmail(email)
  // }
  //
  // function updatePassword(password) {
  //   // return currentUser.updatePassword(password)
  // }

  /**
   * onAuthStateChanged - listener for the user login state, triggered when the user login state changed
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection(collectionName)
          .doc(user.uid)
          .get()
          .then((docRef) => {
            setCurrentUser(new User(docRef.data()));
            setLoading(false);
            // navigate('/app/dashboard', { replace: true });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setCurrentUser(user);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout
    // resetPassword,
    // updateEmail,
    // updatePassword
  };

  AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
