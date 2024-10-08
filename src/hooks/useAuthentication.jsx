// eslint-disable-next-line no-unused-vars
import {db} from '../firebase/config'; 
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
  } from "firebase/auth";
  
  import { useState, useEffect } from "react";
  
  export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
  
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);
  
    const auth = getAuth();
  
    function checkIfIsCancelled() {
      if (cancelled) {
        return;
      }
    }
  
    //register
    const createUser = async (data) => {
      checkIfIsCancelled();
  
      setLoading(true);
  
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
  
        await updateProfile(user, {
          displayName: data.displayName,
        });

        setLoading(false);
  
        return user;
      } catch (error) {
        console.log(error.message);
        console.log(typeof error.message);
  
        let systemErrorMessage;
  
        if (error.message.includes("Password")) {
          systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
        } else if (error.message.includes("email-already")) {
          systemErrorMessage = "E-mail já cadastrado.";
        } else {
          systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
        }
  
        setError(systemErrorMessage);
        setLoading(false);
      }
    };
  
    // logout - sing out
    const logout = () => {
      checkIfIsCancelled();
  
      signOut(auth);
    };
  
    // login - sing in
    const login = async (data) => {
      checkIfIsCancelled();
  
      setLoading(true);
      setError(false);
  
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } catch (error) {
        console.log(error.message);
        console.log(typeof error.message);
        console.log(error.message.includes("user-not"));
  
        let systemErrorMessage;
  
        if (error.message.includes("user-not-found")) {
          systemErrorMessage = "Usuário não encontrado.";
        } else if (error.message.includes("auth/invalid-credential")) {
          systemErrorMessage = "Senha incorreta.";
        } else {
          systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
        }
  
        console.log(systemErrorMessage);
  
        setError(systemErrorMessage);
      }
  
      console.log(error);
  
      setLoading(false);
    };
  
    useEffect(() => {
      return () => setCancelled(true);
    }, []);
  
    return {
      auth,
      createUser,
      error,
      logout,
      login,
      loading,
    };
  };