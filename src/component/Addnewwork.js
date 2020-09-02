import React, { Component } from 'react'

export default class Addnewwork extends Component {
    constructor (props){
        super(props);

        this.state = {
            header : "",
            content : "",
        }
    }


    ischange = (event) =>{

        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]:value //=> auto save item to state when you change the text in add new from
        });

    }


    render() {

        return (
            <div className="mt-3 mb-3 Addnewform">
                    <div className="card">
                        <h5 className="card-header text-center">Add new work</h5>
                        <div className="form-group">
                            <input type="text" className="form-control mx-auto mt-3" style={{width: '80%'}} name="header" placeholder = "text-title" onChange={(event) => this.ischange(event)}/>
                        </div>

                        <div className="form-group">
                            <input  type="text" className="form-control mx-auto mt-3" style={{width: '80%'}} name="content" placeholder = "text-content" onChange={(event) => this.ischange(event)}/>
                        </div>

                        <div className="btn-group mt-3 ">
                            <button type="submit" className="btn btn-primary" onClick={(h,c)=>this.props.add(this.state.header,this.state.content)}>Submit</button>
                            <button type="submit" className="btn btn-warning" onClick={()=>this.props.change(false,false)}>Hide</button>
                        </div>
                    </div>
            </div>
        )
    }
}
