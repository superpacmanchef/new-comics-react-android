import { Box, Button } from 'native-base'
import React from 'react'
import MainButton from '../UI/MainButton'

type ComicPageNavigationProps = {
    currentPage: number
    updateCurrentPage: (val: number) => void
    currentTotalPageNo: number
}

const ComicPageNavigation = (props: ComicPageNavigationProps) => {
    const { currentPage, updateCurrentPage, currentTotalPageNo } = props
    return (
        <Box mb="2" flexDirection={'row'}>
            <MainButton
                isDisabled={currentPage === 0}
                onPress={() => {
                    if (currentPage !== 0) {
                        updateCurrentPage(currentPage - 1)
                    }
                }}
            >
                Previous
            </MainButton>
            <MainButton
                isDisabled={
                    currentPage === currentTotalPageNo - 1 ||
                    currentTotalPageNo === 0 ||
                    currentTotalPageNo === 1
                }
                onPress={() => {
                    if (currentPage !== currentTotalPageNo - 1) {
                        updateCurrentPage(currentPage + 1)
                    }
                }}
            >
                Next
            </MainButton>
        </Box>
    )
}

export default ComicPageNavigation
