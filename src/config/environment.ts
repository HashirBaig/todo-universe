const dev = {
  API_URL: "http://localhost:5000/api",
};

const prod = {
  API_URL: "https://todo-universe-nodets.vercel.app/api",
};

console.log("Vite MODE:", import.meta.env.MODE);
console.log("Vite PROD:", import.meta.env.PROD);

const config = import.meta.env.MODE === "production" ? prod : dev;

export default config;
