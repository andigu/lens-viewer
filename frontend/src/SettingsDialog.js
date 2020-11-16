import React from "react";
import {Dialog, DialogTitle, DialogContent, Button, DialogContentText} from "@material-ui/core";


export default function SettingsDialog(props) {
    const {open, handleClose} = props;
    return <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
            <DialogContentText>
                More settings to come
            </DialogContentText>
            <Button color='secondary'>Delete</Button>
        </DialogContent>
    </Dialog>
}