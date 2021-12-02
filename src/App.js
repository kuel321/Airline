import logo from './logo.svg';
import './App.css';
import Start from './components/Start'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import DashBoard from './components/Home';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      
      <Switch>
        <Route exact path="/">
        <Start/>
        </Route>
        <Route exact path="/home">
          <DashBoard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
