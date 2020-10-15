export default (state, action) => {
  switch (action.type) {
    case "CHANGE_CONTENT":
      return {
        ...state,
        loading: false,
        contentComponent: action.payload,
      };
    case "CHANGE_CURRENT_ENTRY":
      return {
        ...state,
        loading: false,
        currentEntry: action.payload,
      };
    case "GET_JOURNAL":
      return {
        ...state,
        loading: false,
        journal: action.payload,
      };
    case "ADD_ENTRY":
      return {
        ...state,
        loading: false,
        journal: [...state.journal, action.payload],
        currentEntry: action.payload,
      };
    case "EDIT_ENTRY":
      return {
        ...state,
        loading: false,
        // journal: [...state.journal, action.payload], // maybe should use a find and replace array function to change the old entry to the edited one
        currentEntry: action.payload,
      };
    case "DELETE_ENTRY":
      return {
        ...state,
        journal: state.journal.filter(
          (entry) => entry._id !== action.payload.id
        ),
      };
    case "ENTRY_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
