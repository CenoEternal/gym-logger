import { type Exercise } from "./getExercises";

const IMAGE_BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";

type Props = {
    exercise: Exercise;
    onClose: () => void;
};

const ExerciseDetail = ({exercise, onClose}: Props) => {
    return (
        <div className="c-detail">
            <button type="button" className="c-button" onClick={onClose}>Terug</button>

            <h3>{exercise.name}</h3>
            {exercise.images.map((image) => (
                <img key={image} src={IMAGE_BASE + image} alt={exercise.name} width="100%" height="auto" />
            )
        )}
<p>Spieren: {exercise.muscle.join(", ")}</p>
<p>Materiaal: {exercise.equipment}</p>

<ol>
    {exercise.instructions.map((step) => (
        <li key={step}>{step}</li>
    ))}
</ol>
</div>
);
};

export default ExerciseDetail;