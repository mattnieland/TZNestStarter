declare namespace NodeJS {
  interface ProcessEnv {
    BASE_PATH?: string;
    CLUSTERING: string;
    DB_DATABASE?: string;
    DB_HOST?: string;
    DB_PASSWORD?: string;
    DB_PORT?: number;
    DB_TYPE?: string;
    DB_USERNAME?: string;
    LOG_LEVEL?: string;
    NODE_ENV: string;
    PORT: string;
    SENTRY_DSN?: string;
  }
}
