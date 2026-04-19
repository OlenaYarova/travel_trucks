export type CamperImage = {
    id?: string;
    camperId?: string;
    thumb: string;
    original: string;
    order?: number;
};

export type Review = {
    id?: string;
    camperId?: string;
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
    createdAt?: string;
};

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
    gallery: CamperImage[];
    transmission: string;
    engine: string;
    form: 'alcove' | 'panel_van' | 'integrated' | 'semi_integrated' | string;
    coverImage?: string;
    amenities: string[];
    totalReviews?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CamperDetails extends Camper {
    reviews?: Review[];
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

export type BookingPayload = {
    name: string;
    email: string;
};
