import * as actionTypes from "./actionTypes";

const initialState = {
  items: [
    {
      id: 1,
      name: "Johh Smith",
      picture: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
      birthdate: "24/12/1990",
      birthday: Math.floor(Math.random()) % 2,
      age: 29,
      disability: Math.floor(Math.random() * 80) > 8 ? "Deficiência X" : "",
      sex: "m"
    },
    {
      id: 2,
      name: "Sarah Parker",
      picture:
        "https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg",
      birthdate: "24/12/1990",
      birthday: Math.floor(Math.random()) % 2,
      age: 29,
      disability: Math.floor(Math.random() * 80) > 8 ? "Deficiência X" : "",
      sex: "f"
    },
    {
      id: 3,
      name: "Paul Allen",
      picture: "https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg",
      birthdate: "24/12/1990",
      birthday: Math.floor(Math.random()) % 2,
      age: 29,
      disability: Math.floor(Math.random() * 80) > 8 ? "Deficiência X" : "",
      sex: "m"
    },
    {
      name: "Terry Andrews",
      id: 4,
      picture:
        "https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg",
      birthdate: "24/12/1990",
      birthday: Math.floor(Math.random()) % 2,
      age: 29,
      disability: Math.floor(Math.random() * 80) > 8 ? "Deficiência X" : "",
      sex: "m"
    },
    {
      id: 5,
      name: "Andy Vitale",
      picture:
        "https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg",
      birthdate: "24/12/1990",
      birthday: Math.floor(Math.random()) % 2,
      age: 29,
      disability: Math.floor(Math.random() * 80) > 8 ? "Deficiência X" : "",
      sex: "m"
    },
    {
      id: 6,
      name: "Katy Friedson",
      picture:
        "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg",
      birthdate: "24/12/1990",
      birthday: Math.floor(Math.random()) % 2,
      age: 29,
      disability: Math.floor(Math.random() * 80) > 8 ? "Deficiência X" : "",
      sex: "f"
    }
  ]
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE:
      return {
        items: {}
      };
    case actionTypes.EMPTY:
      return {
        items: {}
      };
    default:
      return state;
  }
};
