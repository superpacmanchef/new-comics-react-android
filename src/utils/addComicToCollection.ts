import axios from 'axios'
const link = 'https://comic-react-server.herokuapp.com'
import { Alert } from 'react-native'

export default (
    comic: Comic_ShortBoxed_SplitTitle_Image,
    collectionMutate: ({
        collection,
    }: {
        collection: Comic_ShortBoxed_SplitTitle_Image[]
    }) => void
) => {
    axios
        .post(`${link}/collectionHandler`, {
            comic,
        })
        .then((res) => {
            if (res.data) {
                collectionMutate(res.data)
            }
        })
        .catch((err) => Alert.alert('Something went wrong. Please try again.'))
}
