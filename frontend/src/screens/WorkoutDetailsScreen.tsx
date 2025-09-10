import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import CheckBox from 'react-native-check-box';

type WorkoutDetailsScreenRouteProp = RouteProp<RootStackParamList, 'WorkoutDetails'>;
type WorkoutDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WorkoutDetails'>;

interface Props {
  route: WorkoutDetailsScreenRouteProp;
  navigation: WorkoutDetailsScreenNavigationProp;
}

export default function WorkoutDetailsScreen({ route, navigation }: Props) {
  const { workoutName, sets, reps, unit } = route.params;
  const [completedSets, setCompletedSets] = useState<boolean[]>(new Array(sets).fill(false));

  const toggleSet = (setIndex: number) => {
    const newCompletedSets = [...completedSets];
    newCompletedSets[setIndex] = !newCompletedSets[setIndex];
    setCompletedSets(newCompletedSets);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.workoutName}>{workoutName}</Text>
        <Text style={styles.setsReps}>{sets} sets x {reps} {unit}</Text>
        
        <View style={styles.setsContainer}>
          <Text style={styles.setsTitle}>Sets</Text>
          {Array.from({ length: sets }, (_, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.setItem, completedSets[index] && styles.setItemCompleted]}
              onPress={() => toggleSet(index)}
            >
              <View style={styles.setContent}>
                <Text style={[styles.setNumber, completedSets[index] && styles.setTextCompleted]}>
                  Set {index + 1}
                </Text>
                <Text style={[styles.setReps, completedSets[index] && styles.setTextCompleted]}>
                  {reps} {unit}
                </Text>
              </View>
              <CheckBox
                isChecked={completedSets[index]}
                onClick={() => toggleSet(index)}
                checkBoxColor="#2563EB"
                checkedCheckBoxColor="#2563EB"
                uncheckedCheckBoxColor="#D1D5DB"
              />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Coach Notes</Text>
          <Text style={styles.instructionsText}>
            Coach notes for {workoutName.toLowerCase()} will be added here. 
            This is a placeholder for future coaching guidance and tips.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 20,
  },
  workoutName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  setsReps: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  setsContainer: {
    marginBottom: 24,
  },
  setsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  setItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  setItemCompleted: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
  },
  setContent: {
    flex: 1,
  },
  setNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  setReps: {
    fontSize: 14,
    color: '#6B7280',
  },
  setTextCompleted: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  instructionsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
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
  instructionsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
});
