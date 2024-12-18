import { useBuilding } from '@/providers/BuildingProvider';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchClassrooms = async (buildingName: string) => {
    const response = await axios.get(`buildings/${buildingName}/classrooms`);
    return response.data;
};

export const useClassrooms = () => {
    const { buildingName } = useBuilding();
    const { data, isError, isLoading } = useQuery(
        ['classrooms', buildingName],
        () => fetchClassrooms(buildingName),
        {
            retry: 1,
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 5,
            enabled: !!buildingName,
        }
    );
    return { rooms: data || [], isRoomsError: isError, isRoomsLoading: isLoading };
};

const fetchEquipment = async () => {
    const response = await axios.get('equipments');
    return response.data;
};

export const useEquipmentOptions = () => {
    const { data, isError, isLoading } = useQuery('equipments', fetchEquipment, {
        retry: 1,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60,
    });
    return {
        equipmentOptions: data || [],
        isEquipmentOptionsError: isError,
        isEquipmentOptionsLoading: isLoading,
    };
};

const fetchAvailableClassrooms = async (
    buildingName: string,
    date: string,
    startTime: string,
    endTime: string,
    numberOfParticipants: number
) => {
    const response = await axios.get(
        `buildings/${buildingName}/classrooms/available?date=${date}&timeRange=${startTime}-${endTime}&peopleCount=${numberOfParticipants}`
    );
    return response.data;
};

export const useAvailableClassrooms = (
    date: string,
    startTime: string,
    endTime: string,
    numberOfParticipants: number
) => {
    const { buildingName } = useBuilding();
    const queryResult = useQuery(
        ['availableClassrooms', buildingName, date, startTime, endTime],
        () =>
            fetchAvailableClassrooms(
                buildingName,
                date,
                startTime,
                endTime,
                numberOfParticipants
            ),
        {
            retry: 1,
            enabled: !!buildingName,
        }
    );

    return {
        availableClassrooms: queryResult.isError ? [] : queryResult.data,
    };
};

const fetchExtraRooms = async (buildingName: string) => {
    const response = await axios.get(`buildings/${buildingName}/extra-rooms`);
    return response.data;
};

export const useExtraRooms = () => {
    const { buildingName } = useBuilding();
    const { data, isError, isLoading } = useQuery(
        ['extraRooms', buildingName],
        () => fetchExtraRooms(buildingName),
        {
            enabled: !!buildingName,
        }
    );
    return {
        extraRooms: isError ? [] : data || [],
        isExtraRoomsError: isError,
        isExtraRoomsLoading: isLoading,
    };
};

const fetchFloors = async (buildingName: string) => {
    const response = await axios.get(`buildings/${buildingName}/floors`, {
        timeout: 2000,
    });
    return response.data;
};

export const useFloors = () => {
    const { buildingName } = useBuilding();
    const { data, isError, isLoading } = useQuery(
        ['floors', buildingName],
        () => fetchFloors(buildingName),
        {
            retry: 1,
            enabled: !!buildingName,
        }
    );
    return {
        floors: isError ? [] : data || [],
        isFloorsError: isError,
        isFloorsLoading: isLoading,
    };
};
