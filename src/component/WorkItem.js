import React, { Component } from 'react'

export default class WorkItem extends Component {
    render() {
        return (
             <div>
               <div className="card">
                  <div className="card-header" role="tab" id="note1">
                                <a data-toggle="collapse" data-parent="#List_work_id" href={"#number" + this.props.keyid} aria-expanded="true" 
                                aria-controls={"number" + this.props.keyid}>
                                    {this.props.nodetitle}
                                </a>
                                    <div className="btn-group float-right">
                                        <button className="btn btn-outline-warning" onClick = {() => this.props.change()}>Edit</button>
                                        <button className="btn btn-outline-danger" onClick = {() => this.props.del()}>Delete</button>
                                    </div>                           
                                </div>


                                <div id={"number" + this.props.keyid} className="collapse in" role="tabpanel" aria-labelledby="note1">
                                <div className="card-body">
                                   {this.props.nodecontent}
                                </div>
                  </div>
               </div>
            </div>

        )
    }
}
