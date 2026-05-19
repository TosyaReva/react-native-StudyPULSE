# React Native — StudyPulse (Навігація & API)

Цей репозиторій містить виконання домашнього завдання з проектування навігаційної структури та інтеграції з REST API (Supabase) у застосунку React Native.

## 🎬 Демонстрація навігації

![Navigation Demo iOS](./screenshots/navigation-ios.gif)

---

## 📡 Інтеграція з API (Supabase)

Демонстрація завантаження списку категорій з бази даних через Axios:

![Categories API Fetching Demo](./screenshots/CategoriesAPI.gif)

---

## 🗺 Навігаційна структура

```
App
└── StackNavigator
    ├── SplashScreen              (вхідний екран, replace → HOME)
    └── DrawerNavigator (HOME)
        ├── TabNavigator
        │   ├── HomeScreen        (головний екран)
        │   └── CategoriesScreen  (список категорій)
        └── ActiveCategoryScreen  (деталі категорії, route.params)
```

| Тип навігації      | Де використовується                      |
| ------------------ | ---------------------------------------- |
| `Stack.Navigator`  | Кореневий контейнер + перехід до деталей |
| `Tab.Navigator`    | Головна / Категорії                      |
| `Drawer.Navigator` | Бокове меню застосунку                   |

### Передача даних між екранами

- `CategoriesScreen → ActiveCategoryScreen` через `navigation.navigate(SCREENS.ACTIVE_CATEGORY, { ...task })`
- `ActiveCategoryScreen` отримує дані через `route.params`

---

## 📱 Скриншоти компонентів

**Android:**

![Components](./screenshots/Components.webp)
![Categories List](./screenshots/CategoriesList.webp)

**iOS:**

![Components IOS](./screenshots/ComponentsIOS.webp)
![Categories List IOS](./screenshots/CategoriesListIOS.webp)

---

## 🌍 Управління станом (Context API та Redux)

**Перемикач теми (Context API) та Управління категоріями (Redux Toolkit):**

- Демонстрація роботи світлої/темної теми, яка керується через глобальний Context API.
- Робота з категоріями (завантаження та додавання) реалізована через Redux (`createAsyncThunk` + Supabase).

![Redux Categories Demo](./screenshots/ReduxCategories.gif)

---

## 🛠 Реалізовані компоненти

У проекті виділено та створено наступні ключові компоненти (`src/components/`):

| Компонент      | Опис                                                               |
| -------------- | ------------------------------------------------------------------ |
| `Button`       | Кастомна кнопка (`Pressable` + градієнт через `GradientContainer`) |
| `CategoryItem` | Картка категорії з `DonutBar` прогрес-індикатором                  |
| `CategoryList` | Прокручуваний список (`FlatList`)                                  |
| `SearchInput`  | Поле пошуку (`TextInput`)                                          |
| `Stat`         | Статистика з векторними іконками (`react-native-vector-icons`)     |
| `Container`    | Обгортка з нативними тінями (`Platform.select`)                    |
| `RadioButton`  | Кнопка вибору з градієнтним бордером (`GradientBorder`)            |
| `Logo`         | Адаптивне зображення (`useWindowDimensions`)                       |

---

## ✨ Особливості реалізації

### Інтеграція з API (Supabase)

- **Кастомний бекенд:** Використання Supabase REST API для збереження та отримання категорій і фокус-сесій.
- **Клієнт Axios:** Налаштований інстанс `axios` (`src/api/client.js`) з передачею API-ключів.
- **Стан та завантаження:** Обробка станів завантаження (`ActivityIndicator`) та помилок мережі.
- **Динамічний UI:** Рендеринг іконок та кольорів категорій з бази даних.
- **Локальний пошук:** Миттєва фільтрація завантажених категорій без зайвих запитів.

### Архітектура та Навігація

- **Модульність:** Навігаційні стеки та API запити рознесені у власні директорії (`src/navigations/`, `src/api/`).
- **Константи екранів:** Унікальні ідентифікатори екранів та навігаторів (`DRAWER_ROOT`, `TAB_ROOT` тощо) для уникнення колізій імен.
- **Передача параметрів:** `navigation.navigate()` + `route.params`.
- **Стилізація навігації:** `headerShown: false`, кастомні анімації (`CardStyleInterpolators`).
- **replace замість navigate:** `SplashScreen` видаляється зі стеку після переходу.
- **Адаптивність:** `useWindowDimensions`, `Platform.select()`, `useSafeAreaInsets`.
- **Чистота коду:** Кольори та назви екранів винесені у константи.

---

## 🚀 Оптимізація та продуктивність

### Анімації

- Використано `react-native-reanimated` для створення плавної анімації масштабування (`scale`) при натисканні на `CategoryItem` та інші клікабельні елементи екрану. Анімація використовує `withSpring` для природної взаємодії, а логіку інкапсульовано в кастомний хук `useScaleAnimation`.

![Плавні анімації](./screenshots/animation.gif)
### Оптимізація ререндерів

- **React.memo:** Компонент `CategoryItem` обгорнуто в `React.memo`, щоб уникнути зайвих перемалювань при оновленні списку.
- **useCallback & useMemo:** В `CategoryList` функції-обробники (`handleOnPress`, `renderItem`) обгорнуто в `useCallback`, а стилі – в `useMemo`. Це вирішує поширену проблему продуктивності `FlatList`, коли інлайн-функції спричиняють ререндер усіх елементів.

### Аналіз бандлу

Проведено аналіз розміру бандлу за допомогою `react-native-bundle-visualizer`. Важких або непотрібних залежностей (наприклад, `moment`, `lodash`) не виявлено, всі встановлені пакети є оптимальними та необхідними для роботи. Заміна не проводилась, оскільки бандл вже оптимізований. Частина `[unmapped]` становить типові для React Native ~20% і відноситься до внутрішнього рантайму Metro Bundler.

![Аналіз бандлу](./screenshots/bundle_visualizer.png)

---

_Домашнє завдання виконано в рамках курсу по React Native._
