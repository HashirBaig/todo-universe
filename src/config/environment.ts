const dev = {
  API_URL: "http://localhost:5000/api",
};

const prod = {
  API_URL: "https://todo-universe-nodets.vercel.app/api",
};

console.log("env >>>> ", import.meta.env.MODE);

const config = import.meta.env.MODE === "development" ? dev : prod;

export default config;
