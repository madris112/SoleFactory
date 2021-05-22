import {React,useState} from 'react'
import "./SideBar.css"
import {Button, Container, FormControl, Form, Col, Row} from 'react-bootstrap';
import { BsXCircle } from "react-icons/bs";

function SideBar(props) {

    const [sidebarClass, setSidebarClass] = useState(props.sidebar)

    const closeHandler = (e) => {
        e.preventDefault();
        setSidebarClass("sidebar close")
        setTimeout(() => {
            props.close();
        }, 20);
        

    }

    return (
       
        <div className={sidebarClass}>
            <div class="mainsidebar">
                <div style={{display:"inline-block"}}>
                    <button style ={{backgroundColor:"transparent"}} onClick={closeHandler}><BsXCircle style={{color:"white"}}/></button>
                    <h2 style={{color: 'white', marginLeft:"40%",marginTop:"5px"}}><b>Sidebar</b></h2>
                </div>
            </div>  
        </div>
        
    )
}

export default SideBar
