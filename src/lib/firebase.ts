import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

export interface FirebaseConfigParams {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const LOCAL_STORAGE_FIREBASE_KEY = "roop_rivaaz_firebase_cfg_v1";

export function getActiveFirebaseConfig(): FirebaseConfigParams {
  // 1. Try env vars first
  const envConfig: FirebaseConfigParams = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  };

  if (envConfig.apiKey && envConfig.projectId) {
    return envConfig;
  }

  // 2. Try saved config in localStorage (client-side only)
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FIREBASE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.apiKey && parsed.projectId) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to read Firebase config from localStorage", e);
    }
  }

  return envConfig;
}

export function saveCustomFirebaseConfig(cfg: FirebaseConfigParams) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_FIREBASE_KEY, JSON.stringify(cfg));
    // Trigger reload to re-init
    window.location.reload();
  }
}

export function clearCustomFirebaseConfig() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOCAL_STORAGE_FIREBASE_KEY);
    window.location.reload();
  }
}

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let firestoreDb: Firestore | null = null;
let firebaseStorage: FirebaseStorage | null = null;

const currentConfig = getActiveFirebaseConfig();
export const isConfigured = Boolean(currentConfig.apiKey && currentConfig.projectId);

if (isConfigured) {
  try {
    firebaseApp = getApps().length === 0 ? initializeApp(currentConfig) : getApp();
    firebaseAuth = getAuth(firebaseApp);
    firestoreDb = getFirestore(firebaseApp);
    firebaseStorage = getStorage(firebaseApp);
  } catch (err) {
    console.error("Firebase initialization failed:", err);
  }
}

export const app = firebaseApp;
export const auth = firebaseAuth;
export const db = firestoreDb;
export const storage = firebaseStorage;
export const isFirebaseConfigured = () => Boolean(app && db && storage && auth);
