# 🎬 Movie App — React + Vite + TMDb

A dynamic and responsive **Movie App** built with **React**, **JavaScript**, and **Vite**, using **TMDb (The Movie Database)** for movie data.

---

## 🧰 Features

- ⚛️ Fast and modern React front-end with Vite  
- 🎞️ Fetches real movie data from [TMDb API](https://www.themoviedb.org/documentation/api)  
- 🔍 Search, browse, and view movie details   
- 🎨 Clean UI and modular project structure  

---

## 🚀 Getting Started

### 📁 Clone the Repository

```bash
git clone https://github.com/your-username/movie-app.git
cd movie-app
```
### 📦 Install Dependencies

```bash
npm install
# or
yarn
```

### 🧪 Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173/`.

---

## 🧩 TMDb Integration Overview

1. **TMDb API**
   - Used to fetch movie details, posters, ratings, genres, and more.
   - API requests are made using the `VITE_TMDB_API_KEY` stored in your `.env`.

2. **Environment Variables Required**
   - The app uses `.env` variables to securely access both Appwrite and TMDb services.
   ```env
     VITE_TMDB_API_KEY=your_tmdb_api_key

---

## 🧪 Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Run development server   |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

MIT License © 2025 Babafemitan Fagbemi

## 🙌 Acknowledgements

- [React](https://reactjs.org/) — For the front-end library  
- [Vite](https://vitejs.dev/) — For the fast build tool    
- [The Movie Database (TMDb)](https://www.themoviedb.org/) — For movie data and posters

> This product uses the TMDb API but is not endorsed or certified by TMDb.
