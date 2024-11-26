/* eslint-disable no-undef */
import { render } from '@testing-library/react-native'
import { RoomInfoPanel } from '../../components/map_components/RoomInfoPanel'

describe('RoomInfoPanel', () => {
  const mockRoom= {
    id: '1',
    name: 'Room A',
    capacity: 30,
    equipmentIds: ['eq1', 'eq2'],
    modelKey: 'model1',
  }

  it('should display a message when room is not provided', () => {
    const { getByText } = render(<RoomInfoPanel room={null} />)

    expect(getByText('Dwukrotnie kliknij na pokój, żeby zobaczyć informacje')).toBeTruthy()
  })

  it('should display room information when room is provided', () => {
    const { getByText } = render(<RoomInfoPanel room={mockRoom} />)

    expect(getByText('Sala Room A, kliknij po więcej szczegółów')).toBeTruthy()
  })
})
