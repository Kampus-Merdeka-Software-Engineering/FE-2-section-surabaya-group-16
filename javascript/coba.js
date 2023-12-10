import { getDetailFacilities, createBooking } from "./api/rooms.js";

function validateForm() {
  const checkinDate = document.getElementById("checkinDate").value;
  const checkoutDate = document.getElementById("checkoutDate").value;
  const emailGuest = document.getElementById("emailGuest").value;
  const nameGuest = document.getElementById("nameGuest").value;
  const noHpGuest = document.getElementById("noHpGuest").value;
  const totalRoom = document.getElementById("totalRoom").value;
  const confirmationCheckbox = document.getElementById("confirmationCheckbox");
  if (
    !checkinDate ||
    !checkoutDate ||
    !emailGuest ||
    !nameGuest ||
    !noHpGuest ||
    !totalRoom ||
    !confirmationCheckbox.checked
  ) {
    alert("Please fill in all required fields and confirm the information.");
    return false;
  }
  return true; 
}


async function setInners() {
  try {
    const params = new URLSearchParams(window.location.search);

    let roomDetail = await getDetailFacilities(params.get("room_id"));

    document.getElementById("heading").innerHTML = roomDetail.room_name;
    document.getElementById("desc").innerHTML = roomDetail.room_description;
    document.getElementById("priceRoom").innerHTML = roomDetail.price;
    document.getElementById("roomName").value = roomDetail.room_name;
    document.getElementById("discount").innerHTML = roomDetail.discount;

    const imgMainElement = document.getElementById("img-main");
    imgMainElement.setAttribute("src", roomDetail.main_image);
    imgMainElement.setAttribute("alt", roomDetail.room_name);

    const imgDetailElement1 = document.getElementById("image1");
    imgDetailElement1.setAttribute("src", roomDetail.detail_image1);
    imgDetailElement1.setAttribute("alt", roomDetail.room_name);

    const imgDetailElement2 = document.getElementById("image2");
    imgDetailElement2.setAttribute("src", roomDetail.detail_image2);
    imgDetailElement2.setAttribute("alt", roomDetail.room_name);

    const imgDetailElement3 = document.getElementById("image3");
    imgDetailElement3.setAttribute("src", roomDetail.detail_image3);
    imgDetailElement3.setAttribute("alt", roomDetail.room_name);

    const facilitiesUl = document.getElementById("facilities-detail-room");

    facilitiesUl.innerHTML = "";

    if (roomDetail.Facilities && roomDetail.Facilities.length > 0) {
      roomDetail.Facilities.forEach((facility) => {
        const li = document.createElement("li");
        li.textContent = facility.facility_name;
        facilitiesUl.appendChild(li);
      });
    } else {
      console.error("No facilities data available");
    }
    const totalRoomInput = document.getElementById("totalRoom");
    const totalPriceElement = document.getElementById("totalPrice");

    totalRoomInput.addEventListener("input", () => {
      const totalRoom = totalRoomInput.value;
      const totalPrice = calculateTotalPrice(
        roomDetail.price,
        roomDetail.discount,
        totalRoom
      );
      totalPriceElement.innerHTML = totalPrice;
    });

    const bookNow = document.getElementById("bookNow");
    bookNow.addEventListener("click", async () => {
      if (!validateForm()) {
        return;
      }
  

    const checkinDate = document.getElementById("checkinDate").value;
  const checkoutDate = document.getElementById("checkoutDate").value;
  const emailGuest = document.getElementById("emailGuest").value;
  const nameGuest = document.getElementById("nameGuest").value;
  const noHpGuest = document.getElementById("noHpGuest").value;
  const totalRoom = document.getElementById("totalRoom").value;

  const totalPrice = calculateTotalPrice(
    roomDetail.price,
    roomDetail.discount,
    totalRoom
  );

  const bookingData = {
    room_id: params.get("room_id"),
    checkin_date: checkinDate,
    checkout_date: checkoutDate,
    name: nameGuest,
    email: emailGuest,
    no_hp: noHpGuest,
    total_room: totalRoom,
    total_price: totalPrice,
  };

  await createBooking(bookingData);
});
  } catch (error) {
    console.error("Error fetching room details:", error);
  }
}
document.addEventListener("DOMContentLoaded", async function () {
  await setInners();

  const bookNowButton = document.getElementById("bookNow");
  bookNowButton.addEventListener("click", async (event) => {
    event.preventDefault(); 
    if (validateForm()) {
      await createBooking();
    }
  });
});

function calculateTotalPrice(price, discount, totalRoom) {
  const discountedPrice = price - (price * discount) / 100;
  return discountedPrice * totalRoom;
}
