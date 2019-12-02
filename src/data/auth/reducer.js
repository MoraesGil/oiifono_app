const initialState = {
  token: "",
  expires_in: "",
  user: {
    id: 0,
    email: "",
    person: {
      id: 3,
      name: "Paul Allena",
      picture: "https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg",
      crfa: "191817"
    }
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
