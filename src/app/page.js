'use client'

// import { RadarChart } from '../components/charts/radarChart.jsx'
import React from 'react'
import { columns, colors } from '../constants/constants'
import { Table } from '@nextui-org/react'
import rows from '../constants/players.json'
import { useStore } from '../store/store.js'
import { useRouter } from 'next/navigation'
const Home = () => {
  const setPlayer = useStore(state => state.setBasePlayer)
  const router = useRouter()
  return (
    <div className='container mx-auto px-8 pb-8'>
      <header className='flex justify-between items-center my-10'>
        <h1 className='flex flex-grow-0 text-quinary text-5xl uppercase'>profile search</h1>
        <div className='flex flex-grow-0 gap-3'>
          <div className='bg-gray-100 rounded-xl px-4 py-2 border-none text-lg cursor-pointer'>
            Generation ▼
          </div>
          <div className='bg-gray-100 rounded-xl px-4 py-2 border-none text-lg cursor-pointer'>
            Position ▼
          </div>
          <div className='bg-gray-100 rounded-xl px-4 py-2 border-none text-lg cursor-pointer'>
            Equipment ▼
          </div>
        </div>
      </header>
      <section>
        <Table
          headerLined
          aria-label='Example table with dynamic content'
          css={{
            height: '100%',
            minWidth: '100%',
            fontSize: '24px'
          }}
          bordered
          shadow
        >
          <Table.Header
            columns={columns}

          >
            {(column) => (
              <Table.Column key={column.key} css={{ fontSize: '20px', color: colors.primary }}>
                {column.label}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={rows}>
            {(item) => {
              return (
                <Table.Row
                  key={item.key} css={
                  rows.indexOf(item) % 2 === 0
                    ? { background: 'rgb(243 244 246)' }
                    : { background: '' }
                }
                >
                  {(columnKey) =>
                    <Table.Cell css={{ cursor: 'pointer' }}>
                      <button onClick={() => { setPlayer(item); router.push('/playerInfo') }} className='text-lg text-quinary'>{item[columnKey]}</button>
                    </Table.Cell>}
                </Table.Row>
              )
            }}
          </Table.Body>
          <Table.Pagination
            shadow
            noMargin
            align='center'
            rowsPerPage={10}
            onPageChange={(page) => console.log({ page })}
          />
        </Table>
      </section>
    </div>
  )
}

export default Home
