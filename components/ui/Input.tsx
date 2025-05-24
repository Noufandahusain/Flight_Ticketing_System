import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import Theme from '@/constants/Theme';
import Colors from '@/constants/Colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export default function Input({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  startIcon,
  endIcon,
  fullWidth = true,
  ...props
}: InputProps) {
  return (
    <View style={[styles.container, fullWidth && styles.fullWidth, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={[
        styles.inputContainer,
        error ? styles.inputError : null,
        props.editable === false && styles.inputDisabled
      ]}>
        {startIcon && <View style={styles.startIcon}>{startIcon}</View>}
        <TextInput
          style={[
            styles.input,
            startIcon && styles.inputWithStartIcon,
            endIcon && styles.inputWithEndIcon,
            inputStyle,
          ]}
          placeholderTextColor={Colors.light.textTertiary}
          {...props}
        />
        {endIcon && <View style={styles.endIcon}>{endIcon}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: Colors.light.text,
    fontFamily: Theme.typography.fontFamily.bodyMedium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Colors.light.surface,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: Colors.light.text,
    fontSize: 16,
    fontFamily: Theme.typography.fontFamily.body,
  },
  inputWithStartIcon: {
    paddingLeft: 8,
  },
  inputWithEndIcon: {
    paddingRight: 8,
  },
  startIcon: {
    marginLeft: 12,
  },
  endIcon: {
    marginRight: 12,
  },
  inputError: {
    borderColor: Colors.light.error,
  },
  inputDisabled: {
    backgroundColor: Colors.light.borderLight,
    opacity: 0.7,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 12,
    marginTop: 4,
    fontFamily: Theme.typography.fontFamily.body,
  },
});