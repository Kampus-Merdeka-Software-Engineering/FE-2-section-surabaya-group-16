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
  if (typeof img_user !== "object" || !(img_user instanceof File)) {
    return "Please provide a valid image file";
  }
  return null;
}

document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const name_user = document.getElementById("name_user").value;
  const comments = document.getElementById("comments").value;
  const img_userInput = document.getElementById("img_user");
  
  // Access the File object from the input element
  const img_user = img_userInput.files[0];

  const feedbackData = {
    email,
    name_user,
    comments,
    img_user,
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
