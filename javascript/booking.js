import { getRoomBook, createBooking } from "./api/rooms.js";
import { calculateTotalPrice } from "./detail_room.js"; 

function updateBookingSuccessDetails(bookingData) {
  document.getElementById("booking-name").textContent = bookingData.name;
  document.getElementById("booking-email").textContent = bookingData.email;
  document.getElementById("booking-phone").textContent = bookingData.no_hp;
  document.getElementById("booking-room-name").textContent = bookingData.room_name;
  document.getElementById("booking-total-rooms").textContent = bookingData.total_rooms;
  document.getElementById("booking-total-price").textContent = calculateTotalPrice(
    bookingData.price,
    bookingData.discount,
    bookingData.total_rooms
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("booking-form");
  const bookingSuccessSection = document.getElementById("booking-success");

  // Assuming you have a submit event on the booking form
  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Assuming you have a function to retrieve booking data from the server
    try {
      const bookingData = await getRoomBook(); // Adjust this based on your actual API function
      updateBookingSuccessDetails(bookingData);

      // Show the booking success section
      bookingSuccessSection.style.display = "block";

      // Optionally, you can hide the booking form or perform any other actions
      bookingForm.style.display = "none";
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  });
});
