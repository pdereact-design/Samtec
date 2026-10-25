import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export default function CustomTextInput({
  label,
  error,
  style,
  secureTextEntry,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = Boolean(secureTextEntry);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          secureTextEntry={isPassword && !showPassword}
          style={[styles.input, isPassword && styles.passwordInput, style]}
          placeholderTextColor="#98A2B3"
        />

        {isPassword && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword((previous) => !previous)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#667085"
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  label: {
    color: "#344054",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  inputContainer: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    height: 51,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 11,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    color: "#101828",
    fontSize: 14,
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeButton: {
    position: "absolute",
    right: 0,
    width: 48,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "#D92D20",
    fontSize: 12,
    marginTop: 5,
  },
});
