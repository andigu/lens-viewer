import React from 'react';
import _ from 'lodash'

class App extends React.Component {
    state = {
        message: "",
        ra: null,
        dec: null,
        user: null,
        obj: null,
        allUsers: [],
        comment: ''
    };

    nextImage() {
        fetch(`http://localhost:5000?user=${this.state.user}`).then(res => res.json()).then(res => {
            if (res.length > 0) {
                for (let i = 0; i < res.length; i++) {
                    const tmp = new Image();
                    tmp.src = res[i].url
                }
                this.setState({obj: res[0]})
            } else {
                this.setState({obj: null})
            }
        });
    }


    componentDidMount() {
        fetch(`http://localhost:5000/users`).then(res => res.json()).then(res => {
            this.setState({allUsers: res, user: res[0]}, () => this.nextImage())
        })

        document.onkeypress = (e) => {
            let message;
            switch (e.key) {
                case "b":
                    message = "back";
                    fetch(`http://localhost:5000?back=True&id=${this.state.obj.id}&n=1&user=${this.state.user}`)
                        .then(res => res.json()).then(res => {
                        if (res.length > 0) {
                            this.setState({obj: res[0]})
                        }
                    });
                    break;
                default:
                    const code = parseInt(e.key);
                    if (!isNaN(code) && code >= 1 && code <= 5) {
                        message = code;
                        fetch("http://localhost:5000", {
                            method: 'POST',
                            body: JSON.stringify({
                                id: this.state.obj.id,
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
                {this.state.obj && <img
                    src={this.state.obj.url}
                    style={{
                        height: 500,
                        width: 500,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}/>}
                <p style={{fontSize: 80, position: 'absolute', left: '25%', transform: 'translate(-50%, -50%)'}}>
                    {this.state.message}
                </p>

                {this.state.obj && <div style={{
                    border: '2px solid',
                    borderColor: 'black',
                    position: 'absolute',
                    top: '50%',
                    left: '10%',
                    transform: 'translate(0, -50%)',
                    padding: '10px'
                }}>
                    <b>
                        ID: {this.state.obj.id} <br/> RA: {this.state.obj.ra.toFixed(4)} <br/> DEC: {this.state.obj.dec.toFixed(4)}
                    </b>
                    <pre
                        style={{fontSize: '1.2em'}}>{JSON.stringify(_.omit(this.state.obj, ['url', 'coadd', 'grade', 'graded_time', 'comment', 'id', 'ra', 'dec']), null, 2)}</pre>
                    <a href={this.state.obj.url} target='_blank'>skyviewer</a>
                </div>}

                {this.state.obj && <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: '5%',
                    transform: 'translate(0, -50%)'
                }}>
                    <form onSubmit={e => {
                        fetch(`http://localhost:5000/comment`, {
                            method: 'POST',
                            body: JSON.stringify({
                                id: this.state.obj.id,
                                comment: this.state.comment
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(() => {
                            this.setState({comment: ""})
                        });
                        e.preventDefault();
                    }}>
                        <label style={{verticalAlign: 'middle'}} htmlFor="comments">Comments:</label>
                        <textarea id="comments" rows="30" cols="35" style={{verticalAlign: 'middle'}} value={this.state.comment} onChange={event=> {
                            this.setState({comment: event.target.value})
                        }}/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>}

                {this.state.allUsers &&
                <div style={{position: 'absolute', top: '5%', left: '50%', transform: 'translate(-50%, 0)'}}>
                    <label htmlFor="user">User:</label>
                    <select id="user" onChange={(x) => {
                        this.setState({user: x.target.value}, () => {this.nextImage()})
                    }}>
                        {this.state.allUsers.map(user => <option value={user} key={user}>{user}</option>)}
                    </select>
                    <br/>
                    <button onClick={() => {fetch(`http://localhost:5000/to_csv`).then(alert('Exported!'))}}>Export DB to CSV</button>
                </div>
                }
            </div>
        );
    }
}

export default App;
