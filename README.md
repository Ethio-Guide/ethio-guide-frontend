# EthioGuide - AI-Powered Bureaucracy Navigator (Frontend)

<div align="center">
  <img src="public/images/ethioguide-symbol.png" alt="EthioGuide Logo" width="200"/>
</div>

<p align="center">
  <strong>The official frontend repository for EthioGuide, a platform designed to simplify and clarify bureaucratic procedures in Ethiopia using AI-powered guidance and community knowledge.</strong>
</p>

<p align="center">
  <a href="#about-the-project">About</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#folder-structure">Folder Structure</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

---

## About The Project

Navigating essential services in Ethiopia, from government to private sectors, often involves confusing, fragmented, and unclear information. This leads to wasted time, reliance on informal networks or brokers, and frustrating experiences for citizens and businesses.

**EthioGuide** aims to solve this by providing a centralized, user-friendly, and reliable platform. We offer:
*   **AI-Powered Guidance:** Get instant, conversational answers to your questions about procedures.
*   **Verified Information:** Access official, step-by-step guides published directly by organizations.
*   **Community Knowledge:** Learn from the real-world experiences and tips shared by others.

This repository contains the complete source code for the EthioGuide frontend, built with Next.js and a modern, component-based architecture.

## Features

EthioGuide is designed with a role-based architecture to serve different user needs effectively.

### For All Users (Public)
*   **Browse & Search Procedures:** Easily find and view procedures with detailed requirements, steps, fees, and processing times.
*   **Advanced Filtering:** Filter procedures by category, language, or location.
*   **Multi-Language Support:** Seamlessly switch between Amharic and English.
*   **Offline Access:** View previously accessed procedure pages without an internet connection.

### For Registered Users
*   **Personal Workspace:** Create checklists, upload documents, and track your progress on multiple procedures.
*   **AI Assistance:** Ask the AI guide for direct assistance and clarification.
*   **Community Discussions:** Share tips, ask questions, and contribute to a community-driven knowledge base.
*   **Feedback System:** Suggest improvements or flag outdated information on official procedures.

### For Organizations
*   **Procedure Management:** Publish, update, and manage your organization's official procedures.
*   **Direct Engagement:** Respond to user feedback and answer questions from premium users.
*   **Notice Broadcasting:** Post official announcements and updates directly to the platform.

### For System Administrators
*   **Content Moderation:** Review and verify all user-generated content to ensure accuracy and safety.
*   **Platform Analytics:** Access a dashboard with key metrics on user engagement and content performance.
*   **User & Organization Management:** Oversee all accounts and maintain platform integrity.

## Tech Stack

This project is built using a modern and scalable frontend stack:

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
*   **State Management:** [Redux](https://github.com/redux)
*   **Internationalization:** [i18next](https://www.i18next.com/)
*   **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
*   Node.js (v18.x or later)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/my-ethioguide-app.git
    cd my-ethioguide-app
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the necessary environment variables.
    ```env
    # API URL for local development
    NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1

    # NextAuth.js settings
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET="PASTE_A_RANDOM_SECRET_HERE"
    # use openssl to generate a random secret
    # openssl rand -base64 32

    # Google Login credentials
    GOOGLE_CLIENT_ID="PASTE_YOUR_GOOGLE_CLIENT_ID_HERE"
    GOOGLE_CLIENT_SECRET="PASTE_YOUR_GOOGLE_CLIENT_SECRET_HERE"
    # You can get these from Google Developer Console
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    # or
    yarn dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure

The project follows a modular and scalable folder structure based on the Next.js App Router paradigm.

```bash
ethio-guide-frontend/
├── app/ # App Router: All pages/routes
│ ├── (common)/ # Shared routes (auth, profile)
│ ├── user/ # User-specific routes
│ ├── admin/ # Admin-specific routes
│ ├── org/ # Organization-specific routes
│ ├── api/ # Next.js API routes (e.g., for NextAuth)
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout
│ └── page.tsx # Root page
├── components/ # Reusable UI components
│ ├── ui/ # Shadcn UI components
│ ├── shared/ # Global components (Header, Footer)
│ ├── user/ # User-role specific components
│ ├── admin/ # Admin-role specific components
│ └── org/ # Org-role specific components
├── lib/ # Utility functions, hooks, configs
│ ├── auth/ # Auth utilities
│ ├── i18n/ # i18next configuration
│ ├── hooks/ # Custom React hooks
│ ├── validators/ # Zod validation schemas
│ └── utils.ts # General utility functions
├── store/ # Redux state management
│ └── slices/ # State slices for different features
├── types/ # TypeScript type definitions
├── api/ # Client-side API services (Axios)
├── public/ # Static assets (images, icons)
├── .eslintrc.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.