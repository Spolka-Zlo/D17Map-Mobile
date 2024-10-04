import { ipaddress } from '@/constants/IP'
import axios from 'axios'
import { useQuery } from 'react-query'

const fetchClassrooms = async () => {
    const response = await axios.get(`${ipaddress}classrooms/`)
    return response.data
}

export const useClassrooms = () => {
    const { data, isError, isLoading } = useQuery('classrooms', fetchClassrooms)
    return { rooms: data, isRoomsError: isError, isRoomsLoading: isLoading }
}
