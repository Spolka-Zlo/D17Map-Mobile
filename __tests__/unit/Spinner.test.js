/* eslint-disable no-undef */
import React from 'react'
import { render } from '@testing-library/react-native'
import { Spinner } from '../../components/Spinner'

describe('Spinner Component', () => {
    test('renders correctly when isLoading is true and text is provided', () => {
        const { getByTestId, getByText } = render(
            <Spinner isLoading={true} text="Loading..." />
        )

        expect(getByTestId('spinner-indicator')).toBeTruthy()
        expect(getByText('Loading...')).toBeTruthy()
    })

    test('renders correctly when isLoading is true and text is not provided', () => {
        const { getByTestId } = render(<Spinner isLoading={true} />)

        expect(getByTestId('spinner-indicator')).toBeTruthy()
    })

    test('does not render when isLoading is false', () => {
        const { queryByTestId, queryByText } = render(
            <Spinner isLoading={false} text="Loading..." />
        )

        expect(queryByTestId('spinner-indicator')).toBeNull()
        expect(queryByText('Loading...')).toBeNull()
    })
})
