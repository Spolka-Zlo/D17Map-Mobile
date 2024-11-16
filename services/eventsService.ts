import axios from 'axios'
import { useQuery } from 'react-query'

const fetchFutureEvents = async () => {
    const response = await axios.get(`reservations/events`)
    return response.data
}

export const useFutureEvents = () => {
    const { data, isError, isLoading } = useQuery(
        `vents`,
        fetchFutureEvents
    )
    return {
        events: data || [],
        isEventsError: isError,
        isEventsLoading: isLoading,
    }
}
