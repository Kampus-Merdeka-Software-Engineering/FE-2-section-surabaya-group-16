import { getRoom } from "./api/rooms";

const tes = document.getElementById("popular_room1_name")
const room = getRoom()
tes.innerHTML = room.room_name