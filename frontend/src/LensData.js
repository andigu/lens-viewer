import React from 'react'
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export default function LensData(props) {
    const {candidate} = props;
    const [open, setOpen] = React.useState(false);

    return <TableContainer component={Paper}>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell><b>Parameter</b></TableCell>
                    <TableCell><b>Value</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell component="th" scope="row">RA</TableCell>
                    <TableCell>{candidate.ra.toFixed(5)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">DEC</TableCell>
                    <TableCell>{candidate.dec.toFixed(5)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Grade</TableCell>
                    <TableCell>{candidate.grade}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">URL</TableCell>
                    <TableCell><a href={`https://www.legacysurvey.org/viewer/?ra=${candidate.ra}&dec=${candidate.dec}&size=101&layer=ls-dr9&zoom=15`} target='_blank'
                                  rel="noopener noreferrer">Skyviewer</a></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Additional</TableCell>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>{open ?
                            <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton>
                    </TableCell>
                </TableRow>
                {open && Object.entries(JSON.parse(candidate.additional)).map(([key, val], i) =>
                    <TableRow key={i}>
                        <TableCell component="th" scope="row">{key}</TableCell>
                        <TableCell>{val}</TableCell>
                    </TableRow>
                )}

            </TableBody>
        </Table>
    </TableContainer>
}