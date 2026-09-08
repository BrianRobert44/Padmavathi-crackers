import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

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

async function deduplicate() {
  try {
    const q = collection(db, "crackers");
    const snapshot = await getDocs(q);
    
    let deletedCount = 0;
    
    for (const docSnap of snapshot.docs) {
      // Auto-generated Firestore IDs are typically 20 characters long alphanumeric.
      // The product IDs from productData.js are integers (so they are strings of numbers like '33', '276').
      // We can delete any document whose ID length is 20 to clear out the old manually added duplicates.
      if (docSnap.id.length === 20) {
        await deleteDoc(doc(db, "crackers", docSnap.id));
        deletedCount++;
        console.log(`Deleted old duplicate with ID: ${docSnap.id} (${docSnap.data().name})`);
      }
    }
    
    console.log(`Successfully deleted ${deletedCount} old duplicate products.`);
    process.exit(0);
  } catch (err) {
    console.error("Error deduplicating DB:", err);
    process.exit(1);
  }
}

deduplicate();
