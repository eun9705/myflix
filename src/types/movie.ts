export interface ContentInfoType {
    id:number,
    backdrop_path:string | null,
    overview:string,
    poster_path:string,
    title?:string,
    name?:string,
    original_name?:string,
    videos?: {
        results: {
            key: string;
        }[];
    };
    category?:string
}

export type CreditsType = {
    name?:string,
    original_name:string,
}

export type GenresType = {
    name:string
}

export interface DetailInfoType extends ContentInfoType {    
    number_of_episodes:number,
    seasons:[]
}