import React from "react";
import {Button, makeStyles, Paper, TextField, Typography, Snackbar} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import axios from 'axios';
import LensData from "./LensData";
import ProgressPanel from "./ProgressPanel";
import LensList from "./LensList";
import _ from "lodash"
import MuiAlert from '@material-ui/lab/Alert';

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
        flex: 8
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

export default function Grading(props) {
    const classes = useStyles()
    const {batch} = props

    const [comment, setComment] = React.useState('')
    const [cands, setCands] = React.useState(new Array(batch.n_cands))
    const [cursor, setCursor] = React.useState(-1)
    const [counts, setCounts] = React.useState([0, 0, 0, 0, 0])
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)

    const loadCands = (start, stop, override = false) => {
        if ((cursor >= 0) || override) {
            axios.get("http://localhost:5000/candidates", {
                params: {start: start, stop: stop, batch_id: batch.id},
                withCredentials: true
            }).then(res => {
                const candidates = _.sortBy(res.data.candidates, 'order')
                const orders = res.data.candidates.map(x => x['order'])
                setCands(cands => _.concat(_.slice(cands, 0, _.min(orders)), candidates, _.slice(cands, _.max(orders) + 1)))
            })
        }
    }
    const loadCursor = () => axios.get("http://localhost:5000/cursor", {
        params: {batch_id: batch.id},
        withCredentials: true
    }).then(res => {
        setCursor(res.data.cursor)
        loadCands(res.data.cursor - 10, res.data.cursor + 10, true)
    })
    const loadCounts = () => axios.get("http://localhost:5000/batch_stats", {
        params: {batch_id: batch.id},
        withCredentials: true
    }).then(res => setCounts(res.data.counts))

    React.useEffect(() => {
        loadCursor()
        loadCounts()
    }, [batch.id])
    const current = cands[cursor]
    React.useEffect(() => {
        if (current) setComment(current.comment)
    }, [current])
    return <div className={classes.content} onKeyPress={e => {
        if (["1", "2", "3", "4", "5"].includes(e.key)) {
            const grade = parseInt(e.key)
            const order = current.order
            axios.post("http://localhost:5000/candidates", {
                id: current.id,
                grade: grade
            }, {withCredentials: true}).then(res => {
                setCounts(res.data.counts)
                setCursor(cursor => cursor + 1)
                setCands(cands => [..._.slice(cands, 0, order), _.update(cands[order], 'grade', () => grade), ..._.slice(cands,order+1)])
            })
        } else if (e.key === "b") {
            setCursor(cursor => cursor - 1)
        } else if (e.key === "n") {
            setCursor(cursor => cursor + 1)
        }
    }} tabIndex='0'>
        <div className={classes.leftContainer}>
            <div className={classes.lensDataContainer} style={{overflowY: 'scroll'}}>
                <Paper className={classes.paper} style={{overflowX: 'scroll'}}>
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
                        {current ? <img className={classes.img} alt="Lens candidate"
                                              src={current.url}/> :
                            <Typography>Loading...</Typography>}
                    </Paper>
                </div>
                <div style={{flex: 3}}>
                    <LensList candidates={cands} batch={batch} loadCands={loadCands} cursor={cursor}
                              setCursor={setCursor}/>
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
                                const order = current.order
                                axios.post("http://localhost:5000/candidates", {
                                    id: current.id,
                                    comment: comment
                                }, {withCredentials: true}).then(res => {
                                    setSnackbarOpen(true)
                                    setCands(cands => [..._.slice(cands, 0, order), _.update(cands[order], 'comment', () => comment), ..._.slice(cands,order+1)])
                                })
                            }}
                            endIcon={<SendIcon/>}>Comment</Button>
                    <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)}>
                        <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbarOpen(false)} severity="success">Comment submitted!</MuiAlert>
                    </Snackbar>
                </Paper>
            </div>
        </div>
    </div>
}