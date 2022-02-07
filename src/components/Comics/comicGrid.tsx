import { Box, View } from 'native-base'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import ComicTile from './comicTile'
import LoadingComicTile from './loadingComicTile'

type ComicsGridType = {
    comics: Comic_ShortBoxed_SplitTitle_Image[] | undefined
    loading: boolean
}

const ComicGrid = (props: ComicsGridType) => {
    const { comics, loading } = props

    return loading ? (
        <FlatList
            ListHeaderComponent={<Box h="2"></Box>}
            ListFooterComponent={<Box h="12"></Box>}
            numColumns={2}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
            keyExtractor={(item, index) => item.toString()}
            renderItem={() => {
                return <LoadingComicTile />
            }}
        />
    ) : (
        <Box>
            <FlatList
                ListHeaderComponent={<Box h="2"></Box>}
                ListFooterComponent={<Box h="12"></Box>}
                numColumns={2}
                data={comics}
                keyExtractor={(item, index) => item.diamond_id.toString()}
                renderItem={(item) => {
                    return (
                        <ComicTile
                            comic={item.item}
                            updateFocusComic={() => {}}
                        />
                    )
                }}
            />
        </Box>
    )
}

export default ComicGrid
