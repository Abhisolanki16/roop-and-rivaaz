import { db } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  writeBatch,
} from "firebase/firestore";
import { Product, Order, StoreSettings, HomepageContent, OrderStatus } from "@/types";

/**
 * Real-time listener for Products collection
 */
export function subscribeToProducts(callback: (products: Product[]) => void) {
  if (!db) return () => {};

  try {
    const colRef = collection(db, "products");
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const prods: Product[] = [];
          snapshot.forEach((doc) => {
            prods.push(doc.data() as Product);
          });
          callback(prods);
        }
      },
      (err) => {
        console.warn("Firestore products snapshot listener error:", err);
      }
    );
    return unsubscribe;
  } catch (e) {
    console.warn("Failed to subscribe to Firestore products", e);
    return () => {};
  }
}

/**
 * Real-time listener for Orders collection
 */
export function subscribeToOrders(callback: (orders: Order[]) => void) {
  if (!db) return () => {};

  try {
    const colRef = collection(db, "orders");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const orders: Order[] = [];
        snapshot.forEach((doc) => {
          orders.push(doc.data() as Order);
        });
        callback(orders);
      },
      (err) => {
        // Fallback without orderBy if index not created
        onSnapshot(colRef, (snapshot) => {
          const orders: Order[] = [];
          snapshot.forEach((doc) => {
            orders.push(doc.data() as Order);
          });
          callback(orders);
        });
      }
    );
    return unsubscribe;
  } catch (e) {
    console.warn("Failed to subscribe to Firestore orders", e);
    return () => {};
  }
}

/**
 * Real-time listener for Store Settings
 */
export function subscribeToSettings(callback: (settings: StoreSettings) => void) {
  if (!db) return () => {};

  try {
    const docRef = doc(db, "config", "settings");
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          callback(snapshot.data() as StoreSettings);
        }
      },
      (err) => {
        console.warn("Firestore settings snapshot error:", err);
      }
    );
    return unsubscribe;
  } catch (e) {
    return () => {};
  }
}

/**
 * Real-time listener for Homepage Content CMS
 */
export function subscribeToHomeContent(callback: (content: HomepageContent) => void) {
  if (!db) return () => {};

  try {
    const docRef = doc(db, "config", "homeContent");
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          callback(snapshot.data() as HomepageContent);
        }
      },
      (err) => {
        console.warn("Firestore homeContent snapshot error:", err);
      }
    );
    return unsubscribe;
  } catch (e) {
    return () => {};
  }
}

// Write Operations
export async function saveProductToFirestore(product: Product) {
  if (!db) return;
  try {
    await setDoc(doc(db, "products", product.id), product);
  } catch (e) {
    console.error("Failed to save product to Firestore", e);
  }
}

export async function updateProductInFirestore(id: string, updates: Partial<Product>) {
  if (!db) return;
  try {
    await updateDoc(doc(db, "products", id), updates);
  } catch (e) {
    console.error("Failed to update product in Firestore", e);
  }
}

export async function deleteProductFromFirestore(id: string) {
  if (!db) return;
  try {
    await deleteDoc(doc(db, "products", id));
  } catch (e) {
    console.error("Failed to delete product from Firestore", e);
  }
}

export async function saveOrderToFirestore(order: Order) {
  if (!db) return;
  try {
    await setDoc(doc(db, "orders", order.id), order);
  } catch (e) {
    console.error("Failed to save order to Firestore", e);
  }
}

export async function updateOrderStatusInFirestore(orderId: string, status: OrderStatus) {
  if (!db) return;
  try {
    await updateDoc(doc(db, "orders", orderId), { status });
  } catch (e) {
    console.error("Failed to update order status in Firestore", e);
  }
}

export async function deleteOrderFromFirestore(orderId: string) {
  if (!db) return;
  try {
    await deleteDoc(doc(db, "orders", orderId));
  } catch (e) {
    console.error("Failed to delete order from Firestore", e);
  }
}

export async function saveSettingsToFirestore(settings: StoreSettings) {
  if (!db) return;
  try {
    await setDoc(doc(db, "config", "settings"), settings, { merge: true });
  } catch (e) {
    console.error("Failed to save settings to Firestore", e);
  }
}

export async function saveHomeContentToFirestore(content: HomepageContent) {
  if (!db) return;
  try {
    await setDoc(doc(db, "config", "homeContent"), content, { merge: true });
  } catch (e) {
    console.error("Failed to save home content to Firestore", e);
  }
}

/**
 * 1-Click Seeder to populate Firebase Cloud Firestore with all initial store catalog & settings
 */
export async function seedInitialDataToFirestore(
  products: Product[],
  settings: StoreSettings,
  homeContent: HomepageContent
): Promise<{ success: boolean; count: number }> {
  const firestoreDb = db;
  if (!firestoreDb) {
    throw new Error("Firebase is not initialized. Please configure your Firebase credentials.");
  }

  const batch = writeBatch(firestoreDb);

  // 1. Settings & Content
  batch.set(doc(firestoreDb, "config", "settings"), settings);
  batch.set(doc(firestoreDb, "config", "homeContent"), homeContent);

  // 2. Products
  products.forEach((prod) => {
    batch.set(doc(firestoreDb, "products", prod.id), prod);
  });

  await batch.commit();
  return { success: true, count: products.length };
}
