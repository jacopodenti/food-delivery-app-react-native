import { PositionContext } from "../utils/PositionContext";
import { useContext } from "react";

export const usePositionContext = () => {
  const context = useContext(PositionContext);
  return context;
};
