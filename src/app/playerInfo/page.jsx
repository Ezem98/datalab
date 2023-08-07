'use client'

import { useState, useEffect } from 'react'
import { Avatar } from '@nextui-org/react'
import Image from 'next/image'
import { AiOutlineZoomIn as Zoom } from 'react-icons/ai'
import { MdAddChart as Add } from 'react-icons/md'
// import { PDFViewer } from '@react-pdf/renderer'
import { RadarChart } from '../../components/charts/radarChart.jsx'
import { RingGaugeChart } from '../../components/charts/ringGaugeChart.jsx'
import { GradeGaugeChart } from '../../components/charts/gradeGaugeChart.jsx'
import { Button } from '../../components/button.jsx'
import { CustomDropDown } from '../../components/dropdown/customDropDown.jsx'
import { ListView } from '../../components/listView.jsx'
// import { MyDocument } from '../../../components/documentPDF.jsx'
import { ContentModal } from '../../components/contentModal.jsx'
import { IconButton } from '../../components/iconButton.jsx'
import yellowCard from '../../assets/icons/yellow-card.png'
import redCard from '../../assets/icons/red-card.png'
import decreaseArrow from '../../assets/icons/decrease.png'
import increaseArrow from '../../assets/icons/increase.png'
import dorsal from '../../assets/images/dorsal.png'
import players from '../../constants/players.json'
import { positions, flags } from '../../constants/constants.js'
import { getPlayerStatisticsPerPosition, getSimilarPlayers, calculateAverageRating } from '../../utils/functions.js'
import { useModal } from '../../hooks/useModal.jsx'
import { useStore } from '../../store/store.js'
import { useRouter } from 'next/navigation'

