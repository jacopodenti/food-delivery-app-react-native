import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  useEffect(() => {
    const hideSplashScreen = async () => {
      try {
        // Simulate loading time
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn("Error hiding splash screen:", error);
      }
    };

    hideSplashScreen();
  }, []);

  return <Redirect href="/(tabs)/home" />;
}
