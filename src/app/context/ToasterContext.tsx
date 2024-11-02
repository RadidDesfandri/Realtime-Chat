"use client";

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
          fontSize: "12px",
        },
        success: {
          duration: 5000,
          iconTheme: {
            primary: "green",
            secondary: "white",
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: "red",
            secondary: "white",
          },
        },
      }}
    />
  );
};

export default ToasterContext;
