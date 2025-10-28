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
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";

import { formStyles } from "../../styles/form.style";

interface CreateEventFormData {
  name: string;
  date: Date;
  description: string;
  address: string;
  teamSize: string;
}

interface CreateEventFormProps {
  navigation: any;
}

const CreateEventForm = ({ navigation }: CreateEventFormProps) => {
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateEventFormData>({
    defaultValues: {
      name: "",
      date: new Date(),
      description: "",
      address: "",
      teamSize: "",
    },
  });

  const onSubmit = async (data: CreateEventFormData) => {
    if (loading) return;
    setLoading(true);

    try {
      console.log("Données du formulaire :", data);
      Alert.alert("Succès", "Événement créé avec succès !");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erreur :", error);
      Alert.alert("Erreur", "Impossible de créer l'événement.");
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    name: keyof Omit<CreateEventFormData, "date">,
    placeholder: string,
    keyboardType?: "default" | "email-address" | "numeric"
  ) => (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ required: `${placeholder} est requis.` }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[formStyles.input, errors[name] && formStyles.inputError]}
            placeholder={placeholder}
            placeholderTextColor="#888"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType || "default"}
          />
        )}
      />
      {errors[name] && (
        <Text style={formStyles.errorText}>{errors[name]?.message}</Text>
      )}
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {renderInput("name", "Nom de l'événement")}

        <Controller
          control={control}
          name="date"
          rules={{ required: "La date et l'heure sont requises." }}
          render={({ field: { value } }) => (
            <>
              <TouchableOpacity
                style={[formStyles.input, errors.date && formStyles.inputError]}
                onPress={() => setShowDatePicker(!showDatePicker)}
              >
                <Text style={{ color: value ? "#000" : "#888" }}>
                  {value
                    ? `${value.toLocaleDateString()} ${value.toLocaleTimeString()}`
                    : "Sélectionnez date et heure"}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={value || new Date()}
                  mode="datetime"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  is24Hour={true}
                  onChange={(event, selectedDate) => {
                    if (Platform.OS === "android") {
                      setShowDatePicker(false);
                      if (event.type === "set" && selectedDate) {
                        setValue("date", selectedDate);
                      }
                    } else if (Platform.OS === "ios") {
                      if (selectedDate) setValue("date", selectedDate);
                    }
                  }}
                />
              )}
            </>
          )}
        />
        {errors.date && (
          <Text style={formStyles.errorText}>{errors.date.message}</Text>
        )}

        {renderInput("description", "Description")}
        {renderInput("address", "Adresse")}
        {renderInput("teamSize", "Taille de l'équipe", "numeric")}

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
            <Text style={formStyles.buttonText}>Créer l'événement</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  container: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  submitButton: {
    marginTop: 20,
  },
});

export default CreateEventForm;
