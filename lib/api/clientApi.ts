
import { api } from "./api";
import { GetAllCampersResponse, GetAllCampersParams } from "@/types/camper";
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
