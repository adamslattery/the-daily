import { useState} from "react";
import { Button, Form, InputGroup } from 'react-bootstrap';
import Despatch from "../Despatch";

function FormItem({ title, lists }) {
    const [value, setValue] = useState("");
    const [sourceList, setSource] = useState("");

    let url =  'http://localhost:9000/priorities';
    let method = '';
    let data = '';

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!sourceList) return;
        if (!value) return;
        
        if(sourceList === "Add New List"){
            method = 'post';
            data = [{
                source: value,
                items: []
            }];
            document.getElementById('sourceSelect').value = 0;
            console.log('put');
            console.log(url);
            console.log(method);
            console.log(data);
        } else {
            url += '?source='+sourceList;
            method = 'patch';
            data = {
                source: sourceList,
                items: [{ text: value, isDone: false, isPri: false }]
            };
            console.log('patch');
            console.log(url);
            console.log(method);
            console.log(data);
        }
        setValue('');
        const {outdata} = Despatch({ url, method, data });
    };
  
    return (
      <Form onSubmit={handleSubmit}> 
      <Form.Group>
        <InputGroup className="mb-3">
          <Form.Select className="" id="sourceSelect" onChange={e => setSource(e.target.value)}>
            <option>Choose List</option>
            <option>Add New List</option>
            {lists.map((list, index) => (
              <option className="list" key={index}>{list.source}</option>
            ))}
          </Form.Select>
          <Form.Control name="item" type="text" className="w-75" value={value} onChange={e => setValue(e.target.value)} placeholder="Enter a new item" />
          <Button className="" variant="primary" type="submit">Submit</Button>
        </InputGroup>
        </Form.Group>
      </Form>
    );
  }
  
  export default FormItem