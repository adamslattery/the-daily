import { useState, useEffect, useRef } from "react";
import './App.css';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from "./components/NavBar";
import ItemList from "./components/ItemList";
import Despatch from "./Despatch";
import WeekTable from "./components/WeekTable";
import ApiFetch from "./ApiFetch";
import SingleList from "./components/SingleList";
import MultiList from "./components/MultiList";


function App() {
  const [key, setKey] = useState('priorities');
  const [lists, setData] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState('http://localhost:9000/users/?_embed=items');

  const GetApiData = async () => {
    const { data, isLoading, error } = await ApiFetch(url)
    setData(data);
    
    const alerts = await ApiFetch(`http://localhost:9000/alerts`)
    setAlerts(alerts);

    setIsLoading(isLoading);
    setError(error);
  };

  useEffect(() => {
    GetApiData();
  }, [url]);

  return (
    <Router>
      <div className="app">
        <div className="container-fluid">
          <Switch>
            <Route exact path="/">
              <h3 className="text-center">ICT DOS</h3>
              <Tabs id="" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                <Tab eventKey="main" title="Main">
                  <div className="main">
                    <div className="stats">
                      <WeekTable />
                      <WeekTable />
                    </div>
                    <div className="alerts">
                      <SingleList title="Alerts" tail="alerts" />
                      <SingleList title="Instructions" tail="instructions" />
                    </div>
                    <div className="notifications">
                    <SingleList title="Changes & Notifications" tail="changes" />
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="priorities" title="Priorities">
                  <div className="priorities">
                  {error && <div>{error}</div>}
                  {isLoading && <div className="test"> Loading...</div>}
                  <MultiList tail="users/?_embed=items" />
                  </div>
                </Tab>
                <Tab eventKey="config" title="Config" disabled>
                </Tab>
              </Tabs>
            </Route>
          </Switch>
        </div>
      </div>
    </Router >
  );

}

export default App;
