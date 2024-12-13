import axios from 'axios'
import { useQuery } from 'react-query'

const fetchClassrooms = async () => {
    const response = await axios.get('classrooms')
    return response.data
}

export const useClassrooms = () => {
    const { data, isError, isLoading } = useQuery(
        'classrooms',
        fetchClassrooms,
        {
            retry: 1,
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 5,
        }
    )
    return { rooms: data, isRoomsError: isError, isRoomsLoading: isLoading }
}

const fetchEquipment = async () => {
    const response = await axios.get('equipments')
    return response.data
}

export const useEquipmentOptions = () => {
    const { data, isError, isLoading } = useQuery('equipments', fetchEquipment)
    return {
        equipmentOptions: data || [],
        isEquipmentOptionsError: isError,
        isEquipmentOptionsLoading: isLoading,
    }
}

const fetchAvailableClassrooms = async (
    date: string,
    startTime: string,
    endTime: string,
    numberOfParticipants: number
) => {
    const response = await axios.get(
        `classrooms/available?date=${date}&timeRange=${startTime}-${endTime}&peopleCount=${numberOfParticipants}`
    )
    return response.data
}

export const useAvailableClassrooms = (
    date: string,
    startTime: string,
    endTime: string,
    numberOfParticipants: number
) => {
    const queryResult = useQuery(
        ['availableClassrooms', date, startTime, endTime],
        () =>
            fetchAvailableClassrooms(
                date,
                startTime,
                endTime,
                numberOfParticipants
            ),
        {
            retry: 1,
        }
    )

    return {
        availableClassrooms: queryResult.isError ? [] : queryResult.data,
    }
}

const fetchExtraRooms = async () => {
    const response = await axios.get('extra-rooms')
    return response.data
}

export const useExtraRooms = () => {
    const { data, isError, isLoading } = useQuery('extraRooms', fetchExtraRooms)
    return {
        extraRooms: isError ? [] : data,
        isExtraRoomsError: isError,
        isExtraRoomsLoading: isLoading,
    }
}

const fetchFloors = async () => {
    const response = await axios.get('floors', {
        timeout: 2000,
    })
    return response.data
}

export const useFloors = () => {
    const { data, isError, isLoading } = useQuery('floors', fetchFloors, {
        retry: 1,
        // staleTime: 1000 * 60 * 5,
        // cacheTime: 1000 * 60 * 5,
    })
    return {
        floors: isError ? [] : data,
        isFloorsError: isError,
        isFloorsLoading: isLoading,
    }
}
