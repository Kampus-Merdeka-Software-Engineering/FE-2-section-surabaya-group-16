export async function getRoom() {
  try {
    const response = await fetch(
      "https://sunshine-i-land-resort.netlify.app/room",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
export async function getDetailFacilities(room_id) {
  try {
    const response = await fetch(
      `hhttps://sunshine-i-land-resort.netlify.app/detail/${room_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
export async function createBooking(booking) {
  const response = await fetch("https://sunshine-i-land-resort.netlify.app/book",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    }
  );
  return await response.json();
}
