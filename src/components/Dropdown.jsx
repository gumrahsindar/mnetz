import Dropdown from 'react-bootstrap/Dropdown'

function MakamDropdownMenu({ makamList, handleSelect }) {
  const makamsSelections = makamList.map((makam, index) => (
    <Dropdown.Item key={makam.id} onClick={() => handleSelect(index)}>
      {makam.isim}
    </Dropdown.Item>
  ))

  return (
    <Dropdown>
      <Dropdown.Toggle variant='success' id='dropdown-basic'>
        Makam List
      </Dropdown.Toggle>

      <Dropdown.Menu>{makamsSelections}</Dropdown.Menu>
    </Dropdown>
  )
}

export function SelectionDropdownMenu({ dropdownName, options, handleSelect }) {
  const selectionOptions = options.map((option, index) => (
    <Dropdown.Item key={option} onClick={() => handleSelect(index)}>
      {option}
    </Dropdown.Item>
  ))

  return (
    <Dropdown>
      <Dropdown.Toggle variant='success' id='dropdown-basic'>
        {dropdownName}
      </Dropdown.Toggle>

      <Dropdown.Menu>{selectionOptions}</Dropdown.Menu>
    </Dropdown>
  )
}

export default MakamDropdownMenu
