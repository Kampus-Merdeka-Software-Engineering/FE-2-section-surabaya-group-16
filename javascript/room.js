import { getRoom } from "./api/rooms.js";
import { RoomCard } from "../components/room_card.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Mengambil data kamar dari server
    const roomsData = await getRoom();

    // Menangani elemen HTML setelah data diterima
    const cardContainer = document.getElementById("room-container");

    // Pastikan data ada sebelum mencoba mengakses propertinya
    if (roomsData.length > 0) {
      // Menggunakan data pertama dari array sebagai contoh
      let cards = "";

      for (let i = 0; i < 12; i++) {
        if (roomsData[i].category_name == "Deluxe")
          cards += RoomCard(roomsData[i]);
      }
      document.getElementById("room-deluxe").innerHTML = cards;
      cards = "";
      for (let i = 0; i < 12; i++) {
        if (roomsData[i].category_name == "Junior")
          cards += RoomCard(roomsData[i]);
      }
      document.getElementById("room-junior").innerHTML = cards;
      cards = "";
      for (let i = 0; i < 12; i++) {
        if (roomsData[i].category_name == "Super Deluxe")
          cards += RoomCard(roomsData[i]);
      }
      document.getElementById("room-super").innerHTML = cards;
      cards = "";
      for (let i = 0; i < 12; i++) {
        if (roomsData[i].category_name == "Standard")
          cards += RoomCard(roomsData[i]);
      }
      document.getElementById("room-standard").innerHTML = cards;

      // Cetak data ke konsol
      console.log("rooms", roomsData[0].room_name);
    } else {
      console.error("Data kamar tidak ditemukan.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
