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
      company: {
        cnpj: "",
        ie: ""
      },
      doctor: {
        crfa: "219789"
      },
      availabilities: [
        { id: 1, week_day: 1, start_at: "07:00", end_at: "12:00" },
        { id: 2, week_day: 1, start_at: "16:00", end_at: "20:00" },
        { id: 3, week_day: 2, start_at: "07:00", end_at: "12:00" },
        { id: 4, week_day: 2, start_at: "16:00", end_at: "20:00" },
        { id: 5, week_day: 3, start_at: "07:00", end_at: "12:00" },
        { id: 6, week_day: 3, start_at: "16:00", end_at: "20:00" },
        { id: 7, week_day: 4, start_at: "07:00", end_at: "12:00" },
        { id: 8, week_day: 4, start_at: "16:00", end_at: "20:00" },
        { id: 9, week_day: 5, start_at: "07:00", end_at: "12:00" },
        { id: 11, week_day: 5, start_at: "16:00", end_at: "20:00" },
        { id: 12, week_day: 6, start_at: "07:00", end_at: "11:00" }
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
