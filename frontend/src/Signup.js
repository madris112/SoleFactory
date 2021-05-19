import React, {Component} from 'react'
import {Button, FormControl, TextField, Select, MenuItem} from '@material-ui/core'
import {Redirect,Link} from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import "./Signin.css"
import front from "./front.jpeg"



class App extends Component{
    state : {
        username : "",
        password : "",
        name : "",
        gstid : "",
        ngoid : "",
        redirect : "",

    }

    render() {
   return (
       <div className='mainheader'>
        <div style={{width: "1100px",marginLeft:"22%",height:"650px",marginTop:"120px",backgroundColor:"#8C9C94",backgroundImg: `url($-{amazon})`, borderRadius:"10px 10px 10px 10px",backgroundSize:"contain"}}>
        <div style={{display:"inline-block",height:"100%",width:"50%",float:"left"}}>
        <img src={front} style={{width:"100%",height:"100%"}}/>
        </div>
         <div style={{display:"inline-block",height:"100%",width:"50%",float:"top",paddingTop:"4px"}}>
            
            <br />
            <br />
            <h2>SignUp</h2><br/>
            <TextField
            style={{
        backgroundColor: "white"
    }}
            variant='outlined'
            label='username'
            onChange={(event) => {
                this.setState({
                    username : event.target.value
                })
            }}
            >
            </TextField>
           <br />
           <br />
            <TextField
            style={{
        backgroundColor: "white"
    }}
            color='primary'
            variant='outlined'
            label='password'
            // type='password'
            onChange={(event) => {
                this.setState({
                    password : event.target.value
                })
            }}
            >
            </TextField>
<br/>
<br/>
             <TextField
            style={{
        backgroundColor: "white"
    }}
            color='primary'
            variant='outlined'
            label='Name'
            // type='password'
            onChange={(event) => {
                this.setState({
                    name : event.target.value
                })
            }}
            >
            </TextField>
<br/>
<br/>
             <TextField
            style={{
        backgroundColor: "white"
    }}
            color='primary'
            variant='outlined'
            label='GST Id'
            // type='password'
            onChange={(event) => {
                this.setState({
                    gstid : event.target.value
                })
            }}
            >
            </TextField>
<br/>
<br/>
             <TextField
            style={{
        backgroundColor: "white"
    }}
            color='primary'
            variant='outlined'
            label='NGO ID'
            // type='password'
            onChange={(event) => {
                this.setState({
                    ngoid : event.target.value
                })
            }}
            >
            </TextField>
 <br />
<br/>
 <Button variant='contained' onClick={this.signup}>Submit</Button><br/>
   <Link to='/signin' className='link_signin'>
     <h4>SignIn</h4>
     </Link>
       
          

           
            </div>

        </div>    

       </div>


   )
    }

}
export default App;