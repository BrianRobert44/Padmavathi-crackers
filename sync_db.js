import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, writeBatch } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import productData from "./src/components/productData.js";

const firebaseConfig = {
  apiKey: "AIzaSyD88EQLWFE0MvmjDKdL0KcMB4lHOoD3OkI",
  authDomain: "sri-padmavathi-crackers.firebaseapp.com",
  projectId: "sri-padmavathi-crackers",
  storageBucket: "sri-padmavathi-crackers.firebasestorage.app",
  messagingSenderId: "716641445570",
  appId: "1:716641445570:web:70c4e6dc527b9e196d7d5b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function syncDb() {
  try {
    // login first
    await signInWithEmailAndPassword(auth, "admin@sripadmavathicrackers.com", "admin123");
    console.log("Logged in successfully!");

    const batch = writeBatch(db);
    let count = 0;
    let orderIndex = 0;
    
    for (const category of productData) {
      for (const product of category.products) {
        if (!product.id) continue;
        
        const docRef = doc(db, "crackers", String(product.id));
        
        let discount = 80;
        if (category.category === "GIFT BOXES" || product.name.includes("Items") || category.category === "SETOUT") {
          discount = 0;
        } else {
            if (product.netRate && product.price) {
                discount = Math.round((1 - (product.price / product.netRate)) * 100);
            }
        }
        
        const data = {
          name: product.name,
          category: category.category,
          netRate: product.netRate || 0,
          price: product.price || 0,
          discount: discount,
          image: product.image,
          count: product.count,
          orderIndex: orderIndex++
        };
        
        batch.set(docRef, data, { merge: true });
        count++;
      }
    }

    await batch.commit();
    console.log(`Successfully synced ${count} products to Firestore!`);
    process.exit(0);
  } catch (err) {
    console.error("Error syncing DB:", err);
    process.exit(1);
  }
}

syncDb();
