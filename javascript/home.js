import { getRoom } from "./api/rooms.js";
import { RoomCard } from "../components/room_card.js";
import { getFeedback } from "./api/feedback.js";
import { feedbackCard } from "../components/feedback.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const roomsData = await getRoom();
    const cardContainer = document.getElementById("card-container");
    const feedbackData = await getFeedback();
    const feedbackContainer = document.getElementById("customers");
    if (roomsData.length > 0) {
      let cards = "";
      for (let i = 0; i < roomsData.length; i++) {
        if (roomsData[i].discount) {
          cards += RoomCard(roomsData[i]);
        }
      }
      cardContainer.innerHTML = cards;
    } 
    feedbackData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const latestFeedback = feedbackData.slice(0, 3);
    let feedbackCards = "";
    for (let i = 0; i < latestFeedback.length; i++) {
      feedbackCards += feedbackCard(latestFeedback[i]);
    }
    feedbackContainer.innerHTML = feedbackCards;
  } catch (error) {
    console.error("Error:", error);
  }
});