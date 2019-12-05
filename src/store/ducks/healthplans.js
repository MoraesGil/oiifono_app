//Actions

// Action creators

//Reducer

const initialState = {
  items: [
    {
      id: 1, 
      label: "Unimed Saúde",
      company_id:null
    },
    {
      id: 2, 
      city_id: "Oeste Saúde",
      company_id:null
    }
  ]
};

export const reducer = (state = initialState, action) => {
  switch (action.type) { 
    default:
      return state;
  }
};
