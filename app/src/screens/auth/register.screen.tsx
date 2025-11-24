import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";

// ⚠️ Assurez-vous que ce chemin pointe vers votre composant de formulaire d'inscription
import RegistrationForm from "../../components/auth/register-form.component";

// Renommé en RegisterScreen pour plus de clarté
const RegisterScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Créer un Compte</Text>
        <Text style={styles.subtitle}>Inscrivez-vous pour commencer</Text>

        {/* Intégration du composant de formulaire d'inscription */}
        <RegistrationForm navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

// --- Styles ---
// Renommage de loginContainer en container pour être générique.

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    alignItems: 'center'
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  bottomLinkContainer: {
    marginTop: 30,
    paddingVertical: 10,
  },
  loginLink: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
  linkText: {
    color: "#CC6E31",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
