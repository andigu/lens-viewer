import React from "react";
import {Circle, Image, Layer, Stage} from "react-konva";
import {Button} from "@material-ui/core";
import {connect} from "react-redux";
import {clearMarks, setMark} from "./redux";

function LensImage(props) {
    const {current, width, height} = props;
    const src = current.url;
    const dim = Math.min(width, height);
    const img = new window.Image();
    img.src = src;
    img.height = dim;
    img.width = dim;
    return <div style={{height: "100%", display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <Stage width={dim} height={dim}
               style={{
                   display: 'flex',
                   justifyContent: 'center',
                   height: '100%',
                   width: '100%',
                   alignItems: 'center'
               }}>
            <Layer>
                <Image image={img} onClick={(evt) => {
                    props.setMark({id: current.id, type: 'source', coordinate: [evt.evt.offsetX / dim, evt.evt.offsetY / dim]})
                }} onContextMenu={(evt) => {
                    evt.evt.preventDefault()
                    props.setMark({id: current.id, type: 'lens', coordinate: [evt.evt.offsetX / dim, evt.evt.offsetY / dim]})
                }}/>
            </Layer>
            <Layer>
                {current.source && current.source.map(([x,y], i) => <Circle key={i} x={dim * x} y={dim * y} radius={dim / 20} stroke='red'/>)}
                {current.lens && current.lens.length === 2 && <Circle x={dim * current.lens[0]} y={dim * current.lens[1]} radius={dim / 20} stroke='white'/>}
            </Layer>
        </Stage>
        <Button style={{width: '100%'}} size="large" variant="outlined" onClick={() => props.clearMarks({id:current.id})}>Clear</Button>
    </div>
}

export default connect(null, {
    clearMarks,
    setMark
})(LensImage)