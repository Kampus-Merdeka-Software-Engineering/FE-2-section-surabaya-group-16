export function feedbackCard(feedback) {
    const customerCard =
     `  <div class="client-card" id=${feedback.feedback_id}>
            <h2 id="client-name">${feedback.name_user}</h2>
            <p id="client-comments">${feedback.comments}</p>
            <div class="rating-container" id="${feedback.rating}">
            ${getStarIcons(feedback.rating)}
            </div>
        </div>
    `;
    return customerCard;
}
function getStarIcons(rating) {
    const starIcons = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    return `<span>${starIcons}</span>`;
  }
