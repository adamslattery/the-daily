import { useState, useEffect, useRef } from 'react';
import { Button, Card } from 'react-bootstrap';
import ApiFetch from '../ApiFetch';
import Despatch from '../Despatch';
import Editable from './Editable';

const MultiList = ({ title, tail }) => {
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

  const actionItem = async (listId, itemId, action, context = "") => {
    const newData = [...data];
    var urlTail = '';
    var postData = '';
    var method = 'put';
    var newIndex = null;

    if (action === 'delete') {
      if (!window.confirm("Continue deleting this item?")) {
        return;
      }
    }

    if (context) {
      tail = context;
    }

    newData.forEach((list, index) => {
      if (list.id === listId) {
        if (action === 'new') {
          newIndex = index;
          if (context === 'user') {
            postData = { name: 'New List' };
          } else {
            postData = { id: 0, text: '', isDone: false, isPri: false, userId: parseInt(list.id) };
          }
          urlTail = `${tail}/`;
          method = 'post';
        } else {
          list.items.forEach((item, index) => {
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
                  console.log('this is index ' + index);
                  list.items.splice(index, 1);
                  console.log(newData);
                  method = 'delete';
                  break;
                default:
                  item.text = action;
                  break;
              }
              postData = item;
              console.log('acion ' + action);
              console.log('item id ' + item.id);
              urlTail = `${tail}/${item.id}`;
            }
          });
        }
      }
    });

    const resp = await Despatch('http://localhost:9000/' + urlTail, method, postData)
    if (action == 'new') {
      if (context === 'user') {
        newData.push(resp);
      } else {
        newData[newIndex].items.push(resp);
      }
    }
    setData(newData);
  };

  const editText = (listId, itemId, e) => {
    actionItem(listId, itemId, e.target.value, 'items')
  }

  return (
    <div className="lists">
      {data && data.map((list, listIndex) => (
        <div className="single-list list" key={listIndex}>
          <div className="heading">
            <h2>{list.name}</h2>
            <Button variant="outline-success" onClick={() => actionItem(list.id, 0, 'new', 'items')}>+</Button>
          </div>
          {list.items.map((item, index) => (
            <div className="item" key={index}>
              <Card >
                <Card.Body>
                  <div className="item">
                    <span style={{
                      textDecoration: item.isDone ? "line-through" : "",
                      color: item.isDone ? "lightgrey" : "inherit",
                      fontWeight: item.isPri ? "bold" : "normal"
                    }}>
                      {!item ? 'No entries yet' :
                        <Editable
                          text={item.text}
                          placeholder={`**New ${list.name} item`}
                          childRef={inputRef}
                          type="input">
                          <input
                            ref={inputRef}
                            type="text"
                            name={list.name + item.id}
                            placeholder=""
                            value={item.text}
                            onChange={e => {
                              e.preventDefault();
                              let newdata = [...data];
                              newdata[listIndex].items[index].text = e.target.value;
                            }}
                            onBlur={e => editText(list.id, item.id, e)}
                          />
                        </Editable>}</span>
                    <div className="control-buttons">
                      <Button variant="outline-success" active={item.isPri ? "true" : ""} onClick={() => actionItem(list.id, item.id, 'pri', 'items')}>Pri</Button>
                      <Button variant="outline-success" onClick={() => actionItem(list.id, item.id, 'complete', 'items')}>✓</Button>
                      <Button variant="outline-danger" onClick={() => actionItem(list.id, item.id, 'delete', 'items')}>✕</Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MultiList;