const initialState = {
  items: {
    "1": {
      id: 1,
      name: "Johh Smith",
      picture: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
      birthdate: "24/12/1991",
      birthday: Math.floor(Math.random()) % 2,
      age: 29,
      disability: Math.floor(Math.random() * 80) > 8 ? "Deficiência X" : "",
      gender: "m"
    },
    "2": {
      id: 2,
      name: "Sarah Parker",
      picture:
        "https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg",
      birthdate: "24/12/1990",
      birthday: Math.floor(Math.random()) % 2,
      age: 29,
      disability: Math.floor(Math.random() * 80) > 8 ? "Deficiência X" : "",
      gender: "f"
    },
    "3": {
      id: 3,
      name: "Paul Allen",
      picture: "https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg",
      birthdate: "24/12/1990",
      birthday: Math.floor(Math.random()) % 2,
      age: 29,
      disability: Math.floor(Math.random() * 80) > 8 ? "Deficiência X" : "",
      gender: "m"
    },
    "4": {
      id: 4,
      name: "Terry Andrews",
      picture:
        "https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg",
      birthdate: "24/12/1990",
      birthday: Math.floor(Math.random()) % 2,
      age: 29,
      disability: Math.floor(Math.random() * 80) > 8 ? "Deficiência X" : "",
      gender: "m"
    },
    "5": {
      id: 5,
      name: "Andy Vitale",
      picture:
        "https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg",
      birthdate: "24/12/1990",
      birthday: Math.floor(Math.random()) % 2,
      age: 29,
      disability: Math.floor(Math.random() * 80) > 8 ? "Deficiência X" : "",
      gender: "m"
    },
    "6": {
      id: 6,
      name: "Katy Friedson",
      picture:
        "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg",
      birthdate: "24/12/1990",
      birthday: Math.floor(Math.random()) % 2,
      age: 29,
      disability: Math.floor(Math.random() * 80) > 8 ? "Deficiência X" : "",
      gender: "f"
    }
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
