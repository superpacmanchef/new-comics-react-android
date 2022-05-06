import axios from 'axios'
const link = 'https://comic-react-server.herokuapp.com'

export default (
    comicTitle: string,
    pullListMutate: ({ pullList }: { pullList: string }) => void
) => {
    axios
        .delete(`${link}/pullHandler`, {
            data: {
                comic: comicTitle.toUpperCase().replace('THE' || 'The', ''),
            },
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
