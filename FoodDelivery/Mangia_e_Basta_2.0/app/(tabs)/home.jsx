import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Modal } from "react-native";
import { usePositionContext } from "../../hooks/usePositionContext";
import { getUser, saveUser } from "../../lib/storage";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useGetNearMenus } from "../../hooks/useGetNearMenus";
import MenuItem from "../../components/MenuItem";
import MenuDetailsScreen from "../../components/MenuDetailsScreen";
import * as Location from "expo-location";

const home = () => {
  const { lat, lon } = usePositionContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [shouldCreateUser, setShouldCreateUser] = useState(false);
  const { data, isLoading, isError, Error } = useCreateUser(shouldCreateUser);
  const {
    data: menuData,
    isLoading: menuLoading,
    isError: menuError,
  } = useGetNearMenus(lat, lon);

  //controllo se ho già l'utente salvato
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getUser();
        console.log("Utente recuperato:", user);
        if (user && user.sid && user.uid) {
          setUser(user);
          setShouldCreateUser(false);
        } else {
          setShouldCreateUser(true);
        }
      } catch (error) {
        console.error("Impossibile recuperare l'utente", error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  //Se l'utente è nuovo, lo salvo
  useEffect(() => {
    if (!isLoading && data && !user) {
      if (data.sid && data.uid) {
        saveUser(data);
        setUser(data);
      } else {
        console.error("Impossibile salvare l'utente");
      }
    }
  }, [isLoading, data, user]);

  //Richiesta permessi per posizione
  useEffect(() => {
    const locationPermissionAsync = async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status !== "granted") {
          const permissionResponse =
            await Location.requestForegroundPermissionsAsync();
          if (permissionResponse.status !== "granted") {
            console.warn("Permesso di localizzazione negato.");
          }
        }
      } catch (error) {
        console.error(
          "Errore nella richiesta dei permessi di localizzazione:",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    locationPermissionAsync();
  }, []);

  useEffect(() => {
    if (user && !user.subscription && menuData && menuData.length > 0) {
      menuData.forEach((menu) => {
        let discountType = "";
        let discountValue = 0;
        if (menu.discount) {
          discountType = "applicato";
          discountValue = menu.discount;
        } else if (menu.missedDiscount) {
          discountType = "mancato";
          discountValue = missedDiscount;
        } else {
          discountType = "non disponibile";
          discountValue = 0;
        }
        console.log(
          `Esame Febbraio: menù: ${menu.name}. Sconto ${discountType} : ${discountValue}`
        );
      });
    }
  }, [user, menuData]);

  //Apro i dettagli del menu selezionato
  const handlePress = (mid) => {
    setSelectedMenu(mid);
    setModalVisible(true);
  };

  if (isError || menuError) {
    return (
      <View style={styles.container}>
        <Text>Errore nel caricamento dei menù</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mangia e Basta</Text>
      <Text style={styles.subtitle}>Italian Foodstyle Company</Text>
      <Text style={styles.text}>Seleziona un menù vicino a te</Text>

      <FlatList
        data={menuData}
        contentContainerStyle={styles.menuList}
        renderItem={({ item }) => (
          <MenuItem
            mid={item.mid}
            item={item}
            sid={user?.sid}
            imageVersion={item.imageVersion}
            onPress={() => handlePress(item.mid)}
            discount={item.discount}
          />
        )}
        keyExtractor={(item) => item.mid.toString()}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <MenuDetailsScreen
          mid={selectedMenu}
          closeModal={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignContent: "center",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    marginLeft: 10,
    fontStyle: "italic",
  },
  text: {
    fontSize: 15,
    textAlign: "left",
    marginLeft: 10,
  },
  menuList: {
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default home;
