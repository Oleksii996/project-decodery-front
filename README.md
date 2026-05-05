# Лелека — Frontend

**Лелека** — це веб-застосунок для відстеження вагітності, який допомагає
користувачам спостерігати за своїм станом, емоціями та розвитком дитини щотижня.
Тут представлена frontend частина застосунку **Лелека**, створена студентами
курсу FullStack у школі GoIT для практики Next.js та командної роботи з
Git/GitHub.

## Основний функціонал

- Аутентифікація користувачів
- Управління профілем
- Відстеження поточного тижня вагітності
- CRUD (Create/Read/Update/Delete) для нотаток з важливими справами
- Нотатки про самопочуття
- Планування (замітки, цілі)
- Лог настрою
- Щоденні поради для мами
- Зміна кольору теми в залежності від статі малюка
- Інформація про розмір дитини на кожному етапі

## Технології

- Next.js
- React
- TypeScript
- CSS Modules
- Axios / Fetch API

## Запуск проєкту локально

```bash
# Клонувати репозиторій
git clone https://github.com/Oleksii996/project-decodery-front.git

# Перейти в папку
cd project-decodery-front

# Встановити залежності
npm install

# Запустити dev сервер
npm run dev
```

## ⚙️ Змінні середовища

Створити файл `.env.local` та додати:

```env
NEXT_PUBLIC_API_URL=
```

## Структура проєкту

