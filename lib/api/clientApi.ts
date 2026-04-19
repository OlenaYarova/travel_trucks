
import { normalizeLocation } from '@/helpers/cleanParams';
import { api } from "./api";
import {
    BookingPayload,
    CamperDetails,
    GetAllCampersResponse,
    GetAllCampersParams,
    Review,
} from "@/types/camper";
import { FilterOptions } from "@/types/filter";

const sanitizeCampersParams = (params?: GetAllCampersParams) => {
    if (!params) {
        return undefined;
    }

    const cleanedEntries: [string, string | number][] = [];

    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) {
            return;
        }

        if (typeof value === 'string') {
            const trimmedValue = value.trim();

            if (!trimmedValue) {
                return;
            }

            if (key === 'location') {
                cleanedEntries.push([key, normalizeLocation(trimmedValue)]);
                return;
            }

            cleanedEntries.push([key, trimmedValue]);
            return;
        }

        cleanedEntries.push([key, value]);
    });

    return Object.fromEntries(cleanedEntries) as GetAllCampersParams;
};

export const getAllCampers = async (
    params?: GetAllCampersParams,): Promise<GetAllCampersResponse> => {
    const response = await api.get<GetAllCampersResponse>("/campers", {
        params: sanitizeCampersParams(params),
    });
    return response.data;
}

export const getFilters = async (): Promise<FilterOptions> => {
    const { data } = await api.get<FilterOptions>('/campers/filters');
    return data;
};

export const getCamperById = async (camperId: string): Promise<CamperDetails> => {
    const { data } = await api.get<CamperDetails>(`/campers/${camperId}`);
    return data;
};

export const getReviewsByCamperId = async (camperId: string): Promise<Review[]> => {
    const { data } = await api.get<Review[]>(`/campers/${camperId}/reviews`);
    return data;
};

export const createBooking = async (payload: BookingPayload) => {
    const { data } = await api.post('/bookings', payload);
    return data;
};
