import React from 'react'
import { Button } from 'native-base'

const MainButton = (props: any) => {
    const { onPress, isDisabled, mx } = props

    return (
        <Button
            bg="red.600"
            _pressed={{ bg: 'red.800' }}
            flex="1"
            mx={mx ? mx : '2'}
            mt="2"
            isDisabled={isDisabled}
            _disabled={{ bg: 'gray.600' }}
            onPress={() => {
                onPress()
            }}
        >
            {props.children}
        </Button>
    )
}

export default MainButton
