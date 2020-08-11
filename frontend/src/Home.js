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
import LoginDialog from "./LoginDialog";
import UploadDialog from "./UploadDialog";
import Grading from "./Grading";
import {connect} from "react-redux";
import {dataSlice, fetchBatches, login, logout, selectedBatch} from "./redux";

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

function Home(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [uploadOpen, setUploadOpen] = React.useState(false)
    const {selectedBatch, fetchBatches, logout, batches, userId, selectBatch, login, selectedBatchId} = props
    React.useEffect(() => {
        fetchBatches()
    }, [fetchBatches])
    return (
        <div className={classes.root}>
            <LoginDialog open={!Boolean(userId)} onLogin={login}/>
            <UploadDialog uploadOpen={uploadOpen} handleClose={() => {
                setUploadOpen(false)
                fetchBatches()
            }}/>

            <AppBar position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(true)}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        Logged in user: {userId}
                    </Typography>
                    {userId &&
                    <Button color='inherit' variant='outlined' onClick={logout}>Logout</Button>}
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
                    <Typography variant="body1">Collapse</Typography>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
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
                    {Object.values(batches).map(batch =>
                        <ListItem button key={batch.id} onClick={() => {
                            selectBatch({batchId: batch.id})
                        }}
                                  selected={selectedBatchId === batch.id}>
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
                <div className={classes.drawerHeader}/>
                {selectedBatch && userId ? <Grading/> :
                    <Typography>Select a batch to grade</Typography>}
            </main>
        </div>
    );
}

export default connect(state => ({
    selectedBatch: selectedBatch(state),
    batches: state.data.batches,
    userId: state.auth.userId,
    selectedBatchId: state.data.selectedBatchId
}), {
    fetchBatches,
    logout,
    selectBatch: dataSlice.actions.selectBatch,
    login
})(Home)