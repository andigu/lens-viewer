import {
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    LinearProgress,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";
import {ImportExport as ImportExportIcon, Settings as SettingsIcon} from '@material-ui/icons';
import React from "react";
import _ from "lodash";
import axios from './axios'
import SettingsDialog from "./SettingsDialog";
import {connect} from "react-redux";
import {dataSlice} from "./redux";

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

function ProgressPanel(props) {
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
            <List>
                {['A', 'B', 'C', 'D', 'Non-lenses'].map((label, i) =>
                    <ListItem key={i} button onClick={() => {props.flipFilter({idx: i})}}>
                        <ListItemText primary={`${label}: ${counts[i]} (${(counts[i] / batch.n_cands * 100).toFixed(2)}%)`}/>
                        <ListItemSecondaryAction>
                            <Checkbox edge="end"
                                      onChange={() => {props.flipFilter({idx: i})}}
                                      checked={props.filters ? !props.filters[i] : true}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
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
                <Button style={{'width': '100%'}} startIcon={<SettingsIcon/>}
                        onClick={() => setOpen(true)}>Settings</Button>
            </ButtonGroup>
        </Paper>
        <SettingsDialog open={open} handleClose={() => setOpen(false)}/>
    </div>
}

export default connect(state => ({filters: state.data.filters}), {flipFilter: dataSlice.actions.flipFilter})(ProgressPanel)