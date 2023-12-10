import { getDetailFacilities, createBook } from "./api/rooms.js";

async function setInners() {
  try {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    let roomDetail = await getDetailFacilities(params.room_id);

    console.log(roomDetail);

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

    // Ambil elemen ul dengan ID "facilities-detail-room"
    const facilitiesUl = document.getElementById("facilities-detail-room");

    // Bersihkan kontennya sebelum menambahkan fasilitas baru
    facilitiesUl.innerHTML = "";

    // Check if roomDetail.Facilities is defined before using forEach
    if (roomDetail.Facilities && roomDetail.Facilities.length > 0) {
      // Loop through the facilities data and create li elements
      roomDetail.Facilities.forEach((facility) => {
        // Create a new li element
        var li = document.createElement("li");

        // Set the text content of the li element to the current facility_name
        li.textContent = facility.facility_name;

        // Append the li element to the ul element
        facilitiesUl.appendChild(li);
      });
    } else {
      console.error("No facilities data available");
    }
  } catch (error) {
    console.error("Error fetching room details:", error);
  }

  const bookNowButton = document.getElementById("bookNow");

  bookNowButton.addEventListener("click", async () => {
    const checkinDate = document.getElementById("checkinDate").value;
    const checkoutDate = document.getElementById("checkoutDate").value;
    const emailGuest = document.getElementById("emailGuest").value;
    const nameGuest = document.getElementById("nameGuest").value;
    const noHpGuest = document.getElementById("noHpGuest").value;
    const totalRoom = document.getElementById("totalRoom").value;

    // Calculate total price based on room price and discount
    const totalPrice = calculateTotalPrice(
      roomDetail.price,
      roomDetail.discount,
      totalRoom
    );

    const bookingData = {
      room_id: params.room_id,
      checkin_date: checkinDate,
      checkout_date: checkoutDate,
      email: emailGuest,
      name: nameGuest,
      no_hp: noHpGuest,
      total_rooms: totalRoom,
      total_price: totalPrice,
    };

    const createdBooking = await createBook(bookingData);

    if (createdBooking) {
      console.log("Booking created:", createdBooking);
      document.getElementById(
        "bookingId"
      ).innerHTML = `Booking ID: ${createdBooking.booking_id}`;
    } else {
      console.error("Failed to create booking");
    }
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  await setInners();


  const bookNowButton = document.getElementById("bookNow");
  const confirmationCheckbox = document.getElementById("confirmationCheckbox");

  bookNowButton.addEventListener("click", async () => {
    if (confirmationCheckbox.checked) {
      const checkinDate = document.getElementById("checkinDate").value;
      const checkoutDate = document.getElementById("checkoutDate").value;
      const emailGuest = document.getElementById("emailGuest").value;
      const nameGuest = document.getElementById("nameGuest").value;
      const noHpGuest = document.getElementById("noHpGuest").value;
      const totalRoom = document.getElementById("totalRoom").value;

      // Calculate total price based on room price and discount
      const totalPrice = calculateTotalPrice(
        roomDetail.price,
        roomDetail.discount,
        totalRoom
      );

      // Prepare data for the popup
      const popupData = {
        roomName: roomDetail.room_name,
        checkinDate,
        checkoutDate,
        emailGuest,
        nameGuest,
        noHpGuest,
        totalRoom,
        totalPrice,
      };

      // Fetch booking details based on room ID
      const bookingDetails = await getRoomBook(params.room_id);

      if (bookingDetails) {
        // Update popup data with booking details
        popupData.bookingDetails = bookingDetails;

        // Display the popup
        displayPopup(popupData);
      } else {
        alert("Failed to fetch booking details");
      }
    } else {
      alert("Please confirm that the information provided is correct.");
    }
  });
});


function calculateTotalPrice(price, discount, totalRoom) {
  const discountedPrice = price - (price * discount) / 100;
  return discountedPrice * totalRoom;
}

// Function to display the popup with entered information
function displayPopup(data) {
  const popupContent = `
      <p><strong>Room Name:</strong> ${data.roomName}</p>
      <p><strong>Check-in:</strong> ${data.checkinDate}</p>
      <p><strong>Check-out:</strong> ${data.checkoutDate}</p>
      <p><strong>Email:</strong> ${data.emailGuest}</p>
      <p><strong>Name:</strong> ${data.nameGuest}</p>
      <p><strong>No HP:</strong> ${data.noHpGuest}</p>
      <p><strong>Total Rooms:</strong> ${data.totalRoom}</p>
      <p><strong>Total Price:</strong> $${data.totalPrice}</p>
  `;

  // Create a div element for the popup
  const popupDiv = document.createElement("div");
  popupDiv.innerHTML = popupContent;

  // Add styles to the popup div (you may want to customize this based on your design)
  popupDiv.style.position = "fixed";
  popupDiv.style.top = "50%";
  popupDiv.style.left = "50%";
  popupDiv.style.transform = "translate(-50%, -50%)";
  popupDiv.style.background = "#fff";
  popupDiv.style.padding = "20px";
  popupDiv.style.border = "1px solid #ccc";
  popupDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  popupDiv.style.zIndex = "1000";

  // Append the popup div to the body
  document.body.appendChild(popupDiv);
}