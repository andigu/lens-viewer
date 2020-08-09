import Dropzone from "react-dropzone";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    Typography
} from "@material-ui/core";
import axios from "axios";
import React from "react";

const useStyles = makeStyles(theme => ({
    fileUpload: {
        backgroundColor: '#f1f1f1',
        padding: theme.spacing(3)
    },
    buttonProgress: {
        // color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    wrapper: {
        position: 'relative'
    }
}))

export default function UploadDialog(props) {
    const classes = useStyles();
    const {uploadOpen, handleClose} = props;
    const [inFlight, setInFlight] = React.useState(false);

    return <Dialog open={uploadOpen} onClose={handleClose}>
        <Dropzone accept={'.csv'}>
            {({getRootProps, getInputProps, acceptedFiles}) => {
                return (
                    <>
                        <DialogTitle>Upload batches</DialogTitle>
                        <DialogContent>
                            <div>
                                <div {...getRootProps({className: classes.fileUpload})}>
                                    <input {...getInputProps()} />
                                    {acceptedFiles.length > 0 ?
                                        acceptedFiles.map(file => (
                                            <li key={file.path}>
                                                {file.path} - {(file.size / 1000000).toFixed(2)} Mb
                                            </li>
                                        )) :
                                        <Typography variant='body2'>Click to upload your .csvs</Typography>}
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <div className={classes.wrapper}>
                                <Button color="primary"
                                        disabled={inFlight}
                                        onClick={() => {
                                            const formData = new FormData();
                                            acceptedFiles.forEach((file) => formData.append(file.name, file))
                                            setInFlight(true)
                                            axios.post('http://localhost:5000/upload-batches', formData, {
                                                headers: {
                                                    'Content-Type': 'multipart/form-data'
                                                },
                                                withCredentials: true
                                            }).then(res => {
                                                setInFlight(false)
                                                handleClose()
                                            }).catch(() => {
                                                setInFlight(false)
                                            })
                                        }}>
                                    Accept terms
                                </Button>
                                {inFlight && <CircularProgress size={24} className={classes.buttonProgress}/>}
                            </div>
                        </DialogActions>
                    </>
                );
            }}
        </Dropzone>

    </Dialog>
}