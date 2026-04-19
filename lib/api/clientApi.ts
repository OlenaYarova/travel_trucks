
import { api } from "./api";
import {
    BookingPayload,
    CamperDetails,
    GetAllCampersResponse,
    GetAllCampersParams,
    Review,
} from "@/types/camper";
import { FilterOptions } from "@/types/filter";

export const getAllCampers = async (
    params?: GetAllCampersParams,): Promise<GetAllCampersResponse> => {
    const response = await api.get<GetAllCampersResponse>("/campers", {
        params,
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
