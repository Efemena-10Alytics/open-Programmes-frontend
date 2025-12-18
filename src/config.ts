interface UrlConfig {
  API_URL: string;
}

interface ClientUrlConfig {
  CLIENT_URL: string;
}

interface EnvConfig {
  API_ENV: string;
}

interface Config {
  url: UrlConfig;
  client_url: ClientUrlConfig;
  env: EnvConfig;
}

const prod: Config = {
  url: {
    API_URL: "https://nebiant-api-3ew3.onrender.com",
  },
  client_url: {
    CLIENT_URL: "https://nebiant.com",
  },

  env: {
    API_ENV: "production",
  },
};

const dev: Config = {
  url: {
    API_URL: "http://localhost:8000",
  },
  client_url: {
    CLIENT_URL: "http://localhost:5173",
  },

  env: {
    API_ENV: "development",
  },
};



export const config: Config = 
  import.meta.env.VITE_API_NODE_ENV === "development" ? dev : prod;
