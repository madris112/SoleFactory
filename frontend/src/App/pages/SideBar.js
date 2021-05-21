import {React,useState} from 'react'
import "./SideBar.css"
import {Button, Container, FormControl, Form, Col, Row} from 'react-bootstrap';

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
        <h2>Sidebar</h2>
          <button id="close" onClick={closeHandler}>&times; close</button>
           
        </div>
        
    )
}

export default SideBar
