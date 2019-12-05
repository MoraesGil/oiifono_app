//Actions

// Action creators

//Reducer

const initialState = {
  items: [
    {
      id: 1, 
      city_id: 2
    },
    {
      id: 2, 
      city_id: 2
    }
  ]
};

export const reducer = (state = initialState, action) => {
  switch (action.type) { 
    default:
      return state;
  }
};
