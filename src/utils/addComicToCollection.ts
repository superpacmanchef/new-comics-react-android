import axios from 'axios'
import { useCollection } from '../lib/hooks'
const link = 'http://beb2-82-20-31-7.ngrok.io'

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
        .catch((err) => console.error(err))
}
