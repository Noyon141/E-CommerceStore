"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const Home = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [onOpen, isOpen]);

  return <div className="p-4"></div>;
};

export default Home;
