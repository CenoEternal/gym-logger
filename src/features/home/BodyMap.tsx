import Body from "react-muscle-highlighter";
import { useAppSelector } from "../../app/hooks";
import { muscleMap } from "./muscleMap";

// hoe meer getrained hoe donkerder
const INTENSITY_COLORS = ["#ffd9c7", "#ffab84", "#ff6b35", "#a8340c"];

const BodyMap = () => {
    const workouts = useAppSelector((state) => state.schedules.workouts);

    const volumePerMuscle: Record<string, number> = {};

    workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
            const volume = exercise.sets.reduce((sum, set) => sum + set.kg * set.reps, 0);
            exercise.muscle.forEach((name) => {
                const slug = muscleMap[name];
                if (slug) {
                    volumePerMuscle[slug] = (volumePerMuscle[slug] ?? 0) + volume;
                }
            });
        });
    });

    const maxVolume = Math.max(...Object.values(volumePerMuscle), 1);

    const data = Object.entries(volumePerMuscle).map(([slug, volume]) => ({
        slug: slug as never,
        intensity: Math.ceil((volume / maxVolume) * INTENSITY_COLORS.length),
    }));

    return (
        <div className="c-bodymap">
            <Body data={data} colors={INTENSITY_COLORS} side="front" gender="male" scale={0.8} />
            <Body data={data} colors={INTENSITY_COLORS} side="back" gender="male" scale={0.8} />
        </div>
    );
};

export default BodyMap;