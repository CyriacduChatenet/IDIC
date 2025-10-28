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
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

// Assurez-vous que ce chemin est correct
import { formStyles } from "../../styles/form.style";
import EventService from "../../services/event.service";

// --- TYPES ET INTERFACES (inchangées) ---
interface CreateEventFormData {
  name: string;
  date: Date;
  description: string;
  address: string;
  team_size: string;
}

interface CreateEventFormProps {
  navigation: any;
}

// --- LOGIQUE DU COMPOSANT (inchangée) ---

const CreateEventForm = ({ navigation }: CreateEventFormProps) => {
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState<"date" | "time" | null>(null);

  const eventService = new EventService();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateEventFormData>({
    defaultValues: {
      name: "",
      date: new Date(),
      description: "",
      address: "",
      team_size: "",
    },
  });

  const onSubmit = async (data: CreateEventFormData) => {
    if (loading) return;
    setLoading(true);

    try {
      await eventService.create({
        name: data.name,
        date: data.date,
        description: data.description,
        address: data.address,
        phone: "0123456789",
        email: "test@test.com",
        team_size: +data.team_size,
        club: "m3g6vgzl61fiq1354w1mt08j",
      });

      Alert.alert("Succès", "Événement créé avec succès !");
      reset();
      navigation.goBack();
    } catch (error) {
      console.error("Erreur :", error);
      Alert.alert(
        "Erreur",
        "Impossible de créer l'événement. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      "Annuler la création",
      "Êtes-vous sûr de vouloir annuler et perdre les modifications ?",
      [
        {
          text: "Non",
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => {
            reset();
            navigation.goBack();
          },
        },
      ]
    );
  };

  // --- FONCTION DE RENDU D'INPUT SIMPLE (inchangée) ---
  const renderInput = (
    name: keyof Omit<CreateEventFormData, "date">,
    placeholder: string,
    keyboardType: "default" | "email-address" | "numeric" = "default",
    multiline: boolean = false
  ) => (
    <View style={formStyles.inputGroup} key={name}>
      <Controller
        control={control}
        name={name}
        rules={{ required: `${placeholder} est requis.` }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              formStyles.input,
              multiline && styles.textArea,
              errors[name] && formStyles.inputError,
            ]}
            placeholder={placeholder}
            placeholderTextColor="#888"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
            textAlignVertical={multiline ? "top" : "center"}
          />
        )}
      />
      {errors[name] && (
        <Text style={formStyles.errorText}>{errors[name]?.message}</Text>
      )}
    </View>
  );

  // --- LOGIQUE ET RENDU DU DATE/TIME PICKER (inchangée) ---
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(null);
    }
    if (selectedDate) {
      setValue("date", selectedDate, { shouldValidate: true });
    }
  };

  const handlePickerOpen = () => {
    if (Platform.OS === "ios") {
      setShowPicker("date");
    } else {
      setShowPicker("date");
    }
  };

  const selectedDateValue = control._fields.date
    ? (control._fields.date as any)._f.value
    : new Date();
  const dateDisplay = selectedDateValue
    ? `${selectedDateValue.toLocaleDateString()} ${selectedDateValue.toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      )}`
    : "Sélectionnez date et heure";

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {renderInput("name", "Nom de l'événement")}
        {renderInput(
          "description",
          "Description de l'événement",
          "default",
          true
        )}

        {/* 3. Date et Heure (inchangée) */}
        <View style={formStyles.inputGroup}>
          <Controller
            control={control}
            name="date"
            rules={{ required: "La date et l'heure sont requises." }}
            render={() => (
              <>
                <TouchableOpacity
                  style={[
                    formStyles.input,
                    errors.date && formStyles.inputError,
                    styles.dateInput,
                  ]}
                  onPress={handlePickerOpen}
                >
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color="#007AFF"
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={{
                      color: selectedDateValue ? "#333" : "#888",
                      flex: 1,
                    }}
                  >
                    {dateDisplay}
                  </Text>
                </TouchableOpacity>

                {showPicker && (
                  <DateTimePicker
                    value={selectedDateValue || new Date()}
                    mode={"datetime"}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    is24Hour={true}
                    onChange={handleDateChange}
                  />
                )}
              </>
            )}
          />
          {errors.date && (
            <Text style={formStyles.errorText}>{errors.date.message}</Text>
          )}
        </View>

        {renderInput("address", "Adresse")}
        {renderInput(
          "team_size",
          "Taille de l'équipe / Max. Participants",
          "numeric"
        )}

        {/* 6. Boutons de Soumission et d'Annulation (STYLE AMÉLIORÉ) */}
        <View style={styles.buttonRow}>
          {/* Bouton Annuler (Secondaire : Bordure + Texte Bleu) */}
          <TouchableOpacity
            style={[
              formStyles.button, // Pour l'héritage du padding et borderRadius
              styles.cancelButton,
            ]}
            onPress={handleCancel}
            disabled={loading}
          >
            <Text style={styles.cancelText}>Annuler</Text>
          </TouchableOpacity>

          {/* Bouton Créer (Principal : Fond Bleu) */}
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
              <Text style={formStyles.buttonText}>Créer</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// --- STYLESHEET DU COMPOSANT ---

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 0,
  },
  container: {
    width: "100%",
    alignSelf: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 20,
  },
  submitButton: {
    flex: 1,
    marginLeft: 10,
    marginTop: 0,
  },
  // 💡 NOUVEAU STYLE ANNULER
  cancelButton: {
    flex: 1,
    marginRight: 10,
    marginTop: 25,
    marginBottom: 20,
    // Suppression du fond gris et utilisation d'une bordure
    backgroundColor: "transparent",
    borderWidth: 1.5, // Bordure légèrement plus épaisse pour la visibilité
    borderColor: "#007AFF", // Bordure de la couleur principale
  },
  // 💡 NOUVEAU TEXTE ANNULER (de la couleur principale)
  cancelText: {
    color: "#007AFF", // Texte de la couleur principale (Bleu)
    fontSize: 18,
    fontWeight: "bold",
  },
  textArea: {
    height: 100,
    paddingTop: 10,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default CreateEventForm;
