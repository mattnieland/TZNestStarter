declare namespace NodeJS {
  interface ProcessEnv {
    AXIOM_DATASET?: string;
    AXIOM_TOKEN?: string;
    BASE_PATH?: string;
    CLUSTERING: string;
    COOKIE_SIG?: string;
    DB_DATABASE?: string;
    DB_HOST?: string;
    DB_PASSWORD?: string;
    DB_PORT?: number;
    DB_TYPE?: string;
    DB_USERNAME?: string;
    IMAGEKIT_PRIVATE_KEY: string;
    IMAGEKIT_PUBLIC_KEY: string;
    IMAGEKIT_URL_ENDPOINT: string;
    JWT_ACCESS_EXPIRATION_TIME?: string;
    JWT_ACCESS_ISSUER?: string;
    JWT_ACCESS_SECRET_KEY?: string;
    JWT_REFRESH_EXPIRATION_TIME?: string;
    JWT_REFRESH_SECRET_KEY?: string;
    LOG_LEVEL?: string;
    NODE_ENV: string;
    ORIGIN: string;
    PORT: string;
    REDIS_HOST: string;
    REDIS_PASSWORD: string;
    REDIS_PORT: number;
    SECURE_SESSION_KEY?: string;
    SENTRY_DSN?: string;
    SENTRY_ENVIRONMENT?: string;
  }
}
