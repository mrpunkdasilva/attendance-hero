<p align="center">
<img src="./.github/iconPrimaryDark.svg" width="500px" height="300px" />
</p>

```       _   _                 _                      _    _                
     /\  | | | |               | |                    | |  | |               
    /  \ | |_| |_ ___ _ __   __| | __ _ _ __   ___ ___| |__| | ___ _ __ ___  
   / /\ \| __| __/ _ \ '_ \ / _` |/ _` | '_ \ / __/ _ \  __  |/ _ \ '__/ _ \ 
  / ____ \ |_| |_  __/ | | | (_| | (_| | | | | (__  __/ |  | |  __/ | | (_) |
 /_/    \_\__|\__\___|_| |_|\__,_|\__,_|_| |_|\___\___|_|  |_|\___|_|  \___/ 
```

# AttendanceHero

AttendanceHero is a web application that allows students to manage and track their classroom attendance. With student-focused features and an intuitive interface, AttendanceHero helps students stay organized and in control of their academic attendance.

## Project Structure

The project is divided into two main parts:

- **Client**: React application built with Vite
- **Server**: Express.js API with Prisma ORM

## Technologies

### Frontend
- React 18
- React Router
- Vite
- SASS
- SweetAlert2

### Backend
- Node.js
- Express.js
- Prisma ORM
- Swagger for API documentation

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/attendance-hero.git
cd attendance-hero
```

2. Install dependencies:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:
```bash
# In the server directory
cp .env.example .env
# Edit .env with your database credentials
```

4. Start the development servers:
```bash
# Start the client
cd client
npm run dev

# Start the server
cd ../server
npm run dev
```

## Docker Setup

You can also run the application using Docker:

```bash
# Build and start the containers
docker-compose up -d

# Stop the containers
docker-compose down
```

## API Documentation

API documentation is available via Swagger UI at `/api-docs` when the server is running.

## Author

Mr Punk da Silva