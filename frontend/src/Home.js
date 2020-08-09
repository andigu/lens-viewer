import React, {useEffect} from 'react';
import {
    AppBar,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    makeStyles,
    Toolbar,
    Typography
} from '@material-ui/core';
import _ from 'lodash'
import UploadIcon from '@material-ui/icons/CloudUpload';
import UploadDialog from "./UploadDialog";
import LoginDialog from "./LoginDialog";
import {useCookies} from "react-cookie";
import axios from 'axios';
import Grading from "./Grading";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100vh'
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    title: {
        flexGrow: 1
    }
}));

export default function Home() {
    const classes = useStyles();
    const [uploadOpen, setOpen] = React.useState(false)
    const [batches, setBatches] = React.useState([])
    const [cookies, setCookies, removeCookie] = useCookies(['userId', 'selectedBatchId'])
    const pullBatches = () => {
        if (cookies.userId)
            axios.get('http://localhost:5000/batches', {withCredentials: true}).then(res => {
                setBatches(res.data.batches)
            })
    }
    useEffect(pullBatches, [cookies.userId])
    const selectedBatch = _.keyBy(batches, 'id')[parseInt(cookies.selectedBatchId)]
    return (
        <div className={classes.root}>
            <LoginDialog open={!Boolean(cookies.userId)} onLogin={userId => {
                setCookies('userId', userId)
            }}/>
            <UploadDialog uploadOpen={uploadOpen} handleClose={() => {
                setOpen(false)
                pullBatches()
            }}/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Logged in user: {cookies.userId}
                    </Typography>
                    {cookies.userId &&
                    <Button color='inherit' variant='outlined' onClick={() => {
                        removeCookie('userId')
                        removeCookie('selectedBatchId')
                        setBatches([])
                    }}>Logout</Button>}
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left">
                <div className={classes.toolbar}/>
                <Divider/>
                <List>
                    <ListItem button onClick={() => setOpen(true)}>
                        <ListItemIcon><UploadIcon/></ListItemIcon>
                        <ListItemText primary="Upload"/>
                    </ListItem>
                </List>
                <Divider/>
                <List subheader={
                    <ListSubheader>
                        Batches
                    </ListSubheader>
                }>
                    {batches.map(batch =>
                        <ListItem button key={batch.id} onClick={() => setCookies('selectedBatchId', batch.id)}
                                  selected={parseInt(cookies.selectedBatchId) === batch.id}>
                            <ListItemText primary={batch.name} secondary={
                                <>
                                    Count: {batch.n_cands} <br/>
                                    Created: {(new Date(Date.parse(batch.upload_time))).toLocaleString('en-GB')}
                                </>
                            }/>
                        </ListItem>
                    )}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {selectedBatch && cookies.userId ? <Grading batch={selectedBatch}/> :
                    <Typography>Select a batch to grade</Typography>}
            </main>
        </div>
    );
}
