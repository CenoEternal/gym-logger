import { useEffect, useState } from "react";
import { getExercises, type Exercise } from "./getExercises";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addSet, removeSet } from "../workout/workoutSlice";
import { fetchExercises } from "./fetchExercises";
import ExerciseDetail from "./ExerciseDetail";


const Exercises = () => {
    const exercises = getExercises();
    const [customExercises, setCustomExercises] = useState<Exercise[]>(() => {
        const saved = localStorage.getItem("customExercises");
        if (!saved) {
            return [];
        }
        return JSON.parse(saved);
    });
    const [apiExercises, setApiExercises] = useState<Exercise[]>([]);
    const [search, setSearch] = useState("");
    const [detailExercise, setDetailExercise] = useState<Exercise | null>(null);
    const [newName, setNewName] = useState("");

    const allExercises = [...customExercises, ...exercises, ...apiExercises];
    const visibleExercises =
    search.trim() === ""
        ? []
        : allExercises
              .filter((exercise) =>
                  exercise.name.toLowerCase().includes(search.toLowerCase())
              )
              .slice(0, 20);
    
    useEffect(() => {
        localStorage.setItem("customExercises", JSON.stringify(customExercises));
    }, [customExercises]);
    useEffect(() => {
        fetchExercises().then((data) => setApiExercises(data));
    }, []);

    const [selectedName, setSelectedName] = useState("");
    const [kg, setKg] = useState("");
    const [reps, setReps] = useState("");
    const dispatch = useAppDispatch();
    const sets = useAppSelector((state) => state.workout.sets);
    const totalVolume = sets.reduce((sum, set) => sum + set.kg * set.reps, 0);
    const exerciseNames =  sets
    .map((set) => set.name)
    .filter((name, index, all) => all.indexOf(name) === index);


    const handleSelect = (name: string) => {
        setSelectedName(name);
        
        const lastSet = sets.findLast((set) => set.name === name);

        if (lastSet) {
            setKg(String(lastSet.kg));
            setReps(String(lastSet.reps));
        } else  {
            setKg("");
            setReps("");
        }
    };


    return (
        <div>
            {detailExercise && (
                <ExerciseDetail exercise={detailExercise} onClose={() => setDetailExercise(null)} />
            )}
            <h2>Oefeningen</h2>
            <p>Gekozen: {selectedName}</p>
            <label htmlFor="kg">Kg</label>
            <input className="c-input"
            id="kg"
            type="text"
            value={kg}
            onChange={(e) => setKg(e.target.value)}
            />
            <label htmlFor="reps">Reps</label>
            <input className="c-input"
            id="reps"
            type="text"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            />
            <button className="c-button c-button--primary" type="button"
            disabled={!selectedName}
            onClick={() => {
                const newSet = {id: Date.now(), name: selectedName, kg: Number(kg), reps: Number(reps)};
                if (Number.isNaN(newSet.kg) || Number.isNaN(newSet.reps)) {
                    return;
                }
                dispatch(addSet(newSet));
                setKg("");
                setReps("");
            }
            }>
                log set 
            </button>
            <h3>Gelogd</h3>
            <p>Totaal volume: {totalVolume} kg</p>
{exerciseNames.map((name) => (
    <div key={name} className="c-logged">
        <h4>{name}</h4>
        {sets
        .filter((set) => set.name === name)
        .map((set, index) => (
            <div key={set.id} className="c-logged__set">
                <p>Set {index + 1}: {set.kg} kg x {set.reps} reps</p>
            <button className="c-button c-button--ghost" type="button" onClick={() => dispatch(removeSet(set.id))}
            >Verwijder</button>
            </div>
        ))}
        
    </div>
))}
<label htmlFor="new-exercise">Nieuwe oefening</label>
<input
  id="new-exercise"
  className="c-input"
  type="text"
  value={newName}
  onChange={(e) => setNewName(e.target.value)}
/>
<button
  type="button"
  className="c-button"
  onClick={() => {
    if (newName.trim() === "") {
      return;
    }
    setCustomExercises([
      ...customExercises,
      { id: String(Date.now()), name: newName.trim(), muscle: [], secondaryMuscle: [], equipment: "", instructions: [], images: [] },
    ]);
    setNewName("");
  }}
>
  Toevoegen
</button>
<label htmlFor="search">Zoek oefening</label>
<input id="search" className="c-input" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
{visibleExercises.map((exercise) => (
  <div key={exercise.id} className={`c-exercise ${selectedName === exercise.name ? "c-exercise--selected" : ""}`}>
    <button type="button" className="c-button c-button--ghost" onClick={() => setDetailExercise(exercise)}>
        {exercise.name}
    </button>
    <button className="c-button" type="button" onClick={() => handleSelect(exercise.name)}>
      Kies
    </button>
    {customExercises.some((custom) => custom.id === exercise.id) && (
        <button className="c-button c-button--ghost" type="button" onClick={() =>
            setCustomExercises(customExercises.filter((custom) => custom.id !== exercise.id))
        }
        >Weghalen</button>
        )}
    </div>
))}
</div>
);

};

export default Exercises;