# 📊 Habit Tracker

A clean, responsive habit tracking application built with React, Vite, and Tailwind CSS.

![Habit Tracker Screenshot](https://placeholder-for-screenshot.png)

## 📝 Description

This Habit Tracker application helps you build consistent habits by tracking your daily activities on a monthly calendar. Add habits, track completion streaks, and visualize your progress over time. The application features a clean, dark-themed UI with an intuitive monthly calendar view.

## ✨ Features

- 📅 Monthly calendar view with easy navigation
- ➕ Add, edit, and delete habits
- ✓ Track daily habit completion with a simple click
- 🔥 View your current streak for each habit
- 📋 Optional descriptions for each habit
- 🔔 Notification bell for updates when new versions are available
- 📱 Responsive design that works on desktop and mobile
- 💾 Persistent storage (saves your data in the browser)
- 🔄 Copy habits from previous months

## 🛠️ Tech Stack

- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) - Offline support and updates

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/habit-tracker.git
   cd habit-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🚀 Usage

### Adding a Habit

1. Enter the habit name in the input field
2. Optionally add a description
3. Click 'Add Habit' or press Enter

### Tracking Habits

- Click on the cell corresponding to the habit and day to mark it as completed
- Click again to mark it as not completed
- The streak counter will update automatically

### Editing/Deleting Habits

- Click the edit icon (✏️) next to a habit to edit it
- Click the delete icon (🗑️) to remove a habit

### Navigating Between Months

- Use the arrow buttons to move between months
- Click 'Today' to return to the current month
- When entering a new month, you can copy habits from the previous month

### Update Notifications

- The notification bell in the top-right corner will show a red dot when updates are available
- Click the bell to refresh and get the latest version
- After updating, the red dot will disappear until the next update

## 📁 Project Structure

```
src/
├── assets/        # Static assets
├── components/    # React components
│   ├── HabitForm.jsx        # Form for adding/editing habits
│   ├── HabitRow.jsx         # Individual habit row component
│   ├── HabitTable.jsx       # Main habit tracking table
│   ├── HabitTracker.jsx     # Main container component
│   ├── MonthNavigation.jsx  # Month navigation controls
│   └── NotificationBell.jsx  # Update notification component
├── hooks/         # Custom React hooks
│   ├── useHabits.js         # Habit management logic
│   └── useMonthNavigation.js # Month navigation logic
├── services/      # Service modules
│   └── storageService.js    # Local storage management
├── utils/         # Utility functions
│   ├── dateUtils.js         # Date manipulation helpers
│   ├── streakUtils.js       # Streak calculation helpers
│   └── serviceWorkerUtils.js # Service worker management
├── App.jsx        # Root application component
├── index.css      # Global styles
└── main.jsx       # Application entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using the conventional commit format (see below)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📝 Commit Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/) format to automate versioning and release notes. Please format your commit messages as follows:

```
<type>[optional scope]: <description>
```

Types include:

- `feat:` - A new feature (triggers a minor version bump)
- `fix:` - A bug fix (triggers a patch version bump)
- `docs:` - Documentation only changes
- `style:` - Changes that don't affect the code's meaning (white-space, formatting, etc.)
- `refactor:` - A code change that neither fixes a bug nor adds a feature
- `perf:` - A code change that improves performance
- `test:` - Adding missing tests or correcting existing tests
- `chore:` - Changes to the build process or auxiliary tools
- `BREAKING CHANGE:` - Introduction of breaking changes (triggers a major version bump)

Examples of good commit messages:

```
feat: add notification bell for updates
fix: prevent streak count reset when marking habits with X
chore: update dependencies
BREAKING CHANGE: redesigned user interface
```

### 🔄 Releases

This project uses GitHub Actions to automate the release process. When commits are pushed to the main branch:

1. The app is automatically built and deployed to GitHub Pages
2. A new version number is determined based on the commit messages
3. A GitHub Release is created with auto-generated release notes
4. Users are notified of updates via the notification bell in the app

The version follows Semantic Versioning (MAJOR.MINOR.PATCH):

- Major version bump (1.0.0 → 2.0.0): Commits with "BREAKING CHANGE"
- Minor version bump (1.0.0 → 1.1.0): Commits starting with "feat:"
- Patch version bump (1.0.0 → 1.0.1): Commits starting with "fix:" or any other changes

## 👏 Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ by Anita Okoh
