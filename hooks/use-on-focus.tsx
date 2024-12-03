import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";

export const useOnFocus = (callback: () => void) => {
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) callback();
      }, [isFocused]);
}