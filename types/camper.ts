export interface Camper {
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
    description: string;
    consumption: string;
    width: string;
    height: string;
    length: string;
    tank: string;
    gallery: string[];
    transmission: string;
    engine: string;
    form: string;
}

export type GetAllCampersParams = {
    page?: number;
    perPage?: number;
    location?: string;
    form?: string;
    transmission?: string;
    engine?: string;
};

export type GetAllCampersResponse = {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    campers: Camper[];
};

export type Review = {
    id: string;
    camperId: string;
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
    createdAt: string;
};