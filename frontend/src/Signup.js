import React, {Component} from 'react'
import {Button, FormControl, TextField, Select, MenuItem} from '@material-ui/core'
import {Redirect,Link} from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import "./Signin.css"
import front from "./front.jpeg"
import axios from "axios"
class App extends Component{
    state : {
        username : "",
        password : "",
        name : "",
        gstid : "",
        ngoid : "",
        redirect : "",
    }
    signup(){
    console.log("clicked once");
    const requestOptions = {
        method : "POST",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" },
        body : JSON.stringify({
            // username : this.state && this.state.username,
            // password : this.state && this.state.password,
            // firstname: this.state && this.state.name,
            // lastname: this.state && this.state.name,
            // email: "example@gmail.com",
            // mobile: "1234577890",
            // password: this.state && this.state.password,
            // gstno: this.state && this.state.gstno,
            // ngoid: "iamsexy"
            username : "sfgsdg",
            password : "asdsadasd",
            firstname: "asdasd",
            lastname: "wgwefew",
            email: "wefwefwef",
            mobile: "wefwewefwefwe",
            gstno: "wefwef",
            ngoid: "wefwefwef"

        })
    }
    var article =  JSON.stringify({
            // username : this.state && this.state.username,
            // password : this.state && this.state.password,
            // firstname: this.state && this.state.name,
            // lastname: this.state && this.state.name,
            // email: "example@gmail.com",
            // mobile: "1234577890",
            // password: this.state && this.state.password,
            // gstno: this.state && this.state.gstno,
            // ngoid: "iamsexy"
            username : "sfgsdg",
            password : "asdsadasd",
            firstname: "asdasd",
            lastname: "wgwefew",
            email: "wefwefwef",
            mobile: "wefwewefwefwe",
            gstno: "wefwef",
            ngoid: "wefwefwef"

        });

    const headers = { 
        "Content-Type": "application/json",
        
    }; 
    
    try{
      axios.post('http://localhost:4000/auth/signin', article,{headers})
        .then(response => console.log(JSON.stringify(response)));
    }
    catch(error){
      console.log("i am here" + error);
    }
    // let res = response.json();
    // console.log(res)
    }
  render() {
    if(this.state && this.state.redirect){
           return this.state.redirect
       }
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
            style={{backgroundColor: "white"}}
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
            style={{backgroundColor: "white"}}
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
            style={{backgroundColor: "white"}}
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
            style={{backgroundColor: "white"}}
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
            style={{backgroundColor: "white"}}
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
