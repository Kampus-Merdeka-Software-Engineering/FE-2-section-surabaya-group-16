import { getRoom } from "./api/rooms.js";
import { createCard } from "../components/room_popular.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Mengambil data kamar dari server
        const roomsData = await getRoom();

        // Menangani elemen HTML setelah data diterima
        const cardContainer = document.getElementById("card-container");
        
        // Pastikan data ada sebelum mencoba mengakses propertinya
        if (roomsData.length > 0) {
            // Menggunakan data pertama dari array sebagai contoh
            let cards = ""
            // roomsData.forEach(room => {
            //     cards += createCard(room)
            // });

            for(let i = 0; i < roomsData.length; i++) {
                // Hanya menambahkan kartu jika ada diskon
                if (roomsData[i].discount) {
                    cards += createCard(roomsData[i]);
                }
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