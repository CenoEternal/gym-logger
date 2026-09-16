import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import BodyMap from "../home/BodyMap";
import { useExerciseCatalog } from "../exercises/useExerciseCatalog";
import ExerciseDetail from "../exercises/ExerciseDetail";
import { type Exercise } from "../exercises/getExercises";

const WEEKDAYS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

const dateKey = (d: Date) => d.toLocaleDateString("en-CA");

const mondayOf = (d: Date) => {
    const copy = new Date(d);
    copy.setHours(0, 0, 0, 0);
    const weekday = copy.getDay();
    const diff = weekday === 0 ? -6 : 1 - weekday;
    copy.setDate(copy.getDate() + diff);
    return copy;
};

const Logbook = () => {
    const logs = useAppSelector((state) => state.schedules.logs);
    const catalog = useExerciseCatalog();
    const [detailExercise, setDetailExercise] = useState<Exercise | null>(null);
    const today = dateKey(new Date());
    const [weekStart, setWeekStart] = useState(() => mondayOf(new Date()));
    const [selectedDate, setSelectedDate] = useState(today);

    const loggedDates = new Set(logs.map((log) => log.date));
    const dayLogs = logs.filter((log) => log.date === selectedDate);
    const allSets = dayLogs.flatMap((log) => log.exercises.flatMap((e) => e.sets));
    const totalVolume = allSets.reduce((sum, set) => sum + set.kg * set.reps, 0);
    const setsPerMuscle: Record<string, number> = {};

    dayLogs.forEach((log) =>
        log.exercises.forEach((exercise) =>
            exercise.muscle.forEach((name) => {
                setsPerMuscle[name] = (setsPerMuscle[name] ?? 0) + exercise.sets.length;
            })
        )
    );

    const muscleRanking = Object.entries(setsPerMuscle).sort((a, b) => b[1] - a[1]);

    const days = WEEKDAYS.map((_, index) => {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + index);
        return day;
    });

    const shiftWeek = (direction: number) => {
        const next = new Date(weekStart);
        next.setDate(weekStart.getDate() + direction * 7);
        setWeekStart(next);
    };

    return (
        <div>
            <h2>Logboek</h2>

            <div className="c-week">
                <button type="button" className="c-button c-button--ghost" onClick={() => shiftWeek(-1)}>
                    ←
                </button>
                <div className="c-week__days">
                    {days.map((day) => {
                        const key = dateKey(day);
                        const hasLog = loggedDates.has(key);
                        const isSelected = key === selectedDate;
                        return (
                            <button
                                key={key}
                                type="button"
                                className={`c-week__day${isSelected ? " c-week__day--selected" : ""}`}
                                onClick={() => setSelectedDate(key)}
                            >
                                <span>{WEEKDAYS[day.getDay() === 0 ? 6 : day.getDay() - 1]}</span>
                                <span>{day.getDate()}</span>
                                {hasLog && <span className="c-week__dot" />}
                            </button>
                        );
                    })}
                </div>
                <button type="button" className="c-button c-button--ghost" onClick={() => shiftWeek(1)}>
                    →
                </button>
            </div>

            <p className="c-stat__label">{selectedDate}</p>

            <div className="c-stat">
                <p className="c-stat__label">Sets</p>
                <p className="c-stat__value">{allSets.length}</p>
            </div>
            <div className="c-stat">
                <p className="c-stat__label">Volume</p>
                <p className="c-stat__value">{totalVolume} kg</p>
            </div>
            <div className="c-stat">
                <p className="c-stat__label">Sets per spier</p>
                {muscleRanking.length === 0 && <p>Niets gelogd op deze dag.</p>}
                {muscleRanking.map(([muscle, count]) => (
                    <p key={muscle}>
                        {muscle}: {count}
                    </p>
                ))}
            </div>

            <BodyMap date={selectedDate} />

            {dayLogs.map((log) => (
                <div key={log.id} className="c-stat">
                    <p className="c-stat__label">{log.workoutName}</p>
                    {log.exercises.map((e) => (
                        <button
                            key={e.exerciseId}
                            type="button"
                            className="c-button c-button--ghost"
                            onClick={() => {
                                const found = catalog.find((item) => item.id === e.exerciseId);
                                if (found) {
                                    setDetailExercise(found);
                                    return;
                                }
                                setDetailExercise({
                                    id: e.exerciseId,
                                    name: e.name,
                                    muscle: e.muscle,
                                    secondaryMuscle: [],
                                    equipment: "",
                                    instructions: [],
                                    images: e.images,
                                });
                            }}
                        >
                            {e.name}: {e.muscle.join(", ")}
                        </button>
                    ))}
                </div>
            ))}
            {detailExercise && (
                <ExerciseDetail exercise={detailExercise} onClose={() => setDetailExercise(null)} />
            )}
        </div>
    );
};

export default Logbook;
