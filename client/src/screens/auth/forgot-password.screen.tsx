import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ForgotPasswordForm from '../../components/auth/forgot-password-form.component'; // Assurez-vous du bon chemin

const ForgotPasswordScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Passez la prop navigation au formulaire */}
      <ForgotPasswordForm navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
});

export default ForgotPasswordScreen;