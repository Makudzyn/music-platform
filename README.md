<h1 align="center">
  <br>
  <a href="http://your-live-hosting-link.com">
    <img src="client/app/favicon.ico" alt="Music Platform" width="200">
  </a>
  <br>
  Cookie Music
  <br>
</h1>

<hr/>

<h3>
A feature-rich music platform to explore and enjoy music with ease.
</h3>

<p align="center">
  <a href="http://your-live-hosting-link.com">
    <img src="https://img.shields.io/badge/Live-Demo-green" alt="Live Demo">
  </a>
  <a href="https://github.com/Makudzyn/music-platform/issues">
    <img src="https://img.shields.io/github/issues-closed/Makudzyn/music-platform" alt="Closed issues">
  </a>
  <a href="https://github.com/Makudzyn/music-platform/commits/master/">
    <img src="https://img.shields.io/github/commit-activity/t/Makudzyn/music-platform" alt="Commits">
  </a>
  <a href="https://github.com/Makudzyn/music-platform/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/Makudzyn/music-platform" alt="License">
  </a>
</p>



<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#tech-stack">Tech stack</a> •
  <a href="#database-schema">Database Schema</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#license">MIT License</a> •
  <a href="#feedback">MIT License</a> •
</p>

## Introduction

Music Platform is an online application where users can explore and enjoy their favorite music in one convenient place.
With a user-friendly interface, it allows listeners to:

* 🎶 **Browse Music Collections** – Discover artists, albums, and tracks from a music library.
* 🎧 **Seamless Audio Playback** – Listen to high-quality audio with easy-to-use controls.
* 🌗 **Theme Toggle** – Switch between light and dark modes to suit your preference.
* 👤 **Profile Management** – Upload profile images and edit personal information to customize your account.
* 💬 **Track Commenting** – Share your thoughts and impressions by leaving comments directly under any track.
* ✨ **Interactive and Friendly Interface** – Enjoy an intuitive experience with helpful tooltips, toast notifications, and smooth animations, making it easy and enjoyable to interact with the platform.

Whether you’re an everyday music lover or just looking for a platform to explore new tunes, Cookie Music offers a robust and engaging music experience!

## Key Features

* 🔐 **User Authentication & Authorization** – Secure authentication with JWT tokens, role-based access for admins and users, and secure cookie-based token storage with CORS handling.
* 🎵 **Music Player with Queue Management** – A globally accessible music player with track queue support, enabling seamless playback control from anywhere in the app.
* 🌑 **Dark/Light Theme Switching** – Switch between light and dark themes for a personalized experience.
* 📬 **Email Verification for Account Confirmation** – Secure user registration with email-based account verification.
* ✉️ **Custom Toaster Notifications and Tooltips** – Real-time feedback with notifications and tooltips to enhance user interaction.
* 🛠 **Advanced Form Handling** – Reliable form validation and processing powered by React Hook Form and Zod, ensuring accurate data entry.
* 🔍 **Enhanced Search with Validation and Debounce** – A powerful search field with debouncing, validation, and optimized entity searching for quick, relevant results.
* 🔧 **Admin API Interface** – A dedicated admin route with an intuitive interface for managing API requests.
* 📤 **Drag-and-Drop Track Upload (Admin)** – Easy and efficient track uploads with drag-and-drop functionality, simplifying content management for administrators.
* 🌐 **Database Interaction via Axios with axiosClient** – Robust database interactions through Axios, leveraging a customized axiosClient for consistent and secure requests.
* 🛡 **Advanced Backend with Decorators, Validators, DTOs, and Guards** – A highly structured server setup using DTOs, decorators, validators, JWT and role-based guards, along with efficient file management for secure and scalable backend operations.
* ⚙️ **Error Handling and Loading States** – Built-in error boundaries, loading skeletons, and customized "not-found" routes to ensure a smooth user experience.
* 🎨 **Rich Styling** – Crafted with TailwindCSS, shadcn/ui, and radix to deliver a visually appealing and responsive design.
* 🧩 **Modular Architecture** – A well-organized and scalable codebase for both backend and frontend, promoting maintainability and future expansion.

## Tech Stack

This project is built using modern technologies and frameworks to create a seamless, high-performance user experience.

### Client-Side

<a href="https://nextjs.org/">
  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
</a>
<a href="https://reactjs.org/">
  <img src="https://img.shields.io/badge/react-232728?style=for-the-badge&logo=react&logoColor=58c4dc" alt="React">
