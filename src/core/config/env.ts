import { z } from "zod";

const envSchema = z.object({
    VITE_APP_NAME: z.string().optional().catch(undefined),
    VITE_API_URL: z.url().optional().catch(undefined),
    VITE_API_TIMEOUT: z.coerce.number().nonnegative().optional().catch(undefined),
    
    VITE_IS_DEV: z.stringbool().catch(false),
    
    VITE_DEFAULT_TIMEZONE: z.string().catch("America/Sao_Paulo"),
    VITE_DEFAULT_LANGUAGE: z.string().catch("pt-BR"),
    VITE_AUTO_DETECT_LOCALE: z.stringbool().catch(true),
});

// ========== ENV VALIDATION ===================

const envVars = envSchema.safeParse(import.meta.env);

if (!envVars.success) {
    console.error("Invalid environment variables:", envVars.error.format());

    throw new Error("Invalid environment variables");
}

const {
    VITE_APP_NAME,
    VITE_API_URL,
    VITE_API_TIMEOUT,

    VITE_IS_DEV,

    VITE_DEFAULT_TIMEZONE,
    VITE_DEFAULT_LANGUAGE,
    VITE_AUTO_DETECT_LOCALE
} = envVars.data;

// ========== EXPORT FORMAT ====================

export const env = {
    appName: VITE_APP_NAME,
    apiUrl: VITE_API_URL,
    apiTimeout: VITE_API_TIMEOUT,

    isDev: VITE_IS_DEV,

    defaultTimezone: VITE_DEFAULT_TIMEZONE,
    defaultLanguage: VITE_DEFAULT_LANGUAGE,
    autoDetectLocale: VITE_AUTO_DETECT_LOCALE
};

console.log(env)