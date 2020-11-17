import React from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    ListItemSecondaryAction,
    ListItemText,
    Switch,
    List
} from "@material-ui/core";
import {dataSlice} from "./redux";
import {connect} from "react-redux";


function SettingsDialog(props) {
    const {open, handleClose} = props;
    return <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
            Configuring inspection settings for current batch. TODO: custom keybindings, delete
            <List>
                <ListItemText primary="Use Skyviewer"/>
                <ListItemSecondaryAction>
                    <Switch edge="end"
                            onChange={() => {props.setUseSkyviewer({useSkyviewer: !props.useSkyviewer})}}
                            checked={props.useSkyviewer}/>
                </ListItemSecondaryAction>
            </List>
            <Button color='secondary'>Delete (WIP)</Button>
        </DialogContent>
    </Dialog>
}

export default connect(state => ({useSkyviewer: state.data.useSkyviewer}), {
    setUseSkyviewer: dataSlice.actions.setUseSkyviewer
})(SettingsDialog)