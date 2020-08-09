import React from 'react';
import clsx from 'clsx';
import {
    AppBar,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    makeStyles,
    Toolbar,
    Typography,
    useTheme
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import UploadIcon from "@material-ui/icons/CloudUpload";
import {useCookies} from "react-cookie";
import LoginDialog from "./LoginDialog";
import UploadDialog from "./UploadDialog";
import axios from "axios";
import Grading from "./Grading";
import _ from "lodash";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function Home(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const {children} = props
    const [cookies, setCookies, removeCookie] = useCookies(['userId', 'selectedBatchId'])
    const [batches, setBatches] = React.useState([])
    const [uploadOpen, setUploadOpen] = React.useState(false)
    const pullBatches = () => {
        if (cookies.userId)
            axios.get('http://localhost:5000/batches', {withCredentials: true}).then(res => {
                setBatches(res.data.batches)
            })
    }
    React.useEffect(pullBatches, [cookies.userId])
    const selectedBatch = _.keyBy(batches, 'id')[parseInt(cookies.selectedBatchId)]

    return (
        <div className={classes.root}>
            <LoginDialog open={!Boolean(cookies.userId)} onLogin={userId => {
                setCookies('userId', userId)
            }}/>
            <UploadDialog uploadOpen={uploadOpen} handleClose={() => {
                setUploadOpen(false)
                pullBatches()
            }}/>

            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(true)}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{flexGrow: 1}}>
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
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={() => setUploadOpen(true)}>
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
            <main className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}>
                <div className={classes.drawerHeader} />
                {selectedBatch && cookies.userId ? <Grading batch={selectedBatch}/> :
                    <Typography>Select a batch to grade</Typography>}
            </main>
        </div>
    );
}
