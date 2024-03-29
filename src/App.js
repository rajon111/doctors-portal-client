import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Pages/About/About';
import Appointment from './Pages/Appointment/Appoinment';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import RequireAuth from './Pages/Login/RequireAuth';
import SignUp from './Pages/Login/SignUp';
import Navbar from './Pages/Shared/Navbar';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyReview from './Pages/Dashboard/MyReview';
import MyAppointment from './Pages/Dashboard/MyAppointment';
import MyHistory from './Pages/Dashboard/MyHistory';
import Review from './Pages/Home/Review'
import Users from './Pages/Dashboard/Users';
import RequireAdmin from './Pages/Login/RequireAdmin';
import AddDoctor from './Pages/Dashboard/AddDoctor';
import ManageDoctors from './Pages/Dashboard/ManageDoctors';

function App() {
  return (
    <div className='max-w-7xl mx-auto px-12'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home />}></Route>

        <Route path='/about' element={<About />}></Route>

        {/* <Route path='/review' element={<Review/>}></Route> */}

        <Route path='/login' element={<Login />}></Route>

        <Route path='/signup' element={<SignUp />}></Route>

        <Route path='/appointment' element={<RequireAuth><Appointment></Appointment></RequireAuth>}></Route>

        <Route path='/dashboard' element={<RequireAuth> <Dashboard/> </RequireAuth>}>
          <Route index element={<MyAppointment></MyAppointment>}></Route>
          <Route path='review' element={<MyReview></MyReview>}></Route>
          <Route path='history' element={<MyHistory/>}></Route>

          <Route path='users' element={<RequireAdmin> <Users></Users></RequireAdmin>}></Route>

          <Route path='addDoctor' element={<RequireAdmin> <AddDoctor></AddDoctor></RequireAdmin>}></Route>

          <Route path='manageDoctor' element={<RequireAdmin> <ManageDoctors/> </RequireAdmin>}></Route>

        </Route>

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
