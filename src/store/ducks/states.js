//Actions

// Action creators

//Reducer

const initialState = {
  items: [
    { 
      name: "São Paulo",
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
