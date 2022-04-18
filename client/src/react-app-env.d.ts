// / <reference types="react-scripts" />
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TMDB_API: string
        }
    }
}

declare module '*.png'
declare module '*.svg'
declare module '*.jpeg'
declare module '*.jpg'