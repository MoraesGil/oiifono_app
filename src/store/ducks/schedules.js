//Actions

// Action creators

//Reducer

const initialState = {
  items: {
    "2019-12-01": [
      {
        id: 1,
        date: " 2019-12-01",
        start_at: "12:00",
        end_at: "13:00",
        confirmed: true,
        attended: true,
        parent_id: null,
        absenced_by: null,
        person_id: 1
      },
      {
        id: 2,
        date: " 2019-12-01",
        start_at: "11:00",
        end_at: "12:00",
        confirmed: true,
        attended: false,
        parent_id: null,
        absenced_by: "Ficou Doente",
        person_id: 2
      }
    ],
    "2019-12-02": [
      {
        id: 5,
        date: " 2019-12-01",
        start_at: "11:00",
        end_at: "12:00",
        confirmed: false,
        attended: false,
        parent_id: 2,
        absenced_by: null,
        person_id: 2
      }
    ],
    "2019-12-03": [
      {
        id: 3,
        date: "2019-12-03",
        start_at: "12:00",
        end_at: "13:00",
        confirmed: true,
        attended: true,
        parent_id: null,
        absenced_by: null,
        person_id: 1
      },
      {
        id: 4,
        date: " 2019-12-03",
        start_at: "14:00",
        end_at: "15:00",
        confirmed: false,
        attended: false,
        parent_id: null,
        absenced_by: null,
        person_id: 2
      }
    ]
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SCHEDULE":
      return {
        ...state,
        items: {
          ...state.items[action.schedule.date],
          [action.schedule.date]: [
            ...state.items[action.schedule.date],
            action.schedule
          ]
        }
      };

    default:
      return state;
  }
};
