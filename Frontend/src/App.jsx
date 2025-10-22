import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
import { MainContextProvider } from "./context/MainContext";
import { ToastContainer } from "react-toastify";
import ProtectedLayout from "./layout/ProtectedLayout";
import AddTaskPage from "./pages/AddTaskPage";


const App = () => {
 
  

  return (
    <>
      <BrowserRouter>
       <MainContextProvider>   
       <ToastContainer/>  
        <Navbar/>
        <Routes>
          <Route Component={ProtectedLayout}>
             <Route path="/" Component={Dashboard}/>
             <Route path="/add-task" Component={AddTaskPage}/>
          </Route>
          <Route path="/login" Component={LoginPage}/>
          <Route path="/register" Component={RegisterPage}/>
          <Route path="*" Component={ErrorPage}/>
        </Routes>
        <Footer/>
       </MainContextProvider>   
      </BrowserRouter>
    </>
  );
};

export default App;
