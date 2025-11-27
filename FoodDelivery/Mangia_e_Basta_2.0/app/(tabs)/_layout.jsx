import { Tabs } from "expo-router";
import React from "react";
import { TabBar } from "../../components/TabBar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="orders" options={{ title: "Ordini" }} />
      <Tabs.Screen name="profile" options={{ title: "Profilo" }} />
    </Tabs>
  );
}
