Project Overview FealtyX is a bug/task tracking web application built using React.js with Vite as the build tool. This project demonstrates frontend development skills, UI/UX design, and state management using modern React practices.

Key Features User Authentication & Roles: Simple login system with two roles: Developer and Manager.

Developers manage their own tasks/bugs.

Managers oversee all open and closed bugs and approve bug closure requests.

Dashboard: Role-based dashboard displaying tasks with detailed info and a trend line showing daily concurrent tasks.

Task/Bug Management: Developers can create, edit, delete, and close tasks. Managers verify closure or reopen bugs pending approval. Tasks include fields like Title, Description, Priority, Status, Assignee, and important dates. Filter and sort tasks by different criteria.

Time Tracking: Log time spent on tasks. Managers can view aggregated time data across developers.

UI/UX: Clean, intuitive, and responsive design suitable for desktop and mobile devices.

Technology Stack Frontend: React.js with Vite

Styling: CSS / CSS-in-JS (styled-components or other)

State Management: (e.g., Redux, Zustand, or React Context API)

Build Tool: Vite for fast development and build times

How to Run Locally Clone the repo

Run npm install to install dependencies

Run npm run dev to start the development server

Additional Notes: Authentication is mock/simple for demo purposes; no backend integration.

The project focuses on frontend functionality and UI/UX best practices.

Feel free to explore the codebase to understand component structure, routing, and state management.

Demo & Video Live Demo: [https://drive.google.com/file/d/15mp9jSUNqET-CdZOFS4sToRYd7mIw1WD/view?usp=drivesdk/]

Video Demo: [https://fealt-x-bugtracker.netlify.app/]

Evaluation Criteria Covered Complete MVP with working UI

Responsive and user-friendly interface

Clean, modular, and maintainable code

Development Strategies & Approaches To build a scalable, maintainable, and user-friendly bug/task tracker application, the following strategies were implemented or considered during development:

Component-Based Architecture The UI is broken down into reusable, self-contained React components to promote modularity and ease of maintenance.
Separation of concerns ensures that each component handles only its specific logic and presentation.

Role-Based Access Control User roles (Developer and Manager) define access and permissions within the app.
Conditional rendering and route protection prevent unauthorized access to sensitive features.

State Management Used React’s built-in state hooks or an external state management library (like Redux or Zustand) to efficiently handle application state.
Centralized state makes it easier to manage tasks, user info, and UI states across components.

Client-Side Routing React Router manages navigation between different views (Dashboard, Task Creation, etc.) without page reloads, enabling a smooth SPA experience.

Form Handling & Validation Controlled forms are used for creating and editing tasks with input validation to ensure data integrity.

User feedback is provided for validation errors and successful actions.

Time Tracking & Data Visualization Implemented a time tracking feature to log task durations.
Used charts (e.g., with libraries like Chart.js or Recharts) to display trends and summaries visually on the dashboard.

Responsive Design Designed with mobile-first principles and responsive CSS to ensure usability across different screen sizes and devices.

Mock Authentication Simple authentication logic with hardcoded credentials to simulate login behavior in the absence of a backend.

Version Control & Deployment Git is used for source control, with a clean commit history.

The app is deployed on platforms like Netlify or Vercel, leveraging modern CI/CD pipelines for automated builds and deployments.

Future-Ready Codebase Code is structured to allow easy integration of backend APIs, real authentication, and advanced features like notifications or collaborative task management.