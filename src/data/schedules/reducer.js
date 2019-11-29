 
const initialState = {
  items: {
    "2019-11-28": [
      {
        start_at: "12:00",
        end_at: "13:00",
        confirmed: true,
        absenced_by: "Ficou Doente",
        person: {
          id: 1,
          name: "Johh Smith",
          picture:
            "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
          birthdate: "24/12/1991",
          birthday: Math.floor(Math.random()) % 2,
          age: 29,
          disability: Math.floor(Math.random() * 80) > 8 ? "Deficiência X" : "",
          gender: "m"
        }
      }
    ]
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) { 
    default:
      return state;
  }
};
