import { createSlice } from "@reduxjs/toolkit";

type ProfileState = {
    weight: string;
    height: string;
    gender: string;
};

const loadState = (): ProfileState => {
    const saved = localStorage.getItem("profile");
    if (!saved) {
        return { weight: "", height: "", gender: "" };
    }
    return JSON.parse(saved);
};

const initialState: ProfileState = loadState();

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        SetWeight: (state, action) => {
            state.weight = action.payload;
        },
        SetHeight: (state, action) => {
            state.height = action.payload;
        },
        SetGender: (state, action) => {
            state.gender = action.payload;
        },
    },
});

export const { SetWeight, SetHeight, SetGender } = profileSlice.actions;
export default profileSlice.reducer;
