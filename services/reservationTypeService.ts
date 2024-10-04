import { ipaddress } from '@/constants/IP'
import axios from 'axios'
import { useQuery } from 'react-query'

async function fetchReservationTypes() {
    const response = await axios.get(`${ipaddress}reservations-types/`)
    return response.data.types
}

export const useReservationTypes = () => {
    const { data, isError, isLoading } = useQuery(
        'reservationTypes',
        fetchReservationTypes
    )
    return {
        reservationTypes: data,
        isReservationTypesError: isError,
        isReservationTypesLoading: isLoading,
    }
}
