import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export interface UploadOptions {
  folder?: "products" | "banners" | "edits" | "general";
  onProgress?: (percent: number) => void;
}

/**
 * Uploads a file (picked from laptop, phone, camera, or desktop) to Firebase Storage
 * and returns the public CDN download URL to use in product/banner images.
 */
export async function uploadImageToFirebase(
  file: File,
  options: UploadOptions = {}
): Promise<string> {
  const folder = options.folder || "products";
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const fileName = `${Date.now()}_${sanitizedName}`;
  const filePath = `${folder}/${fileName}`;

  // If Firebase Storage is configured and initialized
  if (storage) {
    const firebaseStorage = storage;
    return new Promise((resolve, reject) => {
      const storageRef = ref(firebaseStorage, filePath);
      const metadata = {
        contentType: file.type || "image/jpeg",
      };

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (options.onProgress) {
            options.onProgress(Math.round(progress));
          }
        },
        (error) => {
          console.error("Firebase Storage upload error:", error);
          reject(new Error(`Upload failed: ${error.message}`));
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            if (options.onProgress) options.onProgress(100);
            resolve(downloadURL);
          } catch (err) {
            reject(err);
          }
        }
      );
    });
  }

  // Fallback: If Firebase Storage is not configured yet, convert file to data URL
  // so the user can immediately test selecting images from any phone/laptop
  return new Promise((resolve) => {
    let p = 0;
    const interval = setInterval(() => {
      p += 25;
      if (options.onProgress) options.onProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }, 80);
  });
}
