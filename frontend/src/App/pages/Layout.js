import {React,useState}from 'react'
import SideBar from "./SideBar"
import Home from "./Home"

function Layout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openHandler = () => {
        if(!sidebarOpen){
            setSidebarOpen(true);
        }else{
            setSidebarOpen(false);
        }

    }

    const sidebarCloseHandler = () => {
        setSidebarOpen(false)
    }

    let sidebar;

    if(sidebarOpen){
        sidebar= <SideBar close={sidebarCloseHandler} sidebar={"sidebar"} />
    }

    return (
        <div>
           
           {sidebar}
             <Home click={openHandler}/>
           
           
        </div>
    )
}

export default Layout
