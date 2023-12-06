export async function getRoom() {
  try {
    const response = await fetch("http://localhost:3000/room", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const {data} = await response.json()
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getRoomDetail(room_id) {
  try {
    const response = await fetch(`http://localhost:3000/room/detail?room_id=${room_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const {data} = await response.json()
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

