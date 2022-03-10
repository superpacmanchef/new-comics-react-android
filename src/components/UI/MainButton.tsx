import React from 'react'
import { Button } from 'native-base'

const MainButton = (props: any) => {
    const { onPress, isDisabled, mx, isLoading, fontSize } = props
    console.log()

    return (
        <Button
            bg="red.600"
            _pressed={{ bg: 'red.800' }}
            flex="1"
            mx={mx ? mx : '2'}
            mt="2"
            _loading={{ bg: 'red.800' }}
            _text={{
                fontSize: fontSize ? fontSize : 'md',
            }}
            isLoadingText={'Submitting'}
            isLoading={isLoading === true ? isLoading : false}
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
