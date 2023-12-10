export function feedbackCard(feedback) {
    const customerCard =
     `  <div class="client-card" id=${feedback.feedback_id}>
            <img src="${feedback.img_user}" alt="client" />
            <h2 id="client-name">${feedback.name_user}</h2>
            <p id="client-comments">${feedback.comments}</p>
        </div>
    `;
    return customerCard;
}

