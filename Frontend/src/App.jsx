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
import LandingPage from "./pages/LandingPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ScrollToTop from "./components/ScrollToTop"
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
 
  

  return (
    <>
      <div className="min-h-screen flex flex-col">
      <BrowserRouter>
       <MainContextProvider>   
       <ToastContainer  
        toastStyle={{
          background: '#4f46e5', // indigo background
          color: 'white',         // text color
        }}
        progressStyle={{
          background: '#818cf8'   // lighter indigo for progress bar
        }} />  
        <Navbar/>
        <main className="flex-1 pt-16 lg:pt-20">
        <Routes>
          <Route path="/" Component={LandingPage}/>
          <Route Component={ProtectedLayout}>
             <Route path="/dashboard" Component={Dashboard}/>
             <Route path="/add-task" Component={AddTaskPage}/>
             <Route path="/analytics" Component={AnalyticsPage}/>
          </Route>
          <Route path="/login" Component={LoginPage}/>
          <Route path="/register" Component={RegisterPage}/>
          <Route path="*" Component={ErrorPage}/>
        </Routes>
        </main>
         <ScrollToTop/>
        <Footer/>
       </MainContextProvider>   
      </BrowserRouter>
      </div>
    </>
  );
};

export default App;
