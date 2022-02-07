import { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios'
import { Box, Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import ComicComponent from '../components/Comics/comicComponent'
import { HomeStackParamList } from '../components/Nav/Nav'
import filterComicPublishers from '../utils/filterComicPublishers'
const link = 'http://edc0-82-20-31-7.ngrok.io'

export type HomeScreenProps = NativeStackScreenProps<any, any>

const Home = (props: HomeScreenProps) => {
    const [chosenWeeksComics, updateChosenWeeksComics] = useState<
        Comic_ShortBoxed_SplitTitle_Image[]
    >([])
    const [chosenWeeksComicsFilter, updateChosenWeeksComicsFilter] = useState<
        Comic_ShortBoxed_SplitTitle_Image[] | null
    >(null)
    const [currentChosenWeek, updateCurrentChosenWeek] = useState(1)
    const [lastChosenWeek, updateLastChosenWeek] = useState<number>()
    const [currentPublisher, updateCurrentPublisher] = useState('ALL')

    const getWeeksComics = async () => {
        if (currentChosenWeek !== lastChosenWeek) {
            updateLastChosenWeek(currentChosenWeek)

            axios
                .get(`${link}/weekComics/?week=${currentChosenWeek}`)
                .then((res) => {
                    const weekArrayWithImage = res.data.map(
                        (comic: Comic_ShortBoxed_SplitTitle) => {
                            return { ...comic, image: 'null' }
                        }
                    )

                    updateChosenWeeksComics(weekArrayWithImage)

                    const filteredChosenWeeksComics = filterComicPublishers(
                        weekArrayWithImage,
                        currentPublisher,
                        { pullList: [] }
                    )

                    updateChosenWeeksComicsFilter(filteredChosenWeeksComics)
                })
                .catch((err) => console.log(err))
        } else {
            const filteredChosenWeeksComics = filterComicPublishers(
                chosenWeeksComics,
                currentPublisher,
                { pullList: [] }
            )

            updateChosenWeeksComicsFilter(filteredChosenWeeksComics)
        }
    }

    useEffect(() => {
        getWeeksComics()
    }, [])

    return (
        <Box bg="muted.800" flex="1" px="2">
            <ComicComponent chosenWeeksComicsFilter={chosenWeeksComicsFilter} />
        </Box>
    )
}

export default Home
