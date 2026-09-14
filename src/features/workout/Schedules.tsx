import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CreateSchedule, DeleteSchedule } from "./ScheduleSlice";

const Schedules = () => {
    const dispatch = useAppDispatch();
    const schedules = useAppSelector((state) => state.schedules.schedules);
    const [newScheduleName, setNewScheduleName] = useState("");

    return (
        <div>
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
                    <p>{schedule.name}</p>
                    <button type="button" className="c-button c-button--ghost" onClick={() => dispatch(DeleteSchedule(schedule.id))}
                    >Vernietigen</button>
                </div>
            ))}
        </div>
    );
};

export default Schedules;