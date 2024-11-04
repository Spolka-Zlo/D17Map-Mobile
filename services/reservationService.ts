import { Reservation } from '@/constants/types'
import { useAuth } from '@/providers/AuthProvider'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const fetchDayReservations = async (date: Date) => {
    const day = date.toISOString().split('T')[0]
    const response = await axios.get('reservations?day=' + day, {
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

const fetchDeleteReservation = async (reservationId: string) => {
    const response = await axios.delete(`reservations/${reservationId}/`, {
        timeout: 2000,
    })
    return response.data
}

export const useDeleteReservation = () => {
    const queryClient = useQueryClient()

    return useMutation(fetchDeleteReservation, {
        onSuccess: () => {
            queryClient.invalidateQueries(['userReservations'])
        },
        retry: 1,
    })
}

const fetchEditReservation = async (reservation: Reservation) => {
    const response = await axios.put(`reservations/`, reservation, {
        timeout: 2000,
    })
    return response.data
}

export const useEditReservation = () => {
    const queryClient = useQueryClient()

    return useMutation(fetchEditReservation, {
        onSuccess: () => {
            queryClient.invalidateQueries(['userReservations'])
        },
    })
}

async function createReservation(reservation: Reservation) {
    console.log(reservation, 'asdfasdasdfasdfasfdasdfaf')
    const response = await axios.post('reservations', reservation, {
        timeout: 5000,
    })
    return response.data
}

export const useCreateReservation = () => {
    const queryClient = useQueryClient()

    return useMutation(createReservation, {
        onSuccess: () => {
            queryClient.invalidateQueries(['userReservations'])
        },
    })
}

export const fetchUserReservations = async () => {
    const response = await axios.get(`reservations/user/future`, {
        timeout: 2000,
    })
    if (response.status !== 200) {
        throw new Error('Error fetching reservations')
    }
    return response.data
}

export const useUserFutureReservations = () => {
    const { authState } = useAuth()
    const { data, isLoading, isError } = useQuery(
        ['userReservations'],
        fetchUserReservations,
        {
            retry: 1,
            enabled: authState?.authenticated ?? false,
        }
    )
    return {
        reservations: data,
        isReservationLoading: isLoading,
        isReservationError: isError,
    }
}
