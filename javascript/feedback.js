import { createFeedback } from "./api/feedback.js";
import { getFeedback } from "./api/feedback.js";
import { feedbackCard } from "../components/feedback.js";

const stars = document.querySelectorAll(".star");
let selectedRating = 0;
stars.forEach((star) => {
  star.addEventListener("click", () => {
    selectedRating = parseInt(star.getAttribute("data-value"), 10);
    updateStars(selectedRating);
  });
});

function validateData(email, name_user, comments, img_user) {
  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return "Invalid email format";
  }
  if (typeof name_user !== "string" || name_user.trim() === "") {
    return "Invalid name format";
  }
  if (typeof comments !== "string" || comments.trim() === "") {
    return "Invalid comments format";
  }
  return null;
}

document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const name_user = document.getElementById("name_user").value;
    const comments = document.getElementById("comments").value;

    const errorMessage = validateData(email, name_user, comments);
    if (errorMessage || selectedRating === 0) {
      console.error(errorMessage || "Please provide a rating");
      return;
    }
    const feedbackData = {
      email,
      name_user,
      comments,
      rating: selectedRating,
    };
    try {
      const response = await createFeedback(feedbackData);
      showSuccessPopup();
      resetForm();
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  }
);

function updateStars(value) {
  stars.forEach((star) => {
    const starValue = parseInt(star.getAttribute("data-value"), 10);
    star.classList.toggle("active", starValue <= value);
  });
}

function resetForm() {
  document.getElementById("feedbackForm").reset();
  selectedRating = 0;
  updateStars(selectedRating);
}

function showSuccessPopup() {
  const successPopup = document.getElementById("successPopup");
  successPopup.style.display = "block";
  setTimeout(() => {
    successPopup.style.display = "none";
  }, 3000);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const feedbackData = await getFeedback();
    const feedbackContainer = document.getElementById("customers");
    feedbackData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const latestFeedback = feedbackData;
    let feedbackCards = "";
    for (let i = 0; i < latestFeedback.length; i++) {
      feedbackCards += feedbackCard(latestFeedback[i]);
    }
    feedbackContainer.innerHTML = feedbackCards;
  } catch (error) {
    console.error("Error:", error);
  }
});