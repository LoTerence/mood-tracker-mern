import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import { useAuth } from "./auth";

// Initial State
const initialState = {
  contentComponent: "Home",
  currentEntry: {},
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
  function displayContent(contentName) {
    dispatch({
      type: "CHANGE_CONTENT",
      payload: contentName,
    });
  }

  function changeCurrentEntry(entry) {
    dispatch({
      type: "CHANGE_CURRENT_ENTRY",
      payload: entry,
    });
  }

  // Server stuff
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
        payload: err, // TODO Error: Couldnt read data from undefined response
      });
    }
  }

  async function addEntry(entry) {
    try {
      entry.author = user.username;
      const res = await axios.post("/api/entry", entry, {
        headers: {
          "x-auth-token": authToken,
        },
      });

      dispatch({
        type: "ADD_ENTRY",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "ENTRY_ERROR",
        payload: err, // TODO Error: Couldnt read data from undefined response
      });
    }
  }

  async function deleteEntry(id) {}

  return (
    <GlobalContext.Provider
      value={{
        contentComponent: state.contentComponent,
        displayContent,
        currentEntry: state.currentEntry,
        changeCurrentEntry,
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
