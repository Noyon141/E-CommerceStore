"use client";

import { useEffect, useState } from "react";

export const UseOrigin = () => {
  //HOOKS FOR CHECKING IF THE COMPONENT IS MOUNTED
  const [isMounted, setIsMounted] = useState(false);

  //GETTING THE ORIGIN OF THE WEBSITE
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  //USE EFFECT TO SET THE COMPONENT TO MOUNTED

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return "";
  }

  //RETURNING THE ORIGIN

  return origin;
};
