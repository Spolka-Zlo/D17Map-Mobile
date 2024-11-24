import axios from 'axios'
import { useQuery } from 'react-query'

const fetchFutureEvents = async () => {
    const response = await axios.get(`reservations/events`, {
        timeout: 2000,
    })
    return response.data
}

export const useFutureEvents = () => {
    const { data, isError, isLoading } = useQuery(
        `events`,
        fetchFutureEvents,
        {
            retry: 1,
        }
    )
    return {
        events: data || [],
        isEventsError: isError,
        isEventsLoading: isLoading,
    }
}
