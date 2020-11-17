import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import {FixedSizeList} from "react-window";
import {Button, Divider, ListItem, makeStyles, Typography} from "@material-ui/core";
import React from "react";
import Paper from "@material-ui/core/Paper";
import {connect} from "react-redux";

const grades = ['Grade A', 'Grade B', 'Grade C', 'Grade D', 'Non lens']
const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        flexDirection: 'row',
        padding: `${theme.spacing(1)}px`,
        paddingLeft: `${theme.spacing(2)}px`,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }
}))

function LensList(props) {
    const {candidates, useSkyviewer, batch, loadCands, cursor, setCursor, nextUngraded} = props;
    const classes = useStyles()
    const listRef = React.createRef()
    const isItemLoaded = i => Boolean(candidates[i])
    React.useEffect(() => {
        if (listRef.current && cursor >= 0) listRef.current.scrollToItem(cursor, 'center')
    }, [cursor])
    return <Paper className={classes.container}>
        <Button style={{width: '100%', flex: 0}} onClick={nextUngraded}>Next Ungraded</Button>
        <Divider/>
        <div style={{flex: 1}}>
            <AutoSizer>
                {({height, width}) => <InfiniteLoader isItemLoaded={isItemLoaded}
                                                      itemCount={batch.n_cands}
                                                      minimumBatchSize={20}
                                                      loadMoreItems={(start, stop) => loadCands({start, stop})}>
                    {({onItemsRendered, ref}) => (
                        <FixedSizeList height={height} width={width} itemSize={100} itemCount={batch.n_cands}
                                       ref={(r) => {
                                           if (r) {
                                               ref(r)
                                               listRef.current = r
                                           }
                                       }} onItemsRendered={onItemsRendered} layout="vertical">
                            {({index: i, style}) => {
                                return <ListItem key={i} style={style} className={classes.card} button
                                                 selected={i === cursor} onClick={() => setCursor({cursor: i})}>
                                    <div>
                                        {isItemLoaded(i) ? <>
                                            <Typography variant="body1">
                                                Cand #{candidates[i].order}
                                            </Typography>
                                            <Typography variant="body1"
                                                        style={{color: candidates[i].grade ? 'green' : 'red'}}>
                                                {candidates[i].grade ? grades[candidates[i].grade - 1] : 'Ungraded'}
                                            </Typography>
                                        </> : <Typography variant="body1">Loading...</Typography>
                                        }

                                    </div>
                                    {isItemLoaded(i) && <img src={useSkyviewer ? candidates[i].skyviewer : candidates[i].filename} style={{height: '100%'}}
                                                             alt='Lens preview'/>}
                                </ListItem>
                            }}
                        </FixedSizeList>
                    )}

                </InfiniteLoader>
                }

            </AutoSizer>
        </div>
    </Paper>
}

export default connect(state => ({useSkyviewer: state.data.useSkyviewer}))(LensList)