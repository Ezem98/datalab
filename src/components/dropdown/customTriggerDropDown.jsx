'use client'

import { Dropdown } from '@nextui-org/react'
export const CustomTriggerDropDown = ({
  variant,
  items,
  css,
  ripple,
  selectedItem,
  onAction,
  onSelectionChange,
  selectedKeys,
  selectionMode,
  children,
  width
}) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>{children}</Dropdown.Trigger>
      <Dropdown.Menu
        aria-label='Dynamic Actions'
        items={items}
        onAction={onAction}
        css={{ overflowY: 'scroll', maxHeight: '20vh', minWidth: width }}
        selectionMode={selectionMode}
        selectedKeys={selectedKeys}
        onSelectionChange={onSelectionChange}
      >
        {(item) => {
          return (
            <Dropdown.Item key={item.key} css={{ fontSize: '18px', padding: '2px' }}>
              {item.name}
            </Dropdown.Item>
          )
        }}
      </Dropdown.Menu>
    </Dropdown>
  )
}
