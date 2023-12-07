import { getRoom } from "./api/rooms.js";
import { createCard } from "../components/room_card.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Mengambil data kamar dari server
        const roomsData = await getRoom();

        // Menangani elemen HTML setelah data diterima
        const cardContainer = document.getElementById("room-container");
        
        // Pastikan data ada sebelum mencoba mengakses propertinya
        if (roomsData.length > 0) {
            // Menggunakan data pertama dari array sebagai contoh
            let cards = ""
            // roomsData.forEach(room => {
            //     cards += createCard(room)
            // });

            for(let i = 0; i < 3; i++) {
                cards += createCard(roomsData[i])
            }

            cardContainer.innerHTML = cards

            // Cetak data ke konsol
            console.log('rooms', roomsData[0].room_name);
        } else {
            console.error('Data kamar tidak ditemukan.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}); 