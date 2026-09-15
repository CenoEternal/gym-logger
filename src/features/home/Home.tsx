import { useAppSelector } from "../../app/hooks";
import BodyMap from "./BodyMap";

const Home = () => {
  const workouts = useAppSelector((state) => state.schedules.workouts);
  const allSets = workouts.flatMap((w) => w.exercises.flatMap((e) => e.sets));
  const totalVolume = allSets.reduce((sum, set) => sum + set.kg * set.reps, 0);
  const setsPerMuscle: Record<string, number> = {};

workouts.forEach((workout) =>
    workout.exercises.forEach((exercise) =>
        exercise.muscle.forEach((name) => {
            setsPerMuscle[name] = (setsPerMuscle[name] ?? 0) + exercise.sets.length;
        })
    )
);

const muscleRanking = Object.entries(setsPerMuscle).sort((a, b) => b[1] - a[1]);

    return (
        <div>
          <h2>Home</h2>
      
          <div className="c-stat">
            <p className="c-stat__label">Sets vandaag</p>
            <p className="c-stat__value">{allSets.length}</p>
          </div>
      
          <div className="c-stat">
            <p className="c-stat__label">Totaal volume</p>
            <p className="c-stat__value">{totalVolume} kg</p>
          </div>
        <div className="c-stat">
    <p className="c-stat__label">Sets per spier</p>
{muscleRanking.map(([muscle, count]) => (
    <p key={muscle}>{muscle}: {count}</p>
))}
</div>
<BodyMap />
      </div>
      );

};

export default Home;