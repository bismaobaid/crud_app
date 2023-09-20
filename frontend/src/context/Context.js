import React, { createContext, useState } from "react";

export const addData = createContext();
export const updateData = createContext();
export const deleteData = createContext();

const ContextProvider = ({ children }) => {
  const [userdata, setUserdata] = useState("");
  const [updatedata, setUpdatedata] = useState("");
  const [deletedata, setDeletedata] = useState("");

  return (
    <addData.Provider value={{ userdata, setUserdata }}>
      <updateData.Provider value={{ updatedata, setUpdatedata }}>
        <deleteData.Provider value={{ deletedata, setDeletedata }}>
          {children}
        </deleteData.Provider>
      </updateData.Provider>
    </addData.Provider>
  );
};

export default ContextProvider;
