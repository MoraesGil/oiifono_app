//Actions


// Action creators


//Reducer
import weekDays from "@/constants/weekDays";
const initialState = {
  token: "",
  expires_in: "",
  user: {
    id: 0,
    email: "",
    person: {
      id: 3,
      name: "Valeria Caldeira dos Santos",
      picture: "",
      crfa: "219789",
      availabilities: {
        [weekDays.seg]: [
          { start: "07:00", end: "12:00" },
          { start: "16:00", end: "20:00" }
        ],
        [weekDays.ter]: [
          { start: "07:00", end: "12:00" },
          { start: "16:00", end: "20:00" }
        ],
        [weekDays.qua]: [
          { start: "07:00", end: "12:00" },
          { start: "16:00", end: "20:00" }
        ],
        [weekDays.qui]: [
          { start: "07:00", end: "12:00" },
          { start: "16:00", end: "20:00" }
        ],
        [weekDays.sex]: [
          { start: "07:00", end: "12:00" },
          { start: "16:00", end: "20:00" }
        ],
        [weekDays.sab]: [{ start: "07:00", end: "11:00"}],
        [weekDays.dom]: [{ start: "", end: "" }]
      }
    }
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
