import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

// Assurez-vous d'avoir ces types et styles disponibles
import { User } from "../../types/user.type";
import { formStyles } from "../../styles/form.style";
import { Permission } from "../../enum/permission.enum";
import AuthService from "../../services/auth.service";

// --- TYPES ET INTERFACES ---

// Les données d'entrée du formulaire
interface LoginFormInputs {
  identifier: string;
  password: string;
}

// Les props nécessaires, incluant la fonction de succès du contexte
interface LoginFormProps {
  onLoginSuccess: (user: User) => void;
  navigation: any;
}

// --- LOGIQUE DU COMPOSANT ---

const LoginForm = ({ onLoginSuccess, navigation }: LoginFormProps) => {
  const [loading, setLoading] = useState(false);

  const authService = new AuthService();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // 💡 Fonction de soumission (Clé de l'intégration du contexte)
  const onSubmit = async (data: LoginFormInputs) => {
    if (loading) return;

    setLoading(true);

    try {
      // 1. Appel au service d'authentification
      // 💡 Remplacez ceci par votre appel API réel (AuthService.login(data.email, data.password))
      const authResponse = await authService.login({
        identifier: data.identifier,
        password: data.password,
      });

      console.log('authResponse', authResponse);

      if (authResponse && authResponse.jwt) {
        // 2. Création de l'objet utilisateur à partir de la réponse
        // L'objet doit contenir au moins l'ID et la Permission.
        const userFromApi: User = {
          id: authResponse.user.id,
          permission: authResponse.user.permission, // Ex: Permission.Player
          // ... autres données nécessaires
        } as User;

        // 3. 🔑 Appel de la fonction de contexte : Ceci met à jour l'état global
        onLoginSuccess(userFromApi);

        // Le Router prendra le relais et affichera PlayerStack/ClubStack.
      } else {
        // Gérer le cas où l'API répond sans succès (ex: crédentiels invalides)
        Alert.alert("Erreur de connexion", "Email ou mot de passe invalide.");
      }
    } catch (error) {
      console.error("Erreur de l'API de connexion:", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la connexion. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      {/* 1. Champ Email */}
      <Controller
        control={control}
        name="identifier"
        rules={{
          required: "L'email est requis.",
          pattern: { value: /^\S+@\S+$/i, message: "Format d'email invalide." },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[formStyles.input, errors.identifier && formStyles.inputError]}
            placeholder="Adresse Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.identifier && (
        <Text style={formStyles.errorText}>{errors.identifier.message}</Text>
      )}

      {/* 2. Champ Mot de passe */}
      <Controller
        control={control}
        name="password"
        rules={{ required: "Le mot de passe est requis." }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[formStyles.input, errors.password && formStyles.inputError]}
            placeholder="Mot de passe"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={formStyles.errorText}>{errors.password.message}</Text>
      )}

      {/* 3. Bouton de Soumission */}
      <TouchableOpacity
        style={[
          formStyles.button,
          styles.submitButton,
          loading && formStyles.buttonDisabled,
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={formStyles.buttonText}>Se Connecter</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

// --- Styles Spécifiques (à ajuster selon form.style) ---
const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 5,
  },
  // ... (autres styles si nécessaire)
});

export default LoginForm;
