import {combineReducers} from "@reduxjs/toolkit";
import scheduleReducer from "../features/workout/ScheduleSlice";

const rootReducer = combineReducers({
    schedules: scheduleReducer,
})
export default rootReducer;