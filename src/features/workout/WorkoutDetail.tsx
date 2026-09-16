import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useExerciseCatalog } from "../exercises/useExerciseCatalog";
import WorkoutExerciseRow from "./WorkoutExerciseRow";
import ExerciseDetail from "../exercises/ExerciseDetail";
import { type Exercise } from "../exercises/getExercises";
import { AddExerciseToWorkout, FinishWorkout } from "./ScheduleSlice";

type Props = {
    workoutId: string;
    onClose: () => void;
};

const WorkoutDetail = ({ workoutId, onClose }: Props) => {
    const dispatch = useAppDispatch();
    const workout = useAppSelector((state) =>
        state.schedules.workouts.find((w) => w.id === workoutId)
    );
    const catalog = useExerciseCatalog();
    const [search, setSearch] = useState("");
    const results =
        search.trim() === ""
            ? []
            : catalog
                  .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
                  .slice(0, 20);
const [detailExercise, setDetailExercise] = useState<Exercise | null>(null);
const [done, setDone] = useState(false);
                  
    return (
        <div>
            <button type="button" className="c-button" onClick={onClose}>
                Terug
            </button>
            <h2>{workout?.name}</h2>

            {workout?.exercises.map((exercise) => (
    <WorkoutExerciseRow
        key={exercise.exerciseId}
        workoutId={workoutId}
        exerciseId={exercise.exerciseId}
        name={exercise.name}
        sets={exercise.sets}
        onOpenDetail={() => {
            const found = catalog.find((e) => e.id === exercise.exerciseId);
            if (found) {
                setDetailExercise(found);
                return;
            }
            setDetailExercise({
                id: exercise.exerciseId,
                name: exercise.name,
                muscle: exercise.muscle,
                secondaryMuscle: [],
                equipment: "",
                instructions: [],
                images: exercise.images,
            });
        }}
    />
))}

            <label htmlFor="add-exercise">Oefening zoeken</label>
            <input
                id="add-exercise"
                className="c-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            /> 

            {results.map((exercise) => (
                <div key={exercise.id} className="c-exercise">
                    <button type="button" className="c-button c-button--ghost" onClick={() => setDetailExercise(exercise)}>
            {exercise.name}
        </button>
                    <button
                        type="button"
                        className="c-button"
                        onClick={() => {
                            dispatch(AddExerciseToWorkout({
                                workoutId,
                                exercise: {
                                    exerciseId: exercise.id,
                                    name: exercise.name,
                                    muscle: exercise.muscle,
                                    images: exercise.images,
                                    sets: [],
                                },
                            }));
                            setSearch("");
                        }}
                    >
                        Toevoegen
                    </button>
                </div>
            ))}
            {detailExercise && (
    <ExerciseDetail exercise={detailExercise} onClose={() => setDetailExercise(null)} />
)}
<button
    type="button"
    className="c-button c-button--primary"
    disabled={done}
    onClick={() => {
        dispatch(FinishWorkout(workoutId));
        setDone(true);
        window.setTimeout(() => onClose(), 900);
    }}
>
    Workout afronden
</button>
{done && <div className="c-toast">Opgeslagen</div>}
        </div>
    );
};

export default WorkoutDetail;