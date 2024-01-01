declare namespace NodeJS {
  interface ProcessEnv {
    // AXIOM_DATASET?: string;
    // AXIOM_TOKEN?: string;
    BASE_PATH?: string;
    CLUSTERING: string;
    LOG_LEVEL?: string;
    NODE_ENV: string;
    PORT: string;
    SENTRY_DSN?: string;
    SENTRY_ENVIRONMENT?: string;
  }
}
