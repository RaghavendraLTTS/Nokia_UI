import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';
import HeaderBar from './componenets/HeaderBar/headerBar'
import LoginPage from './componenets/LoginPage/login'
import UserScreen from './componenets/UserScreen/user'
import OnboardScreen from './componenets/OnboardingScreen/onBoarding'
import Dashboard from './componenets/Dashbaord/dashboard'
import DashboardScreen from './componenets/DashboardScreen/dashboardScreen'
import Statistics from './componenets/Statistics/statistics'

function AppRouter({handleLoginSuccess,token,data,toolData, toolExecuteData, setSelectedChip, setRole,isExecuting,
  setIsExecuting,}) {
  // const [selectedChip, setSelectedChip] = useState('');
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    let chipValue = '';

    switch (pathname) {
      case '/home':
        chipValue = 'home';
        break;
      case '/onboard':
        chipValue = 'onboard';
        break;
      case '/dashboard':
        chipValue = 'dashboard';
        break;
      case '/dashboardScreen':
        chipValue = 'dashboardScreen';
        break;
      case '/statistics':
        chipValue = 'statistics';
        break;
      default:
        chipValue = 'home';
    }

    setSelectedChip(chipValue); ;
  }, [location,setSelectedChip]);

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleLoginSuccess={handleLoginSuccess} />}
      />
      {token ? (
        <>
          <Route path="/home" element={<UserScreen data={data} executeData ={toolExecuteData} setSelectedChip={setSelectedChip} isExecuting={isExecuting}
                setIsExecuting={setIsExecuting}  />} />
          <Route
            path="/onboard"
            element={<OnboardScreen data={data} dataAdd={toolData} setSelectedChip={setSelectedChip} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboardScreen" element={<DashboardScreen setSelectedChip={setSelectedChip} />} />
          <Route path="/statistics" element={<Statistics  setSelectedChip={setSelectedChip}/>} />
          <Route
            path="*"
            element={<Navigate to={location.pathname} replace />}
          />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [toolData, setToolData] = useState([]);
  const [toolExecuteData, settoolExecuteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [selectedChip, setSelectedChip] = useState('');
  const [isExecuting, setIsExecuting] = useState(false); 
  // const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8090/api/getData');
          // const response = await fetch ("http://wfm-toolconfig.production.k-meain.he-pi-os-ohn-004.k8s.dyn.nesc.nokia.net/api/getData")
          
          const result = await response.json();
          setData(result);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

      const fetchToolData = async () => {
        try {
          // const resp = await fetch('http://localhost:8081/api/getTools');
          const resp = await fetch('http://localhost:8083/api/getToolsAll'); // Unique All Tools
          // const resp = await fetch("http://wfm-toolconfig.production.k-meain.he-pi-os-ohn-004.k8s.dyn.nesc.nokia.net/api/getTools")
          const res = await resp.json();
          setToolData(res);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

      const fetchExecuteToolData = async () => {
        try {
          const respExe = await fetch('http://localhost:8089/api/getexecutiondata');
          // const resp = await fetch("http://wfm-toolconfig.production.k-meain.he-pi-os-ohn-004.k8s.dyn.nesc.nokia.net/api/getTools")
          const resTool = await respExe.json();
          settoolExecuteData(resTool);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

      fetchData();
      fetchToolData();
      fetchExecuteToolData();
    }
  }, [token]);

  const handleLogoutApp = () => {
    setToken(null);
  };

  const handleLoginSuccess = (username, role) => {
    setToken(username);
    setRole(role);
  };

 

  return (
    <Router>
      {token ? <HeaderBar handleLogoutApp={handleLogoutApp} selectedChip={selectedChip} /> : ''}
      <AppRouter
        handleLoginSuccess={handleLoginSuccess}
        token={token}
        data={data}
        toolData={toolData}
        toolExecuteData={toolExecuteData}
        setSelectedChip={setSelectedChip} 
        setRole={setRole}  
        isExecuting={isExecuting}
        setIsExecuting={setIsExecuting}     
      />
    </Router>
  );
}

export default App;
