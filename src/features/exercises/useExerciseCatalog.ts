import { useEffect, useState } from "react";
import { getExercises, type Exercise } from "./getExercises";
import { fetchExercises } from "./fetchExercises";

export const useExerciseCatalog = () => {
    const [apiExercises, setApiExercises] = useState<Exercise[]>([]);
    const [customExercises] = useState<Exercise[]>(() => {
        const saved = localStorage.getItem("customExercises");
        if (!saved) {
            return [];
        }
        return JSON.parse(saved);
    });

    useEffect(() => {
        fetchExercises().then((data) => setApiExercises(data));
    }, []);

    return [...customExercises, ...getExercises(), ...apiExercises]};
