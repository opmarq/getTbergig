import React, { createContext } from "react";
import { ShareModal } from "../components/ShareModal";

const ShareContext = createContext({ share: () => {} });

export const shareProvider = ({ children }) => {
  const share = async (id) => {
    const shareData = {
      title: "Aji tchof had tbergiga!",
      text: `${children}`.substring(0, 15) + "...",
      url: `${window.location}?p=${id}`,
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log("Error");
    }
  };

  return (
    <ShareContext.Provider value={{ share }}>
      {children}
      <ShareModal />
    </ShareContext.Provider>
  );
};
