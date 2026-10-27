import { create } from "zustand";

export type ThemeName = "light" | "dark";
const storageKey = "theme-store";
const systemTheme = (): ThemeName =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

function readTheme(): ThemeName | null {
    try {
        const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "null");
        const theme = (value as { state?: { theme?: unknown } } | null)?.state?.theme;
        if (typeof theme !== "string") return null;
        // Migra as famílias antigas para o mesmo modo da paleta única.
        if (theme === "dark" || theme === "blue_dark" || theme === "steel_dark") return "dark";
        if (theme === "light" || theme === "blue_light" || theme === "steel_light") return "light";
    } catch { /* Storage indisponível ou inválido: usa a preferência do sistema. */ }
    return null;
}

const useThemeStore = create<{ theme: ThemeName }>(() => ({ theme: "light" }));

function applyTheme(theme: ThemeName): void {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    useThemeStore.setState({ theme });
}

function updateFavicon(): void {
    const favicon = document.getElementById("dynamic-favicon");
    if (favicon instanceof HTMLLinkElement) {
        favicon.href = systemTheme() === "dark" ? "/favicon_dark.svg" : "/favicon_light.svg";
    }
}

export function getTheme(): ThemeName {
    return useThemeStore.getState().theme;
}

export function changeTheme(theme: ThemeName): void {
    applyTheme(theme);
    try {
        localStorage.setItem(storageKey, JSON.stringify({ state: { theme }, version: 0 }));
    } catch { /* A alternância continua funcionando sem persistência. */ }
}

export function toggleTheme(): void {
    changeTheme(getTheme() === "dark" ? "light" : "dark");
}

export function useThemeName(): ThemeName {
    return useThemeStore((state) => state.theme);
}

export function useIsDarkTheme(): boolean {
    return useThemeStore((state) => state.theme === "dark");
}

export function initTheme(): () => void {
    applyTheme(readTheme() ?? systemTheme());
    updateFavicon();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystem = () => {
        if (readTheme() === null) applyTheme(systemTheme());
        updateFavicon();
    };
    const handleStorage = (event: StorageEvent) => {
        if (event.storageArea === window.localStorage && (event.key === storageKey || event.key === null)) {
            applyTheme(readTheme() ?? systemTheme());
        }
    };
    media.addEventListener("change", handleSystem);
    window.addEventListener("storage", handleStorage);
    return () => {
        media.removeEventListener("change", handleSystem);
        window.removeEventListener("storage", handleStorage);
    };
}
