declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production',
            PORT: number,
            API_URL: string,
            CLIENT_URL: string,
            JWT_ACCESS_SECRET: string,
            JWT_REFRESH_SECRET: string,
            DB_USER: string
            DB_PASSWORD: string
            DB_NAME: string
            SMTP_HOST: string,
            SMTP_PORT: number,
            SMTP_USER: string,
            SMTP_PASSWORD: string,
        }
    }
}

export {}