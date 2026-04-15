import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ListsContextValue = {
  favorites: number[];
  watchlist: number[];
  toggleFavorite: (id: number) => void;
  toggleWatchlist: (id: number) => void;
  removeFavorite: (id: number) => void;
  removeWatchlist: (id: number) => void;
  isFavorite: (id: number) => boolean;
  isWatchlist: (id: number) => boolean;
};

const ListsContext = createContext<ListsContextValue | null>(null);

const FAVORITES_KEY = "movieapp:favorites";
const WATCHLIST_KEY = "movieapp:watchlist";

function loadList(key: string): number[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is number => typeof item === "number")
      : [];
  } catch {
    return [];
  }
}

export function ListsProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(() =>
    loadList(FAVORITES_KEY)
  );
  const [watchlist, setWatchlist] = useState<number[]>(() =>
    loadList(WATCHLIST_KEY)
  );

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleWatchlist = (id: number) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item !== id));
  };

  const removeWatchlist = (id: number) => {
    setWatchlist((prev) => prev.filter((item) => item !== id));
  };

  const value = useMemo(
    () => ({
      favorites,
      watchlist,
      toggleFavorite,
      toggleWatchlist,
      removeFavorite,
      removeWatchlist,
      isFavorite: (id: number) => favorites.includes(id),
      isWatchlist: (id: number) => watchlist.includes(id),
    }),
    [favorites, watchlist]
  );

  return <ListsContext.Provider value={value}>{children}</ListsContext.Provider>;
}

export function useLists() {
  const value = useContext(ListsContext);
  if (!value) {
    throw new Error("useLists must be used inside ListsProvider");
  }
  return value;
}