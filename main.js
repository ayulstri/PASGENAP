import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFYmmVvk-jLZIeAdYKiTwVw2jqd4VINFA",
  authDomain: "insan-cemerlang.firebaseapp.com",
  projectId: "insan-cemerlang",
  storageBucket: "insan-cemerlang.appspot.com",
  messagingSenderId: "579109661574",
  appId: "1:579109661574:web:4a7cd4060f70eded945a07"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function tambahAbsensi() {
  const refDokumen = collection(db, "produk");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      tanggal: dok.data().tanggal,
      nis: dok.data().nis,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      notlpn: dok. data().notlpn,
      kelas: dok.data().kelas, 
      keterangan: dok.data().keterangan 
    });
  });
  
  return hasil;
}

export function tambahAbsensi(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahAbsensi(nama, harga, stok) {
  try {
    const dokRef = await addDoc(collection(db, 'produk'), {
      tanggal:tanggal,
      nis:nis,
      nama:nama,
      alamat:alamat,
      notlpn:notlpn,
      kelas:kelas,
      keterangan:keterangan,
    });
    console.log('Berhasil menambah absensi ' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah absensi ' + e);
  }
}

export async function Ambilabsensi(docId) {
  await deleteDoc(doc(db, "produk", docId));
}  