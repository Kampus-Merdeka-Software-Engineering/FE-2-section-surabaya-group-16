import { getDetailFacilities} from "./api/rooms.js";

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

    const facilitiesUl = document.getElementById("facilities-detail-room");

    facilitiesUl.innerHTML = "";

    if (roomDetail.Facilities && roomDetail.Facilities.length > 0) {
      roomDetail.Facilities.forEach((facility) => {
        const li = document.createElement("li");

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
}

document.addEventListener("DOMContentLoaded", async function () {
  await setInners();
});

