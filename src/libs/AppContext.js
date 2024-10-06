"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import Loader from "@/components/Loader";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/user")
      .then((res) => {
        if(res.data == "Email Error") {
          signOut({
            callbackUrl: "/sign-in"
          })
        }
        
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
