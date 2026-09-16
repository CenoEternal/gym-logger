import { useEffect, useState } from "react";

import Home from "../features/home/Home";
import Profile from "../features/profile/Profile";
import { useAppSelector } from "./hooks";
import Schedules from "../features/workout/Schedules";


export default function App() {
    const [tab, setTab] = useState("workout")
    const scheduleState = useAppSelector((state) => state.schedules);
    const profileState = useAppSelector((state) => state.profile);
    useEffect(() => {
        localStorage.setItem("schedules", JSON.stringify(scheduleState));
    }, [scheduleState]);
    
    useEffect(() => {
        localStorage.setItem("profile", JSON.stringify(profileState));
    }, [profileState]);

    return (
        <main className="p-app">
            <h1>Gym logger</h1>
        <div className="p-app__content">
            {tab === "home" && <Home />}
            {tab === "workout" && <Schedules />}
            {tab === "profile" && <Profile />}
            </div>
            <nav className="s-tab-bar">
                <button type="button" className={`s-tab-bar__button ${tab === "home" ? "s-tab-bar__button--active" : ""}`} onClick={() => setTab("home")}>Home</button>
                <button type="button" className={`s-tab-bar__button ${tab === "workout" ? "s-tab-bar__button--active" : ""}`} onClick={() => setTab("workout")}>Workout</button>
                <button type="button" className={`s-tab-bar__button ${tab === "profile" ? "s-tab-bar__button--active" : ""}`} onClick={() => setTab("profile")}>Profile</button>
            </nav>
        </main>
    );
}
