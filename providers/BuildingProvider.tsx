import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { router } from 'expo-router'
import { useQuery } from 'react-query'
import { ipaddress } from '@/constants/ip'
import { Building } from '@/constants/types'

interface BuildingProps {
    buildingId: string | null
    buildingName: string
    setBuilding: (buildingId: string) => void
    availableBuildings: Building[] // Replace `Building` with your actual building type
    isBuildingsLoading: boolean
    isBuildingsError: boolean
}


const BUILDING_KEY = 'buildingId'
const BuildingContext = createContext<BuildingProps>({
    buildingId: null,
    buildingName: 'D17',
    setBuilding: () => {},
    availableBuildings: [],
    isBuildingsLoading: false,
    isBuildingsError: false,
})

export const useBuilding = () => {
    return useContext(BuildingContext)
}

export const BuildingProvider = ({ children }: { children: ReactNode }) => {
    const [buildingId, setBuildingId] = useState<string | null>(null)
    const [buildingName, setBuildingName] = useState<string>('D17')

    const fetchBuildings = async () => {
        // const response = await axios.get(`${ipaddress}/buildings`, {
        //     timeout: 2000,
        // })
        // return response.data
        return [
            {
                id: '1',
                name: 'D17',
            },
            {
                id: '2',
                name: 'D5',
            },
        ]
    }

    const { data: availableBuildings = [], isError, isLoading } = useQuery(
        'buildings',
        fetchBuildings,
        {
            retry: 1,
            staleTime: 1000 * 60 * 5, // 5 minutes
            cacheTime: 1000 * 60 * 5, // 5 minutes
        }
    )

    useEffect(() => {
        const loadBuilding = async () => {
            const savedBuildingId = await SecureStore.getItemAsync(BUILDING_KEY)
            if (savedBuildingId) {
                setBuildingId(savedBuildingId)
                setBuildingName(availableBuildings.find((b) => b.id === savedBuildingId)?.name || 'D17')
                router.navigate('/(tabs)')
            } else {
                router.navigate('/pages/buildingPage')
            }
            if (!isLoading && availableBuildings.length == 0) {
                router.navigate('/(tabs)')
            }
        }
        loadBuilding()
    }, [])

    const setBuilding = async (buildingId: string) => {
        setBuildingId(buildingId)
        setBuildingName(availableBuildings.find((b) => b.id === buildingId)?.name || 'D17')
        await SecureStore.setItemAsync(BUILDING_KEY, buildingId)
    }

    const value = {
        buildingId,
        buildingName,
        setBuilding,
        availableBuildings,
        isBuildingsLoading: isLoading,
        isBuildingsError: isError,
    }

    return <BuildingContext.Provider value={value}>{children}</BuildingContext.Provider>
}