import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface Props { title: string; onPress: () => void; }

export const AppButton = ({ title, onPress }: Props) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: { backgroundColor: Colors.primary, padding: 15, borderRadius: 12, marginVertical: 8, alignItems: 'center', width: '100%' },
  text: { color: Colors.dark, fontWeight: 'bold', fontSize: 16 },
});