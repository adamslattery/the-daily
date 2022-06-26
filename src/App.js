import { useState} from "react";
import './App.css';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from "./useFetch";
import { BrowserRouter as Router, Route, Switch }  from 'react-router-dom';
import NavBar from "./components/NavBar";
import FormItem from "./components/FormItem";
import ItemList from "./components/ItemList";


function App() {

  const { data: lists, isLoading, error } = useFetch('http://localhost:9000/users/?_embed=items');
  const [key, setKey] = useState('priorities');

  /*
const markListItem = (source, index) => {
  const newlists = [...lists];
  newlists.forEach((list) => {
    if (list.source === source) {
      list.items[index].isDone = (list.items[index].isDone % 2) === 0;
    }
  });
  //setlists(newlists);
};
*/

const updateItem = (listId, itemId, action) => {
  const newlists = [...lists];
  console.log(lists);
  console.log(listId);
  console.log(itemId);
  console.log(action);

  newlists.forEach((list) => {
    if (list.id === listId) {
      console.log(list.name);
      list.items.forEach((item, index) => {
        if (list.id === listId) {
          switch(action) {
            case 'pri':
              item.isPri = (item.isPri % 2) === 0;
              break;
            case 'complete':
              item.isDone = (item.isDone % 2) === 0;
              break;
            case 'delete':
              list.item.splice(index, 1);
              break;
          }
        }
      })
    }
  });
  console.log(newlists);
};

  return (
    <Router>
      <div className="app">
        <div className="container-fluid">
          <NavBar />
          <Switch>
            <Route exact path="/">
              <h1 className="text-center mb-4">ICT DOS</h1>
              <Tabs id="-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                <Tab eventKey="main" title="Main">
                </Tab>
                <Tab eventKey="priorities" title="Priorities">
                  {error && <div>{ error }</div>}
                  {isLoading && <div className="test"> Loading...</div>}
                  {lists && <FormItem title="title" lists={lists} updateItem={updateItem}/>}
                  {lists && <ItemList lists={lists} updateItem={updateItem} />}
                </Tab>
                <Tab eventKey="config" title="Config" disabled>
                </Tab>
              </Tabs>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );

}

export default App;