const PlayerInfo = () => {
  const player = useStore(state => state.basePlayer)
  const { playerToCompare, handlePlayerToCompareData } = useStore()
  const [data, setData] = useStore(state => [state.data, state.setData])
  const [indicator, setIndicator] = useStore(state => [state.indicator, state.setIndicator])
  const [statistics, setStatistics] = useStore(state => [state.statistics, state.setStatistics])
  const [selectedItem, setSelectedItem] = useStore(state => [state.selectedItem, state.setSelectedItem])
  const store = useStore()
  const handleBasePlayerData = useStore(state => state.handleBasePlayerData)
  const contentModal = useModal()
  const router = useRouter()
  const items = positions.map((element, index) => {
    return {
      key: index,
      name: element
    }
  })

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
    matchesPlayed,
    minutesPlayed
  } = player

  const { playerAverageRating, averageRating } = calculateAverageRating(selectedItem?.name ?? items.find(item => item.name === position.split(', ')[0]).name, players, player)

  const similarPlayers = getSimilarPlayers(player, players, [...statistics, 'age', 'position'])

  const handleZoomIn = async (title, content) => {
    setModalTitle(title)
    setModalContent(content)
    contentModal?.openModal()
  }

  useEffect(() => {
    console.log('cycle')
    setSelectedItem(items.find(item => item.name === position.split(', ')[0])?.name)
  }, [])

  useEffect(() => {
    console.log('cycle')
    const { indicator, data, statistics } = getPlayerStatisticsPerPosition(
      selectedItem ?? items.find(item => item.name === position.split(', ')[0])?.name,
      player,
      'primary'
    )
    setData(data)
    setIndicator(indicator)
    setStatistics(statistics)
  }, [selectedItem])

  return (
    <div className='container px-4 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16'>
      <header className='flex flex-col sm:flex-row justify-between items-center mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-16 my-4 sm:my-6 md:my-8 lg:my-10 xl:my-12'>
        <h1 className='flex flex-grow-0 text-quinary text-4xl sm:text-5xl uppercase tracking-normal mb-4 sm:mb-0'>
          overview
        </h1>
        <div className='flex flex-col sm:flex-row gap-3'>
          <Button color='secondary' className='mb-2 sm:mb-0'>
            Create report
          </Button>
          <Button
            color='primary' onClick={() => {
              handleBasePlayerData(indicator, data)
              // if exists player to compare, add it to data
              if (playerToCompare) {
                const playerToCompareStatistics = getPlayerStatisticsPerPosition(
                  items.find(item => item.name === position.split(', ')[0]).name,
                  playerToCompare
                )
                handlePlayerToCompareData(store.data, playerToCompareStatistics.data[0])
              }
              router.push('/comparePlayers')
            }}
          >Compare players
          </Button>
        </div>
      </header>
      <section className='flex flex-col-reverse lg:flex-row justify-between items-center mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-16'>
        <h2 className='text-quinary uppercase !p-0 !m-0 mb-4 lg:mb-0 lg:order-1'>
          Selected position
        </h2>
        <section className='flex items-center lg:order-2'>
          <CustomDropDown
            items={items}
            ripple={false}
            css={{ fontSize: '24px', fontWeight: 'bold' }}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </section>
      </section>
      <section className='grid lg:grid-rows-[55%_35%_10%] gap-4 mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-16'>
        <section className='grid lg:grid-cols-[30%_1fr] gap-4 row-start-1'>
          {/* Player info */}
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
          {/* Statistics per position */}
          <section className='border p-4 flex flex-col items-start rounded-lg'>
            <section className='flex w-full relative'>
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
                    <RadarChart id='position' radius='90%' indicator={indicator} data={data} axisLabel symbolSize={10} fontSize={14} width='100%' height='100%' />
                  )}
              >
                <Zoom
                  fontSize='26px'
                  className='absolute right-0 top-1 cursor-pointer hover:scale-110'
                />
              </IconButton>
            </section>
            <RadarChart id='position' radius='90%' indicator={indicator} data={data} width='100%' height='100%' />
          </section>
        </section>
        <section className='grid lg:grid-cols-[30%_1fr] gap-4 row-start-2'>
          {/* Similar Players */}
          <section className='border p-4 flex flex-col items-center rounded-lg overflow-y-auto'>
            <h3 className='uppercase tracking-normal'>similar players</h3>
            <ListView items={similarPlayers.slice(0, 10)} />
          </section>
          <section className='grid grid-cols-2 gap-4'>
            {/* Position Ranking */}
            <section className='border p-4 flex flex-col items-start justify-start rounded-lg'>
              <section className='flex w-full relative'>
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
                      'position ranking',
                      <GradeGaugeChart id='position' value={playerAverageRating} averageRating={averageRating} width='100%' height='100%' />
                    )}
                >
                  <Zoom
                    fontSize='26px'
                    className='absolute right-0 top-1 cursor-pointer hover:scale-110'
                  />
                </IconButton>
              </section>
              <h5 className='flex-1 uppercase tracking-normal text-center'>
                average rating: {averageRating}
              </h5>
              <div className='flex justify-center items-center w-full h-full'>
                <GradeGaugeChart id='position' value={playerAverageRating} averageRating={averageRating} width='100%' height='100%' />
              </div>
            </section>
            {/* Statistics Ranking */}
            <section className='border p-4 flex flex-col items-start rounded-lg'>
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
                      'statistics ranking',
                      <RingGaugeChart id='position' radius='90%' indicator={indicator} data={data} axisLabel symbolSize={10} fontSize={14} width='100%' height='100%' />
                    )}
                >
                  <Zoom
                    fontSize='26px'
                    className='absolute right-0 top-1 cursor-pointer hover:scale-110'
                  />
                </IconButton>
              </div>
              <RingGaugeChart id='aggressive' radius='50%' indicator={indicator} data={data} width='100%' height='100%' />
            </section>
          </section>
        </section>
        <section className='grid lg:grid-cols-2 gap-4 row-start-3'>
          {/* Yellow & Red Cards */}
          <section className='grid grid-cols-2 gap-4'>
            <section className='border flex flex-col items-start p-4 rounded-lg'>
              <div className='flex gap-2'>
                <p className='text-gray-400 font-medium text-xs pt-2'>
                  Yellow cards
                </p>
                <Image
                  src={yellowCard}
                  alt='yellow card picture'
                  width='30'
                  height='30'
                />
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
            <section className='border flex flex-col items-start p-4 rounded-lg'>
              <div className='flex gap-2'>
                <p className='text-gray-400 font-medium text-xs pt-2'>
                  Red cards
                </p>
                <Image
                  src={redCard}
                  alt='yellow card picture'
                  width='30'
                  height='30'
                />
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
          </section>
          {/* Minutes Played */}
          <section className='grid'>
            <section className='border flex flex-col justify-between items-start p-4 rounded-lg'>
              <div>
                <p className='text-gray-400 font-medium text-xs pt-2'>
                  Minutes played (matches)
                </p>
              </div>
              <div className='flex justify-between items-center w-full'>
                <h1 className='text-quinary font-medium'>
                  {minutesPlayed} min ({matchesPlayed})
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
          </section>
        </section>
      </section>

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
