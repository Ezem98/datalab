'use client'

import { useState } from 'react'
import { Avatar } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineZoomIn as Zoom } from 'react-icons/ai'
import { MdAddChart as Add } from 'react-icons/md'
// import { PDFViewer } from '@react-pdf/renderer'
import { RadarChart } from '../../../components/charts/radarChart.jsx'
import { RingGaugeChart } from '../../../components/charts/ringGaugeChart.jsx'
import { GradeGaugeChart } from '../../../components/charts/gradeGaugeChart.jsx'
import { Button } from '../../../components/button.jsx'
import { CustomDropDown } from '../../../components/dropdown/customDropDown.jsx'
import { ListView } from '../../../components/listView.jsx'
// import { MyDocument } from '../../../components/documentPDF.jsx'
import { ContentModal } from '../../../components/contentModal.jsx'
import { IconButton } from '../../../components/iconButton.jsx'
import yellowCard from '../../../assets/icons/yellow-card.png'
import redCard from '../../../assets/icons/red-card.png'
import decreaseArrow from '../../../assets/icons/decrease.png'
import increaseArrow from '../../../assets/icons/increase.png'
import dorsal from '../../../assets/images/dorsal.png'
import players from '../../../constants/players.json'
import { positions, flags } from '../../../constants/constants.js'
import { getPlayerStatisticsPerPosition, getSimilarPlayers, calculateAverageRating } from '../../../utils/functions.js'
import { useModal } from '../../../hooks/useModal.jsx'

// export async function fetchPlayer (id) {
//   console.log('Hi server side')
//   // console.log({ params })
//   const player = players.find((p) => p.key.toString() === id)

//   return player
// }

// export async function generateStaticParams () {
//   console.log('hola')
//   return players.map(player => ({
//     id: player.key.toString()
//   }))
// }

