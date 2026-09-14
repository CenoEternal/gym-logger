import { type Exercise } from "./getExercises";

const API_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"

export const fetchExercises = async (): Promise<Exercise[]> => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        muscle: item.primaryMuscles,
        secondaryMuscle: item.secondaryMuscles,
        equipment: item.equipment,
        instructions: item.instructions,
        images: item.images,
    }));
}