export async function getRoom() {
  try {
    const response = await fetch("http://localhost:3000/room", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getDetailFacilities(room_id) {
  try {
    const response = await fetch(`http://localhost:3000/detail/${room_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function createBook(bookingData) {
  try {
    const response = await fetch("http://localhost:3000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const { data } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getRoomBook(room_id) {
  try {
    const response = await fetch(`http://localhost:3000/booking/${room_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
