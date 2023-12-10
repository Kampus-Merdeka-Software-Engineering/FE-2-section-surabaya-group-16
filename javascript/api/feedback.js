export async function getFeedback(feedback_id) {
  try {
    const response = await fetch(`http://localhost:3000/feedbacks/${feedback_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
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

