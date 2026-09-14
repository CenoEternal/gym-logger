import {combineReducers} from "@reduxjs/toolkit";
import workoutReducer from "../features/workout/workoutSlice";
import scheduleReducer from "../features/workout/ScheduleSlice";

const rootReducer = combineReducers({
    workout: workoutReducer,
    schedules: scheduleReducer,
})
export default rootReducer;