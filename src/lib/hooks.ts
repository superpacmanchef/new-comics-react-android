import useSWR from 'swr'
const link = 'http://beb2-82-20-31-7.ngrok.io'

export const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useUser() {
    const { data, mutate } = useSWR(`${link}/userHandler/username`, fetcher)

    // if data is not defined, the query has not completed
    const loading = !data
    const user = data?.user
    return [user, { mutate, loading }]
}

export const useCollection = () => {
    const { data, mutate } = useSWR(`${link}/collectionHandler/`, fetcher)
    const collectionMutate = mutate
    // if data is not defined, the query has not completed
    const collectionLoading = !data
    let collection: Comic_ShortBoxed_SplitTitle_Image[] = []
    if (data?.collection) {
        collection = data?.collection
    }

    return { collection, collectionMutate, collectionLoading }
}

export const usePull = () => {
    const { data, mutate } = useSWR(`${link}/pullHandler/`, fetcher)
    const pullListMutate = mutate
    // if data is not defined, the query has not completed
    const pullListLoading = !data
    const pullList: string[] = data?.pullList ? data?.pullList : []

    return {
        pullList,
        pullListMutate,
        pullListLoading,
    }
}
