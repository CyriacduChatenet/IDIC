import React, { useEffect, useState } from "react";
import { View, Button, Alert, ActivityIndicator } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import Constants from 'expo-constants';

const PaymentView = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const initializePaymentSheet = async () => {
      try {
        const response = await fetch(
          `${
            Constants.manifest?.extra?.EXPO_PUBLIC_API_URL || "http://localhost:8000"
          }/api/v1/stripe/intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 5000, currency: "eur" }), // 50.00 €
          }
        );

        const data = await response.json();
        const secret = data.client_secret || data.clientSecret; // ✅ correction ici
        console.log("✅ Received clientSecret:", secret);

        if (!secret) {
          console.error("❌ Missing clientSecret from backend:", data);
          Alert.alert("Error", "Failed to initialize payment sheet.");
          return;
        }

        setClientSecret(secret);

        const { error } = await initPaymentSheet({
          paymentIntentClientSecret: secret, // ✅ use correct variable
          merchantDisplayName: "SportApp",
          returnURL: "sportapp://payment-return", // ✅ important sur iOS
          allowsDelayedPaymentMethods: true,
        });

        if (error) {
          console.warn("⚠️ initPaymentSheet error:", error);
          Alert.alert("Error", error.message);
        } else {
          console.log("✅ Payment sheet initialized.");
        }
      } catch (error) {
        console.error("❌ Error initializing payment sheet:", error);
        Alert.alert("Error", "Could not set up payment sheet.");
      }
    };

    initializePaymentSheet();
  }, []);

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      Alert.alert("Error", "Payment sheet not ready yet.");
      return;
    }

    setLoading(true);
    const { error } = await presentPaymentSheet();
    setLoading(false);

    if (error) {
      Alert.alert("Payment failed", error.message);
      console.warn("❌ Payment error:", error);
    } else {
      Alert.alert("Success", "Payment complete!");
      console.log("✅ Payment succeeded");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button
          title="Pay €50.00"
          onPress={openPaymentSheet}
          disabled={!clientSecret}
        />
      )}
    </View>
  );
};

export default PaymentView;
