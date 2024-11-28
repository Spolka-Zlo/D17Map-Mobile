/* eslint-disable no-undef */
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { OrangeButton } from '../../components/OrangeButton'

test('call function after press', () => {
    const onPressMock = jest.fn()
    const { getByText } = render(
        <OrangeButton onPress={onPressMock} text="Kliknij mnie" />
    )

    fireEvent.press(getByText('Kliknij mnie'))

    expect(onPressMock).toHaveBeenCalledTimes(1)
})

test('not call function when disabled', () => {
    const onPressMock = jest.fn()
    const { getByText } = render(
        <OrangeButton onPress={onPressMock} text="Kliknij mnie" disabled />
    )

    fireEvent.press(getByText('Kliknij mnie'))

    expect(onPressMock).not.toHaveBeenCalled()
})
