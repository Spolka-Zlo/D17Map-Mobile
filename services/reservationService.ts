import { Reservation } from '@/components/CompleteReservationPopUp'
import { ipaddress } from '@/constants/IP'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const fetchDayReservations = async (date: Date) => {
    let day = date.toISOString().split('T')[0]
    const response = await axios.get(ipaddress + 'reservations/day/?day=' + day)
    return response.data
}

export const useDayReservations = (date: Date | null) => {
    const shouldFetch = !!date

    const queryResult = useQuery(
        ['dayReservations', date],
        () => fetchDayReservations(date!),
        {
            enabled: shouldFetch,
            refetchInterval: shouldFetch ? 15000 : false,
        }
    )

    return {
        reservations: queryResult.data || null,
        isReservationsError: queryResult.isError,
        isReservationsLoading: queryResult.isLoading,
    }
}

const fetchDeleteReservation = async (id: number) => {
    const response = await axios.delete(`${ipaddress}reservations/${id}/`)
    if (response.status === 204) {
        return 0
    }
    throw new Error(`Failed to delete reservation. Status: ${response.status}`)
}

export const useDeleteReservation = (
    userId: number | undefined,
    token: string | undefined
) => {
    const queryClient = useQueryClient()

    return useMutation(fetchDeleteReservation, {
        onSuccess: () => {
            queryClient.invalidateQueries(['userReservations', userId])
        },
    })
}

async function createReservation(reservation: Reservation) {
    const response = await axios.post(
        ipaddress + 'reservations/',
        reservation,
        {
            timeout: 5000,
        }
    )
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

export const fetchUserReservations = async (userId: number, token: string) => {
    const response = await axios.get(
        `${ipaddress}users/${userId}/future-reservations/`
    )
    if (response.status !== 200) {
        throw new Error('Error fetching reservations')
    }
    return response.data
}

export const useUserFutureReservations = (
    userId: number | undefined,
    token: string | undefined
) => {
    return useQuery(
        ['userReservations', userId],
        () => fetchUserReservations(userId!, token!),
        {
            enabled: !!userId && !!token,
            refetchInterval: 15000,
        }
    )
}
