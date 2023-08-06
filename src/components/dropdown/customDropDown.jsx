'use client'

import { Dropdown } from '@nextui-org/react'
export const CustomDropDown = ({ variant, items, css, ripple, selectedItem, setSelectedItem, selectText = 'Select item' }) => {
  console.log({ selectedItem })
  return (
    <Dropdown>
      <Dropdown.Button light css={css} ripple={ripple}>{selectedItem ?? selectText}</Dropdown.Button>
      <Dropdown.Menu aria-label='Dynamic Actions' items={items} onAction={key => setSelectedItem(items[key])} css={{ overflowY: 'scroll', maxHeight: '20vh' }}>
        {(item) => (
          <Dropdown.Item
            key={item.key}
            css={{ fontSize: '20px' }}
          >
            {item.name}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}
