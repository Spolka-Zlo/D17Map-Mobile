import { Reservation } from '@/constants/types';
import { useAuth } from '@/providers/AuthProvider';
import { useBuilding } from '@/providers/BuildingProvider';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const reservationTypeMapper: { [key: string]: string } = {
    "Zajęcia": "CLASS",
    "Egzamin": "EXAM",
    "Kolokwium": "TEST",
    "Wykład": "LECTURE",
    "Konsultacje": "CONSULTATIONS",
    "Konferencja": "CONFERENCE",
    "Spotkanie koła naukowego": "STUDENT_CLUB_MEETING",
    "Wydarzenie": "EVENT",
}

const fetchDayReservations = async (buildingName: string, date: Date) => {
    const day = date.toISOString().split('T')[0];
    const response = await axios.get(`buildings/${buildingName}/reservations?day=${day}`, {
        timeout: 2000,
    });
    return response.data;
};

export const useDayReservations = (date: Date | null) => {
    const { buildingName } = useBuilding();
    const shouldFetch = !!date && !!buildingName;

    const queryResult = useQuery(
        ['dayReservations', buildingName, date],
        () => fetchDayReservations(buildingName!, date!),
        {
            enabled: shouldFetch,
            refetchInterval: shouldFetch ? 15000 : false,
            retry: false,
        }
    );

    return {
        reservations: queryResult.data || null,
        isReservationsError: queryResult.isError,
        isReservationsLoading: queryResult.isLoading,
    };
};

const fetchDeleteReservation = async (buildingName: string, reservationId: string) => {
    const response = await axios.delete(`buildings/${buildingName}/reservations/${reservationId}`, {
        timeout: 2000,
    });
    return response.data;
};

export const useDeleteReservation = () => {
    const queryClient = useQueryClient();
    const { buildingName } = useBuilding();

    return useMutation(
        (reservationId: string) => fetchDeleteReservation(buildingName!, reservationId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['userReservations']);
            },
            retry: 1,
        }
    );
};

const fetchEditReservation = async (buildingName: string, reservation: Reservation) => {
    reservation.type = reservationTypeMapper[reservation.type];
    const response = await axios.put(`buildings/${buildingName}/reservations/${reservation.id}`, reservation, {
        timeout: 2000,
    });
    return response.data;
};

export const useEditReservation = () => {
    const queryClient = useQueryClient();
    const { buildingName } = useBuilding();

    return useMutation(
        (reservation: Reservation) => fetchEditReservation(buildingName!, reservation),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['userReservations']);
            },
        }
    );
};

const createReservation = async (buildingName: string, reservation: Reservation) => {
    reservation.type = reservationTypeMapper[reservation.type];
    const response = await axios.post(`buildings/${buildingName}/reservations`, reservation, {
        timeout: 5000,
    });
    return response.data;
};

export const useCreateReservation = () => {
    const queryClient = useQueryClient();
    const { buildingName } = useBuilding();

    return useMutation(
        (reservation: Reservation) => createReservation(buildingName!, reservation),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['userReservations']);
            },
        }
    );
};

const fetchUserReservations = async (buildingName: string) => {
    const response = await axios.get(`buildings/${buildingName}/reservations/user/future`, {
        timeout: 2000,
    });
    if (response.status !== 200) {
        throw new Error('Error fetching reservations');
    }
    return response.data;
};

export const useUserFutureReservations = () => {
    const { authState } = useAuth();
    const { buildingName } = useBuilding();

    const { data, isLoading, isError } = useQuery(
        ['userReservations', buildingName],
        () => fetchUserReservations(buildingName!),
        {
            retry: 1,
            enabled: (authState?.authenticated ?? false) && !!buildingName,
            refetchInterval: 15000,
        }
    );

    return {
        reservations: data,
        isReservationLoading: isLoading,
        isReservationError: isError,
    };
};
