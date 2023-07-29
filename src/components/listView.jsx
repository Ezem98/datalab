'use client'
import { Avatar } from '@nextui-org/react'
import Link from 'next/link'

export const ListView = ({ items }) => {
  return (
    items?.map((item, i) => {
      const { name, position } = item
      return (
        <Link key={i} href={`/playerInfo/${item.key}`} className='flex w-full justify-start items-start gap-4 pb-4 text-lg text-quinary'>
          <Avatar
            src='/player_avatar.jpg'
            css={{ size: '$16' }}
            color='primary'
            bordered
          />
          <h4 className='uppercase tracking-normal p-0 m-0 text-quinary'>#{i + 1}</h4>
          <section className='flex flex-col items-start justify-start '>
            <h4 className='uppercase flex tracking-normal p-0 m-0'>{name}</h4>
            <p className='text-sm font-medium text-gray-400 p-0 m-0'>{position}</p>
          </section>
        </Link>
      )
    })
  )
}
