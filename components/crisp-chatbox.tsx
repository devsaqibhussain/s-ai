import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const ChatBox = () => {
  useEffect(() => {
    Crisp.configure("43743890-af19-407c-a1a0-ac04c3a75a92");
  }, []);
  return null;
};

export default ChatBox;
