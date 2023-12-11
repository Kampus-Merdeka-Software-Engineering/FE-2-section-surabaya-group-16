export async function getRoom() {
  try {
    const response = await fetch("be-2-surabaya-16-production.up.railway.app/room", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
export async function getDetailFacilities(room_id) {
  try {
    const response = await fetch(`be-2-surabaya-16-production.up.railway.app/${room_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
export async function createBooking(booking) {
  try {
    const response = await fetch("be-2-surabaya-16-production.up.railway.app/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}