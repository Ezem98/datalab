import { Avatar } from '@nextui-org/react'
import Image from 'next/image'
import { round } from 'lodash'
import { flags } from '../constants/constants.js'
import { MdDeleteForever } from 'react-icons/md'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
export const PlayerCard = ({ player, withOptions = false, visible, handleVisible, handleDelete }) => {
  const { citizenship, foot, name, position, age, height, weight, club, marketValue } = player

  return (
    <section className='flex border rounded-lg'>
      {/* Player Image */}
      <section className='grid p-4'>
        <Avatar
          src='/player_avatar.png'
          css={{ size: '$20' }}
          color='primary'
          bordered
        />
        <section className='flex justify-between items-center'>
          <Image
            src={flags[citizenship]}
            alt='flag'
            width='20'
            height='20'
            style={{
              objectFit: 'contain'
            }}
          />
          <h3 className='text-base uppercase p-0 m-0'>{foot}</h3>
        </section>
        {withOptions &&
          <section className='flex justify-between items-center'>
            <button
              className='hover:transform hover:scale-90'
              onClick={handleDelete}
            >
              <MdDeleteForever
                color='#ce1126'
                size='1.5em'
              />
            </button>
            <button
              className='hover:transform hover:scale-90'
              onClick={handleVisible}
            >
              {!visible
                ? <AiFillEyeInvisible
                    color='#141414'
                    size='1.5em'
                  />
                : <AiFillEye
                    color='#141414'
                    size='1.5em'
                  />}
            </button>
          </section>}
      </section>
      <section className='flex flex-col justify-between p-4 w-full'>
        {/* Player Name */}
        <h3 className='uppercase flex tracking-wider p-0 m-0'>{name}</h3>
        <section className='flex justify-between '>
          <h3 className='text-gray-400 font-medium text-sm'>{position}</h3>
          <h3 className='text-gray-400 font-medium text-sm'>{age}</h3>
        </section>
        <section className='flex justify-between'>
          <h3 className='text-base'>{height / 100} M</h3>
          <h3 className='text-base'>{weight} KG</h3>
        </section>
        <section className='flex justify-between'>
          <h3 className='text-base'>{club}</h3>
          <h3 className='text-base'>{round((marketValue / 1000000), 2)} M</h3>
        </section>
      </section>
    </section>
  )
}
