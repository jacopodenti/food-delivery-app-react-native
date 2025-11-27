import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useFetchUser } from "../../hooks/useFetchUser";
import useFetchMenuDetails from "../../hooks/useFetchMenuDetails";
import { useFetchOrderDetails } from "../../hooks/useFetchOrderDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Orders = () => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const { data: userProfile, isLoading: userLoading } = useFetchUser();

  const {
    data: orderData,
    isLoading: orderLoading,
    refetch: refetchOrderData,
  } = useFetchOrderDetails(orderId, {
    enabled: !!orderId,
  });

  // Carico i dettagli dell'ordine
  useEffect(() => {
    const loadOrderDetails = async () => {
      try {
        const oid = await AsyncStorage.getItem("lastOid");
        setOrderId(oid);
      } catch (error) {
        console.error("Errore nel recupero dell'ordine", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadOrderDetails();
  }, [userProfile]);

  // Aggiorno lo stato dell'ordine quando orderData cambia
  useEffect(() => {
    if (orderData) {
      setOrder(orderData);
    } else {
      console.log("Nessun ordine trovato");
      setOrder(null);
    }
  }, [orderData]);

  const { data: restaurantDetails } = useFetchMenuDetails(
    order?.mid,
    order?.deliveryLocation?.lat,
    order?.deliveryLocation?.lng
  );

  // Posizione utente
  useEffect(() => {
    const getUserLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    };
    getUserLocation();
  }, []);

  // aggiorno ogni 5 secondi solo se c'è un ordine
  useEffect(() => {
    if (!orderData || orderData.status !== "ON_DELIVERY") return;
    const interval = setInterval(() => {
      refetchOrderData();
    }, 5000);
    return () => clearInterval(interval);
  }, [orderData, refetchOrderData]);

  if (isLoading || userLoading || orderLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
        <Text style={styles.loadingText}>
          Caricamento dettagli dell'ordine...
        </Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.noOrderText}>Nessun ordine trovato.</Text>
      </View>
    );
  }

  const userLocation = order.deliveryLocation
    ? {
        latitude: order.deliveryLocation.lat,
        longitude: order.deliveryLocation.lng,
      }
    : null;

  const restaurantLocation = restaurantDetails
    ? {
        latitude: restaurantDetails.location.lat,
        longitude: restaurantDetails.location.lng,
      }
    : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I tuoi ordini</Text>
      <View style={styles.orderItem}>
        <Text style={styles.orderId}>Numero ordine: #{order.oid}</Text>
        <Text style={styles.orderTimestamp}>
          Data e ora acquisto:{" "}
          {new Date(order.creationTimestamp).toLocaleString()}
        </Text>
        <Text style={styles.orderStatus}>Stato: {order.status}</Text>
        <Text style={styles.orderTimestamp}>
          Consegna stimata:{" "}
          {order.expectedDeliveryTimestamp
            ? new Date(order.expectedDeliveryTimestamp).toLocaleString()
            : "Consegna effettuata"}
        </Text>
      </View>
      <MapView style={styles.map} region={region} showsUser Location={true}>
        {/* Marker per il drone */}
        <Marker
          coordinate={{
            latitude: orderData.currentPosition.lat,
            longitude: orderData.currentPosition.lng,
          }}
          title="Posizione drone"
          pinColor="blue"
        />
        {/* Marker per il ristorante */}
        {restaurantLocation && (
          <Marker
            coordinate={restaurantLocation}
            title={restaurantDetails.name}
            pinColor="green"
          />
        )}
        {/* Marker per la posizione di consegna */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Punto di consegna"
            pinColor="red"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
  },
  orderItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "600",
  },
  orderStatus: {
    fontSize: 16,
    marginTop: 8,
  },
  orderTimestamp: {
    fontSize: 16,
    marginTop: 4,
  },
  noOrderText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  map: {
    flex: 1,
    marginTop: 16,
  },
});

export default Orders;
