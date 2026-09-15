import { useEffect,useState } from "react";
import { useAppDispatch } from "../../app/hooks";
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
};

const WorkoutExerciseRow = ({ workoutId, exerciseId, name, sets }: props) => {
    const dispatch = useAppDispatch();
    const lastSet = sets[sets.length - 1];
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
            <h4>{name}</h4>

            {sets.map((set, index) => (
                <div key={set.id} className="c-logged__set">
                    <p>Set {index + 1}: {set.kg} kg x {set.reps} reps</p>
                    <button type="button" className="c-button c-button--ghost" onClick={() => dispatch(RemoveSetFromExercise({ workoutId, exerciseId, setId: set.id }))}>
                        Weg
                    </button>
                    </div>

            ))}
            {restSeconds > 0 && (
    <p>Rust: {restSeconds}s</p>
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