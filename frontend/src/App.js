import React from 'react';
import './App.css';

class App extends React.Component {
    state = {
        message: "",
        ra: null,
        dec: null
    };

    nextImage() {
        fetch("http://localhost:5000").then(res => res.json()).then(({ras, decs, done}) => {
            if (!done && ras.length > 0) {
                for (let i=0; i<ras.length; i++) {
                    const tmp = new Image();
                    tmp.src= `http://legacysurvey.org/viewer/jpeg-cutout?ra=${ras[i]}&dec=${decs[i]}&&width=101&height=101&layer=dr8&pixscale=0.262`
                }
                this.setState({ra: ras[0], dec: decs[0]})
            } else {
                this.setState({ra: null, dec: null})
            }
        });
    }


    componentDidMount() {
        this.nextImage();
        document.onkeypress = (e) => {
            let message;
            switch (e.key) {
                case "q":
                    message = "noteworthy";
                    break;
                case "b":
                    message = "back";
                    fetch(`http://localhost:5000?back=True&ra=${this.state.ra}&dec=${this.state.dec}`).then(res => res.json()).then(({ras, decs, done}) => {
                        if (!done && ras.length > 0) {
                            this.setState({ra: ras[0], dec: decs[0]})
                        } else {
                            this.setState({ra: null, dec: null})
                        }
                    });
                    break;
                default:
                    const code = parseInt(e.key);
                    if (!isNaN(code) && code >= 1 && code <= 4) {
                        message = code;
                        fetch("http://localhost:5000", {
                            method: 'POST',
                            body: JSON.stringify({
                                ra: this.state.ra,
                                dec: this.state.dec,
                                grade: code
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(res => res.json()).then(({success}) => {
                            if (success) {
                                this.nextImage();
                            }
                        });
                    }
            }
            if (message) {
                this.setState({
                    message
                });
            }
        };
    }

    render() {
        return (
            <div className="App">
                {this.state.ra && this.state.dec && <img
                    src={`http://legacysurvey.org/viewer/jpeg-cutout?ra=${this.state.ra}&dec=${this.state.dec}&&width=101&height=101&layer=dr8&pixscale=0.262`}
                    style={{
                        height: 500,
                        width: 500,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}/>}
                <p style={{fontSize: 80, position: 'absolute', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    {this.state.message}
                </p>
            </div>
        );
    }
}

export default App;
