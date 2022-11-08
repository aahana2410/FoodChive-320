const productionURL = "https://foodchive-api.onrender.com";
const developmentURL = "http://localhost:3000";

export const environmentURL =
  process.env.NODE_ENV === "production" ? productionURL : developmentURL;
