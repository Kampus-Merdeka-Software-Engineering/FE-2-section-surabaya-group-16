export function createCard(room) {
    let discountView = ""
    if(room.discount != null) {
        discountView = `<p><span>Discount </span>${room.discount}<span> %</span></p>`
    }

    const card = `
            <div class="card-room1" id=${room.room_id}>
              <img src="${room.main_image}" alt="" />
              <div class="room-container">
                <div class="discount">`
                + discountView +`
                </div>
              </div>
              <div class="text-room">
                <h2 id="popular_room1_name">${room.room_name}</h2>
              </div>
              <div class="available">
                <p class="text-available"><span>Available : </span>${room.available}</p>
              </div>
              <div class="price-room">
                <p class="price"><span>$</span>${room.price} <span>/night</span></p>
              </div>
              <a class="view-room" href="detail_room.html?room_id=${room.room_id}">View Room</a>
            </div>
    `;

    return card
}
