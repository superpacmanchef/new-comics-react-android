import axios from 'axios'
const link = 'https://comic-react-server.herokuapp.com'

export default (
    comicTitle: string,
    pullListMutate: ({ pullList }: { pullList: string }) => void
) => {
    axios
        .post(`${link}/pullHandler`, {
            comic: comicTitle,
        })
        .then((res) => {
            if (res.data) {
                pullListMutate({
                    pullList: res.data,
                })
            }
        })
        .catch((err) => console.error(err))
}
