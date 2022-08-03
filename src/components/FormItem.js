import { useState} from "react";
import { Button, Form, InputGroup } from 'react-bootstrap';

function FormItem({ title, lists, updateList}) {
    const [value, setValue] = useState("");
    const [sourceList, setSource] = useState("");
    const [sourceId, setSourceId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!sourceList) return;
        if (!value) return;

        console.log(sourceList);
        console.log(sourceId);
        updateList(sourceId, sourceList, value);
        setValue('');
    };
  
    return (
      <Form onSubmit={handleSubmit}> 
      <Form.Group>
        <InputGroup className="mb-3">
          <Form.Select className="" id="sourceSelect" onChange={e => {setSource(e.target.value); setSourceId(e.target[e.target.selectedIndex].dataset.userid)}}>
            <option>Choose List</option>
            <option>Add New List</option>
            {lists.map((list, index) => (
              <option className="list" data-userid={list.id} key={index}>{list.name}</option>
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