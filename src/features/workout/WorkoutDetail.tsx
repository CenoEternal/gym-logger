import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useExerciseCatalog } from "../exercises/useExerciseCatalog";
import { AddExerciseToWorkout } from "./ScheduleSlice";
import WorkoutExerciseRow from "./WorkoutExerciseRow";
import ExerciseDetail from "../exercises/ExerciseDetail";
import { type Exercise } from "../exercises/getExercises";

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
if (detailExercise) {
    return <ExerciseDetail exercise={detailExercise} onClose={() => setDetailExercise(null)} />;
}
                  
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
        </div>
    );
};

export default WorkoutDetail;