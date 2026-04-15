export interface Genre {
    id: number;
    name: string;
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profilePath: string | null;
    order: number;
}

export interface Director {
    id: number;
    name: string;
    profilePath: string | null;
}

export interface MovieSummary {
    id: number;
    title: string;
    posterPath: string | null;
    releaseYear: string;
    voteAverage: number | null;
    overview: string;
}

export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    posterPath: string | null;
    backdropPath: string | null;
    genres: Genre[];
    releaseYear: string;
    runtime: number | null;
    voteAverage: number | null;
    cast: CastMember[];
    director: Director | null;
    trailerEmbedUrl: string | null;
    rating: string | null;
}