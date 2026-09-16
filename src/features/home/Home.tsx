import { useAppSelector } from "../../app/hooks";

const dateKey = (d: Date) => d.toLocaleDateString("en-CA");

const addDays = (d: Date, amount: number) => {
    const copy = new Date(d);
    copy.setDate(copy.getDate() + amount);
    return copy;
};

const mondayOf = (d: Date) => {
    const copy = new Date(d);
    copy.setHours(0, 0, 0, 0);
    const weekday = copy.getDay();
    const diff = weekday === 0 ? -6 : 1 - weekday;
    copy.setDate(copy.getDate() + diff);
    return copy;
};

const Home = () => {
    const logs = useAppSelector((state) => state.schedules.logs);
    const today = dateKey(new Date());
    const loggedDates = new Set(logs.map((log) => log.date));

    let cursor = today;
    if (!loggedDates.has(today)) {
        cursor = dateKey(addDays(new Date(), -1));
    }
    let streak = 0;
    while (loggedDates.has(cursor)) {
        streak += 1;
        cursor = dateKey(addDays(new Date(cursor), -1));
    }

    const weekStart = dateKey(mondayOf(new Date()));
    const weekSessions = logs.filter((log) => log.date >= weekStart).length;

    const sortedLogs = [...logs].sort((a, b) => a.id.localeCompare(b.id));
    const latestLog = sortedLogs[sortedLogs.length - 1];
    const olderLogs = sortedLogs.slice(0, -1);
    const oldMaxKg: Record<string, number> = {};
    olderLogs.forEach((log) =>
        log.exercises.forEach((exercise) =>
            exercise.sets.forEach((set) => {
                oldMaxKg[exercise.exerciseId] = Math.max(oldMaxKg[exercise.exerciseId] ?? 0, set.kg);
            })
        )
    );

    const newPrs: { name: string; kg: number }[] = [];
    latestLog?.exercises.forEach((exercise) => {
        const bestNow = exercise.sets.reduce((max, set) => Math.max(max, set.kg), 0);
        if (bestNow > (oldMaxKg[exercise.exerciseId] ?? 0)) {
            newPrs.push({ name: exercise.name, kg: bestNow });
        }
    });

    return (
        <div>
            <h2>Home</h2>
            <div className="c-stat">
                <p className="c-stat__label">Streak</p>
                <p className="c-stat__value">{streak} {streak === 1 ? "dag" : "dagen"}</p>
            </div>
            <div className="c-stat">
                <p className="c-stat__label">Deze week</p>
                <p className="c-stat__value">{weekSessions} {weekSessions === 1 ? "sessie" : "sessies"}</p>
            </div>
            {newPrs.length > 0 && (
                <div className="c-stat c-stat--pr">
                    <p className="c-stat__label">Nieuwe PR</p>
                    {newPrs.map((pr) => (
                        <p key={pr.name} className="c-stat__value">
                            {pr.name} {pr.kg} kg
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;