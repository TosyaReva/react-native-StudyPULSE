# Аналіз та створення компонентів у React Native

Цей репозиторій містить виконання домашнього завдання зі створення та стилізації базових компонентів у React Native.

## 📱 Скриншоти компонентів

**Android:**
![Components](./screenshots/Components.webp)
![Categories List](./screenshots/CategoriesList.webp)

**IOS:**
![Components IOS](./screenshots/ComponentsIOS.webp)
![Categories List IOS](./screenshots/CategoriesListIOS.webp)

## 🛠 Реалізовані компоненти

У проекті виділено та створено наступні ключові компоненти (знаходяться в `src/components/`):

1. **`Button`** — кастомна кнопка, стилізована з використанням `Pressable`.
2. **`CategoryItem`** — картка категорії (використано `View`, `Text`, `GradientContainer`).
3. **`CategoryList`** — прокручуваний список категорій на основі `FlatList`.
4. **`SearchInput`** — поле вводу для пошуку (`TextInput`).
5. **`Stat`** — компонент статистики з використанням векторних іконок.
6. **`Container`** — обгортка з адаптивними тінями (`Platform.select`).
7. **`Logo`** — компонент зображення з адаптивною шириною (`useWindowDimensions`).

## ✨ Особливості реалізації

- **Модульність:** Кожен компонент знаходиться у власному файлі.
- **Пропси:** Компоненти приймають динамічні дані через пропси (`title`, `progress`, `icon` тощо).
- **Стилізація:** Використано `StyleSheet.create` та Flexbox для позиціонування.
- **Адаптивність:** Використано `useWindowDimensions` для обчислення ширини та `Platform.select()` для нативної тіні на iOS/Android.
- **Чистота коду:** Кольори винесено у константи (`src/constants/colors.js`), щоб уникнути "магічних чисел".

---

_Домашнє завдання виконано в рамках курсу по React Native._
