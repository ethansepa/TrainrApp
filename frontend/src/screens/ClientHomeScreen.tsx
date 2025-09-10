import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WorkoutCard from '../components/WorkoutCard';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'ClientHome'>;
}

export default function ClientHomeScreen({ navigation }: Props) {
  // Sample workout data
  const sampleWorkouts = [
    { workoutName: 'Push Ups', sets: 3, reps: 12, unit: 'reps' },
    { workoutName: 'Squats', sets: 4, reps: 15, unit: 'reps' },
    { workoutName: 'Plank', sets: 3, reps: 30, unit: 'secs' },
  ];

  // Local state management for workout completion
  const [completedWorkouts, setCompletedWorkouts] = useState<boolean[]>(
    new Array(sampleWorkouts.length).fill(false)
  );

  const toggleWorkoutCompletion = (index: number) => {
    const newCompletedWorkouts = [...completedWorkouts];
    newCompletedWorkouts[index] = !newCompletedWorkouts[index];
    setCompletedWorkouts(newCompletedWorkouts);
  };

  // Check if all workouts are completed
  const allWorkoutsCompleted = completedWorkouts.every(completed => completed);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Workout</Text>
      {allWorkoutsCompleted && (
        <View style={styles.completionMessage}>
          <Text style={styles.completionText}>All Done for Today 💪</Text>
        </View>
      )}
      <ScrollView style={styles.workoutList} showsVerticalScrollIndicator={false}>
        {sampleWorkouts.map((workout, index) => (
          <WorkoutCard
            key={index}
            workoutName={workout.workoutName}
            sets={workout.sets}
            reps={workout.reps}
            unit={workout.unit}
            navigation={navigation}
            isCompleted={completedWorkouts[index]}
            onToggleCompletion={() => toggleWorkoutCompletion(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  completionMessage: {
    backgroundColor: '#D1FAE5',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  completionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065F46',
    textAlign: 'center',
  },
  workoutList: {
    flex: 1,
    paddingBottom: 20,
  },
});
