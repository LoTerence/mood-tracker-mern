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
    case "DELETE_ENTRY":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case "ADD_ENTRY":
      return {
        ...state,
        loading: false,
        journal: [...state.journal, action.payload],
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
