import React, { Component } from 'react'
import WorkItem from './WorkItem'

export default class List_work extends Component {

    constructor(props){
        super(props);

        this.state = {
            data : this.props.dulieu
        }
    }

    del = (id) => { //=> save id you want to edit 
        this.props.del(id)
        this.props.change(false,false)
    }

    showlistwork = () =>{ //=> only show work in date you click in calendar
        if(this.state.data.length !== 0 )
        {

            return this.state.data.map((value,i) =>{ 
                const d = new Date(value.date)
                if(d.getFullYear() === this.props.year && d.getMonth() +1  === this.props.month && d.getDate() === this.props.date)
                return (
                    <WorkItem 
                    change = {() => this.props.changeWork(value)} 
                    keyid={i} del = {() => this.del(value.id)} 
                    id={value.id} 
                    nodetitle = {value.header} 
                    nodecontent={value.content}/>
                )
            })
        }
        else
        {
        return  <div className="text-center">Work empty</div>   
        }

    }

    renderbtnaddnew = () =>{
        if(this.props.status === false)
        return <button type="button" className="btn btn-primary mt-3" onClick={()=>this.props.change(true)}>Add new work</button>
 
    }
    render() {
        return (
                <div className="col-5">
                    <div id="List_work_id" role="tablist" aria-multiselectable="true">
                          {this.showlistwork()}
                    </div>
                {this.renderbtnaddnew()}
                </div>
        )
    }
}
