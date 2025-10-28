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
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

// Assurez-vous que le chemin vers vos styles est correct
import { formStyles } from "../../styles/form.style";
// Importez l'interface pour les données d'inscription (les champs envoyés à l'API)
import { RegisterDto } from "../../types/auth.type";
import AuthService from "../../services/auth.service";
import { Permission } from "../../enum/permission.enum";

// Constantes pour le sélecteur de permission
const PERMISSION_OPTIONS = [
    { label: "Joueur", value: `${Permission.Player}` },
    { label: "Club", value: `${Permission.Club}` },
    { label: "Sponsor", value: `${ Permission.Sponsor}` },
];

// Props du formulaire
interface RegistrationFormProps {
    navigation: any;
}

// ✅ FIX: Le type 'permission' est maintenant 'string' pour correspondre aux valeurs des options
interface RegisterForm {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    birth_date: Date;
    phone: string;
    permission: string; // <-- FIX: Changé de Permission à string
    confirmPassword: string; 
}

const RegistrationForm = ({ navigation }: RegistrationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false); 
  // ✅ NOUVEAU: État pour contrôler l'affichage du sélecteur de permission
  const [showPermissionPicker, setShowPermissionPicker] = useState(false); 

  const authService = new AuthService();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      first_name: "",
      last_name: "",
      birth_date: new Date(), 
      phone: "",
      permission: `${Permission.Player}`, // <-- FIX: La valeur par défaut est maintenant une string
    },
  });

  // Fonction de soumission
  const onSubmit = async (data: RegisterForm) => {
    // Destructuration correcte : birth_date, permission, et confirmPassword sont exclus
    const { confirmPassword, birth_date, permission, ...registrationData } = data;

    // FORMATAGE : Création de l'objet RegisterDto
    // Le cast `as unknown as RegisterDto` n'est plus nécessaire car RegisterDto a été mis à jour
    const apiData: RegisterDto = {
      ...registrationData,
      // ✅ CORRIGÉ : Conversion de l'objet Date en string (YYYY-MM-DD)
      birth_date: birth_date.toISOString().split('T')[0],
      permission: permission, // <-- Inclusion du nouveau champ (qui est maintenant string)
    }; 

    console.log("Données à soumettre à l'API:", apiData);

    if (loading) return;
    setLoading(true);

    try {
        const response = await authService.register(apiData); 
        
        Alert.alert("Succès", "Inscription réussie ! Vous pouvez maintenant vous connecter.");
        navigation.navigate('Login'); 
    } catch (error) {
        console.error("Erreur d'inscription:", error);
        Alert.alert("Erreur", "L'inscription a échoué. Veuillez réessayer.");
    } finally {
        setLoading(false);
    }
  };

  const passwordValue = watch("password");
  const selectedDate = watch("birth_date"); 
  const selectedPermission = watch("permission"); // Type: string, la comparaison est correcte maintenant

  // Formatage de la date pour l'affichage
  const dateDisplay = selectedDate
    ? selectedDate.toLocaleDateString('fr-FR')
    : "Sélectionnez votre date de naissance";
  
  // Formatage de la permission pour l'affichage (selectedPermission et opt.value sont tous deux des strings)
  const permissionDisplay = PERMISSION_OPTIONS.find(opt => opt.value === selectedPermission)?.label || "Sélectionnez votre rôle";

  // Gestionnaire de changement de date
  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android' || event.type === 'set') { 
        setShowDatePicker(false);
    }
    if (date) {
      setValue("birth_date", date, { shouldValidate: true });
    }
  };
  
  // Fonction pour sélectionner une permission
  const selectPermission = (onChange: (value: string) => void, value: string) => {
      onChange(value);
      setShowPermissionPicker(false);
  }


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        
        {/* Prénom */}
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

        {/* Nom */}
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
        
        {/* Nom d'utilisateur */}
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

        {/* Email */}
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


        {/* Date de Naissance (birth_date) */}
        <View style={styles.inputGroup}>
            <Controller
                control={control}
                name="birth_date"
                rules={{ 
                    required: "La date de naissance est requise.",
                    validate: (value) => value <= new Date() || "La date de naissance ne peut être dans le futur."
                }}
                render={({ field: { value } }) => (
                    <TouchableOpacity
                        style={[
                            formStyles.input,
                            errors.birth_date && formStyles.inputError,
                            styles.dateInput, 
                        ]}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Ionicons
                            name="calendar-outline"
                            size={20}
                            color="#007AFF"
                            style={{ marginRight: 10 }}
                        />
                        <Text
                            style={{
                                color: value ? "#333" : "#888",
                                flex: 1,
                            }}
                        >
                            {dateDisplay}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            {(showDatePicker || Platform.OS === 'ios') && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"} 
                    maximumDate={new Date()} 
                    onChange={handleDateChange}
                />
            )}
            {errors.birth_date && (
                <Text style={formStyles.errorText}>{errors.birth_date.message}</Text>
            )}
        </View>

        {/* NOUVEAU CHAMP : PERMISSION (Déroulant customisé) */}
        <View style={styles.inputGroup}>
            <Controller
                control={control}
                name="permission"
                rules={{ required: "Veuillez sélectionner une permission." }}
                render={({ field: { onChange, value } }) => (
                    <>
                        {/* Touche pour afficher/masquer les options */}
                        <TouchableOpacity
                            style={[
                                formStyles.input,
                                errors.permission && formStyles.inputError,
                                styles.selectInput,
                            ]}
                            onPress={() => setShowPermissionPicker(prev => !prev)}
                        >
                            <Text style={[styles.selectText, value ? {color: '#333'} : {color: '#888'}]}>
                                {permissionDisplay}
                            </Text>
                            <Ionicons 
                                name={showPermissionPicker ? "caret-up" : "caret-down"} 
                                size={16} 
                                color="#888"
                            />
                        </TouchableOpacity>

                        {/* Liste des options (s'affiche si showPermissionPicker est true) */}
                        {showPermissionPicker && (
                            <View style={styles.dropdown}>
                                {PERMISSION_OPTIONS.map((option) => (
                                    <TouchableOpacity
                                        key={option.value}
                                        style={styles.dropdownItem}
                                        onPress={() => selectPermission(onChange, option.value)}
                                    >
                                        <Text style={styles.dropdownItemText}>{option.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </>
                )}
            />
            {errors.permission && (
                <Text style={formStyles.errorText}>{errors.permission.message}</Text>
            )}
        </View>

        {/* Téléphone (phone) */}
        <Controller
          control={control}
          name="phone"
          rules={{ 
            required: "Le numéro de téléphone est requis.",
            pattern: {
                value: /^\+?[0-9]{6,15}$/,
                message: "Format de téléphone invalide (Ex: +33612345678).",
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[formStyles.input, errors.phone && formStyles.inputError]}
              placeholder="Numéro de Téléphone"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
              autoCapitalize="none"
            />
          )}
        />
        {errors.phone && <Text style={formStyles.errorText}>{errors.phone.message}</Text>}

        {/* Mot de passe */}
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

        {/* Confirmer le mot de passe */}
        <Controller
          control={control}
          name="confirmPassword"
          rules={{ 
            required: "La confirmation du mot de passe est requise.", 
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


        {/* Bouton de Soumission */}
        <TouchableOpacity
          style={[formStyles.button, styles.registerButton, loading && formStyles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)} 
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

// Styles spécifiques au RegistrationForm (Ajout de inputGroup, dateInput, et styles pour le select)
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
    inputGroup: {
        marginBottom: 10,
    },
    dateInput: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    // Styles pour le Dropdown Customisé
    selectInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 15,
    },
    selectText: {
        fontSize: 16,
        color: "#333",
        flex: 1,
        paddingLeft: 0, // Déjà géré par formStyles.input
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
        marginTop: 4,
        // Elevation pour Android, shadow pour iOS
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    dropdownItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dropdownItemText: {
        fontSize: 16,
        color: '#333',
    },
});

export default RegistrationForm;
