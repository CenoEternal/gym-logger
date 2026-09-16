import {combineReducers} from "@reduxjs/toolkit";
import scheduleReducer from "../features/workout/ScheduleSlice";
import profileReducer from "../features/profile/ProfileSlice";

const rootReducer = combineReducers({
    schedules: scheduleReducer,
    profile: profileReducer
})
export default rootReducer;