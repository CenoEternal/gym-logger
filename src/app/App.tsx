import { useEffect, useState } from "react";
import Exercises from "../features/exercises/Exercises";
import Home from "../features/home/Home";
import Profile from "../features/profile/Profile";
import { useAppSelector } from "./hooks";
import Schedules from "../features/workout/Schedules";


export default function App() {
    const [tab, setTab] = useState("workout")
    const sets = useAppSelector((state) => state.workout.sets);

    useEffect(() => {
        localStorage.setItem("sets", JSON.stringify(sets));
    }, [sets]);

    return (
        <main className="p-app">
            <h1>Gym logger</h1>
        <div className="p-app__content">
            {tab === "home" && <Home />}
            {tab === "workout" && <Schedules />}
            {tab === "workout" && <Exercises />}
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
