import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { db, auth } from '../firebase';
import { useStore } from './store-context';

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
  const navigate = useNavigate();
  const location = useLocation();
  const { accountStore } = useStore();

  // /**
  //  * Signup method get user object register the user to the firebase auth-service
  //  * add new document for this user in the users collection
  //  * accountId - mandatory
  //  * @param newUser<User>
  //  * @returns {Promise<void>}
  //  */
  // async function signup(newUser = null, password) {
  //   try {
  //     const { user } = await auth.createUserWithEmailAndPassword(newUser.email, password);
  //     if (user) {
  //       await db.collection(collectionName).doc(user.uid).set({ ...newUser });
  //     }
  //   } catch (error) {
  //     throw Error(error);
  //   }
  // }

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
          .then(async (docRef) => {
            const account = await accountStore.getById(docRef.data().accountId);
            const currUser = { ...docRef.data(), account };
            setCurrentUser(currUser);
            setLoading(false);
            const path = (location.pathname !== '/login') ? location.pathname : '/admin/dashboard';
            navigate(`/${path}`);
          })
          .catch((error) => {
            throw Error(error);
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
