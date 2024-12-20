import axios from 'axios'
import { useQuery } from 'react-query'
import { reservationTypeMapper } from './reservationService'

async function fetchReservationTypes() {
    const response = await axios.get(`reservations/types`)
    return response.data
}

export const useReservationTypes = () => {
    const { data, isError, isLoading } = useQuery(
        'reservationTypes',
        fetchReservationTypes,
        {
            retry: 1,
            
        }
    )

    const reverseReservationTypeMapper = Object.fromEntries(
        Object.entries(reservationTypeMapper).map(([key, value]) => [value, key])
    );

    if (!data) {
        return {
            reservationTypes: [],
            isReservationTypesError: isError,
            isReservationTypesLoading: isLoading,
        }
    }


    const mappedData = data.map((reservationType: string) =>
        reverseReservationTypeMapper[reservationType] || "UNKNOWN"
      );
    
    const filteredData = mappedData.filter((reservationType: string) => reservationType !== "UNKNOWN");

    return {
        reservationTypes: filteredData || [],
        isReservationTypesError: isError,
        isReservationTypesLoading: isLoading,
    }
}
