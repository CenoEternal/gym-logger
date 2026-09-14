import { createSlice } from "@reduxjs/toolkit";

type Schedule = {
    id: string;
    name: string;
};

type ScheduleState = {
    schedules: Schedule[];
};

const initialState: ScheduleState = {
    schedules: [],
};

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
    },
});

export const { CreateSchedule, DeleteSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;