import { Button, Card } from 'react-bootstrap';

const Item = ({ item, listId, updateItem}) => {
    return (
      <div className="item">
  
          <div className="control-buttons">
            <Button variant="outline-success" active={item.isPri ? "true" : ""} onClick={() => updateItem(listId, item.id, 'pri')}>Pri</Button>{' '}
            <Button variant="outline-success" onClick={() => updateItem(listId, item.id, 'complete')}>✓</Button>{' '}
            <Button variant="outline-danger" onClick={() => updateItem(listId, item.id, 'delete')}>✕</Button>
          </div>
          <span style={{ textDecoration: item.isDone ? "line-through" : "", color: item.isDone ? "Grey" : "inherit", fontWeight: item.isPri ? "bold" : "normal" }}>{!item ? 'No items yet' : item.text}</span>
  
      </div>
    );
  };

const NotificationsList = ({ lists, updateItem, updateList }) => {
    return (
    <div className="lists">
    {lists.map((list, index) => (
      <div className="list" key={index} onDoubleClick={(e) => {if(e.ctrlKey) updateList(list.id, list.name, 'delete' );}}>
        <h2>{list.name}</h2>
        {list.notifications.map((item, index) => (
          <Card key={index}>
            <Card.Body>
              <Item
              key={index}
              item={item}
              listId={list.id}
              updateItem={updateItem}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
    ))}
  </div>
  );
}
 
export default NotificationsList;