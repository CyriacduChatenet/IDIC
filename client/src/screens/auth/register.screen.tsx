import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

// ⚠️ Assurez-vous que ce chemin pointe vers votre composant de formulaire d'inscription
import RegistrationForm from "../../components/auth/register-form.component"; 

// Renommé en RegisterScreen pour plus de clarté
const RegisterScreen = ({ navigation }: any) => {
  
  // Gestionnaire pour naviguer vers la page de connexion
  const handleGoToLogin = () => {
    // ⚠️ Remplacez 'Login' par le nom de l'écran de connexion dans votre Stack Navigator
    navigation.navigate('Login'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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
    backgroundColor: "#f8f8f8",
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
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
    color: "#007AFF",
    fontWeight: "600",
    textDecorationLine: "underline",
  }
});

export default RegisterScreen;