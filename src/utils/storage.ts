function loadList(key: string): number[] {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return [];

        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "number") : [];
    } catch {
        return [];
    }
}

function saveList(key: string, value: number[]) {
    localStorage.setItem(key, JSON.stringify(value));
}