import React from "react";
import {Button, makeStyles, Paper, Snackbar, TextField, Typography} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import LensData from "./LensData";
import ProgressPanel from "./ProgressPanel";
import LensList from "./LensList";
import MuiAlert from '@material-ui/lab/Alert';
import {connect} from "react-redux";
import {dataSlice, fetchCands, fetchCounts, fetchCursor, selectedBatch, setComment, setGrade} from "./redux";
import LensImage from "./LensImage";

const useStyles = makeStyles(theme => ({
    content: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.palette.background.default,
        height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 3*${theme.spacing(3)}px)`,
        gap: `${theme.spacing(2)}px`
    },
    leftContainer: {
        display: 'flex',
        flex: 4,
        gap: `${theme.spacing(2)}px`,
        flexDirection: 'column'
    },
    rightContainer: {
        display: 'flex',
        flex: 8,
        gap: `${theme.spacing(2)}px`,
        flexDirection: 'column'
    },
    lensDataContainer: {
        overflowY: 'auto'
    },
    metricContainer: {
        display: 'flex',
        flex: 4
    },
    imgListContainer: {
        flex: 11,
        display: 'flex',
        gap: `${theme.spacing(1)}px`
    },
    paper: {
        height: '100%',
        maxWidth: '100%',
        padding: theme.spacing(3),
        gap: `${theme.spacing(1)}px`
    },
    img: {
        height: '100%',
        maxWidth: '100%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    button: {
        margin: theme.spacing(1),
    },
}))

function Grading(props) {
    const classes = useStyles()
    const {selectedBatch: batch, fetchCands, fetchCursor, fetchCounts, cursor, setCursor, candidates, setGrade, counts, setComment: submitComment} = props

    const [comment, setComment] = React.useState('')
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)

    React.useEffect(() => {
        fetchCursor()
        fetchCounts()
    }, [batch.id, fetchCounts, fetchCursor])
    const current = candidates[cursor]
    React.useEffect(() => {
        if (current) setComment(current.comment)
    }, [current])
    return <div className={classes.content} onKeyPress={e => {
        if (["1", "2", "3", "4", "5"].includes(e.key)) {
            setGrade({id: current.id, grade: parseInt(e.key)})
        } else if (e.key === "b") {
            setCursor({cursor: cursor - 1})
        } else if (e.key === "n") {
            setCursor({cursor: cursor + 1})
        }
    }} tabIndex='0'>
        <div className={classes.leftContainer}>
            <div className={classes.lensDataContainer}>
                <Paper className={classes.paper} style={{height: 'auto'}}>
                    <Typography variant='h6'>Lens Data</Typography>
                    {current ? <LensData candidate={current}/> : <Typography>Loading...</Typography>}
                </Paper>
            </div>
            <div className={classes.metricContainer}>
                <ProgressPanel batch={batch} counts={counts}/>
            </div>
        </div>
        <div className={classes.rightContainer}>
            <div className={classes.imgListContainer}>
                <div style={{flex: 9}}>
                    <Paper className={classes.paper}>
                        {current ? <LensImage current={current} width={500} height={500}/> :
                            <Typography>Loading...</Typography>}
                    </Paper>
                </div>
                <div style={{flex: 3}}>
                    <LensList candidates={candidates} batch={batch} loadCands={fetchCands} cursor={cursor}
                              setCursor={setCursor} nextUngraded={fetchCursor}/>
                </div>
            </div>
            <div>
                <Paper className={classes.paper} style={{display: 'flex'}}>
                    <TextField label="Comments"
                               multiline
                               fullWidth
                               value={comment}
                               onKeyPressCapture={e => e.stopPropagation()}
                               onChange={e => {
                                   setComment(e.target.value)
                                   e.stopPropagation()
                               }}/>
                    <Button variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => {
                                submitComment({id: current.id, comment})
                                // setSnackbarOpen(true)
                            }}
                            endIcon={<SendIcon/>}>Comment</Button>
                    <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)}>
                        <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbarOpen(false)}
                                  severity="success">Comment submitted!</MuiAlert>
                    </Snackbar>
                </Paper>
            </div>
        </div>
    </div>
}

export default connect(state => ({
    selectedBatch: selectedBatch(state),
    cursor: state.data.cursor,
    candidates: state.data.candidates,
    counts: state.data.counts
}), {
    fetchCands,
    fetchCursor,
    fetchCounts,
    setCursor: dataSlice.actions.setCursor,
    updateCandidate: dataSlice.actions.updateCandidate,
    setGrade,
    setComment
})(Grading)