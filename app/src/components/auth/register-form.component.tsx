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
import { useForm, Controller } from "react-hook-form"; // FieldValues n'est pas nécessaire ici

// Assurez-vous que le chemin vers vos styles est correct
import { formStyles } from "../../styles/form.style"; 
// Importez l'interface pour les données d'inscription (les champs envoyés à l'API)
import { RegisterDto } from "../../types/auth.type"; 
import AuthService from "../../services/auth.service"; 

// Props du formulaire : nécessite l'objet navigation pour naviguer après succès
interface RegistrationFormProps {
    navigation: any;
}

// 🐛 CORRECTION 1: Déclaration de l'interface du formulaire (avec confirmPassword)
// Utiliser 'extends' au lieu de 'implements' pour ajouter des propriétés à RegisterDto
interface RegisterForm extends RegisterDto {
  confirmPassword: string;
}

const RegistrationForm = ({ navigation }: RegistrationFormProps) => {
  const [loading, setLoading] = useState(false);

  const authService = new AuthService();

  // Initialisation de React Hook Form
  // 🐛 CORRECTION 2: Typage de useForm avec l'interface RegisterForm complète
  const {
    control,
    handleSubmit,
    watch, // Utilisé pour surveiller la valeur du champ 'password'
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "", 
      first_name: "",
      last_name: "",
    } as RegisterForm, // Ajout d'un cast pour s'assurer de la cohérence des types
  });

  // Fonction de soumission appelée si la validation est réussie
  // 🐛 CORRECTION 3: Typage de la fonction onSubmit avec l'interface RegisterForm complète
  const onSubmit = async (data: RegisterForm) => {
    // 🔑 CONSERVATION : DÉSTRUCTURATION pour EXCLURE 'confirmPassword'
    // 'registrationData' contiendra tous les autres champs de RegisterForm (qui devraient correspondre à RegisterDto)
    const { confirmPassword, ...registrationData } = data; 
    
    console.log("Données à soumettre à l'API (SANS confirmPassword):", registrationData);

    if (loading) return;
    setLoading(true);

    try {
        // Envoi des données (sans confirmPassword) à l'API
        // NOTE: registrationData est implicitement du type RegisterDto car nous avons exclu confirmPassword
        const response = await authService.register(registrationData as RegisterDto); 
        
        Alert.alert("Succès", "Inscription réussie ! Vous pouvez maintenant vous connecter.");
        navigation.navigate('Login'); 
    } catch (error) {
        console.error("Erreur d'inscription:", error);
        Alert.alert("Erreur", "L'inscription a échoué. Veuillez réessayer.");
    } finally {
        setLoading(false);
    }
  };

  // Surveille la valeur du mot de passe pour la validation de la confirmation
  // watch retourne ici le type 'string' car nous surveillons le champ 'password'
  const passwordValue = watch("password");

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        
        {/* Champ Prénom (first_name) */}
        <Controller
          control={control}
          name="first_name"
          rules={{ required: "Le prénom est requis." }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[formStyles.input, errors.first_name && formStyles.inputError]}
              placeholder="Prénom"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="words"
            />
          )}
        />
        {errors.first_name && <Text style={formStyles.errorText}>{errors.first_name.message}</Text>}

        {/* Champ Nom (last_name) */}
        <Controller
          control={control}
          name="last_name"
          rules={{ required: "Le nom est requis." }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[formStyles.input, errors.last_name && formStyles.inputError]}
              placeholder="Nom"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="words"
            />
          )}
        />
        {errors.last_name && <Text style={formStyles.errorText}>{errors.last_name.message}</Text>}
        
        {/* Champ Nom d'utilisateur (username) */}
        <Controller
          control={control}
          name="username"
          rules={{ 
            required: "Le nom d'utilisateur est requis.",
            minLength: {
                value: 3,
                message: "Minimum 3 caractères.",
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[formStyles.input, errors.username && formStyles.inputError]}
              placeholder="Nom d'utilisateur"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
            />
          )}
        />
        {errors.username && <Text style={formStyles.errorText}>{errors.username.message}</Text>}

        {/* Champ Email */}
        <Controller
          control={control}
          name="email"
          rules={{ 
            required: "L'email est requis.",
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

        {/* Champ Mot de passe */}
        <Controller
          control={control}
          name="password"
          rules={{ 
            required: "Le mot de passe est requis.", 
            minLength: {
                value: 6,
                message: "Le mot de passe doit contenir au moins 6 caractères.",
            }
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
        {errors.password && <Text style={formStyles.errorText}>{errors.password.message}</Text>}

        {/* Champ Confirmation du Mot de passe */}
        <Controller
          control={control}
          name="confirmPassword"
          rules={{ 
            required: "La confirmation du mot de passe est requise.", 
            // Règle de validation personnalisée pour vérifier l'égalité
            validate: (value) => value === passwordValue || "Les mots de passe ne correspondent pas.",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[formStyles.input, errors.confirmPassword && formStyles.inputError]}
              placeholder="Confirmer le mot de passe"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />
        {errors.confirmPassword && <Text style={formStyles.errorText}>{errors.confirmPassword.message}</Text>}

        {/* Bouton de Soumission : utilise handleSubmit de RHF */}
        <TouchableOpacity
          style={[formStyles.button, styles.registerButton, loading && formStyles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)} // Déclenche la validation et la soumission
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={formStyles.buttonText}>S'inscrire</Text>
          )}
        </TouchableOpacity>

        {/* Lien de navigation vers la connexion */}
        <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            disabled={loading}
        >
            <Text style={styles.loginLink}>Déjà un compte ? Connectez-vous.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles spécifiques au RegistrationForm (inchangés)
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
    registerButton: {
        marginTop: 20,
    },
    loginLink: {
        marginTop: 20,
        color: "#007AFF",
        fontSize: 14,
        textAlign: "center",
        textDecorationLine: "underline",
    },
});

export default RegistrationForm;