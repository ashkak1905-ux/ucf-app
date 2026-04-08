import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const AppCard = ({ children }: { children: ReactNode }) => (
  <View style={styles.card}>{children}</View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: Colors.white, padding: 20, borderRadius: 16, marginVertical: 10, borderWidth: 1, borderColor: Colors.border },
});