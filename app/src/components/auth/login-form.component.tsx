import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { formStyles } from "../../styles/form.style"; // Importation des styles partagés
import { LoginDto } from "../../types/auth.type";
import AuthService from "../../services/auth.service";

// Props du formulaire : nécessite l'objet navigation pour naviguer après succès
interface LoginFormProps {
  navigation: any;
}

const LoginForm = ({ navigation }: LoginFormProps) => {
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  // Initialisation de React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const authService = new AuthService();

  // Fonction de soumission appelée si la validation est réussie
  const onSubmit = async (data: LoginDto) => {
    console.log(data);
    if (loading) return;
    setLoading(true);

    await authService.login(data);
    setLoading(false);
  };

  return (
    <View>
      {/* Champ Email */}
      <Controller
        control={control}
        name="identifier"
        rules={{
          required: "L'email est requis.",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Format d'email invalide.",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              formStyles.input,
              errors.identifier && formStyles.inputError,
            ]}
            placeholder="Adresse e-mail"
            placeholderTextColor="#888"
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

      {/* Champ Mot de passe */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: "Le mot de passe est requis.",
          minLength: {
            value: 6,
            message: "Le mot de passe doit contenir au moins 6 caractères.",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[formStyles.input, errors.password && formStyles.inputError]}
            placeholder="Mot de passe"
            placeholderTextColor="#888"
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

      {/* Bouton de Mot de passe oublié (logique d'interaction ici) */}
      <TouchableOpacity
        onPress={() => handleForgotPassword()}
        disabled={loading}
      >
        <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      {/* Bouton de Soumission : utilise handleSubmit de RHF */}
      <TouchableOpacity
        style={[formStyles.button, loading && formStyles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)} // Déclenche la validation et la soumission
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

// Styles spécifiques au LoginForm
const styles = StyleSheet.create({
  forgotPassword: {
    marginTop: 10,
    marginBottom: 20,
    color: "#007AFF",
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default LoginForm;
