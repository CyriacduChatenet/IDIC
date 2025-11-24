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

import { User } from "../../types/user.type";
import { formStyles } from "../../styles/form.style";
import AuthService from "../../services/auth.service";

interface LoginFormInputs {
  identifier: string;
  password: string;
}

interface LoginFormProps {
  onLoginSuccess: (user: User) => void;
  navigation: any;
}

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

  const onSubmit = async (data: LoginFormInputs) => {
    console.log(data);
    
    if (loading) return;
    setLoading(true);

    try {
      const authResponse = await authService.login({
        identifier: data.identifier,
        password: data.password,
      });

      if (authResponse && authResponse.jwt) {
        const userFromApi: User = {
          id: authResponse.user.id,
          permission: authResponse.user.permission,
        } as User;

        onLoginSuccess(userFromApi);
      } else {
        Alert.alert("Erreur de connexion", "Email ou mot de passe invalide.");
      }
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue lors de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="identifier"
          rules={{
            required: "L'email est requis.",
            pattern: { value: /^\S+@\S+$/i, message: "Format d'email invalide." },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.identifier && formStyles.inputError]}
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

        <Text style={styles.label}>Mot de Passe</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Le mot de passe est requis." }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.password && formStyles.inputError]}
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

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.registerLink}>Mot de Passe oublié ?</Text>
        </TouchableOpacity>

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

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    backgroundColor: '#fff'
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 5,
  },
  registerLink: {
    marginBottom: 20,
    textAlign: "left",
    color: "#CC6E31",
    fontSize: 14,
    textDecorationLine: "underline",
  },
    label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
    marginTop: 12,
    fontWeight: "500",
  },

  input: {
    height: 52,
    backgroundColor: "#f5f5f7",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#111",
    marginBottom: 20
  },
});

export default LoginForm;
