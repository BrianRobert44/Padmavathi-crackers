
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc, writeBatch } from "firebase/firestore";

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



async function updatePrices() {
  const querySnapshot = await getDocs(collection(db, "crackers"));
  const batch = writeBatch(db);
  let updatedCount = 0;
  let skippedCount = 0;

  querySnapshot.forEach((docSnap) => {
    const product = docSnap.data();
    const name = product.name.trim();
    let newNetRate = null;
    let discount = 80;

    // Try exact match
    if (pdfData[name]) {
      newNetRate = pdfData[name];
    } else {
      // Try fuzzy match (case insensitive, removing extra spaces)
      const normalizedName = name.toLowerCase().replace(/\s+/g, '');
      for (const [pdfName, rate] of Object.entries(pdfData)) {
        if (pdfName.toLowerCase().replace(/\s+/g, '') === normalizedName) {
          newNetRate = rate;
          break;
        }
      }
    }

    // Gift Boxes check
    if (product.category === "GIFT BOXES" || product.category === "M M Gift Box") {
      discount = 0;
      // If price not in pdfData, use giftBoxPrices
      if (!newNetRate) {
        newNetRate = giftBoxPrices[name] || giftBoxPrices[name.split(' ')[0] + ' Items'];
      }
    }

    if (newNetRate && newNetRate > 0) {
      const newPrice = Math.round(newNetRate * (1 - discount / 100));
      batch.update(docSnap.ref, {
        netRate: newNetRate,
        price: newPrice,
        discount: discount,
        updatedAt: new Date()
      });
      updatedCount++;
    } else {
      skippedCount++;
      console.log(`Skipped: ${name} (No match in PDF)`);
    }
  });

  await batch.commit();
  console.log(`Successfully updated ${updatedCount} products.`);
  console.log(`Skipped ${skippedCount} products.`);
  process.exit(0);
}

updatePrices().catch(err => {
  console.error(err);
  process.exit(1);
});
