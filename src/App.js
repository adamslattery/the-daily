import { useState, useEffect, useRef } from "react";
import './App.css';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from "./components/NavBar";
import FormItem from "./components/FormItem";
import ItemList from "./components/ItemList";
import Despatch from "./Despatch";
import Editable from "./components/Editable";
import WeekTable from "./components/WeekTable";
import IntructionsList from "./components/InstructionList";
import IntructionList from "./components/InstructionList";
import NotificationsList from "./components/NotificationsList";
import ApiFetch from "./ApiFetch";
import SingleList from "./components/SingleList";


function App() {
  const [key, setKey] = useState('main');
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


  const updateItem = (listId, itemId, action) => {
    const newlists = [...lists];
    var urlTail = '';
    var data = '';
    var method = 'put';
    newlists.forEach((list) => {

      if (list.id === listId) {
        //console.log(list.name);
        list.items.forEach((item, index) => {
          if (item.id === itemId) {
            //console.log(item);
            //console.log(item.isPri);
            //console.log(action);
            switch (action) {
              case 'pri':
                item.isPri = (item.isPri % 2) === 0;
                break;
              case 'complete':
                item.isDone = (item.isDone % 2) === 0;
                break;
              case 'delete':
                list.items.splice(index, 1);
                method = 'delete';
                break;
              default:
                break;
            }
            urlTail = 'items/' + item.id
            data = item;
          }
        })
        //console.log(urlTail);
        //console.log(data);
      }

    });
    Despatch('http://localhost:9000/' + urlTail, method, data)
    //console.log(newlists);
    setData(newlists);
  };

  const updateList = (sourceId, sourceList, value) => {
    setUrl('');
    let url = 'http://localhost:9000/';
    let urlTail = '';
    let method = 'post';
    let data = '';

    if (sourceList === "Add New List") {
      console.log('Add list');
      urlTail = 'users'
      data = { name: value };
      document.getElementById('sourceSelect').value = 0;
    } else {
      if (value === 'delete') {
        console.log('Remove list');
        urlTail = 'users/' + sourceId;
        method = 'delete';
        data = { id: parseInt(sourceId) };
      } else {
        console.log('Add item');
        urlTail = 'items'
        data = { text: value, isDone: false, isPri: false, userId: parseInt(sourceId) };
      }
    }
    console.log(url);
    console.log(method);
    console.log(data);

    Despatch(url + urlTail, method, data);
    setUrl("");
  };

  return (
    <Router>
      <div className="app">
        <div className="container-fluid">
          <Switch>
            <Route exact path="/">
              <h1 className="text-center mb-4">ICT DOS</h1>
              <Tabs id="" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                <Tab eventKey="main" title="Main">
                  <div className="main">
                    <div className="stats">
                      <WeekTable />
                      <WeekTable />
                    </div>
                    <div className="alerts">
                      {<SingleList title="Alerts" tail="alerts" />}
                      {<SingleList title="Instructions" tail="instructions" />}
                    </div>
                    <div className="notifications">
                    {<SingleList title="Changes & Notifications" tail="changes" />}
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="priorities" title="Priorities">
                  {error && <div>{error}</div>}
                  {isLoading && <div className="test"> Loading...</div>}
                  {lists && <ItemList lists={lists} updateItem={updateItem} updateList={updateList} />}
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
