# Gym Logger

A minimal, mobile-first gym workout logger built with React and Redux Toolkit.

![Gym Logger screenshot](docs/screenshot.png)

> **Note:** the UI is currently in Dutch.

## Features

- **Schedules & workouts** – create training schedules, add workouts to them and add exercises to each workout.
- **Set logging** – log weight (kg) and reps per set, with a 90-second rest timer after each set.
- **Finish workout** – complete a workout with a "saved" toast confirmation.
- **Logbook** – browse your training per day with a week strip: total sets, volume (kg), sets per muscle and a highlighted body map.
- **Exercise catalog** – search exercises from the open [free-exercise-db](https://github.com/yuhonas/free-exercise-db), with exercise details.
- **Home stats** – training streak, workouts this week and new personal records.
- **Profile** – weight, height and gender, with a calculated BMI.

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) + React Redux
- [Sass (SCSS)](https://sass-lang.com/)
- [react-muscle-highlighter](https://www.npmjs.com/package/react-muscle-highlighter) for the body map
- [Oxlint](https://oxc.rs/) for linting

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run preview  # preview the production build
```

## Privacy

All your data (schedules, logged sets, profile) is stored only in your browser's `localStorage`. There is no backend and no account; nothing is sent anywhere. The only network request is fetching the public exercise list.

## Exercise data

Exercise data comes from [yuhonas/free-exercise-db](https://github.com/yuhonas/free-exercise-db), loaded from
`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json`. Many thanks to its maintainers.

## Contributing

Issues and pull requests are welcome. Please keep changes small and focused, and make sure `npm run build` and `npm run lint` pass.

## License

[MIT](LICENSE) © 2026 Berke Yücedag
