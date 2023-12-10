import { createFeedback } from "./api/feedback.js";

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
  const feedbackData = {
    email,
    name_user,
    comments,
  };
  const errorMessage = validateData(email, name_user, comments);
  if (errorMessage) {
    console.error(errorMessage);
    return;
  }
  try {
    const response = await createFeedback(feedbackData);
    console.log("Feedback submitted successfully:", response);
    showSuccessPopup();
  } catch (error) {
    console.error("Error submitting feedback:", error);
  }
});

function showSuccessPopup() {
  const successPopup = document.getElementById("successPopup");
  successPopup.style.display = "block";
  setTimeout(() => {
    successPopup.style.display = "none";
  }, 3000);
}
