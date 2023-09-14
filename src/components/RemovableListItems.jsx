import { CloseButton, Container, Row } from 'react-bootstrap'

function RemovableListItems({ items, handleRemove }) {
  console.log('items are', items, typeof items)
  function createList(items) {
    let listItems = items.map((item) => (
      <Row key={item.isim}>
        <p>
          {item.isim}
          <CloseButton
            key={item.id}
            value={item.id}
            onClick={handleRemove}
            variant='white'
          />
        </p>
      </Row>
    ))
    return listItems
  }

  return <Container className='my-5'>{createList(items)}</Container>
}

export default RemovableListItems
