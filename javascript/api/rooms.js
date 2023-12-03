export async function getRoom() {
    try {
      const response = await fetch("http://localhost:3000/room", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json().data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  