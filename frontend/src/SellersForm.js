import React, {Component} from 'react'
import {Button, FormControl, TextField, Select, MenuItem} from '@material-ui/core'
import {Redirect,Link} from 'react-router-dom'

class App extends Component{
    state : {
        title:"",
        description:"",
        expdate:"",
        price:"",
        discprice : "",
        message : "",
    }
    


    


     submit = async () => {
        const requestOptions = {
        method : "POST",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" },
        body : JSON.stringify({
            payload: JSON.stringify({
              title : (this.state && this.state.title),
              description : this.state.description,
              price : this.state.price,
              expdate : this.state.expdate,
              discprice: this.state.discprice,
              
        })
        })

    }

    let response = await fetch("http://127.0.0.1:3000/api/main/",requestOptions)
        let res = await response.json();
        console.log(res);
        if(res.succode === '1'){
        this.setState({ message: 'Product added successfully' });
        }
        
    }



    render() {

    return (
       <div>
           <h2> Seller's form </h2> 
           <TextField 
           variant='outlined'
            label='Product Title'
            required
            onChange={(event) => {
                this.setState({
                    title:event.target.value
                })
            }}
            >
            </TextField><br /><br />

           <TextField 
           variant='outlined' 
           label='Product Description'
           required
           onChange={(event) => {
                this.setState({
                    description:event.target.value
                })
            }}
           >
           </TextField><br /><br />
           <TextField 
           variant='outlined' 
           label='Price'
           required
           onChange={(event) => {
                this.setState({
                    price:event.target.value
                })
            }}
           >
           </TextField><br /><br />
           <TextField 
           variant='outlined' 
           label='Expiry Date'
           required
           onChange={(event) => {
                this.setState({
                    expdate:event.target.value
                })
            }}
            >
            </TextField><br /><br />

            <TextField 
           variant='outlined' 
           label='Discounted price'
           required
           onChange={(event) => {
                this.setState({
                    expdate:event.target.value
                })
            }}
            >
            </TextField><br /><br />

            <Button variant='contained' color='primary' onClick={this.submit}>Submit</Button>
</div>
   
    )

}
}

export default App;