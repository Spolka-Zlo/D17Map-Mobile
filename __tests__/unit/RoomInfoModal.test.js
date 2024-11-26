/* eslint-disable no-undef */
import { render, fireEvent, waitFor, } from '@testing-library/react-native';
import { RoomInfoModal } from '../../components/map_components/RoomInfoModal';
import { useEquipmentOptions } from '@/services/classroomService';
import { getApiUrl } from '@/providers/AuthProvider';

jest.mock('@/services/classroomService', () => ({
  useEquipmentOptions: jest.fn(),
}));

jest.mock('@/providers/AuthProvider', () => ({
  getApiUrl: jest.fn(),
}));

describe('RoomInfoModal', () => {
  const mockClose = jest.fn();

  const mockRoom = {
    id: '1',
    name: 'Sala A',
    capacity: 30,
    equipmentIds: ['eq1', 'eq2'],
    modelKey: 'model1',
  };

  beforeEach(() => {
    (useEquipmentOptions).mockReturnValue({
      equipmentOptions: [
        { id: 'eq1', name: 'Projektor' },
        { id: 'eq2', name: 'Tablica' },
      ],
    });
    (getApiUrl).mockResolvedValue('https://mockapi.com/');
  });

  it('check info about room displayed', async () => {
    const { getByText } = render(
      <RoomInfoModal onClose={mockClose} room={mockRoom} />
    );

    expect(getByText('Sala A')).toBeTruthy();
    expect(getByText('Pojemność sali: 30')).toBeTruthy();
    expect(getByText('Wyposażenie: Projektor, Tablica')).toBeTruthy();
  });

  it('placeholder when image is loading', async () => {
    const { getByText } = render(
      <RoomInfoModal onClose={mockClose} room={mockRoom} />
    );
    await waitFor(() => {
      expect(getByText('Ładowanie zdjęcia...')).toBeTruthy();
    });
  });
  it('call close function on press clone button', async () => {
    const { getByText } = render(
      <RoomInfoModal onClose={mockClose} room={mockRoom} />
    );
    fireEvent.press(getByText('Zamknij'));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('error when not image', async () => {
    (getApiUrl).mockResolvedValue('https://mockapi.com/');

    const { getByText } = render(
      <RoomInfoModal onClose={mockClose} room={mockRoom} />
    );

    await waitFor(() => {
      expect(getByText('Brak zdjęcia')).toBeTruthy();
    });
  });

});
