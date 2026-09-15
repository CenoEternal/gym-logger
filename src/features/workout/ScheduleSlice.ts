import { createSlice } from "@reduxjs/toolkit";

type Schedule = {
    id: string;
    name: string;
};

type ScheduleState = {
    schedules: Schedule[];
    workouts: Workout[];
};

type LoggedSet = {
    id: number;
    kg: number;
    reps: number;
};
type WorkoutExercise = {
    exerciseId: string;
    name: string;
    muscle: string[];
    images: string[];
    sets: LoggedSet[];
};

type Workout = {
    id: string;
    scheduleId: string;
    name: string;
    exercises: WorkoutExercise[];
};

const loadState = (): ScheduleState => {
    const saved = localStorage.getItem("schedules");
    if (!saved) {
        return { schedules: [], workouts: [] };
    }
    return JSON.parse(saved);
};

const initialState: ScheduleState = loadState();

const scheduleSlice = createSlice({
    name: "schedules",
    initialState,
    reducers: {
        CreateSchedule: (state, action) => {
            state.schedules.push(action.payload);
        },
        DeleteSchedule: (state, action) => {
            state.schedules = state.schedules.filter((s) => s.id !== action.payload);
        },
        CreateWorkout: (state, action) => {
            state.workouts.push(action.payload);
        },
        DeleteWorkout: (state, action) => {
            state.workouts = state.workouts.filter((w) => w.id !== action.payload);
        },
        AddExerciseToWorkout: (state, action) => {
            const workout = state.workouts.find((w) => w.id === action.payload.workoutId);
            if (workout) {
                workout.exercises.push(action.payload.exercise);
            }
        },
        RemoveExerciseFromWorkout: (state, action) => {
            const workout = state.workouts.find((w) => w.id === action.payload.workoutId);
            if (workout) {
                workout.exercises = workout.exercises.filter(
                    (e) => e.exerciseId !== action.payload.exerciseId
                );
            }
        },
        AddSetToExercise: (state, action) => {
            const workout = state.workouts.find((w) => w.id === action.payload.workoutId);
            const exercise = workout?.exercises.find((e) => e.exerciseId === action.payload.exerciseId);
            if (exercise) {
                exercise.sets.push(action.payload.set);
            }
        },
        RemoveSetFromExercise: (state, action) => {
            const workout = state.workouts.find((w) => w.id === action.payload.workoutId);
            const exercise = workout?.exercises.find((e) => e.exerciseId === action.payload.exerciseId);
            if (exercise) {
                exercise.sets = exercise.sets.filter((s) => s.id !== action.payload.setId);
            }
        },
    },
});

export const { CreateSchedule, DeleteSchedule, CreateWorkout, DeleteWorkout, AddExerciseToWorkout, RemoveExerciseFromWorkout, AddSetToExercise, RemoveSetFromExercise } = scheduleSlice.actions;
export default scheduleSlice.reducer;