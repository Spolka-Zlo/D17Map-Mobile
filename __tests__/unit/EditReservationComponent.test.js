/* eslint-disable no-undef */
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import EditReservationComponent from '../../components/reservation_components/EditReservationComponent'
import { useEditReservation } from '@/services/reservationService'
import { useAvailableClassrooms, useEquipmentOptions } from '@/services/classroomService'
import { useReservationTypes, reverseReservationTypeMapper } from '@/services/reservationTypeService'

jest.mock('@/services/reservationService', () => ({
    useEditReservation: jest.fn(),
}))

jest.mock('@/services/classroomService', () => ({
    useAvailableClassrooms: jest.fn(),
    useEquipmentOptions: jest.fn(),
}))

jest.mock('@/services/reservationTypeService', () => ({
    useReservationTypes: jest.fn(),
    reservationTypeMapper: {
        "Zajęcia": "CLASS",
        "Egzamin": "EXAM",
        "Kolokwium": "TEST",
        "Wykład": "LECTURE",
        "Konsultacje": "CONSULTATIONS",
        "Konferencja": "CONFERENCE",
        "Spotkanie koła naukowego": "STUDENT_CLUB_MEETING",
        "Wydarzenie": "EVENT",
    },
    reverseReservationTypeMapper: {
        "CLASS": "Zajęcia",
        "EXAM": "Egzamin",
        "TEST": "Kolokwium",
        "LECTURE": "Wykład",
        "CONSULTATIONS": "Konsultacje",
        "CONFERENCE": "Konferencja",
        "STUDENT_CLUB_MEETING": "Spotkanie koła naukowego",
        "EVENT": "Wydarzenie",
    },
}))

describe('EditReservationComponent', () => {
    const mockReservation = {
        id: '1',
        title: 'Meeting',
        description: 'Team meeting',
        date: '2024-11-26',
        startTime: '10:00',
        endTime: '12:00',
        classroom: { id: '1', name: 'Room A' },
        numberOfParticipants: 10,
        type: 'CLASS',
    }

    const mockClassrooms = [
        { id: '1', name: 'Room A', capacity: 30, equipmentIds: [] },
        { id: '2', name: 'Room B', capacity: 25, equipmentIds: [] },
    ]

    const mockSetReservation = jest.fn()
    const mockSetEditSectionVisible = jest.fn()

    const mockEquipment = [
        { id: '1', name: 'Projector' },
        { id: '2', name: 'Whiteboard' },
        { id: '3', name: 'Microphone' },
    ]

    beforeEach(() => {
        useEditReservation.mockReturnValue({
            mutate: jest.fn(),
            isSuccess: false,
            isError: false,
            isLoading: false,
            reset: jest.fn(),
        })

        useAvailableClassrooms.mockReturnValue({
            availableClassrooms: mockClassrooms,
        })
        
        useEquipmentOptions.mockReturnValue({
            equipmentOptions: mockEquipment,
        })

        useReservationTypes.mockReturnValue({
            reservationTypes: ['CLASS', 'CONSULTATIONS'],
        })
    })
    
    it('should render the modal with reservation data', () => {
        expect(reverseReservationTypeMapper).toBeDefined();
        const { getByText, getByDisplayValue } = render(
            <EditReservationComponent
                reservation={mockReservation}
                setReservation={mockSetReservation}
                setEditSectionVisible={mockSetEditSectionVisible}
                classRooms={mockClassrooms}
            />
        )

        expect(getByText('Tytuł rezerwacji:')).toBeTruthy()
        expect(getByText('Opis:')).toBeTruthy()
        expect(getByText('Typ rezerwacji:')).toBeTruthy()
        expect(getByText('Dostępne sale:')).toBeTruthy()
        expect(getByDisplayValue(mockReservation.title)).toBeTruthy()
        expect(getByDisplayValue(mockReservation.description)).toBeTruthy()
        expect(getByText('Zapisz zmiany')).toBeTruthy()
        expect(getByText('Powrót')).toBeTruthy()
    })

    it('should update the title input correctly', () => {
        const { getByDisplayValue } = render(
            <EditReservationComponent
                reservation={mockReservation}
                setReservation={mockSetReservation}
                setEditSectionVisible={mockSetEditSectionVisible}
                classRooms={mockClassrooms}
            />
        )

        const titleInput = getByDisplayValue(mockReservation.title)
        fireEvent.changeText(titleInput, 'New Meeting Title')

        expect(titleInput.props.value).toBe('New Meeting Title')
    })

    it('should call handleEdit when save changes button is pressed', async () => {
        const mockMutate = jest.fn()
        useEditReservation.mockReturnValueOnce({
            mutate: mockMutate,
            isSuccess: true,
            isError: false,
            isLoading: false,
            reset: jest.fn(),
        })

        const { getByText } = render(
            <EditReservationComponent
                reservation={mockReservation}
                setReservation={mockSetReservation}
                setEditSectionVisible={mockSetEditSectionVisible}
                classRooms={mockClassrooms}
            />
        )

        fireEvent.press(getByText('Zapisz zmiany'))

        expect(getByText('Zmiany w rezerwacji zostały zapisane')).toBeTruthy()
    })

    it('should close the modal when cancel button is pressed', () => {
        const { getByText } = render(
            <EditReservationComponent
                reservation={mockReservation}
                setReservation={mockSetReservation}
                setEditSectionVisible={mockSetEditSectionVisible}
                classRooms={mockClassrooms}
            />
        )

        fireEvent.press(getByText('Powrót'))

        expect(mockSetEditSectionVisible).toHaveBeenCalledWith(false)
    })

    it('should show a success message when reservation is saved successfully', () => {
        useEditReservation.mockReturnValueOnce({
            mutate: jest.fn(),
            isSuccess: true,
            isError: false,
            isLoading: false,
            reset: jest.fn(),
        })

        const { getByText } = render(
            <EditReservationComponent
                reservation={mockReservation}
                setReservation={mockSetReservation}
                setEditSectionVisible={mockSetEditSectionVisible}
                classRooms={mockClassrooms}
            />
        )

        expect(getByText('Zmiany w rezerwacji zostały zapisane')).toBeTruthy()
    })

    it('should show an error message when saving the reservation fails', () => {
        useEditReservation.mockReturnValueOnce({
            mutate: jest.fn(),
            isSuccess: false,
            isError: true,
            isLoading: false,
            reset: jest.fn(),
        })

        const { getByText } = render(
            <EditReservationComponent
                reservation={mockReservation}
                setReservation={mockSetReservation}
                setEditSectionVisible={mockSetEditSectionVisible}
                classRooms={mockClassrooms}
            />
        )

        expect(getByText('Nie udało się zapisać rezerwacji')).toBeTruthy()
    })

    it('should show a loading screen when saving the reservation', () => {
        useEditReservation.mockReturnValueOnce({
            mutate: jest.fn(),
            isSuccess: false,
            isError: false,
            isLoading: true,
            reset: jest.fn(),
        })
        const { getByText } = render(
            <EditReservationComponent
                reservation={mockReservation}
                setReservation={mockSetReservation}
                setEditSectionVisible={mockSetEditSectionVisible}
                classRooms={mockClassrooms}
            />
        )
        waitFor(() => {
            expect(getByText('Zapisywanie rezerwacji')).toBeTruthy()
        })
    })
})
