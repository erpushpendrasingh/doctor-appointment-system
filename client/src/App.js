import { useSelector } from "react-redux";
import Mainroutes from "./pages/Mainroutes";


function App() {
     const {loading}=useSelector((state)=>state.alerts)
     return (
          <>
               <Mainroutes />
          </>
     );
}

export default App;
