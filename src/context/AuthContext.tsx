"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";

export interface AdminUser {
  email: string;
  uid?: string;
  isFirebaseUser?: boolean;
}

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateAdminPassword: (newPass: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ADMIN_PASS_KEY = "roop_rivaaz_admin_pwd_v1";
const SESSION_AUTH_KEY = "roop_rivaaz_admin_session_v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check if Firebase Auth is active
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
        if (fbUser) {
          setUser({
            email: fbUser.email || "admin@roopandrivaaz.com",
            uid: fbUser.uid,
            isFirebaseUser: true,
          });
        } else {
          // Check fallback session storage
          checkFallbackSession();
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // 2. Check fallback session
      checkFallbackSession();
      setLoading(false);
    }
  }, []);

  const checkFallbackSession = () => {
    try {
      const session = sessionStorage.getItem(SESSION_AUTH_KEY);
      if (session) {
        const parsed = JSON.parse(session);
        setUser(parsed);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  const login = async (
    email: string,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim();
    const trimmedPass = pass.trim();

    // 1. Try Firebase Auth first if initialized
    if (auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPass);
        const fbUser = userCredential.user;
        const loggedUser: AdminUser = {
          email: fbUser.email || trimmedEmail,
          uid: fbUser.uid,
          isFirebaseUser: true,
        };
        setUser(loggedUser);
        sessionStorage.setItem(SESSION_AUTH_KEY, JSON.stringify(loggedUser));
        return { success: true };
      } catch (err: any) {
        // If Firebase Auth throws an error, check if local fallback credentials match
        console.warn("Firebase Auth login attempt:", err?.code || err?.message);
      }
    }

    // 2. Standalone / Initial Master Admin Credential Fallback
    // Master admin credentials: Abhinav16 / Abhinav@1607 (or custom password set in settings)
    const storedPass =
      typeof window !== "undefined"
        ? localStorage.getItem(LOCAL_ADMIN_PASS_KEY) || "Abhinav@1607"
        : "Abhinav@1607";

    const isEmailMatch =
      trimmedEmail.toLowerCase() === "abhinav16" ||
      trimmedEmail.toLowerCase() === "abhinav16@roopandrivaaz.com" ||
      trimmedEmail.toLowerCase() === "abhinav" ||
      trimmedEmail.toLowerCase() === "admin@roopandrivaaz.com";

    if (isEmailMatch && trimmedPass === storedPass) {
      const loggedUser: AdminUser = {
        email: "Abhinav16",
        uid: "master-admin-abhinav16",
        isFirebaseUser: false,
      };
      setUser(loggedUser);
      sessionStorage.setItem(SESSION_AUTH_KEY, JSON.stringify(loggedUser));
      return { success: true };
    }

    return {
      success: false,
      error: "Invalid email/username or password. Please check your credentials.",
    };
  };

  const logout = async () => {
    if (auth) {
      try {
        await firebaseSignOut(auth);
      } catch (e) {
        console.error(e);
      }
    }
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    setUser(null);
  };

  const updateAdminPassword = (newPass: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_ADMIN_PASS_KEY, newPass);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateAdminPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
