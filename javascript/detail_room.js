import { getRoomDetail } from "./api/rooms.js";

async function setInners() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const roomDetail = await getRoomDetail(params.room_id);

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


}

document.addEventListener("DOMContentLoaded", async function () {

  const checkinDateElement = document.getElementById("checkinDate");
  const checkoutDateElement = document.getElementById("checkoutDate");
  const totalKamarElemenet = document.getElementById("totalRoom");

  await setInners();

  const checkPriceBtn = document.getElementById("checkPriceBtn");
  checkPriceBtn.addEventListener("click", function () {
    const priceRoom = parseInt(document.getElementById("priceRoom").innerText);
const discount = parseInt(document.getElementById("discount").innerText);


    const checkinDate = checkinDateElement.value;
    const checkoutDate = checkoutDateElement.value;
    const totalRoom = parseInt(totalKamarElemenet.value);

    // Cek apakah form telah diisi dengan benar
    if (checkinDate && checkoutDate && totalRoom > 0) {
      // Konversi discount menjadi persen jika ada
      const discountPercent = discount ? discount / 100 : 0;

      // Hitung total harga sebelum discount
      const totalSebelumDiskon = priceRoom * totalRoom;

      // Hitung total hari
      const checkin = new Date(checkinDate);
      const checkout = new Date(checkoutDate);
      const totalHari = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));

      // Hitung discount
      const totalDiskon = totalSebelumDiskon * discountPercent;

      // Hitung total harga setelah discount
      const totalSetelahDiskon = totalSebelumDiskon - totalDiskon;

      // Tampilkan hasil dalam popup
      const popupContent = `
        Total Kamar: ${totalRoom} kamar<br>
        Total Hari: ${totalHari} hari<br>
        Diskon: ${discount ? discount + "%" : "Tidak ada discount"}<br>
        Total Sebelum Diskon: $${totalSebelumDiskon}<br>
        Total Diskon: $${totalDiskon}<br>
        Total Harga: $${totalSetelahDiskon}
      `;

      document.getElementById("popupContent").innerHTML = popupContent;
      document.getElementById("resultPopup").style.display = "block";
    } else {
      alert("Silakan isi form dengan benar.");
    }
  });
});

function closePopup() {
  document.getElementById("resultPopup").style.display = "none";
}

