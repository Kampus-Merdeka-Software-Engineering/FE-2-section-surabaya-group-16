export async function getFeedback() {
  try {
    const response = await fetch(`hhttps://sunshine-i-land-resort.netlify.app/feedbacks`, {
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
  const response = await fetch("https://sunshine-i-land-resort.netlify.app/feedbacks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedbackData)
  });
  return await response.json();
}