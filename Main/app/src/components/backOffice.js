import Navbar from './navbar.js';
import Sidebar from './sidebar.js';
import Footer from './footer.js';
import ControlSidebar from './controlSidebar.js'

function BackOffice(props){
return <>
<div className = "wrapper">
 <Navbar />
 <Sidebar />
 <div className = 'content-wrapper'>
    {props.children}
 </div>
<Footer />
<ControlSidebar />


</div>
</>


}
export default BackOffice;