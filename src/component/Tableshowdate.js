import React, { Component } from 'react'

export default class Tableshowdate extends Component {
    constructor(props){
        super(props);
        this.state = {
            thismonth : 0,
            thisyear : 0,
            firstday : 0,
        }
    }

    componentWillMount = () =>{//=> save current month and  current year befor component render
        let date_full = new Date()
        this.setState({
            thismonth : date_full.getMonth() + 1,
            thisyear : date_full.getFullYear()     
        })

        date_full.setDate(1)

        this.setState({
            firstday : date_full.getDay(),    
        })


    }

    setDate = (control) =>{//=> Set dynamic date information when click previous or next
        if(control === "+")
        {                
            let date_full = new Date()            
            let newmonth = this.state.thismonth + 1

            if(this.state.thismonth === 12)
            {    
                date_full.setMonth(0)
                date_full.setFullYear(this.state.thisyear+1)
                date_full.setDate(1)

                this.setState({
                    thismonth : 1,
                    firstday : date_full.getDay(),
                    thisyear : date_full.getFullYear()
                })
            }
            else
            {
                date_full.setMonth(newmonth-1)
                date_full.setFullYear(this.state.thisyear)
                date_full.setDate(1)
                this.setState({
                    thismonth : newmonth,
                    firstday : date_full.getDay(),
                    thisyear : date_full.getFullYear()
                })

                console.log(this.state.thisyear)
                console.log(this.state.thismonth)
            }

        }
        else
        {
            let date_full = new Date()            
            let newmonth = this.state.thismonth - 1

            if(this.state.thismonth === 1)
            {    
                date_full.setMonth(11)
                date_full.setFullYear(this.state.thisyear-1)
                date_full.setDate(1)
                this.setState({
                    thismonth : 12,
                    firstday : date_full.getDay(),
                    thisyear : date_full.getFullYear()
                })
            }
            else
            {
                date_full.setMonth(newmonth-1)
                date_full.setFullYear(this.state.thisyear)
                date_full.setDate(1)
                this.setState({
                    thismonth : newmonth,
                    firstday : date_full.getDay(),
                    thisyear : date_full.getFullYear()
                })
            }
        }

    }

    Day_of_month = () =>{ //fint max date in current month
        switch (this.state.thismonth) {
            case 1 :
                return 31
            case 3 :
                return 31
            case 5 :
                return 31
            case 7 :
                return 31
            case 8 :
                return 31
            case 10 :
                return 31
            case 12 :
                return 31

            case 2:
                if(this.state.thisyear % 4 === 0)
                {
                    return 29
                }
                else
                {
                    return 28
                }

            default:
                return 30
        }
    }

    click_Date = (j) =>{ //set date when you click one date in calendar
        this.props.change(true,j,this.state.thismonth,this.state.thisyear)

        this.props.change_edit(false,false)
    }

    show_list_date = () =>{

        const list_date_work_in_month = []
        this.props.dulieu.forEach((item) => {
                    let d = new Date(item.date)
                    if(d.getFullYear() === this.state.thisyear && d.getMonth() + 1 === this.state.thismonth)
                    {
                        list_date_work_in_month.push(d.getDate())
                    }
        });

        let date_full = new Date()
        const list_date = [];

        list_date.push(<div className="width-calendar text-center date-title">Sun</div>)
        list_date.push(<div className="width-calendar text-center date-title">Mon</div>)
        list_date.push(<div className="width-calendar text-center date-title">Tue</div>)
        list_date.push(<div className="width-calendar text-center date-title">Wes</div>)
        list_date.push(<div className="width-calendar text-center date-title">Thu</div>)
        list_date.push(<div className="width-calendar text-center date-title">Fri</div>)
        list_date.push(<div className="width-calendar text-center date-title">Sat</div>)
        //=> show day name

        for (let i = 1; i <= this.state.firstday; i++) {

            list_date.push(<div className="width-calendar "></div>);

        }
        //=> show empty date

        for (let j = 1; j <= this.Day_of_month(); j++) {

            let date_content = j.toString()

            list_date_work_in_month.forEach(item =>{
                if(item === j)
                {
                    date_content = "* " + j + " *"
                }

            })

            if(date_full.getMonth() === (this.state.thismonth -1) && date_full.getFullYear() === this.state.thisyear && date_full.getDate() === j)
            {
              list_date.push(<div className="width-calendar text-center date-special" onClick={() => this.click_Date(j) }>{date_content}</div>);
            }
            else
            {
              list_date.push(<div className="width-calendar text-center date-item" onClick={() => this.click_Date(j)}>{date_content}</div>);
            }  
        }

        return list_date;
    }

    month_num_to_string = (month) =>{ //=> find string name current month
        switch (this.state.thismonth) {
            case 1 :
                return "Jan"
            case 2 :
                return "Feb"
            case 3 :
                return "Mar"
            case 4 :
                return "Apr"
            case 5 :
                return "May"
            case 6 :
                return "Jun"
            case 7 :
                return "Jul"
            case 8 :
                return "Aug"
            case 9 :
                return "Sep"
            case 10 :
                return "Oct"
            case 11 :
                return "Nov"
            case 12 :
                return "Dec"
            default:
                return 0
        }        
    }

    render() {
        return (
        <div className="col-6 calendar">
            <div className="row">
              <div className="controller-calendar d-flex flex-row col-3">
                <i className="fa fa-angle-double-left btn btn-outline-info flex-row " onClick = {()=>this.setDate("-")} aria-hidden="true" />
              </div>
              <div className = "col-6 ">
                <p className="text-center text-title">{this.month_num_to_string(this.state.thismonth) + " " + this.state.thisyear}</p>
              </div>
              <div className="controller-calendar d-flex flex-row-reverse col-3">
                <i className="fa fa-angle-double-right btn btn-outline-info flex-row-reverse" onClick = {()=>this.setDate("+")}  aria-hidden="true" />
              </div>

            </div>
            <div className="row mt-3">
            {this.show_list_date()}
            </div>
        </div>
        )
    }
}