const PlayerInfo = ({ params }) => {
  const { id } = params
  const player = players.find((p) => p.key.toString() === id)
  const contentModal = useModal()

  const items = positions.map((element, index) => {
    return {
      key: index,
      name: element
    }
  })

  const [selectedItem, setSelectedItem] = useState(null)
  const [modalTitle, setModalTitle] = useState(null)
  const [modalContent, setModalContent] = useState(null)

  const footer = (
    <>
      <Button
        size='lg'
        auto
        ghost
        color='primary'
        onClick={() => contentModal.closeModal()}
      >
        Cerrar
      </Button>
    </>
  )

  if (!player) {
    return <p>Jugador no encontrado.</p>
  }

  const {
    name,
    position,
    age,
    height,
    weight,
    placeOfBirth,
    citizenship,
    yellowCards,
    redCards,
    interceptionPerMatch,
    foulsPerMatch
  } = player

  // setSelectedItem(items.find(item => item.name === position.split(', ')[0]))

  const { indicator, data, statistics } = getPlayerStatisticsPerPosition(
    selectedItem?.name ?? items.find(item => item.name === position.split(', ')[0]).name,
    player,
    'primary'
  )

  const { playerAverageRating, averageRating } = calculateAverageRating(selectedItem?.name ?? items.find(item => item.name === position.split(', ')[0]).name, players, player)

  const similarPlayers = getSimilarPlayers(player, players, [...statistics, 'age', 'position'])

  const handleZoomIn = async (title, content) => {
    setModalTitle(title)
    setModalContent(content)
    contentModal?.openModal()
  }

  return (
    <div className='container mx-auto px-8 pb-8'>
      <header className='flex justify-between items-center my-10'>
        <h1 className='flex flex-grow-0 text-quinary text-5xl uppercase tracking-normal'>
          overview
        </h1>
        <div className='flex flex-grow-0 gap-3'>
          <Button color='secondary'>Create report</Button>
          <Link
            href={`/comparePlayers?id=${player.key}`}
          >
            <Button color='primary'>Compare players</Button>
          </Link>
        </div>
      </header>
      <section className='flex'>
        <h2 className='text-quinary uppercase !p-0 !m-0'>Selected position</h2>
        <section className='flex items-center'>
          <CustomDropDown
            items={items}
            ripple={false}
            css={{ fontSize: '36px', fontWeight: 'bold' }}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </section>
      </section>
      <div className='bg-quinary'>
        <section className='grid h-screen grid-rows-2 grid-cols-[30%_repeat(3,_1fr)] bg-white'>
          <section className='grid grid-cols-[40%_1fr] border rounded-lg'>
            <section className='flex justify-end pt-4'>
              <Avatar
                src='/player_avatar.png'
                css={{ size: '$20' }}
                color='primary'
                bordered
              />
            </section>
            <section className='p-4'>
              <h3 className='uppercase flex tracking-normal'>{name}</h3>
              <Image src={dorsal} alt='dorsal' width='50' height='50' />
              <div className='grid grid-cols-2'>
                <div>
                  <p className='text-gray-400 font-medium text-xs pt-10'>
                    Position
                  </p>
                  <h3 className='text-base pt-2'>{position}</h3>
                </div>
                <div>
                  <p className='text-gray-400 font-medium text-xs pt-10'>
                    Place of birth
                  </p>
                  <div className='flex items-center'>
                    <Image
                      src={flags[placeOfBirth]}
                      alt='flag'
                      width='15'
                      height='15'
                      style={{
                        objectFit: 'contain',
                        paddingBottom: '5px',
                        marginRight: '5px'
                      }}
                    />
                    <h3 className='text-base pt-2'>{placeOfBirth}</h3>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div>
                  <p className='text-gray-400 font-medium text-xs pt-10'>
                    Height
                  </p>
                  <h3 className='text-base pt-2'>{height / 100} M</h3>
                </div>
                <div>
                  <p className='text-gray-400 font-medium text-xs pt-10'>
                    Citizenship
                  </p>
                  <div className='flex items-center'>
                    <Image
                      src={flags[placeOfBirth]}
                      alt='flag'
                      width='15'
                      height='15'
                      style={{
                        objectFit: 'contain',
                        paddingBottom: '5px',
                        marginRight: '5px'
                      }}
                    />
                    <h3 className='text-base pt-2'>{citizenship}</h3>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div>
                  <p className='text-gray-400 font-medium text-xs pt-10'>
                    Weight
                  </p>
                  <h3 className='text-base pt-2'>{weight} KG</h3>
                </div>
                <div>
                  <p className='text-gray-400 font-medium text-xs pt-10'>
                    Date of birth(Age)
                  </p>
                  <h3 className='text-base pt-2'>JAN 14, 2004({age})</h3>
                </div>
              </div>
            </section>
          </section>
          <section className='border p-4 flex flex-col justify-center items-start rounded-lg'>
            <div className='flex w-full relative'>
              <IconButton
                handleClick={() => {}}
              >
                <Add
                  fontSize='26px'
                  className='absolute left-0 top-1 cursor-pointer hover:scale-110'
                />
              </IconButton>
              <h3 className='flex-1 uppercase tracking-normal text-center'>
                statistics per position
              </h3>
              <IconButton
                handleClick={() =>
                  handleZoomIn(
                    'statistics per position',
                    <RadarChart id='position' radius='90%' indicator={indicator} data={data} axisLabel symbolSize={10} fontSize={14} />
                  )}
              >
                <Zoom
                  fontSize='26px'
                  className='absolute right-0 top-1 cursor-pointer hover:scale-110'

                />
              </IconButton>
            </div>
            <RadarChart id='position' radius='50%' indicator={indicator} data={data} />
          </section>
          <section className='border p-4 flex flex-col justify-center items-center rounded-lg'>
            <div className='flex w-full relative'>
              <IconButton
                handleClick={() => {}}
              >
                <Add
                  fontSize='26px'
                  className='absolute left-0 top-1 cursor-pointer hover:scale-110'
                />
              </IconButton>
              <h3 className='flex-1 uppercase tracking-normal text-center'>
                position ranking
              </h3>
              <IconButton
                handleClick={() =>
                  handleZoomIn(
                    'defense statistics',
                    <GradeGaugeChart id='position' value={playerAverageRating} />
                  )}
              >
                <Zoom
                  fontSize='26px'
                  className='absolute right-0 top-1 cursor-pointer hover:scale-110'
                />
              </IconButton>
            </div>
            <h5 className='flex-1 uppercase tracking-normal text-center'>
              average rating: {averageRating}
            </h5>
            <GradeGaugeChart id='position' value={playerAverageRating} averageRating={averageRating} />
          </section>
          <section className='border p-4 flex flex-col justify-center items-center rounded-lg'>
            <div className='flex w-full relative'>
              <IconButton
                handleClick={() => {}}
              >
                <Add
                  fontSize='26px'
                  className='absolute left-0 top-1 cursor-pointer hover:scale-110'

                />
              </IconButton>
              <h3 className='flex-1 uppercase tracking-normal text-center'>
                statistics ranking
              </h3>
              <IconButton
                handleClick={() =>
                  handleZoomIn(
                    'aggressive statistics',
                    <RingGaugeChart id='position' radius='90%' indicator={indicator} data={data} axisLabel symbolSize={10} fontSize={14} />
                  )}
              >
                <Zoom
                  fontSize='26px'
                  className='absolute right-0 top-1 cursor-pointer hover:scale-110'

                />
              </IconButton>
            </div>
            <RingGaugeChart id='aggressive' radius='50%' indicator={indicator} data={data} />
          </section>
          <section className='border p-4 flex flex-1 flex-col items-center rounded-lg overflow-y-auto'>
            <h3 className='uppercase tracking-normal'>similar players</h3>
            <ListView items={similarPlayers.slice(0, 9)} />
          </section>
          <section className='grid grid-cols-2 grid-rows-2'>
            <section className='border flex flex-col justify-between items-start p-4 rounded-lg'>
              <div>
                <Image
                  src={yellowCard}
                  alt='yellow card picture'
                  width='30'
                  height='30'
                />
                <p className='text-gray-400 font-medium text-xs pt-2'>
                  Yellow cards
                </p>
              </div>
              <div className='flex justify-between items-center w-full'>
                <h1 className='text-quinary font-medium'>{yellowCards}</h1>
                <div className='flex items-center gap-2'>
                  <p className='text-gray-400 font-medium text-xs'>-50%</p>
                  <Image
                    src={decreaseArrow}
                    alt='yellow card picture'
                    width='30'
                    height='30'
                  />
                </div>
              </div>
            </section>
            <section className='border flex flex-col justify-between items-start p-4 rounded-lg'>
              <div>
                <Image
                  src={redCard}
                  alt='yellow card picture'
                  width='30'
                  height='30'
                />
                <p className='text-gray-400 font-medium text-xs pt-2'>
                  Red cards
                </p>
              </div>
              <div className='flex justify-between items-center w-full'>
                <h1 className='text-quinary font-medium'>{redCards}</h1>
                <div className='flex items-center gap-2'>
                  <p className='text-gray-400 font-medium text-xs'>+33%</p>
                  <Image
                    src={increaseArrow}
                    alt='yellow card picture'
                    width='30'
                    height='30'
                  />
                </div>
              </div>
            </section>
            <section className='border flex flex-col justify-between items-start p-4 rounded-lg'>
              <div>
                <p className='text-gray-400 font-medium text-xs pt-2'>
                  Recoveries
                </p>
                <p className='bg-gray-200 text-gray-400 font-medium text-xs text-center py-1 mt-2 rounded-md'>
                  IND
                </p>
              </div>
              <div className='flex justify-between items-center w-full'>
                <h1 className='text-quinary font-medium'>3</h1>
                <div className='flex items-center gap-2'>
                  <p className='text-gray-400 font-medium text-xs'>-93%</p>
                  <Image
                    src={decreaseArrow}
                    alt='yellow card picture'
                    width='30'
                    height='30'
                  />
                </div>
              </div>
            </section>
            <section className='border flex flex-col justify-between items-start p-4 rounded-lg'>
              <div>
                <p className='text-gray-400 font-medium text-xs pt-2'>
                  Clearances
                </p>
                <p className='bg-gray-200 text-gray-400 font-medium text-xs text-center py-1 mt-2 rounded-md'>
                  TAC
                </p>
              </div>
              <div className='flex justify-between items-center w-full'>
                <h1 className='text-quinary font-medium'>0</h1>
                <div className='flex items-center gap-2'>
                  <p className='text-gray-400 font-medium text-xs'>-33%</p>
                  <Image
                    src={decreaseArrow}
                    alt='yellow card picture'
                    width='30'
                    height='30'
                  />
                </div>
              </div>
            </section>
          </section>
          <section className='grid grid-rows-2'>
            <section className='border flex flex-col justify-between items-start p-4 rounded-lg'>
              <div>
                <p className='text-gray-400 font-medium text-xs pt-2'>
                  Interceptions p/90min
                </p>
              </div>
              <div className='flex justify-between items-center w-full'>
                <h1 className='text-quinary font-medium'>
                  {interceptionPerMatch}
                </h1>
                <div className='flex items-center gap-2'>
                  <p className='text-gray-400 font-medium text-xs'>-50%</p>
                  <Image
                    src={decreaseArrow}
                    alt='yellow card picture'
                    width='30'
                    height='30'
                  />
                </div>
              </div>
            </section>
            <section className='border flex flex-col justify-between items-start p-4 rounded-lg'>
              <div>
                <p className='text-gray-400 font-medium text-xs pt-2'>Fouls</p>
                <p className='bg-gray-200 text-gray-400 font-medium text-xs text-center py-1 mt-2 rounded-md'>
                  TAC
                </p>
              </div>
              <div className='flex justify-between items-center w-full'>
                <h1 className='text-quinary font-medium'>{foulsPerMatch}</h1>
                <div className='flex items-center gap-2'>
                  <p className='text-gray-400 font-medium text-xs'>-50%</p>
                  <Image
                    src={decreaseArrow}
                    alt='yellow card picture'
                    width='30'
                    height='30'
                  />
                </div>
              </div>
            </section>
          </section>
          <section className='grid grid-rows-2'>
            <section className='border flex flex-col justify-between items-start p-4 rounded-lg'>
              <div>
                <p className='text-gray-400 font-medium text-xs pt-2'>
                  Individual/pressure
                </p>
                <p className='bg-gray-200 text-gray-400 font-medium text-xs text-center py-1 mt-2 rounded-md'>
                  INT
                </p>
              </div>
              <div className='flex justify-between items-center w-full'>
                <h1 className='text-quinary font-medium'>208.9</h1>
                <div className='flex items-center gap-2'>
                  <p className='text-gray-400 font-medium text-xs'>-50%</p>
                  <Image
                    src={decreaseArrow}
                    alt='yellow card picture'
                    width='30'
                    height='30'
                  />
                </div>
              </div>
            </section>
            <section className='border flex flex-col justify-between items-start p-4 rounded-lg'>
              <div>
                <p className='text-gray-400 font-medium text-xs pt-2'>
                  Tackles
                </p>
                <p className='bg-gray-200 text-gray-400 font-medium text-xs text-center py-1 mt-2 rounded-md'>
                  FOU
                </p>
              </div>
              <div className='flex justify-between items-center w-full'>
                <h1 className='text-quinary font-medium'>4</h1>
                <div className='flex items-center gap-2'>
                  <p className='text-gray-400 font-medium text-xs'>+33%</p>
                  <Image
                    src={increaseArrow}
                    alt='yellow card picture'
                    width='30'
                    height='30'
                  />
                </div>
              </div>
            </section>
          </section>
        </section>
      </div>
      {/* <PDFViewer>
        <MyDocument />
      </PDFViewer> */}
      <ContentModal
        visible={contentModal?.visible}
        title={modalTitle}
        content={modalContent}
        footer={footer}
      />
    </div>
  )
}

export default PlayerInfo
