// Filters out comics based on publisher state and returns.
export default (
    comics: Comic_ShortBoxed_SplitTitle_Image[],
    publisher: any,
    pull: { pullList: string[] }
): Comic_ShortBoxed_SplitTitle_Image[] => {
    if (publisher === 'ALL') {
        return comics
    }
    if (publisher === 'PULL') {
        const f: Comic_ShortBoxed_SplitTitle_Image[] = []
        comics.forEach((comic: Comic_ShortBoxed_SplitTitle_Image) => {
            if (pull.pullList.includes(comic.title)) {
                f.push(comic)
            }
        })
        return f
    }
    const f = comics.filter((comic) => comic.publisher === publisher)
    return f
}
