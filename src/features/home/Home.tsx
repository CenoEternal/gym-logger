import { useAppSelector } from "../../app/hooks";

const Home = () => {
    const sets = useAppSelector((state) => state.workout.sets);
    const totalVolume = sets.reduce((sum, set) => sum + set.kg * set.reps, 0);

    return (
        <div>
          <h2>Home</h2>
      
          <div className="c-stat">
            <p className="c-stat__label">Sets vandaag</p>
            <p className="c-stat__value">{sets.length}</p>
          </div>
      
          <div className="c-stat">
            <p className="c-stat__label">Totaal volume</p>
            <p className="c-stat__value">{totalVolume} kg</p>
          </div>
        </div>
      );

};

export default Home;