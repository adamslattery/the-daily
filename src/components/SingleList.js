import { useState, useEffect, useRef } from 'react';
import { Button, Card } from 'react-bootstrap';
import ApiFetch from '../ApiFetch';
import Despatch from '../Despatch';
import Editable from './Editable';

const SingleList = ({ title, tail }) => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [task, setTask] = useState("");
  const inputRef = useRef();

  const GetApiData = async () => {
    const { data, isLoading, error } = await ApiFetch(`http://localhost:9000/${tail}`)
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    GetApiData();
  }, [url]);

  const actionItem = (itemId, action) => {
    const newData = [...data];
    var urlTail = '';
    var postData = '';
    var method = 'put';

    if (action === 'new') {
      postData = { text: '', isDone: false, isPri: false };
      newData.push(postData);
      console.log(postData)
      console.log(newData);
      urlTail = `${tail}/`;
      method = 'post';
      setData(newData);
    } else {
      newData.forEach((item, index) => {
        if (item.id === itemId) {
          switch (action) {
            case 'pri':
              item.isPri = (item.isPri % 2) === 0;
              break;
            case 'complete':
              item.isDone = (item.isDone % 2) === 0;
              break;
            case 'delete':
              console.log(newData);
              console.log('this is index ' + index)
              newData.splice(index, 1);
              console.log(newData);

              method = 'delete';
              break;
            default:
              item.text = action;
              break;
          }
          postData = item;
          console.log('acion '+action);
          console.log('item id '+item.id);
          urlTail = `${tail}/${item.id}`;
        }
      });
    }


    //console.log(urlTail);
    //console.log(data);

    Despatch('http://localhost:9000/' + urlTail, method, postData)
    setData(newData);
    GetApiData();
    //console.log(newlists);
    
  };

  const editText = (itemId, e) => {
    //e.preventDefault();
    //setTask(e.target.value);
    actionItem(itemId, e.target.value)
    //const timeOutId = setTimeout(() => actionItem(itemId, e.target.value), 2000);
    //return () => clearTimeout(timeOutId);
  }

  return (
    <div className="single-list">
      <div className="heading">
        <h2>{title}</h2>
        <Button variant="outline-success" onClick={() => actionItem(0, 'new')}>+</Button>
      </div>
      {data && data.map((item, index) => (
        <div className="item" key={index} onDoubleClick={(e) => { if (e.ctrlKey) actionItem(item.id, 'delete'); }}>
          <Card key={index}>
            <Card.Body>
              <div className="item">
                <div className="control-buttons">
                  <Button variant="outline-success" active={item.isPri ? "true" : ""} onClick={() => actionItem(item.id, 'pri')}>Pri</Button>
                  <Button variant="outline-success" onClick={() => actionItem(item.id, 'complete')}>✓</Button>
                  <Button variant="outline-danger" onClick={() => actionItem(item.id, 'delete')}>✕</Button>
                </div>
                <span style={{
                  textDecoration: item.isDone ? "line-through" : "",
                  color: item.isDone ? "Grey" : "inherit",
                  fontWeight: item.isPri ? "bold" : "normal"
                }}>
                  {!item ? 'No entries yet' :
                    <Editable
                      text={item.text}
                      placeholder={`**New ${tail} item`}
                      childRef={inputRef}
                      type="input">
                      <input
                        ref={inputRef}
                        type="text"
                        name={tail + item.id}
                        placeholder=""
                        value={item.text}
                        onChange={e => {
                          e.preventDefault();
                          let newdata = [...data];
                          newdata[index].text = e.target.value;
                          setData(newdata);
                        }}
                        onBlur={e => editText(item.id, e)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') { 
                            e.key = 'tab'; editText(item.id, e);
                          }}}
                      />
                    </Editable>}</span>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default SingleList;