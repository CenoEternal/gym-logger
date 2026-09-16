import { useEffect,useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AddSetToExercise, RemoveSetFromExercise, RemoveExerciseFromWorkout } from "./ScheduleSlice";

type LoggedSet = {
    id: number;
    kg: number;
    reps: number;
};

type props = {
    workoutId: string;
    exerciseId: string;
    name: string;
    sets: LoggedSet[];
    onOpenDetail: () => void;
};

const WorkoutExerciseRow = ({ workoutId, exerciseId, name, sets, onOpenDetail }: props) => {
    const dispatch = useAppDispatch();
    const logs = useAppSelector((state) => state.schedules.logs);
    const lastLogged = [...logs]
    .reverse()
    .flatMap((log) => log.exercises)
    .find((e) => e.exerciseId === exerciseId)
    ?.sets.at(-1);
    const lastSet = sets[sets.length - 1] ?? lastLogged;
    const [kg, setKg] = useState(lastSet ? String(lastSet.kg) : "");
    const [reps, setReps] = useState(lastSet ? String(lastSet.reps) : "");
    const [restSeconds, setRestSeconds] = useState(0);

    

    useEffect(() => {
        if (restSeconds <= 0) {
            return;
        }
        const timer = setTimeout(() => setRestSeconds(restSeconds - 1), 1000);
        return () => clearTimeout(timer);
    }, [restSeconds]);

    return (
        <div className="c-logged">
            <button type="button" className="c-button c-button--ghost" onClick={onOpenDetail}>
                {name}
            </button>

            {sets.map((set, index) => (
                <div key={set.id} className="c-logged__set">
                    <button type="button" className="c-button c-button--ghost" onClick={onOpenDetail}>
                        Set {index + 1}: {set.kg} kg x {set.reps} reps
                    </button>
                    <button type="button" className="c-button c-button--ghost" onClick={() => dispatch(RemoveSetFromExercise({ workoutId, exerciseId, setId: set.id }))}>
                        Weg
                    </button>
                    </div>

            ))}
    {restSeconds > 0 && (
        <div className="c-timer">
        <p className="c-timer__value">{restSeconds}</p>
        <div className="c-timer__track">
        <div className="c-timer__bar" style={{ width: `${(restSeconds / 90) * 100}%`}}/>
        </div>
        </div>
    )}
       <input className="c-input" type="text" value={kg} onChange={(e) => setKg(e.target.value)} placeholder="gewicht" />
       <input className="c-input" type="text" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="reps" />

       <button type="button" className="c-button c-button--primary" onClick={() => {
        const kgNumber = Number(kg);
        const repsNumber = Number(reps);
        if (kg === "" || reps === "" || Number.isNaN(kgNumber) || Number.isNaN(repsNumber)) {
            return;
        }
        dispatch(AddSetToExercise({
            workoutId, exerciseId, set: { id: Date.now(), kg: kgNumber, reps: repsNumber },
        }));
        setRestSeconds(90);
    }}>Log set</button>

    <button type="button" className="c-button c-button--ghost" onClick={() => dispatch(RemoveExerciseFromWorkout({ workoutId, exerciseId}))}>Oefening verwijderen</button>
    </div>
    );
};

export default WorkoutExerciseRow;