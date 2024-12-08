import axios from 'axios'
import { useQuery } from 'react-query'

const fetchFutureEvents = async () => {
    const response = await axios.get(`reservations/events`, {
        timeout: 2000,
    })
    return response.data
}

export const useFutureEvents = () => {
    const { data, isError, isLoading, refetch } = useQuery(
        `events`,
        fetchFutureEvents,
        {
            retry: 1,
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 5,
        }
    )

    const refreshEvents = async () => {
        try {
            await refetch()
        } catch {
            // Do nothing
        }
    }

    return {
        events: data || [],
        isEventsError: isError,
        isEventsLoading: isLoading,
        refreshEvents,
    }
}
