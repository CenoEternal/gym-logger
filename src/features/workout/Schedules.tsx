import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CreateSchedule, DeleteSchedule, CreateWorkout, DeleteWorkout } from "./ScheduleSlice";
import WorkoutDetail from "./WorkoutDetail";
import Logbook from "./Logbook";

const Schedules = () => {
    const dispatch = useAppDispatch();
    const schedules = useAppSelector((state) => state.schedules.schedules);
    const [newScheduleName, setNewScheduleName] = useState("");
    const [openScheduleId, setOpenScheduleId] = useState<string | null>(null);
    const [newWorkoutName, setNewWorkoutName] = useState("");
    const [openWorkoutId, setOpenWorkoutId] = useState<string | null>(null);
    const [pane, setPane] = useState("logbook");
    const workouts = useAppSelector((state) => state.schedules.workouts);
    if (openWorkoutId) {
        return <WorkoutDetail workoutId={openWorkoutId} onClose={() => setOpenWorkoutId(null)} />;
    }

    if (openScheduleId) {
        const schedule = schedules.find((s) => s.id === openScheduleId);
        const scheduleWorkouts = workouts.filter((w) => w.scheduleId === openScheduleId);
    
        return (
            <div>
                <button type="button" className="c-button" onClick={() => setOpenScheduleId(null)}>
                    Terug
                </button>
                <h2>{schedule?.name}</h2>
    
                <label htmlFor="new-workout">Nieuwe workout</label>
                <input
                    id="new-workout"
                    className="c-input"
                    type="text"
                    value={newWorkoutName}
                    onChange={(e) => setNewWorkoutName(e.target.value)}
                />
                <button
                    type="button"
                    className="c-button c-button--primary"
                    onClick={() => {
                        if (newWorkoutName.trim() === "") {
                            return;
                        }
                        dispatch(CreateWorkout({
                            id: String(Date.now()),
                            scheduleId: openScheduleId,
                            name: newWorkoutName.trim(),
                            exercises: [],
                        }));
                        setNewWorkoutName("");
                    }}
                >
                    Maken
                </button>
    
                {scheduleWorkouts.map((workout) => (
                    <div key={workout.id} className="c-exercise">
                        <button type="button" className="c-button c-button--ghost" onClick={() => setOpenWorkoutId(workout.id)}>
    {workout.name}
</button>
                        <button
                            type="button"
                            className="c-button c-button--ghost"
                            onClick={() => dispatch(DeleteWorkout(workout.id))}
                        >
                            Weghalen
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="c-pane">
                <button
                    type="button"
                    className={`c-pane__button${pane === "logbook" ? " c-pane__button--active" : ""}`}
                    onClick={() => setPane("logbook")}
                >
                    Logboek
                </button>
                <button
                    type="button"
                    className={`c-pane__button${pane === "schedules" ? " c-pane__button--active" : ""}`}
                    onClick={() => setPane("schedules")}
                >
                    Schema's
                </button>
            </div>
            {pane === "logbook" && <Logbook />}
            {pane === "schedules" && (
            <>
            <h2>Schedules</h2>

            <label htmlFor="new-schedule">Nieuwe Schema</label>
            <input id="new-schedule" className="c-input" type="text" value={newScheduleName} onChange={(e) => setNewScheduleName(e.target.value)} />
            <button type="button" className="c-button c-button--primary" onClick={() => {
                if (newScheduleName.trim() === "") {
                    return;
                }
                dispatch(CreateSchedule({ id: String(Date.now()), name: newScheduleName.trim() }));
                setNewScheduleName("");
            }}>Creëer</button>

            {schedules.map((schedule) => (
                <div key={schedule.id} className="c-exercise">
                    <button type="button" className="c-button c-button--ghost" onClick={() => setOpenScheduleId(schedule.id)}>
    {schedule.name}
</button>
                    <button type="button" className="c-button c-button--ghost" onClick={() => dispatch(DeleteSchedule(schedule.id))}
                    >Vernietigen</button>
                </div>
            ))}
            </>
            )}
        </div>
    );
};

export default Schedules;