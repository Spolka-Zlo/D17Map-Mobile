import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import TimePicker from './TimePicker';

export default function TimeSlotPicker ()  {
    const startHour = 7;
    const endHour = 22
    

  return (
    <ScrollView style={styles.container}>
      <Text>Select time slots</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  timeSlot: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  selectedSlot: {
    backgroundColor: '#ffa500',
  },
  slotText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

