import { useState, useEffect, useRef } from 'react';
import { Button, Card } from 'react-bootstrap';
import ApiFetch from '../ApiFetch';
import Despatch from '../Despatch';
import Editable from './Editable';

const SingleList = ({ title, tail }) => {
  const [data, setData] = useState(null);
  const inputRef = useRef();

  const GetApiData = async () => {
    const { data, isLoading, error } = await ApiFetch(`http://localhost:9000/${tail}`)
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    GetApiData();
  }, []);

  const actionItem = async (itemId, action) => {
    const newData = [...data];
    var urlTail = '';
    var postData = '';
    var method = 'put';

    if (action === 'delete') {
      if (!window.confirm("Continue deleting this item?")) {
        return;
      }
    }

    if (action === 'new') {
      postData = { id: 0, text: '', isDone: false, isPri: false };
      urlTail = `${tail}/`;
      method = 'post';
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
              newData.splice(index, 1);
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

    const resp = await Despatch('http://localhost:9000/' + urlTail, method, postData)
    if (action === 'new') {
      newData.push(resp)
    }
    setData(newData);
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
        <div className="item" key={index}>
          <Card key={index}>
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
                      />
                    </Editable>}</span>
                <div className="control-buttons">
                  <Button variant="outline-success" active={item.isPri ? "true" : ""} onClick={() => actionItem(item.id, 'pri')}>Pri</Button>
                  <Button variant="outline-success" onClick={() => actionItem(item.id, 'complete')}>✓</Button>
                  <Button variant="outline-danger" onClick={() => actionItem(item.id, 'delete')}>✕</Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default SingleList;