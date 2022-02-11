import { useNavigation } from '@react-navigation/native'
import { Center, Image, Box, Text, Button } from 'native-base'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useCollection, usePull, useUser } from '../../lib/hooks'
import addComicToPullList from '../../utils/addComicToPullList'
import removeComicFromPullList from '../../utils/removeComicFromPullList'

type ComicTileProps = {
    comic: Comic_ShortBoxed_SplitTitle_Image
    updateFocusComic: () => void
}

const ComicTile = (props: ComicTileProps) => {
    const { comic } = props
    const navigation = useNavigation<any>()

    const [user] = useUser()
    const { pullList, pullListMutate } = usePull()

    return (
        <TouchableOpacity
            style={styles.outerView}
            onPress={() => {
                navigation.push('FocusComic', { comic: comic })
            }}
        >
            <Box
                bg="muted.600"
                mb="4"
                mx="2"
                borderRadius={5}
                style={styles.outerView}
            >
                {pullList && pullList.includes(comic.title.toUpperCase()) && (
                    <Box style={{ zIndex: 35 }}>
                        <MaterialCommunityIcons
                            style={{ position: 'absolute' }}
                            name={'star'}
                            size={30}
                            color={'black'}
                        />
                    </Box>
                )}
                <Center>
                    <Image
                        source={{ uri: comic.image }}
                        alt="Alternate Text"
                        height={'200'}
                        width="400"
                        resizeMode={'contain'}
                        m="3"
                    />

                    <Text textAlign={'center'} color="white">
                        {comic.title} #{comic.issue_no}
                    </Text>
                </Center>
            </Box>
        </TouchableOpacity>
    )
}

export default ComicTile

const styles = StyleSheet.create({
    outerView: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
    },
})
