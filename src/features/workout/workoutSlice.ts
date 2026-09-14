import { createSlice } from "@reduxjs/toolkit";

type Set = {
    id: number;
    name: string;
    kg: number;
    reps: number;
};

type WorkoutState = {
    sets: Set [];
};

const loadSets = (): Set[] => {
    const saved = localStorage.getItem("sets");
    if (!saved) {
        return [];

    }
    return JSON.parse(saved);
};

const initialState: WorkoutState = {
    sets: loadSets(),
};

const workoutSlice = createSlice({
    name: "workout",
    initialState,
    reducers: {
        addSet: (state, action) => {
            state.sets.push(action.payload);
        },
        removeSet: (state, action) => {
            state.sets = state.sets.filter((s) => s.id !== action.payload);
        },
    },
});

export const { addSet, removeSet } = workoutSlice.actions;
export default workoutSlice.reducer;