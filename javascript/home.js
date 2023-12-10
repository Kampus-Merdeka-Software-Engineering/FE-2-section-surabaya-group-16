import { getRoom } from "./api/rooms.js";
import { createCard } from "../components/room_popular.js";
import { getFeedback } from "./api/feedback.js";
import { FeedbackCard } from "../components/feedback.js";
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const roomsData = await getRoom();
    const cardContainer = document.getElementById("card-container");
    const feedbackData = await getFeedback();
    const feedbackContainer = document.getElementById("customers")
    if (roomsData.length > 0) {
      let cards = "";

      for (let i = 0; i < roomsData.length; i++) {
        if (roomsData[i].discount) {
          cards += createCard(roomsData[i]);
        }
      }
      cardContainer.innerHTML = cards;
      console.log("rooms", roomsData[0].room_name);
    } else {
      console.error("Data kamar tidak ditemukan.");
    }

    if (feedbackData && feedbackData.length > 0) {
      let feedbackCards = "";

      for (let i = 0; i < feedbackData.length; i++) {
        feedbackCards += FeedbackCard(feedbackData[i]);
      }

      feedbackContainer.innerHTML = feedbackCards;
    } else {
      console.error("Data feedback tidak ditemukan atau kosong.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
