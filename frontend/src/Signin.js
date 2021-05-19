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
        redirect : "",

    }



    signin = async () => {
    const requestOptions = {
        method : "POST",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" },
        body : JSON.stringify({
            username : this.state.username,
            password : this.state.password,
            
        })

    }

    let response =await fetch("http://localhost:3000/api/",requestOptions)
    let res = await response.json()
    console.log(res)
    
    
    
        
    }


    

    render() {
   return (
       <div className='mainheader'>
        <div style={{width: "900px",marginLeft:"28%",height:"540px",marginTop:"140px",backgroundColor:"#8C9C94",backgroundImg: `url($-{amazon})`, borderRadius:"10px 10px 10px 10px",backgroundSize:"contain"}}>
        <div style={{display:"inline-block",height:"100%",width:"50%",float:"left"}}>
        <img src={front} style={{width:"100%",height:"100%"}}/>
        </div>
         <div style={{display:"inline-block",height:"100%",width:"50%",float:"top",paddingTop:"4px"}}>
            
            <br />
            <br />
            <h2>Signin</h2><br/>
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
            <Button variant='contained' onClick={this.signin}>Signin</Button>
 <br />
       <h2>OR</h2> 
           <GoogleLogin 
           
            clientid=""
            buttonText="Sign in with Google"
            // onSuccess={this.googleResponse}
            // onFailure={this.googleResponse}
            cookiePolicy={'single-host-origin'}
            />
            <Link to='/signup' className='link_signup'>
            <h4>SignUp</h4>
            </Link>


           
            </div>

        </div>    

       </div>


   )
    }

}
export default App;