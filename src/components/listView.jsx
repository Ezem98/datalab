'use client'
import { Avatar } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useStore } from '../store/store.js'
import { flags } from '../constants/constants.js'
import Image from 'next/image'
import { round } from 'lodash'

export const ListView = ({ items, handleOnDrag, similarPlayersRef }) => {
  const router = useRouter()
  const { setBasePlayer } = useStore()

  return (
    <div ref={similarPlayersRef}>
      {items?.map((item, i) => {
        const { name, position, citizenship, age, club, marketValue } = item.player
        return (
          <button
            key={i}
            onClick={() => {
              setBasePlayer(item)
              router.push('/playerInfo')
            }}
            className='flex w-full justify-start items-start gap-4 text-lg text-quinary border-b-2 mb-3'
            draggable
            onDragStart={e => handleOnDrag(e, JSON.stringify(item))}
          >
            <Avatar
              src='/player_avatar.png'
              css={{ size: '$16' }}
              color='primary'
              bordered
            />
            <h4 className='uppercase tracking-normal p-0 m-0 text-quinary'>#{i + 1}</h4>
            <section className='flex flex-col items-start justify-start w-full'>
              <section className='flex items-center justify-between w-full'>
                <section className='flex'>
                  <h4 className='uppercase flex tracking-normal p-0 m-0'>{name}</h4>
                  <Image
                    src={flags[citizenship.split(', ')[0]]}
                    alt='flag'
                    width='20'
                    height='20'
                    style={{
                      objectFit: 'contain',
                      marginLeft: '5px'
                    }}
                  />
                </section>
                <h4 className='uppercase flex tracking-normal p-0 m-0'>({age})</h4>
                {item.similarityPercentage >= 75
                  ? <h4 className='uppercase flex tracking-normal px-2 m-0 rounded-xl bg-primary'>{round(item.similarityPercentage, 1)}%</h4>
                  : <h4 className='uppercase flex tracking-normal px-2 m-0 rounded-xl bg-secondary'>{round(item.similarityPercentage, 1)}%</h4>}
              </section>
              <p className='text-sm font-medium text-gray-400 p-0 m-0'>{position}</p>
              <section className='flex items-center justify-between'>
                <h6 className='uppercase flex tracking-normal p-0 m-0'>{club}</h6>
                <h6 className='uppercase flex tracking-normal p-0 m-0 pl-5'>{marketValue / 1000000} M</h6>
              </section>
            </section>
          </button>
        )
      })}
    </div>
  )
}
