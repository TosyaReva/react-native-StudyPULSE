# StudyPulse

[Українська версія](./README.md)

StudyPulse is a React Native app for planning study or work focus sessions. The project started as an MVP with activity categories, and the final version turns it into a more complete productivity app with authentication, offline guest mode, a Pomodoro timer, statistics, theme switching and data settings.

## Demo

- Google Drive demo video: `https://drive.google.com/file/d/1ulQB5PAchO3BxGQuBPNNN52ObsulkzLg/view?usp=sharing`

## Final screenshots

These placeholders are reserved for the final screenshots before project submission.

| Screen                          | Screenshot                                                           |
| ------------------------------- | -------------------------------------------------------------------- |
| Splash, auth and guest entry    | ![Splash](./screenshots/finalScreenshots/final-splash-auth.webp)     |
| Home with active focus session  | ![Home](./screenshots/finalScreenshots/final-home-active-focus.webp) |
| Categories list                 | [Categories](./screenshots/finalScreenshots/final-categories.webp)   |
| Pomodoro focus screen           | ![Pomodoro](./screenshots/finalScreenshots/final-pomodoro.webp)      |
| Statistics day/week/month       | ![Statistics](./screenshots/finalScreenshots/final-statistics.webp)  |
| Settings, export, reset, logout | ![Settings](./screenshots/finalScreenshots/final-settings.webp)      |

## Existing demo media

The previous demo files remain in the repository as historical media and as extra proof of navigation, lists, Redux and animation work.

![Navigation demo](./screenshots/navigation-ios.gif)

![Categories API demo](./screenshots/CategoriesAPI.gif)

![Redux categories demo](./screenshots/ReduxCategories.gif)

![Animation demo](./screenshots/animation.gif)

## Main features

- Email/password registration and login through Supabase Auth.
- User-owned data with Supabase tables and Row Level Security.
- Offline guest mode with local MMKV storage when the user chooses guest mode or Supabase is unavailable.
- Categories for focus areas with custom title, icon and color.
- Pomodoro timer with 15, 25, 50 and custom minute duration.
- One active focus session at a time, stored in Redux so the timer is not reset when the user leaves the screen.
- Start, pause, resume and stop actions for focus tracking.
- Session saving with `completed` and `stopped` statuses.
- Home screen with current day progress, active session state and quick focus start.
- Statistics for day, week and month: total focused time, session count, chart data, category split, average session, top category, best focus hour and streak.
- Settings screen with dark/light mode, CSV export through the native share sheet, reset data and logout.

## Final task compliance

### 1. Existing app analysis

The original MVP focused on category navigation and displaying study activities. The final version keeps the core use case - choose a category and focus on it - but adds the missing product layer around it: authentication, personal data, offline use, timer logic and statistics.

Key user scenarios:

- A new user registers and receives default categories.
- A returning user logs in and sees only their own categories and focus sessions.
- A user without network access can continue as a guest and keep data locally.
- A user starts a Pomodoro session, pauses or resumes it, and stops it when finished.
- A user reviews focus statistics by day, week or month.
- A user exports or resets their own data from settings.

Implemented expansion areas:

- Backend and data ownership through Supabase Auth, user-linked rows and RLS.
- Offline-first guest flow with MMKV.
- Pomodoro and statistics as the main new productivity features.

### 2. Functionality expansion

The main new functionality is the Pomodoro flow. The active category screen now supports duration selection, timer progress, pause/resume, stop and session persistence. The Home screen also understands whether an active focus session already exists and opens it instead of starting a duplicate.

The backend was expanded from mock/public data to authenticated user data. Categories and focus sessions are now connected to a specific Supabase user. Guest mode uses local storage and does not sync with Supabase, which keeps the MVP behavior predictable.

### 3. State management decision

The project uses both Redux Toolkit and Context API because they solve different problems:

- Redux Toolkit stores app data that is shared across many screens: auth mode, current user, categories, focus sessions and the single active focus timer.
- Theme Context stores UI theme state because it is lightweight, global and directly consumed by visual components.

This split keeps business data predictable through Redux actions/selectors, while theme switching stays simple and easy to use from any component.

### 4. Component structure and UX

The app is organized into reusable components, screens, navigators, Redux slices, helpers, API functions and local storage helpers. Examples of reusable components include `Button`, `ButtonTimer`, `CategoryItem`, `CategoryList`, `DonutBar`, chart components, `RegistrationForm`, `ThemeToggle`, `Stat` and `UserAvatar`.

Navigation is built with:

- Stack navigation for app entry and detail screens.
- Drawer navigation for Home and Settings.
- Bottom tabs for Home, Categories and Statistics.
- Route params for opening a selected category in the active focus screen.

The UX was improved with a clearer settings screen, dynamic Home state, active focus persistence, dark/light mode and separated authenticated/guest flows.

## Architecture

```text
App
|-- ThemeProvider
|-- Redux Provider
|-- StackNavigation
    |-- SplashScreen
    |-- DrawerNavigation
        |-- Home tabs
        |   |-- HomeScreen
        |   |-- CategoriesScreen
        |   |-- StatisticsScreen
        |-- SettingsScreen
    |-- ActiveCategoryScreen
    |-- AddNewCategoryScreen
|-- FocusTimerHost
```

Data flow:

```text
Authenticated mode:
React Native UI -> Redux thunks -> Supabase client -> Supabase tables with RLS

Guest mode:
React Native UI -> Redux thunks -> local repository functions -> MMKV
```

Important folders:

- `src/api` - Supabase client and app data API.
- `src/storage` - MMKV guest storage and Supabase auth storage adapter.
- `src/redux/slices` - auth, categories, focus and sessions state.
- `src/helpers` - statistics and CSV helpers.
- `src/navigations` - Stack, Drawer and Tab navigation.
- `src/screens` - main app screens.
- `src/components` - reusable UI components.

## Backend and database

Main tables:

- `profiles` - one profile per Supabase Auth user.
- `categories` - focus categories owned by `user_id`.
- `focus_sessions` - Pomodoro/focus history owned by `user_id` and optionally linked to a category.

Security:

- Row Level Security is enabled for user-owned tables.
- Authenticated users can access only their own rows.
- Guest mode never writes to Supabase and stores data only on the device.

Seed data:

- Test user: `test@studypulse.local`
- Password: `Password123!`

## Setup

Install dependencies:

```bash
npm install
```

Install iOS pods:

```bash
cd ios
pod install --repo-update
cd ..
```

Start Metro:

```bash
npm start
```

Run iOS:

```bash
npm run ios
```

Run Android:

```bash
npm run android
```

## Quality checks

Current verified command:

```bash
npm run lint
```

Result: lint passes successfully.

## Final project notes

The final project satisfies the required categories:

- Functionality: auth, guest/offline mode, Pomodoro, statistics, settings actions.
- Modularity: screens, components, API layer, storage helpers, Redux slices and helpers are separated.
- State management: Redux Toolkit is used for app data, Theme Context is used for UI theme.
- Documentation: this README documents the implemented changes, decision logic, setup steps and screenshot placeholders.
