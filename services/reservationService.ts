import { Reservation } from '@/components/CompleteReservationPopUp'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const fetchDayReservations = async (date: Date) => {
    const day = date.toISOString().split('T')[0]
    const response = await axios.get('reservations/day/?day=' + day, {
        timeout: 2000,
    })
    return response.data
}

export const useDayReservations = (date: Date | null) => {
    const shouldFetch = !!date

    const queryResult = useQuery(
        ['dayReservations', date],
        () => fetchDayReservations(date!),
        {
            enabled: shouldFetch,
            refetchInterval: (data, query) => {
                if (query.state.error) {
                    return false
                }
                return shouldFetch ? 15000 : false
            },
            retry: false,
        }
    )

    return {
        reservations: queryResult.data || null,
        isReservationsError: queryResult.isError,
        isReservationsLoading: queryResult.isLoading,
    }
}

const fetchDeleteReservation = async (id: number) => {
    const response = await axios.delete(`reservations/${id}/`, {
        timeout: 2000,
    })
    return response.data
}

export const useDeleteReservation = (userId: number | undefined) => {
    const queryClient = useQueryClient()

    return useMutation(fetchDeleteReservation, {
        onSuccess: () => {
            queryClient.invalidateQueries(['userReservations', userId])
        },
        retry: 1,
    })
}

async function createReservation(reservation: Reservation) {
    const response = await axios.post('reservations/', reservation, {
        timeout: 5000,
    })
    return response.data
}

export const useCreateReservation = (userId: number) => {
    const queryClient = useQueryClient()

    return useMutation(createReservation, {
        onSuccess: () => {
            queryClient.invalidateQueries(['userReservations', userId])
        },
    })
}

export const fetchUserReservations = async (userId: number) => {
    const response = await axios.get(`users/${userId}/future-reservations/`, {
        timeout: 2000,
    })
    if (response.status !== 200) {
        throw new Error('Error fetching reservations')
    }
    return response.data
}

export const useUserFutureReservations = (userId: number | undefined) => {
    const { data, isLoading, isError } = useQuery(
        ['userReservations', userId],
        () => fetchUserReservations(userId!),
        {
            enabled: !!userId,
            retry: 1,
        }
    )
    return {
        reservations: data,
        isReservationLoading: isLoading,
        isReservationError: isError,
    }
}
