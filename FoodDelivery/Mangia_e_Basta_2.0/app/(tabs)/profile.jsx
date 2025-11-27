import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import useUpdateUser from "../../hooks/useUpdateUser";
import { getUser, saveUser } from "../../lib/storage";
import { useFetchUser } from "../../hooks/useFetchUser";
import FavoritesScreen from "../../components/FavoritesScreen";
import SubscriptionPage from "../../components/SubscriptionPage";

const profile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    cardFullName: "",
    cardNumber: "",
    cardExpireMonth: "",
    cardExpireYear: "",
    cardCVV: "",
    sid: "",
    uid: "",
    subscription: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editing, setEditing] = useState(false);
  const mutation = useUpdateUser();

  const [uid, setUid] = useState(null);
  const [sid, setSid] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [subModalVisible, setSubModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser();
        if (user) {
          setUid(user.uid);
          setSid(user.sid);
        } else {
          Alert.alert("Errore", "Utente non trovato");
        }
      } catch (error) {
        console.log("Errore nel recupero di uid e sid:", error);
        Alert.alert("Errore", "Impossibile recuperare i dati dell'utente");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError,
    error,
  } = useFetchUser(uid);

  useEffect(() => {
    if (profileData) {
      setUserData({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        cardFullName: profileData.cardFullName || "",
        cardNumber: profileData.cardNumber || "",
        cardExpireMonth: profileData.cardExpireMonth || "",
        cardExpireYear: profileData.cardExpireYear || "",
        cardCVV: profileData.cardCVV || "",
        sid: sid || "",
        uid: uid || "",
        subscription: profileData.subscription || "",
      });
    }
    setLoading(false);
  }, [profileData, sid, uid]);

  useEffect(() => {
    if (userData.subscription === true) {
      console.log("Esame febbraio: l'utente ha un abbonamento mangione");
    } else {
      console.log("Esame febbraio: l'utente non ha un abbonamento mangione");
    }
  }, [userData.subscription]);

  const handleUpdate = () => {
    setUpdating(true);

    mutation.mutate(userData, {
      onSuccess: (data) => {
        console.log("Dati ricevuti dalla mutazione:", data);
        Alert.alert("Successo", "Profilo aggiornato correttamente!");
        saveUser(userData);
        setEditing(false);
        setUpdating(false);
      },
      onError: (error) => {
        Alert.alert("Errore", "Impossibile aggiornare il profilo");
        console.log(error);
        setUpdating(false);
      },
    });
  };

  if (loading || isProfileLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (isError) {
    console.error("Errore:", error);
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Errore nel recupero dei dati dell'utente
        </Text>
      </View>
    );
  }

  const switchEditMode = () => {
    setEditing(!editing);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profilo</Text>
      <Text style={styles.subtitle}>Gestisci le tue impostazioni</Text>

      {editing ? (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={userData.firstName}
              onChangeText={(text) =>
                setUserData({ ...userData, firstName: text })
              }
              placeholder="Nome"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cognome</Text>
            <TextInput
              style={styles.input}
              value={userData.lastName}
              onChangeText={(text) =>
                setUserData({ ...userData, lastName: text })
              }
              placeholder="Cognome"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome sulla carta di credito</Text>
            <TextInput
              style={styles.input}
              value={userData.cardFullName}
              onChangeText={(text) =>
                setUserData({ ...userData, cardFullName: text })
              }
              placeholder="Nome sulla carta di credito"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Numero carta di credito</Text>
            <TextInput
              style={styles.input}
              value={userData.cardNumber}
              onChangeText={(text) =>
                setUserData({ ...userData, cardNumber: text })
              }
              placeholder="Numero carta di credito"
              keyboardType="number-pad"
              maxLength={16}
            />
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mese scadenza</Text>
              <TextInput
                style={styles.input}
                value={userData.cardExpireMonth}
                onChangeText={(text) =>
                  setUserData({ ...userData, cardExpireMonth: text })
                }
                placeholder="MM"
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Anno scadenza</Text>
              <TextInput
                style={styles.input}
                value={userData.cardExpireYear}
                onChangeText={(text) =>
                  setUserData({ ...userData, cardExpireYear: text })
                }
                placeholder="YYYY"
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                value={userData.cardCVV}
                onChangeText={(text) =>
                  setUserData({ ...userData, cardCVV: text })
                }
                placeholder="CVV"
                keyboardType="number-pad"
                maxLength={3}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: updating ? "#8BC34A" : "black" },
            ]}
            onPress={handleUpdate}
            disabled={updating}
          >
            <Text style={styles.buttonText}>
              {updating ? "Aggiornamento..." : "Salva Modifiche"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={switchEditMode}
          >
            <Text style={styles.buttonText}>Annulla</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.infoGroup}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.infoText}>{userData.firstName}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.label}>Cognome:</Text>
            <Text style={styles.infoText}>{userData.lastName}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.label}>Nome Carta:</Text>
            <Text style={styles.infoText}>{userData.cardFullName}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.label}>Numero Carta:</Text>
            <Text style={styles.infoText}>{userData.cardNumber}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.label}>Scadenza:</Text>
            <Text style={styles.infoText}>
              {userData.cardExpireMonth}/{userData.cardExpireYear}
            </Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.label}>CVV:</Text>
            <Text style={styles.infoText}>{userData.cardCVV}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.label}>Abbonamento mangione:</Text>
            <Text style={styles.infoText}>
              {userData.subscription ? "Attivo" : "Non attivo"}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={switchEditMode}
          >
            <Text style={styles.buttonText}>Modifica profilo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Preferiti</Text>
          </TouchableOpacity>
          {userData.subscription ? (
            <Text style={styles.info}>Hai già l'abbonamento mangione</Text>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setSubModalVisible(true)}
            >
              <Text style={styles.buttonText}>Abbonamento</Text>
            </TouchableOpacity>
          )}
        </>
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <FavoritesScreen closeModal={() => setModalVisible(false)} />
      </Modal>
      <Modal
        visible={subModalVisible}
        animationType="slide"
        onRequestClose={() => setSubModalVisible(false)}
      >
        <SubscriptionPage
          closeModal={() => setSubModalVisible(false)}
          uid={uid}
        />
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignContent: "center",
    marginLeft: 7,
    backgroundColor: "white",
  },
  subtitle: {
    fontSize: 16,
    marginLeft: 7,
    fontStyle: "italic",
  },
  inputGroup: {
    marginTop: 1,
  },
  label: {
    marginBottom: 5,
    color: "black",
    fontSize: 17,
    marginLeft: 7,
    fontWeight: "bold",
  },
  input: {
    height: 42,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  infoGroup: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
  },
  infoText: {
    marginLeft: 17,
    fontSize: 17,
    color: "#333",
  },
  button: {
    height: 40,
    width: 300,
    backgroundColor: "black",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "black",
  },
  cancelButton: {
    backgroundColor: "black",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginTop: 10,
  },
});

export default profile;
