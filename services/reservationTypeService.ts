import axios from 'axios'
import { useQuery } from 'react-query'

async function fetchReservationTypes() {
    // const response = await axios.get(`reservations-types/`)

    return [
        'CLASS',
        'EXAM',
        'TEST',
        'LECTURE',
        'CONSULTATIONS',
        'CONFERENCE',
        'STUDENTS_CLUB_MEETING',
        'EVENT',
    ]
}

export const useReservationTypes = () => {
    const { data, isError, isLoading } = useQuery(
        'reservationTypes',
        fetchReservationTypes,
        {
            retry: 1,
            
        }
    )
    return {
        reservationTypes: data,
        isReservationTypesError: isError,
        isReservationTypesLoading: isLoading,
    }
}
