import {Box, Button, ButtonGroup, LinearProgress, makeStyles, Paper, Typography} from "@material-ui/core";
import {Settings as SettingsIcon, ImportExport as ImportExportIcon} from '@material-ui/icons';
import React from "react";
import _ from "lodash";
import axios from './axios'
import SettingsDialog from "./SettingsDialog";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3),
        gap: `${theme.spacing(1)}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        flex: 1
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    }
}))

export default function ProgressPanel(props) {
    const classes = useStyles()
    const {batch, counts} = props
    const [open, setOpen] = React.useState(false);
    return <div className={classes.container}>
        <Paper className={classes.paper}>
            <Typography variant='h6'>Batch <i>{batch.name}</i> metrics</Typography>
            <Box display="flex" alignItems="center">
                <Box minWidth='125px'>
                    <Typography variant="body2" color="textSecondary">Grading progress: </Typography>
                </Box>
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" value={_.sum(counts) / batch.n_cands * 100}/>
                </Box>
                <Box>
                    <Typography variant="body2" color="textSecondary">{_.sum(counts)}/{batch.n_cands}</Typography>
                </Box>
            </Box>
            <Typography variant="body2" color="textSecondary">Marked
                A's: {counts[0]} ({(counts[0] / batch.n_cands * 100).toFixed(2)}%)</Typography>
            <Typography variant="body2" color="textSecondary">Marked
                B's: {counts[1]} ({(counts[1] / batch.n_cands * 100).toFixed(2)}%)</Typography>
            <Typography variant="body2" color="textSecondary">Marked
                C's: {counts[2]} ({(counts[2] / batch.n_cands * 100).toFixed(2)}%)</Typography>
            <Typography variant="body2" color="textSecondary">Marked
                D's: {counts[3]} ({(counts[3] / batch.n_cands * 100).toFixed(2)}%)</Typography>
            <Typography variant="body2" color="textSecondary">Marked
                non-lens: {counts[4]} ({(counts[4] / batch.n_cands * 100).toFixed(2)}%)</Typography>
            <ButtonGroup color="primary">
                <Button style={{'width': '100%'}}
                        startIcon={<ImportExportIcon/>}
                        onClick={() => {
                            axios.get("/export_batch", {
                                params: {batch_id: batch.id, timestamp: new Date().getMilliseconds()},
                                withCredentials: true,
                                responseType: 'blob'
                            }).then(res => {
                                const url = window.URL.createObjectURL(new Blob([res.data]));
                                const link = document.createElement('a');
                                link.href = url;
                                link.setAttribute('download', `${batch.name}.csv`); //or any other extension
                                document.body.appendChild(link);
                                link.click();
                            })
                        }}>Export to CSV</Button>
                <Button style={{'width': '100%'}} startIcon={<SettingsIcon/>} onClick={() => setOpen(true)}>Settings</Button>
            </ButtonGroup>
        </Paper>
        <SettingsDialog open={open} handleClose={() => setOpen(false)}/>
    </div>
}