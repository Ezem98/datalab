import { Avatar } from '@nextui-org/react'
import Image from 'next/image'
import { round } from 'lodash'
import { flags, colors } from '../constants/constants.js'
import { MdDeleteForever } from 'react-icons/md'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
export const PlayerCard = ({ player, withOptions = false, visible, handleVisible, handleDelete, color }) => {
  const { citizenship, foot, name, position, age, height, weight, club, marketValue, minutesPlayed, matchesPlayed } = player
  return (
    <section className='flex flex-col sm:flex-row border rounded-lg p-4'>
      {/* Player Image */}
      <section className='grid sm:mr-4 sm:mb-0'>
        <Avatar
          src='/player_avatar.png'
          css={{ size: '$18', backgroundColor: `${colors[color]}` }}
          color='#000ccc'
          bordered
        />
        <section className='flex justify-between items-center'>
          <Image
            src={flags[citizenship.split(', ')[0]]}
            alt='flag'
            width='20'
            height='20'
          />
          <span className='sm:text-sm uppercase font-bold tracking-tighter'>{foot}</span>
        </section>

        {withOptions && (
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
                ? (
                  <AiFillEyeInvisible
                    color='#141414'
                    size='1.5em'
                  />
                  )
                : (
                  <AiFillEye
                    color='#141414'
                    size='1.5em'
                  />
                  )}
            </button>
          </section>
        )}
      </section>
      <section className='flex flex-col justify-between w-full'>
        {/* Player Name */}
        <h3 className='uppercase flex tracking-wider text-lg sm:text-xl'>{name}</h3>
        {withOptions &&
          <section className='flex justify-between'>
            <h4 className='text-sm m-0 p-0 tracking-normal'>{minutesPlayed} Min</h4>
            <h4 className='text-sm m-0 p-0 tracking-normal'>{matchesPlayed} Mat</h4>
          </section>}
        <section className='flex justify-between'>
          <h3 className='text-gray-400 m-0 p-0 font-medium text-sm'>{position}</h3>
          <h3 className='text-gray-400 m-0 p-0 font-medium text-sm'>{age}</h3>
        </section>
        <section className='flex justify-between'>
          <h3 className='text-base m-0 p-0'>{height / 100} M</h3>
          <h3 className='text-base m-0 p-0'>{weight} KG</h3>
        </section>
        <section className='flex justify-between'>
          <h3 className='text-base m-0 p-0'>{club}</h3>
          <h3 className='text-base m-0 p-0'>{round((marketValue / 1000000), 2)} M</h3>
        </section>
      </section>
    </section>
  )
}
