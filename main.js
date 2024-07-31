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

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASPpFm467k79sDkVFWWseRou7h8_e2XLY",
  authDomain: "insan-cemerlang-e3a49.firebaseapp.com",
  projectId: "insan-cemerlang-e3a49",
  storageBucket: "insan-cemerlang-e3a49.appspot.com",
  messagingSenderId: "1633123066",
  appId: "1:1633123066:web:77ee69dcef30d9b5ee6743",
  measurementId: "G-WR2W88N8M3"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarAbsensi() {
  const refDokumen = collection(db, "absensi");
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
      noTlpn: dok.data().noTlpn,
      kelas: dok.data().kelas,
      keterangan: dok.data().keterangan,

    });
  });



  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahAbsensi(tanggal, nis, nama, alamat, noTlpn, kelas, keterangan) {
  try {
    const dokRef = await addDoc(collection(db, 'absensi'), {
      tanggal: tanggal,
      nis: nis,
      nama: nama,
      alamat: alamat,
      noTlpn: noTlpn,
      kelas: kelas,
      keterangan: keterangan
    });
    console.log('berhasil menambah absensiSiswa ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah absensiSiswa ' + e);
  }
}

export async function hapusAbsensi(docId) {
  await deleteDoc(doc(db, "absensi", docId));
}

export async function ubahAbsensi(docId, tanggal, nis, nama, alamat, noTlpn, kelas, keterangan) {
  await updateDoc(doc(db, "absensi", docId), {
    tanggal: tanggal,
    nis: nis,
    nama: nama,
    alamat: alamat,
    noTlpn: noTlpn,
    kelas: kelas,
    keterangan: keterangan
  });
}

export async function ambilAbsensi(docId) {
  const docRef = await doc(db, "absensi", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}