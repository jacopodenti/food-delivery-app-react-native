import React, { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";

export const PositionContext = createContext();

export const PositionProvider = ({ children }) => {
  const [position, setPosition] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permessi di localizzazione non concessi");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setPosition({
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        });
      } catch (error) {
        console.error("Errore nel recupero della posizione", error);
      }
    };

    fetchPosition();
  }, []);

  return (
    <PositionContext.Provider value={position}>
      {children}
    </PositionContext.Provider>
  );
};
