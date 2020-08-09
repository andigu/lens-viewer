import React from 'react';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@material-ui/core';

export default function LoginDialog(props) {
    const {open, onLogin} = props
    const [userId, setUserId] = React.useState('')
    const [errorMsg, setError] = React.useState("")
    const login = () => {
        if (userId.trim().length === 0) {
            setError("Enter a valid user ID")
        } else {
            axios.post("http://localhost:5000/login", {"user_id": userId}).then((res) => {
                if (res.data.success) {
                    onLogin(userId)
                    setUserId('')
                    setError("")
                } else {
                    setError("Something unexpected went wrong")
                }
            })
        }
    }
    return (
        <div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Log in</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Log in with a user id to save your batches
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="user_id"
                        label="User ID"
                        type="text"
                        fullWidth
                        value={userId}
                        onChange={evt => setUserId(evt.target.value)}
                        error={Boolean(errorMsg)}
                        onKeyDown={e => {
                            if (e.keyCode === 13) login()
                        }}
                        helperText={errorMsg}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={login} color="primary">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
