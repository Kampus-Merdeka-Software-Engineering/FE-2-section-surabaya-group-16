document.addEventListener("DOMContentLoaded", function () {
  const hargaPerKamarElement = document.getElementById("hargaPerKamar");
  const diskonElement = document.getElementById("diskon");

  const checkinDateElement = document.getElementById("checkinDate");
  const checkoutDateElement = document.getElementById("checkoutDate");
  const jumlahKamarElement = document.getElementById("jumlahKamar");

  const checkPriceBtn = document.getElementById("checkPriceBtn");
  checkPriceBtn.addEventListener("click", function () {
    const hargaPerKamar = parseInt(hargaPerKamarElement.innerText);
    const diskon = parseInt(diskonElement.innerText);
    
    const checkinDate = checkinDateElement.value;
    const checkoutDate = checkoutDateElement.value;
    const jumlahKamar = parseInt(jumlahKamarElement.value);

    // Cek apakah form telah diisi dengan benar
    if (checkinDate && checkoutDate && jumlahKamar > 0) {
      // Konversi diskon menjadi persen jika ada
      const diskonPersen = diskon ? (diskon / 100) : 0;

      // Hitung total harga sebelum diskon
      const totalSebelumDiskon = hargaPerKamar * jumlahKamar;

      // Hitung total hari
      const checkin = new Date(checkinDate);
      const checkout = new Date(checkoutDate);
      const totalHari = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));

      // Hitung diskon
      const totalDiskon = totalSebelumDiskon * diskonPersen;

      // Hitung total harga setelah diskon
      const totalSetelahDiskon = totalSebelumDiskon - totalDiskon;

      // Tampilkan hasil dalam popup
      const popupContent = `
        Total Kamar: ${jumlahKamar} kamar<br>
        Total Hari: ${totalHari} hari<br>
        Diskon: ${diskon ? diskon + '%' : 'Tidak ada diskon'}<br>
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
