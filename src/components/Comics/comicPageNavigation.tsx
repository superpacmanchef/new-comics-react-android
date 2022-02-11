import { Box, Button } from 'native-base'
import React from 'react'

type ComicPageNavigationProps = {
    currentPage: number
    updateCurrentPage: (val: number) => void
    currentTotalPageNo: number
}

const ComicPageNavigation = (props: ComicPageNavigationProps) => {
    const { currentPage, updateCurrentPage, currentTotalPageNo } = props
    return (
        <Box mb="2" flexDirection={'row'}>
            <Button
                bg="red.600"
                flex="1"
                mx="4"
                mt="2"
                isDisabled={currentPage === 0}
                _disabled={{ bg: 'gray.600' }}
                _pressed={{ bg: 'red.700' }}
                onPress={() => {
                    if (currentPage !== 0) {
                        updateCurrentPage(currentPage - 1)
                    }
                }}
            >
                Previous
            </Button>
            <Button
                bg="red.600"
                _pressed={{ bg: 'red.800' }}
                flex="1"
                mx="4"
                mt="2"
                isDisabled={
                    currentPage === currentTotalPageNo - 1 ||
                    currentTotalPageNo === 0 ||
                    currentTotalPageNo === 1
                }
                _disabled={{ bg: 'gray.600' }}
                onPress={() => {
                    if (currentPage !== currentTotalPageNo - 1) {
                        updateCurrentPage(currentPage + 1)
                    }
                }}
            >
                Next
            </Button>
        </Box>
    )
}

export default ComicPageNavigation
