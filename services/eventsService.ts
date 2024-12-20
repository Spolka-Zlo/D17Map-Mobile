import { useBuilding } from '@/providers/BuildingProvider';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchFutureEvents = async (buildingName: string) => {
    const response = await axios.get(`buildings/${buildingName}/reservations/events`, {
        timeout: 2000,
    });
    return response.data;
};

export const useFutureEvents = () => {
    const { buildingName } = useBuilding();
    const { data, isError, isLoading, refetch } = useQuery(
        ['events', buildingName],
        () => fetchFutureEvents(buildingName),
        {
            retry: 1,
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 5,
            enabled: !!buildingName,
        }
    );

    const refreshEvents = async () => {
        try {
            await refetch();
        } catch {
            // Do nothing
        }
    };

    return {
        events: data || [],
        isEventsError: isError,
        isEventsLoading: isLoading,
        refreshEvents,
    };
};