</a>
<a href="https://redux.js.org/">
  <img src="https://img.shields.io/badge/redux-593d88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux">
</a>
<a href="https://www.typescriptlang.org/">
  <img src="https://img.shields.io/badge/typescript-27609e?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
</a>
<a href="https://shadcn.dev/">
  <img src="https://img.shields.io/badge/shadcn_ui-09090b?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui">
</a>
<a href="https://tailwindcss.com/">
  <img src="https://img.shields.io/badge/tailwind_css-0ea5e9?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS">
</a>
<a href="https://www.radix-ui.com/">
  <img src="https://img.shields.io/badge/radix-151515?style=for-the-badge&logo=radixui&logoColor=white" alt="Radix UI">
</a>
<a href="https://react-hook-form.com/">
  <img src="https://img.shields.io/badge/react_hook_form-ec5990?style=for-the-badge&logo=reacthookform&logoColor=white" alt="React Hook Form">
</a>
<a href="https://axios-http.com/">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios">
</a>
<a href="https://zod.dev/">
  <img src="https://img.shields.io/badge/zod-0082C9?style=for-the-badge&logo=zod&logoColor=white" alt="Zod">
</a>
<a href="https://eslint.org/">
  <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint">
</a>
<a href="https://prettier.io/">
  <img src="https://img.shields.io/badge/prettier-1a2b34?style=for-the-badge&logo=prettier&logoColor=F7B93E" alt="Prettier">
</a>
<a href="https://react-dropzone.js.org/">
  <img src="https://img.shields.io/badge/react_dropzone-white?style=for-the-badge&logo=npm&logoColor=cb3837" alt="React Dropzone">
</a>


### Server-Side

<a href="https://nestjs.com/">
  <img src="https://img.shields.io/badge/nest.js-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
</a>
<a href="https://nodejs.org/">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
</a>
<a href="https://www.mongodb.com/">
  <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
</a>
<a href="https://mongoosejs.com/">
  <img src="https://img.shields.io/badge/mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose">
</a>
<a href="https://jwt.io/">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
</a>
<a href="https://github.com/fluent-ffmpeg/node-fluent-ffmpeg">
  <img src="https://img.shields.io/badge/fluent_ffmpeg-white?style=for-the-badge&logo=ffmpeg&logoColor=FF0000" alt="Fluent ffmpeg">
</a>
<a href="https://www.typescriptlang.org/">
  <img src="https://img.shields.io/badge/typescript-27609e?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
</a>
<a href="https://swagger.io/">
  <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger">
</a>
<a href="https://www.npmjs.com/package/bcrypt">
  <img src="https://img.shields.io/badge/bcrypt-white?style=for-the-badge&logo=npm&logoColor=cb3837" alt="bcrypt">
</a>
<a href="https://www.npmjs.com/package/bcrypt">
  <img src="https://img.shields.io/badge/nodemailer-white?style=for-the-badge&logo=npm&logoColor=cb3837" alt="Nodemailer">
</a>

This stack allows for a responsive, reliable, and secure web application, with real-time updates and scalability on both the client and server.


## Database Schema

The database schema utilizes MongoDB with Mongoose and includes collections for `User`, `Track`, `Artist`, `Playlist` and `Comment`.

![Database Schema](/Scheme-music-platform.drawio.png)

## How To Use

To clone and run this application, you'll need
[Git](https://git-scm.com) and
[Node.js](https://nodejs.org/en/download/).
From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Makudzyn/music-platform

# Go into the repository
$ cd music-platform

# Install client dependencies
$ cd client
$ npm install

# Return to root directory
$ cd ..

# Install server dependencies
$ cd server
$ npm install

# Configure environment variables
# Create .env file and configure DB and JWT

# Start the application

## Start server first
$ npm run start:dev --prefix server

## Open a new terminal and start the client
$ npm run dev --prefix client
```

## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/Makudzyn/music-platform/blob/master/LICENSE) for more information.

## Feedback

Your feedback is invaluable for making Cookie Music better! If you have suggestions, found a bug, or simply want to share your thoughts on the project:

* 📝 **Create a new issue** – Visit [Issues board](https://github.com/Makudzyn/music-platform/issues) to report bugs or request new features.
* 📬 **Contact the developer directly** – Contact me via [Telegram](https://t.me/makudzyn) (**Maksym**)

Your input helps us improve the experience for everyone. Thank you for contributing to Cookie Music!


