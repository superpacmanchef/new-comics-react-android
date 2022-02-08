import { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios'
import {
    Box,
    Button,
    CheckIcon,
    FormControl,
    Input,
    Modal,
    Select,
    Text,
} from 'native-base'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ComicComponent from '../components/Comics/comicComponent'
import { HomeStackParamList } from '../components/Nav/Nav'
import filterComicPublishers from '../utils/filterComicPublishers'
const link = 'http://1833-82-20-31-7.ngrok.io'

export type HomeScreenProps = NativeStackScreenProps<any, any>

const Home = (props: any) => {
    const [chosenWeeksComics, updateChosenWeeksComics] = useState<
        Comic_ShortBoxed_SplitTitle_Image[]
    >([])
    const [chosenWeeksComicsFilter, updateChosenWeeksComicsFilter] = useState<
        Comic_ShortBoxed_SplitTitle_Image[] | null
    >(null)
    const [currentChosenWeek, updateCurrentChosenWeek] = useState(1)
    const [lastChosenWeek, updateLastChosenWeek] = useState<number>()
    const [currentPublisher, updateCurrentPublisher] = useState('ALL')
    const [showModal, updateShowModal] = useState(false)

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

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Box mr="2">
                    <MaterialCommunityIcons
                        name="filter"
                        color="white"
                        size={30}
                        onPress={() => {
                            updateShowModal(true)
                        }}
                    />
                </Box>
            ),
        })
    }, [])

    return (
        <Box bg="muted.800" flex="1" px="2">
            <Modal
                isOpen={showModal}
                onClose={() => {
                    updateShowModal(false)
                }}
            >
                <Modal.Content maxWidth="400px" height={'300px'} bg="muted.500">
                    <Modal.CloseButton bg="white" />

                    <Modal.Header>
                        <Text color="white" fontSize={16}>
                            Filter
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <Text color="white">Week</Text>
                            <Select
                                bg="white"
                                selectedValue={currentChosenWeek.toString()}
                                minWidth="200"
                                accessibilityLabel="Choose Week"
                                placeholder="Choose Week"
                                _selectedItem={{
                                    bg: 'red.500',
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                onValueChange={(itemValue) =>
                                    updateCurrentChosenWeek(parseInt(itemValue))
                                }
                            >
                                <Select.Item label="Last Week" value="0" />
                                <Select.Item label="Current Week" value="1" />
                                <Select.Item label="Next Week" value="2" />
                            </Select>
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>
                                <Text color="white">Publisher</Text>
                            </FormControl.Label>
                            <Select
                                bg="white"
                                selectedValue={currentPublisher}
                                minWidth="200"
                                accessibilityLabel="Choose Publisher"
                                placeholder="Choose Publisher"
                                _selectedItem={{
                                    bg: 'red.500',
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                onValueChange={(itemValue) =>
                                    updateCurrentPublisher(itemValue)
                                }
                            >
                                <Select.Item label="All" value="ALL" />
                                <Select.Item
                                    label="MARVEL"
                                    value="MARVEL COMICS"
                                />
                            </Select>
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer bg="muted.500">
                        <Button
                            mx="auto"
                            w="24"
                            bg="red.600"
                            onPress={() => {
                                getWeeksComics()
                                updateShowModal(false)
                            }}
                        >
                            Filter
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <ComicComponent chosenWeeksComicsFilter={chosenWeeksComicsFilter} />
        </Box>
    )
}

export default Home
