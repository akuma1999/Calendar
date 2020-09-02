import React, { Component } from 'react'
import Header from './component/Header'
import Tableshowdate from './component/Tableshowdate'
import Listwork from './component/List_work';
import Addnewwork from './component/Addnewwork';
import Edituser from './component/Edituser';
import { v4 as uuidv4 } from 'uuid';



export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      Editstatus : false , //=> save status when add work
      Editstatus2 : false , //=> save status when Edit work
      renderListstatus : false, //=> save list work status when onclick one day in calendar 
      thisdate : 0 ,  //=> save dynamic date when onlick previous or next in calendar
      thisyear : 0, //=> save dynamic year when onlick previous or next in calendar
      thismonth : 0, //=> save dynamic month when onlick previous or next in calendar
      data : [],  //=> save data off all work
      userEditObject : {} //=> save information work you want to edit
    }
  }

  changeEditstatus = (bool,bool2) =>{ //=> function save status when you edit or add or none action
    this.setState({
      Editstatus : bool,
      Editstatus2 : bool2    
    })
  }


  change_work = (object) =>{ //=> function save information work you want to edit in the state
    this.setState({
      userEditObject : object
    })
    this.changeEditstatus(false,true)
  }

  changeRenderListstatus = (bool,d,m,y) =>{ //=> function save dynamic information date when you click one day in calendar
    this.setState({
      renderListstatus: bool,
      thisdate : d,
      thismonth : m,
      thisyear : y
    })
  }

  editSubmit = (header,content) =>{ //=> funcion save edit information from state you have saved in sate by function  change_work()  to data work 
    let user = {}
    user = this.state.userEditObject
    user.header = header
    user.content = content
    this.setState({
      userEditObject : user
    })

    let token = [] //=>create data token
    token = this.state.data

    token.forEach((item,index) =>{ //=>filter the data to be fixed
      if(item.id === user.id)
      {
        token[index - 1] = user
      }
    })

    this.changeEditstatus(false,false) //=>close from edit
  }

  Delete_work = (id) =>{
      if(typeof id !== undefined)
      {
         let clone = this.state.data 
        for(let i = 0 ; i< clone.length ; i++)
        {
          if(clone[i].id === id)
            {
              clone.splice(i,1); //=>skip the item in work
            }
        }

        this.setState({
          data : clone  //=>save data work
        })
      }
  }

  Add_work = (header,content)=>{

       let item = {};
       let d = new Date(this.state.thisyear,this.state.thismonth -1 ,this.state.thisdate)
        item.id = uuidv4(); //=>get the id through the function uuidv4
        item.date = d
        item.header = header
        item.content = content

        var items = this.state.data;

        if (header !=="" && content !== "") //=> check text empty
        {
          
          items.push(item)

          this.setState({
            data : items
          })

          this.changeEditstatus(false,false)
        }
        else
        {
          alert("Not enough information!")
        }
  }

  renderEdit = () =>{
    var date = new Date(this.state.thisyear,this.state.thismonth,this.state.date) 

    if(this.state.Editstatus)
      return  <Addnewwork  
      change={(bool,bool2) => this.changeEditstatus(bool,bool2)} 
      add={(h,c) => this.Add_work(h,c)} 
      thisdate ={date}/>
    else if (this.state.Editstatus2)
      return  <Edituser 
      change={(bool,bool2) => this.changeEditstatus(bool,bool2)} 
      user = {this.state.userEditObject}
      thisdate ={date}
      edit={(h,c) => this.editSubmit(h,c)}/>
  }

  renderListWork = () =>{
    if(this.state.renderListstatus)
    return <Listwork 
    del = {(i) => {this.Delete_work(i)}}  
    change = {(bool,bool2) => this.changeEditstatus(bool,bool2)} 
    dulieu = {this.state.data} 
    status = {this.state.Editstatus} 
    date = {this.state.thisdate}
    year = {this.state.thisyear}
    month = {this.state.thismonth}
    changeWork = {(object) => this.change_work(object)}
    />
    
    else
    return <div className="col-5 text-center">Please choose a date</div>
  }

  render() {
    return (
      <div>
          <Header/>
          <div className="container-fluid mt-3 ">
              <div className="row">
                <Tableshowdate 
                change = {(bool,d,m,y) => this.changeRenderListstatus(bool,d,m,y)} 
                dulieu = {this.state.data}
                change_edit = {(bool,bool2) => this.changeEditstatus(bool,bool2)}/>                
                {this.renderListWork()}
              </div>
          </div>
        {this.renderEdit()}
      </div>
    )
  }
}
