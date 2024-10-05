import axios from 'axios'
import { useQuery } from 'react-query'

const fetchClassrooms = async () => {
    const response = await axios.get('classrooms/')
    return response.data
}

export const useClassrooms = () => {
    const { data, isError, isLoading } = useQuery('classrooms', fetchClassrooms)
    return { rooms: data, isRoomsError: isError, isRoomsLoading: isLoading }
}

const fetchEquipment = async () => {
    const response = await axios.get('equipments/')
    console.log(response.data, 'equipments')
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
