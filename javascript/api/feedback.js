export async function getFeedback() {
  try {
    const response = await fetch(`be-2-surabaya-16-production.up.railway.app/feedbacks`, {
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
  const response = await fetch("be-2-surabaya-16-production.up.railway.app/feedbacks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedbackData),
  });
  return await response.json();
}