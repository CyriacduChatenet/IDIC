import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
// Assurez-vous que le chemin vers vos styles est correct
import { formStyles } from "../../styles/form.style"; 
// Importez votre service d'authentification ou créez-en un si nécessaire
import AuthService from "../../services/auth.service"; 
import { ForgotPasswordDto } from "../../types/auth.type";

// Props du formulaire (navigation peut être utile pour rediriger après succès)
interface ForgotPasswordFormProps {
    navigation: any;
}

const ForgotPasswordForm = ({ navigation }: ForgotPasswordFormProps) => {
  const [loading, setLoading] = useState(false);
  const authService = new AuthService(); // Assurez-vous que cette classe existe

  // Initialisation de React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordDto>({
    defaultValues: {
      email: "",
    },
  });

  // Fonction de soumission
  const onSubmit = async (data: ForgotPasswordDto) => {
    console.log("Tentative de réinitialisation pour:", data.email);

    if (loading) return;
    setLoading(true);

    try {
        // ⚠️ REMPLACEZ ceci par votre vraie fonction API de mot de passe oublié
        // Cette fonction enverrait généralement un lien ou un code par e-mail
        await authService.requestPasswordReset(data); 
        
        Alert.alert(
            "E-mail Envoyé", 
            `Un lien de réinitialisation a été envoyé à ${data.email}. Veuillez vérifier votre boîte de réception (et vos spams).`
        );
        
        // Optionnel : Rediriger l'utilisateur vers la page de connexion après l'envoi
        navigation.navigate('Login'); 

    } catch (error) {
        console.error("Erreur de réinitialisation:", error);
        Alert.alert(
            "Erreur", 
            "Impossible d'envoyer l'e-mail de réinitialisation. Veuillez vérifier l'adresse ou réessayer plus tard."
        );
    } finally {
        setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Mot de passe oublié</Text>
        <Text style={styles.instructions}>
            Entrez votre adresse e-mail. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </Text>

        {/* Champ Email ou Identifiant */}
        <Controller
          control={control}
          name="email"
          rules={{ 
            required: "L'adresse e-mail est requise.",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Format d'email invalide.",
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[formStyles.input, errors.email && formStyles.inputError]}
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
        {errors.email && <Text style={formStyles.errorText}>{errors.email.message}</Text>}

        {/* Bouton de Soumission */}
        <TouchableOpacity
          style={[formStyles.button, styles.submitButton, loading && formStyles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={formStyles.buttonText}>Envoyer le Lien de Réinitialisation</Text>
          )}
        </TouchableOpacity>

        {/* Lien de navigation vers la Connexion */}
        <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            disabled={loading}
        >
            <Text style={styles.loginLink}>Retour à la connexion</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles spécifiques au ForgotPasswordForm
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    container: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    instructions: {
        fontSize: 14,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    submitButton: {
        marginTop: 30,
    },
    loginLink: {
        marginTop: 20,
        color: "#007AFF",
        fontSize: 14,
        textAlign: "center",
        textDecorationLine: "underline",
    },
});

export default ForgotPasswordForm;