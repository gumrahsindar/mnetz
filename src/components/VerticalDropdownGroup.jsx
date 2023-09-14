import { useState } from 'react'
import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'

function VerticalDropdown({ title, items, handleSelect }) {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=''
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
      {children}
      &#x25bc;
    </a>
  ))

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('')

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className='mx-3 my-2 w-auto'
            placeholder='Type to filter...'
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className='list-unstyled'>
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      )
    }
  )

  function listItems(items) {
    items.sort((a, b) => {
      if (a.slug > b.slug) {
        return 1
      }
      if (a.slug < b.slug) {
        return -1
      }
      return 0
    })
    console.log('items are sorted')

    const newItems = items.map((item) => (
      <Dropdown.Item key={item.id} eventKey={item.id}>
        {item.isim}
      </Dropdown.Item>
    ))
    return newItems
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>{listItems(items)}</Dropdown.Menu>
    </Dropdown>
  )
}

export default VerticalDropdown
