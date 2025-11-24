import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  inputError: {
    borderColor: "#f00", // Bordure rouge si erreur
    borderWidth: 2,
  },
  errorText: {
    color: "#f00",
    marginBottom: 10,
    fontSize: 12,
    marginTop: -15, // Remonte le message pour qu'il soit plus près du champ
  },
  button: {
    backgroundColor: "#CC6E31",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#CC6E31",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "#a0c7ff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  inputGroup: {
        marginBottom: 15, // Espacement entre les champs
    },
});
