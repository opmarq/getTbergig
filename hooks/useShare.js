import React, { createContext, useContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { ShareModal } from "../components/ShareModal";

export const ShareContext = createContext({ share: () => {} });

export const ShareProvider = ({ children }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [url, setUrl] = useState();

  const share = async (id) => {
    setUrl(`${window.location}?p=${id}`);
    if (navigator?.share) {
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
    } else {
      onOpen();
    }
  };

  return (
    <ShareContext.Provider value={{ share }}>
      {children}
      <ShareModal url={url} isOpen={isOpen} onClose={onClose} />
    </ShareContext.Provider>
  );
};
