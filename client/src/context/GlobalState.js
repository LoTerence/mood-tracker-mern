import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import { useAuth } from "./auth";

// Initial State
const initialState = {
  journal: [],
  error: null,
  loading: true,
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const { user, authToken } = useAuth();

  // Actions
  async function getJournal() {
    try {
      const res = await axios.get("/api/entry", {
        headers: {
          "x-auth-token": authToken,
        },
      });

      dispatch({
        type: "GET_JOURNAL",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "ENTRY_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteEntry(id) {}

  async function addEntry(entry) {}

  return (
    <GlobalContext.Provider
      value={{
        journal: state.journal,
        getJournal,
        error: state.error,
        loading: state.loading,
        deleteEntry,
        addEntry,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
