//Actions


// Action creators


//Reducer 
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
      availabilities: [
        { week_day: 1, start_at: "07:00", end_at: "12:00" },
        { week_day: 1, start_at: "16:00", end_at: "20:00" },
        { week_day: 2, start_at: "07:00", end_at: "12:00" },
        { week_day: 2, start_at: "16:00", end_at: "20:00" },
        { week_day: 3, start_at: "07:00", end_at: "12:00" },
        { week_day: 3, start_at: "16:00", end_at: "20:00" },
        { week_day: 5, start_at: "07:00", end_at: "12:00" },
        { week_day: 0, start_at: "16:00", end_at: "20:00" },
        { week_day: 5, start_at: "07:00", end_at: "12:00" },
        { week_day: 5, start_at: "16:00", end_at: "20:00" },
        { week_day: 6, start_at: "07:00", end_at: "11:00" }
      ]
    }
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
 