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
    API_URL: "https://open-programmes-backend.onrender.com",
  },
  client_url: {
    CLIENT_URL: "https://open-programmes-frontend.vercel.app",
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
  process.env.NEXT_PUBLIC_NODE_ENV === "development" ? dev : prod;
