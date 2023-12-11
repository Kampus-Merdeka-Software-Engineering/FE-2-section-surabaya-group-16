import { getDetailFacilities, createBooking } from "./api/rooms.js";

function openSuccessPopup(bookingInfo) {
  const popup = document.getElementById("successPopup");
  const popupInfo = document.getElementById("popupInfo");
  popupInfo.innerHTML = bookingInfo;
  popup.style.display = "block";
}
function validateBookingData({ emailGuest, nameGuest, noHpGuest, totalRoom, confirmationCheckbox }) {
  if (
    typeof emailGuest !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailGuest.trim())
  ) {
    return "Please enter a valid email address";
  }
  if (typeof nameGuest !== "string" || nameGuest.trim() === "") {
    return "Please enter your name";
  }
  if (!noHpGuest) {
    return "Please enter your Phone Number";
  }
  if (totalRoom <= 0 || totalRoom > 5) {
    return "Total rooms must be between 1 and 5";
  }
  if (!confirmationCheckbox.checked) {
    return "Please confirm your booking";
  }
  return null;
}
function calculateTotalPrice(checkinDate, checkoutDate, price, discount, totalRoom) {

  const checkInDate = new Date(checkinDate);
  const checkOutDate = new Date(checkoutDate);
  
  const timeDifference = checkOutDate - checkInDate;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  const discountedPricePerDay = discount > 0 ? price - (price * discount) / 100 : price;
  const totalPrice = discountedPricePerDay * totalRoom * daysDifference;
  return totalPrice;
}
function clearForm() {
  document.getElementById("checkinDate").value = "";
  document.getElementById("checkoutDate").value = "";
  document.getElementById("emailGuest").value = "";
  document.getElementById("nameGuest").value = "";
  document.getElementById("noHpGuest").value = "";
  document.getElementById("totalRoom").value = "";
  document.getElementById("confirmationCheckbox").checked = false;
}
async function setInners() {
  try {
    const params = new URLSearchParams(window.location.search);
    const room_id = params.get("room_id");

    if (!room_id) {
      console.error("Room ID is null or undefined.");
      return;
    }
    const roomDetail = await getDetailFacilities(room_id);
    if (roomDetail.discount) {
      document.getElementById("discount").innerHTML = roomDetail.discount;
      document.querySelector(".discount-label").style.display = "inline";
    } else {
      document.getElementById("discount").innerHTML = "";
      document.querySelector(".discount-label").style.display = "none";
    }
    document.getElementById("heading").innerHTML = roomDetail.room_name;
    document.getElementById("desc").innerHTML = roomDetail.room_description;
    document.getElementById("priceRoom").innerHTML = roomDetail.price;
    document.getElementById("roomName").value = roomDetail.room_name;
    document.getElementById("discount").innerHTML = roomDetail.discount;
    document.getElementById("img-main").setAttribute("src", roomDetail.main_image);
    document.getElementById("image1").setAttribute("src", roomDetail.detail_image1);
    document.getElementById("image2").setAttribute("src", roomDetail.detail_image2);
    document.getElementById("image3").setAttribute("src", roomDetail.detail_image3);
    const facilitiesUl = document.getElementById("facilities-detail-room");
    facilitiesUl.innerHTML = "";
    if (roomDetail.Facilities.length > 0) {
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
    const confirmationCheckbox = document.getElementById("confirmationCheckbox");
    totalRoomInput.addEventListener("input", () => {
      const checkinDate = document.getElementById("checkinDate").value;
      const checkoutDate = document.getElementById("checkoutDate").value;
      const totalRoom = totalRoomInput.value;
      try {
        const totalPrice = calculateTotalPrice(
          checkinDate,
          checkoutDate,
          roomDetail.price,
          roomDetail.discount,
          totalRoom
        );
        totalPriceElement.innerHTML = totalPrice;
      } catch (error) {
        console.error(error.message);
        totalPriceElement.innerHTML = "Invalid date or input";
      }
    });
    const bookNowButton = document.getElementById("bookNow");
    bookNowButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const checkinDate = document.getElementById("checkinDate").value;
      const checkoutDate = document.getElementById("checkoutDate").value;
      const emailGuest = document.getElementById("emailGuest").value;
      const nameGuest = document.getElementById("nameGuest").value;
      const noHpGuest = document.getElementById("noHpGuest").value;
      const validationError = validateBookingData({
        emailGuest,
        nameGuest,
        noHpGuest,
        totalRoom: totalRoomInput.value,
        confirmationCheckbox,
      });
      if (validationError) {
        alert(validationError);
        return;
      }
      const totalPrice = calculateTotalPrice(
        checkinDate,
        checkoutDate,
        roomDetail.price,
        roomDetail.discount,
        totalRoomInput.value
      );
      const bookingData = {
        room_id: room_id,
        check_in: checkinDate,
        check_out: checkoutDate,
        name: nameGuest,
        email: emailGuest,
        no_hp: noHpGuest,
        total_room: totalRoomInput.value,
        total_price: totalPrice,
      };
      try {
        await createBooking(bookingData);
        openSuccessPopup(`
          <p>Booking Details:</p>
          <p>Name: ${nameGuest}</p>
          <p>Email: ${emailGuest}</p>
          <p>No HP: ${noHpGuest}</p>
          <p>Check-in: ${checkinDate}</p>
          <p>Check-out: ${checkoutDate}</p>
          <p>Room Name: ${roomDetail.room_name}</p>
          <p>Total Rooms: ${totalRoomInput.value}</p>
          <p>Total Price: $${totalPrice}</p>
        `);
      } catch (error) {
        console.error("Error creating booking:", error);
        alert("Error creating booking. Please try again.");
      }
    });
  } catch (error) {
    console.error("Error fetching room details:", error);
  }
}
document.addEventListener("DOMContentLoaded", async function () {
  try {
    await setInners();
  } catch (error) {
    console.error("Error during initialization:", error);
    alert("An error occurred during initialization. Please try again.");
  }
});