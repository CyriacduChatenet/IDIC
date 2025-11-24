import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import LoginForm from "../../components/auth/login-form.component"; // Assurez-vous que ce chemin est correct
import { useAuth } from "../../context/authContext";

const LoginScreen = ({ navigation }: any) => {
  // 💡 1. Accès au contexte d'authentification pour la fonction login
  const { login } = useAuth();

  // Gestionnaire pour l'inscription (reste inchangé, car il navigue dans le Stack)
  const handleRegister = () => {
    navigation.navigate("Register");
  };

  /* * 💡 NOTE IMPORTANTE :
   * La navigation vers l'écran principal (PlayerStack/ClubStack, etc.)
   * n'est plus gérée par navigation.navigate.
   * Elle est gérée par la fonction 'login' du contexte.
   */

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.loginContainer}>
        <View style={styles.container}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Bienvenue</Text>
        <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

        {/* 💡 2. Passage de la fonction 'login' du contexte au composant LoginForm */}
        <LoginForm
          onLoginSuccess={login}
          navigation={navigation} // La navigation est maintenue pour le lien d'inscription à l'intérieur du formulaire si besoin
        />

        {/* Lien d'inscription */}
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.register}>Pas encore de compte ?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- Styles (inchangés) ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  loginContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    backgroundColor: "#ffff",
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
    marginBottom: 40,
    textAlign: "center",
  },
  register: {
    marginTop: 20,
    color: "#CC6E31",
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 100
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
});

export default LoginScreen;
