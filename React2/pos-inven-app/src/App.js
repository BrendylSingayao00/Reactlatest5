import logo from './logo.svg';
import './App.css';
import Login from './components/Pos-login'
import { BrowserRouter, Router,Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Registeracc from './components/Register-acc';
import Registerarchived from './components/Register-archived';
import Salesreport from './components/Sales-report';
import Inventory from './components/Inventory';
import Productupdate from './components/Product-update';
import Inventoryview from './components/Inventory-view';
import About from './components/Abouts';
import Aboutfordash from './components/Aboutsfordash';
import Dashboardbm from './components/Dashboard-bm';
import Salesrp from './components/Sales-rp';
import Inventoryreport from './components/Inventory-report';
import DashboardCash from './components/Dashboard-cashier';
import Reciept from './components/reciept';
import Neworder from './components/New-order';
import Salesrpcat from './components/Sales-report-category';
import Logout from './components/log-out';
import Inventoryviewcash from './components/Inventory-view-cash';
import AboutBm from './components/Abouts-bm';
import AboutCash from './components/Abouts-cash';
import InventoryviewBm from './components/Inventory-view-bm';
import SalesreportBm from './components/Sales-report-bm';
import PosDisplay from './components/pos-display.';
import { RoleProvider } from './FirstNameContext';
import LogoutCashier from './components/log-out cashier';
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <RoleProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/log-out' element={<Logout/>}></Route>
      <Route path='/About' element={<About/>}></Route>
      <Route path='/Aboutbm' element={<AboutBm/>}></Route>
      <Route path='/Aboutcash' element={<AboutCash/>}></Route>
      <Route path='/Aboutfordash' element={<Aboutfordash/>}></Route>
      <Route path='/log-out-cashier' element={<LogoutCashier/>}></Route>
     

      
     <Route  path='/Dashboard'   element={<PrivateRoute> <Dashboard /> </PrivateRoute> } />
      <Route path='/Register-archived' element={<PrivateRoute> <Registerarchived /> </PrivateRoute>} />
      <Route path='/Sales-report' element={ <PrivateRoute> <Salesreport /> </PrivateRoute>} />
      <Route path='/SalesreportCat' element={<PrivateRoute> <Salesrpcat /> </PrivateRoute>} />
      <Route path='/SalesreportBm'element={ < PrivateRoute><SalesreportBm /> </PrivateRoute>}  />
      <Route path='/Inventory'  element={ <PrivateRoute> <Inventory /> </PrivateRoute> } />
      <Route path='/Product-update'  element={ <PrivateRoute> <Productupdate /> </PrivateRoute>}  />
      <Route path='/Inventory-view'  element={ <PrivateRoute> <Inventoryview /> </PrivateRoute>}  />
      <Route path='/Inventory-view-bm'  element={ <PrivateRoute> <InventoryviewBm /> </PrivateRoute>} />
      <Route path='/Inventory-view-cash'  element={ <PrivateRoute> <Inventoryviewcash /> </PrivateRoute>} />
      <Route path='/Dashboard-bm'  element={ <PrivateRoute> <Dashboardbm /> </PrivateRoute>}  />
      <Route path='/Sales-rp'  element={ <PrivateRoute> <Salesrp /> </PrivateRoute>}  />
      <Route path='/Inventory-report'  element={ <PrivateRoute> <Inventoryreport /> </PrivateRoute>}  />
      <Route path='/Dashboard-Cash'  element={ <PrivateRoute> <DashboardCash /> </PrivateRoute>}  />
      <Route path='/reciept'  element={ <PrivateRoute> <Reciept /> </PrivateRoute>}  />
      <Route path='/Neworder'  element={ <PrivateRoute> <Neworder /> </PrivateRoute>}  />
      <Route path='/PosDisplay' element={ <PrivateRoute> <PosDisplay /> </PrivateRoute>} />
      <Route path='/Registeracc' element={ <PrivateRoute> <Registeracc /> </PrivateRoute>} />


</Routes>
    </BrowserRouter>
    </RoleProvider> 
  )
}


export default App;
