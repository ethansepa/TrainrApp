import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

interface WorkoutCardProps {
  workoutName: string;
  sets: number;
  reps: number;
  unit: string;
  navigation: StackNavigationProp<RootStackParamList, 'ClientHome'>;
  isCompleted: boolean;
  onToggleCompletion: () => void;
}

export default function WorkoutCard({ workoutName, sets, reps, unit, navigation, isCompleted, onToggleCompletion }: WorkoutCardProps) {
  const handleCheckboxPress = () => {
    onToggleCompletion();
  };

  const handleCardPress = () => {
    navigation.navigate('WorkoutDetails', {
      workoutName,
      sets,
      reps,
      unit,
    });
  };

  return (
    <TouchableOpacity 
      style={[styles.card, isCompleted && styles.cardCompleted]} 
      onPress={handleCardPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={[styles.workoutName, isCompleted && styles.textCompleted]}>{workoutName}</Text>
          <Text style={[styles.setsReps, isCompleted && styles.textCompleted]}>{sets} sets x {reps} {unit}</Text>
        </View>
        <TouchableOpacity onPress={handleCheckboxPress} style={styles.checkboxContainer}>
          <CheckBox
            isChecked={isCompleted}
            onClick={handleCheckboxPress}
            checkBoxColor="#2563EB"
            checkedCheckBoxColor="#2563EB"
            uncheckedCheckBoxColor="#D1D5DB"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardCompleted: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  setsReps: {
    fontSize: 14,
    color: '#6B7280',
  },
  textCompleted: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  checkboxContainer: {
    padding: 4,
  },
});
