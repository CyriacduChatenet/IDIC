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
import EventService from "../../services/event.service";

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

const CreateEventForm = ({ navigation }: CreateEventFormProps) => {
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState<"date" | null>(null);

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
        { text: "Non", style: "cancel" },
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

  const selectedDateValue = control._fields.date
    ? (control._fields.date as any)._f.value
    : new Date();
  const dateDisplay = selectedDateValue
    ? `${selectedDateValue.toLocaleDateString()} ${selectedDateValue.toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      )}`
    : "Sélectionnez date et heure";

  const handlePickerOpen = () => setShowPicker("date");
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowPicker(null);
    if (selectedDate) setValue("date", selectedDate, { shouldValidate: true });
  };

  const renderInput = (
    name: keyof Omit<CreateEventFormData, "date">,
    label: string,
    keyboardType: "default" | "numeric" = "default",
    multiline: boolean = false
  ) => (
    <View style={styles.inputGroup} key={name}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={{ required: `${label} est requis.` }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              multiline && styles.textArea,
              errors[name] && styles.inputError,
            ]}
            placeholder={label}
            placeholderTextColor="#AAA"
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
        <Text style={styles.errorText}>{errors[name]?.message}</Text>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {renderInput("name", "Nom de l'événement")}
        {renderInput("description", "Description", "default", true)}

        {/* Date Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date et Heure</Text>
          <Controller
            control={control}
            name="date"
            rules={{ required: "La date et l'heure sont requises." }}
            render={() => (
              <>
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={handlePickerOpen}
                >
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color="#CC6E31"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ color: selectedDateValue ? "#111" : "#AAA" }}>
                    {dateDisplay}
                  </Text>
                </TouchableOpacity>
                {showPicker && (
                  <DateTimePicker
                    value={selectedDateValue || new Date()}
                    mode="datetime"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    is24Hour={true}
                    onChange={handleDateChange}
                  />
                )}
              </>
            )}
          />
          {errors.date && (
            <Text style={styles.errorText}>{errors.date.message}</Text>
          )}
        </View>

        {renderInput("address", "Adresse")}
        {renderInput("team_size", "Taille de l'équipe / Max. Participants", "numeric")}

        {/* Boutons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            disabled={loading}
          >
            <Text style={styles.cancelText}>Annuler</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>Créer</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateEventForm;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    width: "100%",
    alignSelf: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    fontSize: 16,
    color: "#111",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#FF3B30",
    borderWidth: 1,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 13,
    marginTop: 3,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#CC6E31",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#CC6E31",
  },
  submitButton: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#CC6E31",
    alignItems: "center",
  },
  submitText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
