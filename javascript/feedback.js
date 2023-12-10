import { createFeedback } from "./api/feedback.js";

function validateData(email, name_user, comments, img_user) {
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return "Invalid email format";
  }
  if (typeof name_user !== "string" || name_user.trim() === "") {
    return "Invalid name format";
  }
  if (typeof comments !== "string" || comments.trim() === "") {
    return "Invalid comments format";
  }
  // Assuming "img_user" is a URL and required
  if (typeof img_user !== "string" || img_user.trim() === "") {
    return "Please provide a valid image URL";
  }
  return null;
}

document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const name_user = document.getElementById("name_user").value;
  const comments = document.getElementById("comments").value;
  const img_user = document.getElementById("img_user").value;

  const feedbackData = {
    email,
    name_user,
    comments,
    img_user
  }; 

  const errorMessage = validateData(email, name_user, comments, img_user);
  if (errorMessage) {
    console.error(errorMessage);
    return;
  }

  try {
    const response = await createFeedback(feedbackData);
    console.log("Feedback submitted successfully:", response);

    showSuccessPopup();
    resetForm();
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

function resetForm() {
  document.getElementById("feedbackForm").reset();
}
