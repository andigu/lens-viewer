import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import {FixedSizeList} from "react-window";
import {ListItem, makeStyles, Typography} from "@material-ui/core";
import React from "react";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        flexDirection: 'row',
        padding: `${theme.spacing(1)}px`,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}))

export default function LensList(props) {
    const {candidates, batch, loadCands, cursor, setCursor} = props;
    const classes = useStyles()
    const listRef = React.createRef()
    const isItemLoaded = i => Boolean(candidates[i])
    React.useEffect(() => {
        if (listRef.current && cursor >= 0) listRef.current.scrollToItem(cursor, 'center')
    }, [cursor])
    return <Paper style={{height: '100%'}}><AutoSizer>
        {({height, width}) => <InfiniteLoader isItemLoaded={isItemLoaded}
                                              itemCount={batch.n_cands}
                                              minimumBatchSize={20}
                                              loadMoreItems={loadCands}>
            {({onItemsRendered, ref}) => (
                <FixedSizeList height={height} width={width} itemSize={100} itemCount={batch.n_cands} ref={(r) => {
                    ref(r)
                    listRef.current = r
                }} onItemsRendered={onItemsRendered} layout="vertical">
                    {({index: i, style}) => {
                        return <ListItem key={i} style={style} className={classes.card} button
                                         selected={i === cursor} onClick={() => setCursor(i)}>
                            <div>
                                <Typography variant="body1">
                                    {isItemLoaded(i) ? `Lens #${candidates[i].order}` : `loading ${i}`}
                                </Typography>
                            </div>
                            {isItemLoaded(i) && <img src={candidates[i].url} style={{height: '100%'}}
                                                     alt='Lens preview'/>}
                        </ListItem>
                    }}
                </FixedSizeList>
            )}

        </InfiniteLoader>
        }

    </AutoSizer></Paper>
}