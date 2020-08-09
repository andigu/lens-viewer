import React from "react";
import {Button, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import axios from 'axios';
import LensData from "./LensData";
import ProgressPanel from "./ProgressPanel";
import LensList from "./LensList";
import _ from "lodash"

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

    const loadCands = (start, stop, override=false) => {
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
    const loadCounts = () => axios.get("http://localhost:5000/batch_stats", {params: {batch_id: batch.id}, withCredentials: true}).then(res => setCounts(res.data.counts))
    const loadCursor = () => axios.get("http://localhost:5000/cursor", {params: {batch_id: batch.id}, withCredentials: true}).then(res => {
        setCursor(res.data.cursor)
        loadCands(res.data.cursor - 10, res.data.cursor + 10, true)
    })

    React.useEffect(() => {
        console.log("Listening for keypress")
        loadCursor()
        loadCounts()
        const listener = e => {
            if (["1", "2", "3", "4"].includes(e.key)) {
                const grade = parseInt(e.key)

            } else if (e.key === "b") {
                setCursor(cursor => cursor - 1)
            } else if (e.key === "n") {
                setCursor(cursor => cursor + 1)
            }
        }
        window.addEventListener('keypress', listener)
        return () => window.removeEventListener('keypress', listener)
    }, [batch.id])

    React.useEffect(() => {
        if (cands[cursor] && cands[cursor].comment) setComment(cands[cursor].comment)
    }, [cursor])
    return <div className={classes.content}>
        <div className={classes.leftContainer}>
            <div className={classes.lensDataContainer} style={{overflowY: 'scroll'}}>
                <Paper className={classes.paper} style={{overflowX: 'scroll'}}>
                    <Typography variant='h6'>Lens Data</Typography>
                    {cands[cursor] ? <LensData candidate={cands[cursor]}/> : <Typography>Loading...</Typography>}
                </Paper>
            </div>
            <div className={classes.metricContainer}>
                <ProgressPanel batch={batch} counts={counts}/>
            </div>
        </div>
        <div className={classes.rightContainer}>
            <div className={classes.imgListContainer}>
                <div style={{flex: 10}}>
                    <Paper className={classes.paper}>
                        {cands[cursor] ? <img className={classes.img} alt="Lens candidate"
                                              src={cands[cursor].url}/> :
                            <Typography>Loading...</Typography>}
                    </Paper>
                </div>
                <div style={{flex: 2}}>
                    <LensList candidates={cands} batch={batch} loadCands={loadCands} cursor={cursor} setCursor={setCursor}/> :
                        <Typography>Loading...</Typography>
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
                            endIcon={<SendIcon/>}>Comment</Button>
                </Paper>
            </div>
        </div>
    </div>
}