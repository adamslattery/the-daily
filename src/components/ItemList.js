import { Card, ListGroupItem } from 'react-bootstrap';
import Item from './Item';

const ItemList = ({ lists, updateItem, updateList }) => {
    return (
    <div className="lists">
    {lists.map((list, index) => (
      <div className="list" key={index} onDoubleClick={(e) => {if(e.ctrlKey) updateList(list.id, list.name, 'delete' );}}>
        <h2>{list.name}</h2>
        {list.items.map((item, index) => (
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
 
export default ItemList;