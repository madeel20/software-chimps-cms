import React, { createContext, useReducer } from "react";
import AppReducer from "./reducer";

// Initial state
const initialState = {
  data: [
    {
      firstname: "Adeel",
      lastname: "Khan",
      email: "aliadeel20@gmail.com",
      salary: "9000",
      joindate: "22-2-2019",
      jobtitle: "web dev",
    },
    {
      firstname: "Adeel",
      lastname: "Khan",
      email: "aliadeel20@gmail.com",
      salary: "9000",
      joindate: "22-2-2019",
      jobtitle: "web dev",
    },
    {
      firstname: "Adeel",
      lastname: "Khan",
      email: "aliadeel20@gmail.com",
      salary: "9000",
      joindate: "22-2-2019",
      jobtitle: "web dev",
    },
    {
      firstname: "Adeel",
      lastname: "Khan",
      email: "aliadeel20@gmail.com",
      salary: "9000",
      joindate: "22-2-2019",
      jobtitle: "web dev",
    },
  ],
};
// Create context
export const EmployeeContext = createContext(initialState);

// Provider component
export const EmployeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }
  function changeCurrency(currency) {
    dispatch({
      type: "CHANGE_CURRENCY",
      payload: currency,
    });
  }

  return (
    <EmployeeContext.Provider
      value={{
        employees: state.data,
        currentCurrency: state.currentCurrency,
        sign: state.sign,
        deleteTransaction,
        addTransaction,
        changeCurrency,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
