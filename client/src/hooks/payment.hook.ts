import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import Constants from 'expo-constants';

export const useStripePayment = (amount: number, currency: string = 'eur') => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializePaymentSheet = async () => {
      try {
        const response = await fetch(
          `${Constants.manifest?.extra?.EXPO_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/stripe/intent`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, currency }),
          }
        );

        const data = await response.json();
        const secret = data.client_secret || data.clientSecret;

        if (!secret) {
          console.error('❌ Missing clientSecret from backend:', data);
          Alert.alert('Error', 'Failed to initialize payment sheet.');
          return;
        }

        setClientSecret(secret);

        const { error } = await initPaymentSheet({
          paymentIntentClientSecret: secret,
          merchantDisplayName: 'SportApp',
          returnURL: 'sportapp://payment-return',
          allowsDelayedPaymentMethods: true,
        });

        if (error) {
          console.warn('⚠️ initPaymentSheet error:', error);
          Alert.alert('Error', error.message);
        } else {
          console.log('✅ Payment sheet initialized.');
        }
      } catch (err) {
        console.error('❌ Error initializing payment sheet:', err);
        Alert.alert('Error', 'Could not set up payment sheet.');
      }
    };

    initializePaymentSheet();
  }, [amount, currency]);

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      Alert.alert('Error', 'Payment sheet not ready yet.');
      return;
    }

    setLoading(true);
    const { error } = await presentPaymentSheet();
    setLoading(false);

    if (error) {
      Alert.alert('Payment failed', error.message);
      console.warn('❌ Payment error:', error);
    } else {
      Alert.alert('Success', 'Payment complete!');
      console.log('✅ Payment succeeded');
    }
  };

  return { loading, openPaymentSheet, clientSecret };
};
