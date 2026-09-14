export type Exercise = {
    id: string;
    name:string;
    muscle:string[];
    secondaryMuscle:string[];
    equipment: string;
    instructions:string[];
    images:string[];
};

export const getExercises = () => {
    return [
        { id: "1", name: "Push-ups", muscle: ["chest", "triceps", "shoulders"], secondaryMuscle: [], equipment: "", instructions: [], images: [] },
        { id: "2", name: "Behind the body bicep curl", muscle: ["biceps"], secondaryMuscle: [], equipment: "", instructions: [], images: [] },
        { id: "3", name: "Squats", muscle: ["legs", "glutes", "core"], secondaryMuscle: [], equipment: "", instructions: [], images: [] },
        { id: "4", name: "Lunges", muscle: ["legs", "glutes", "core"], secondaryMuscle: [], equipment: "", instructions: [], images: [] },
        { id: "5", name: "Deadlifts", muscle: ["back", "biceps", "shoulders"], secondaryMuscle: [], equipment: "", instructions: [], images: [] },
        { id: "6", name: "Bench Press", muscle: ["chest", "triceps", "shoulders"], secondaryMuscle: [], equipment: "", instructions: [], images: [] },
        { id: "7", name: "Overhead Press", muscle: ["shoulders", "triceps", "core"], secondaryMuscle: [], equipment: "", instructions: [], images: [] },
        { id: "8", name: "Pull-ups", muscle: ["back", "biceps", "shoulders"], secondaryMuscle: [], equipment: "", instructions: [], images: [] },
        { id: "9", name: "Gooning", muscle: ["forearms"], secondaryMuscle: [], equipment: "", instructions: [], images: [] },
        { id: "10", name: "Jestering", muscle: ["aura"], secondaryMuscle: [], equipment: "", instructions: [], images: [] },
    ]
}