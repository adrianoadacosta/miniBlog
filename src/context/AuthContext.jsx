/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children, value }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
  return useContext(AuthContext);
}