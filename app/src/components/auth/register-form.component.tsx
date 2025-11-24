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
  Image,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

import AuthService from "../../services/auth.service";
import { formStyles } from "../../styles/form.style";
import { Permission } from "../../enum/permission.enum";
import { RegisterDto } from "../../types/auth.type";

const PERMISSION_OPTIONS = [
  { label: "Joueur", value: `${Permission.Player}` },
  { label: "Club", value: `${Permission.Club}` },
  { label: "Sponsor", value: `${Permission.Sponsor}` },
];

interface RegistrationFormProps {
  navigation: any;
}

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  phone: string;
  permission: string;
}

const RegistrationForm = ({ navigation }: RegistrationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
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
      permission: `${Permission.Player}`,
    },
  });

  const passwordValue = watch("password");
  const selectedDate = watch("birth_date");
  const selectedPermission = watch("permission");

  const dateDisplay = selectedDate
    ? selectedDate.toLocaleDateString("fr-FR")
    : "Sélectionnez votre date de naissance";

  const permissionDisplay =
    PERMISSION_OPTIONS.find((opt) => opt.value === selectedPermission)?.label ||
    "Choisissez votre rôle";

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android" || event.type === "set") {
      setShowDatePicker(false);
    }
    if (date) {
      setValue("birth_date", date, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: RegisterForm) => {
    const { confirmPassword, birth_date, permission, ...rest } = data;

    const apiData: RegisterDto = {
      ...rest,
      birth_date: birth_date.toISOString().split("T")[0],
      permission: permission,
    };

    setLoading(true);

    try {
      await authService.register(apiData);
      Alert.alert("Succès", "Inscription réussie !");
      navigation.navigate("Payment");
    } catch {
      Alert.alert("Erreur", "Impossible de finaliser l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>

      <View style={styles.container}>
        {/* PRENOM */}
        <Text style={styles.label}>Prénom</Text>
        <Controller
          control={control}
          name="first_name"
          rules={{ required: "Le prénom est requis." }}
          render={({ field }) => (
            <TextInput
              style={[styles.input, errors.first_name && styles.inputError]}
              placeholder="Prénom"
              placeholderTextColor="#999"
              {...field}
            />
          )}
        />
        {errors.first_name && (
          <Text style={styles.error}>{errors.first_name.message}</Text>
        )}

        {/* NOM */}
        <Text style={styles.label}>Nom</Text>
        <Controller
          control={control}
          name="last_name"
          rules={{ required: "Le nom est requis." }}
          render={({ field }) => (
            <TextInput
              style={[styles.input, errors.last_name && styles.inputError]}
              placeholder="Nom"
              placeholderTextColor="#999"
              {...field}
            />
          )}
        />
        {errors.last_name && (
          <Text style={styles.error}>{errors.last_name.message}</Text>
        )}

        {/* USERNAME */}
        <Text style={styles.label}>Nom d'utilisateur</Text>
        <Controller
          control={control}
          name="username"
          rules={{ required: "Ce champ est requis." }}
          render={({ field }) => (
            <TextInput
              style={[styles.input, errors.username && styles.inputError]}
              placeholder="Votre pseudo"
              placeholderTextColor="#999"
              autoCapitalize="none"
              {...field}
            />
          )}
        />
        {errors.username && (
          <Text style={styles.error}>{errors.username.message}</Text>
        )}

        {/* EMAIL */}
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "L'email est requis.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email invalide",
            },
          }}
          render={({ field }) => (
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="exemple@email.com"
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="email-address"
              {...field}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        {/* DATE DE NAISSANCE */}
        <Text style={styles.label}>Date de naissance</Text>
        <TouchableOpacity
          style={[styles.input, styles.rowInput]}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#CC6E31"
            style={{ marginRight: 8 }}
          />
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              color: selectedDate ? "#333" : "#999",
            }}
          >
            {dateDisplay}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            maximumDate={new Date()}
            onChange={handleDateChange}
          />
        )}

        {errors.birth_date && (
          <Text style={styles.error}>{errors.birth_date.message}</Text>
        )}

        {/* PERMISSION */}
        <Text style={styles.label}>Rôle</Text>
        <TouchableOpacity
          style={[styles.input, styles.rowInput]}
          onPress={() => setShowPermissionPicker((prev) => !prev)}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              color: selectedPermission ? "#333" : "#999",
            }}
          >
            {permissionDisplay}
          </Text>
          <Ionicons
            name={showPermissionPicker ? "caret-up" : "caret-down"}
            size={18}
            color="#999"
          />
        </TouchableOpacity>

        {showPermissionPicker && (
          <View style={styles.dropdown}>
            {PERMISSION_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={styles.dropdownItem}
                onPress={() => {
                  setValue("permission", opt.value, { shouldValidate: true });
                  setShowPermissionPicker(false);
                }}
              >
                <Text style={styles.dropdownText}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {errors.permission && (
          <Text style={styles.error}>{errors.permission.message}</Text>
        )}

        {/* TELEPHONE */}
        <Text style={styles.label}>Téléphone</Text>
        <Controller
          control={control}
          name="phone"
          rules={{ required: "Téléphone requis." }}
          render={({ field }) => (
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              placeholder="+33 6 12 34 56 78"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              {...field}
            />
          )}
        />
        {errors.phone && (
          <Text style={styles.error}>{errors.phone.message}</Text>
        )}

        {/* PASSWORD */}
        <Text style={styles.label}>Mot de passe</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Mot de passe requis." }}
          render={({ field }) => (
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="••••••••"
              placeholderTextColor="#999"
              secureTextEntry
              {...field}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}

        {/* CONFIRM PASSWORD */}
        <Text style={styles.label}>Confirmer mot de passe</Text>
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Confirmation requise.",
            validate: (value) =>
              value === passwordValue ||
              "Les mots de passe ne correspondent pas",
          }}
          render={({ field }) => (
            <TextInput
              style={[
                styles.input,
                errors.confirmPassword && styles.inputError,
              ]}
              placeholder="••••••••"
              placeholderTextColor="#999"
              secureTextEntry
              {...field}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword.message}</Text>
        )}

        {/* SUBMIT */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Créer mon compte</Text>
          )}
        </TouchableOpacity>

        {/* LOGIN LINK */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Déjà un compte ? Se connecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegistrationForm;

/* ---------------- STYLES EPURÉS (APPLE STYLE) ---------------- */

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111",
  },

  container: {
    width: "100%",
    alignSelf: "center",
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
    marginBottom: 8,
  },

  rowInput: {
    flexDirection: "row",
    alignItems: "center",
  },

  inputError: {
    borderWidth: 1,
    borderColor: "#ff5a5f",
  },

  error: {
    color: "#ff5a5f",
    fontSize: 13,
    marginTop: 4,
  },

  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 4,
    overflow: "hidden",
  },

  dropdownItem: {
    padding: 14,
  },

  dropdownText: {
    fontSize: 16,
    color: "#333",
  },

  button: {
    backgroundColor: "#CC6E31",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  loginLink: {
    marginTop: 20,
    textAlign: "center",
    color: "#CC6E31",
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
