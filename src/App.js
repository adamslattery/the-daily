import { useState, useEffect} from "react";
import './App.css';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch }  from 'react-router-dom';
import NavBar from "./components/NavBar";
import FormItem from "./components/FormItem";
import ItemList from "./components/ItemList";
import Despatch from "./Despatch";


function App() {

 // const { data: lists, isLoading, error } = useFetch('http://localhost:9000/users/?_embed=items');
  const [key, setKey] = useState('priorities');
  const [lists, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  
  
  useEffect(() => {   
      if(!url){
        setUrl('http://localhost:9000/users/?_embed=items');
      }

      const abortCont = new AbortController();
      console.log(url);
      
      var requestOptions = {
        signal: abortCont.signal
      }
/*
      if(method==='post') {
        requestOptions.push({method: method})
        requestOptions.push({headers: { 'Content-Type': 'application/json' }})
        requestOptions.push({body: JSON.stringify(data)})
      }
*/
      fetch(url, requestOptions)
        .then(res => {
          if(!res.ok) {
            throw Error('Could not fetch from '+url)
          }
          return res.json();        
        })
        .then(data => {
          setData(data);
          setIsLoading(false);
          setError(null);
        })
        .catch(err => {
          if(err.name === 'AbortError')
          {
            console.log('fetch aborted');
          } else {
            setError(err.message);
            setIsLoading(false);
          }
        });
      return () => abortCont.abort();
    }, [url]);


  const updateItem = (listId, itemId, action) => {
    const newlists = [...lists];
    //console.log(lists);
    //console.log(listId);
    //console.log(itemId);
    //console.log(action);
    var urlTail = '';
    var data = '';
    var method = 'put';
    newlists.forEach((list) => {
      
      if (list.id === listId) {
        console.log(list.name);
        list.items.forEach((item, index) => {
          if (item.id === itemId) {
            console.log(item);
            console.log(item.isPri);
            console.log(action);
            switch(action) {
              case 'pri':
                item.isPri = (item.isPri % 2) === 0;
                break;
              case 'complete':
                item.isDone = (item.isDone % 2) === 0;
                break;
              case 'delete':
                list.items.splice(index, 1);
                method='delete';
                break;
              default:
                break;
            }
            urlTail = 'items/' + item.id
            data=item;
          }
        })
        console.log(urlTail);
        console.log(data);
      }
      
    });
    Despatch('http://localhost:9000/' + urlTail, method, data)
    console.log(newlists);
    setData(newlists);
  };

  const updateList = (sourceId, sourceList, value) => {
    setUrl('');
    let url =  'http://localhost:9000/';
    let urlTail = '';
    let method = 'post';
    let data = '';

    if(sourceList === "Add New List"){
      console.log('Add list');
        urlTail = 'users'
        data = { name: value };
        document.getElementById('sourceSelect').value = 0;
    } else {
      if(value ==='delete') {
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
    setUrl(null);
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
                  {lists && <FormItem title="title" lists={lists} updateList={updateList} />}
                  {lists && <ItemList lists={lists} updateItem={updateItem} updateList={updateList} />}
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
