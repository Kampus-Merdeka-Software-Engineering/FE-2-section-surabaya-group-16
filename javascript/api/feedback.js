export async function getFeedback() {
  try {
    const response = await fetch(`http://localhost:3000/feedbacks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
export async function createFeedback(feedbackData) {
  const response = await fetch("http://localhost:3000/feedbacks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedbackData),
  });
  return await response.json();
}