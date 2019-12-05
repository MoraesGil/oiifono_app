//Actions

// Action creators

//Reducer

const initialState = {
  items: [
    {
      id: 3541406, 
      name: "Presidente",
      uf: "SP"
    },
    {
      id: 3541703, 
      name: "Quatá",
      uf: "SP"
    }
  ]
};

export const reducer = (state = initialState, action) => {
  switch (action.type) { 
    default:
      return state;
  }
};
