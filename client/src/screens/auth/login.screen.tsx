import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import LoginForm from "../../components/auth/login-form.component"; // Assurez-vous que ce chemin est correct

const LoginScreen = ({ navigation }: any) => {
  
  // Gestionnaire pour l'inscription
  const handleRegister = () => {
    navigation.navigate('Register')
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Bienvenue</Text>
        <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

        {/* Intégration du composant de formulaire */}
        <LoginForm navigation={navigation} />

        {/* Lien d'inscription */}
        <TouchableOpacity
          onPress={handleRegister}
        >
          <Text style={styles.register}>Pas encore de compte ?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- Styles ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  loginContainer: {
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
    marginBottom: 40,
    textAlign: "center",
  },
    register: {
    marginTop: 20,
    color: "#007AFF",
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