```
project-decodery-front/
├── app/
│   ├── (auth)/
│   │   └── auth/
│   │       ├── login/
│   │       │     ├── error.tsx
│   │       │     ├── Page.module.css
│   │       │     └── page.tsx
│   │       ├── register/
│   │       │     ├── error.tsx
│   │       │     ├── Page.module.css
│   │       │     └── page.tsx
│   │       └── profile/edit/
│   │             ├── error.tsx
│   │             ├── page.tsx
│   │             └── layout.tsx
│   ├── (main)/
│   │   ├── diary/
│   │   │   ├── [entryId]/
│   │   │   │      ├── error.tsx
│   │   │   │      ├── Page.module.css
│   │   │   │      └── page.tsx
│   │   │   ├── error.tsx
│   │   │   └── page.tsx
│   │   ├── journey/
│   │   │   └── [weekNumber]/
│   │   │         ├── error.tsx
│   │   │         └── page.tsx
│   │   ├── profile/
│   │   │    ├── error.tsx
│   │   │    └── page.tsx
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │     └── route.tsx
│   │   │   ├── logout/
│   │   │   │     └── route.tsx
│   │   │   ├── refresh/
│   │   │   │     └── route.tsx
│   │   │   └── register/
│   │   │   │     └── route.tsx
│   │   ├── diary/
│   │   │    ├── [entryId]/
│   │   │    │      └── route.tsx
│   │   │    └── route.tsx
│   │   ├── emotions/
│   │   │    └── route.tsx
│   │   ├── journey/
│   │   │    ├── baby/
│   │   │    │     └── route.tsx
│   │   │    ├── me/
│   │   │    │     └── route.tsx
│   │   │    ├── mom/
│   │   │    │     └── route.tsx
│   │   │    └── route.tsx
│   │   ├── profile/
│   │   │    ├── avatar/
│   │   │    │     └── route.tsx
│   │   │    ├── me/
│   │   │    │     └── route.tsx
│   │   │    └── route.tsx
│   │   ├── tasks/
│   │   │    ├── [taskId]/status/
│   │   │    │     └── route.tsx
│   │   │    └── route.tsx
│   │   └── weeks/
│   │   │    ├── baby/
│   │   │    │     └── route.tsx
│   │   │    └── me/
│   │   │         └── route.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   └── not-found.tsx
│
├── components/
│   ├── common/
│   │   ├── Loader/
│   │   │      ├── Loader.module.css
│   │   │      └── Loader.tsx
│   │   └── ToastProvider/
│   │          └── ToastProvider.tsx
│   ├── layout/
│   │   ├── AppLayout/
│   │   │      ├── AppLayout.module.css
│   │   │      └── AppLayout.tsx
│   │   ├── AuthBar/
│   │   │      ├── AuthBar.module.css
│   │   │      └── AuthBar.tsx
│   │   ├── Breadcrumbs/
│   │   │      ├── Breadcrumbs.module.css
│   │   │      └── Breadcrumbs.tsx
│   │   ├── Header/
│   │   │      ├── Header.module.css
│   │   │      └── Header.tsx
│   │   ├── SideBar/
│   │   │      ├── SideBar.module.css
│   │   │      └── SideBar.tsx
│   │   └── UserBar/
│   │          ├── UserBar.module.css
│   │          └── UserBar.tsx
│   │
│   ├── providers/
│   │   ├── AuthProvider.tsx
│   │   ├── ModalProvider.tsx
│   │   └── QueryProvider.tsx
│   │
│   └── shared/
│       ├── ConfirmationModal/
│       ├── GreetingBlock/
│       └── TasksReminderCard/
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm/
│   │   │   └── RegistrationForm/
│   │   ├── api.ts
│   │   └── types.ts
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── BabyTodayCard/
│   │   │   ├── DashBoardPage/
│   │   │   ├── FeelingCheckCard/
│   │   │   ├── MomTipCard/
│   │   │   └── StatusBlock/
│   │   ├── api.ts
│   │   └── types.ts
│   │
│   ├── diary/
│   │   ├── components/
│   │   │   ├── AddDiaryEntryForm/
│   │   │   ├── AddDiaryEntryModal/
│   │   │   ├── DiaryEntryCard/
│   │   │   ├── DiaryEntryDetails/
│   │   │   ├── DiaryList/
│   │   │   ├── DiaryPage/
│   │   │   └── DiaryEntryDetailsClient.tsx
│   │   ├── api.ts
│   │   └── types.ts
│   │
│   ├── journey/
│   │   ├── components/
│   │   │   ├── JourneyDetails/
│   │   │   ├── JourneyPage/
│   │   │   ├── WeekSelector/
│   │   │   ├── api.ts
│   │   │   └── types.ts
│   │   ├── api.ts
│   │   └── types.ts
│   │
│   ├── onboarding/
│   │   ├── components/
│   │   │   ├── OnboardingForm/
│   │   │   └── OnboardingPage/
│   │   ├── api.ts
│   │   └── types.ts
│   │
│   ├── profile/
│   │   ├── components/
│   │   │   ├── ProfileAvatar/
│   │   │   ├── ProfileEditForm/
│   │   │   └── ProfilePage/
│   │   ├── api.ts
│   │   └── types.ts
│   │
│   └── tasks/
│       ├── components/
│       │   ├── AddTaskForm/
│       │   └── AddTaskModal/
│       ├── api.ts
│       └── types.ts
│
├── lib/
│   └── api/
│       ├── api.ts
│       ├── clientApi.ts
│       └── serverApi.ts
│
└── store/
    ├── authStore.ts
    ├── diaryStore.ts
    ├── themeStore.ts
    └── userStore.ts
```

## Технології

Цей frontend працює разом із backend частиною:
https://github.com/Oleksii996/project-DeCodery-Back

## Команда

Проєкт розробляли 14 студентів GoIT:

- [Oleksii996](https://github.com/Oleksii996)
- [AndriiZahoruiko2000](https://github.com/AndriiZahoruiko2000)
- [Romario198901](https://github.com/Romario198901)
- [vitaliiaSel0907](https://github.com/vitaliiaSel0907)
- [Sliliia85](https://github.com/Sliliia85)
- [Vlad2346543](https://github.com/Vlad2346543)
- [Anastasiia-git](https://github.com/Anastasiia-git)
- [Ruslan-Dev-JS](https://github.com/Ruslan-Dev-JS)
- [Taras-Lisnyak](https://github.com/Taras-Lisnyak)
- [Altavana](https://github.com/Altavana)
- [Mykola1812-hub](https://github.com/Mykola1812-hub)
- [ArtuR188](https://github.com/ArtuR188)
- [Skyzary](https://github.com/Skyzary)
- [yuliiapazushkina](https://github.com/yuliiapazushkina)

MIT License — вільне використання для навчання та особистих проєктів.

## Створено в рамках курсу FullStack від GoIT © 2025
