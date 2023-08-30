'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { AiOutlineZoomIn as Zoom } from 'react-icons/ai'
import { MdAddChart as Add } from 'react-icons/md'
import { PDFViewer } from '@react-pdf/renderer'
import { RadarChart } from '../../components/charts/radarChart.jsx'
import { NormalDistributionChart } from '../../components/charts/normalDistributionChart.jsx'
import { GradeGaugeChart } from '../../components/charts/gradeGaugeChart.jsx'
import { Button } from '../../components/button.jsx'
import { CustomDropDown } from '../../components/dropdown/customDropDown.jsx'
import { CustomTriggerDropDown } from '../../components/dropdown/customTriggerDropDown.jsx'
import { ListView } from '../../components/listView.jsx'
import { PlayerCard } from '../../components/playerCard.jsx'
import { AddButton } from '../../components/addButton.jsx'
import { DocumentPDF } from '../../components/documentPDF.jsx'
import { ContentModal } from '../../components/contentModal.jsx'
import { IconButton } from '../../components/iconButton.jsx'
import yellowCard from '../../assets/icons/yellow-card.png'
import redCard from '../../assets/icons/red-card.png'
import decreaseArrow from '../../assets/icons/decrease.png'
import increaseArrow from '../../assets/icons/increase.png'
import { positions, positionStatistics } from '../../constants/constants.js'
import {
  getPlayerStatisticsPerPosition,
  getSimilarPlayers,
  calculateAverageRating,
  findIndexOfEmptyPosition,
  getNormalDistributionData,
  formatString
} from '../../utils/functions.js'
import { useModal } from '../../hooks/useModal.jsx'
import { useStore } from '../../store/store.js'

const PlayerInfo = () => {
  const player = useStore((state) => state.basePlayer)
  const {
    playersToCompare,
    handlePlayersToCompareData,
    setPlayersToCompare,
    handleDeletePlayerToCompareData,
    handleVisibilityOfPlayersData,
    handleUpdateData,
    database,
    tabs,
    handleSelectTab
  } = useStore()
  const [data, setData] = useStore((state) => [state.data, state.setData])
  const [indicator, setIndicator] = useStore((state) => [
    state.indicator,
    state.setIndicator
  ])
  const [statistics, setStatistics] = useStore((state) => [
    state.statistics,
    state.setStatistics
  ])
  const [selectedItem, setSelectedItem] = useStore((state) => [
    state.selectedItem,
    state.setSelectedItem
  ])
  const contentModal = useModal()
  const items = positions.map((element, index) => {
    return {
      key: index + 1,
      name: element
    }
  })

  const [modalTitle, setModalTitle] = useState(null)
  const [modalContent, setModalContent] = useState(null)
  const [searchPlayers, setSearchPlayers] = useState([
    false,
    false,
    false,
    false,
    false
  ])
  const [visibility, setVisibility] = useState([true, true, true, true, true])
  const [filteredPlayers, setFilteredPlayers] = useState(database)
  const radarChartRef = useRef(null)
  const similarPlayersRef = useRef(null)
  const normalDistributionChartsRef = useRef(null)

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

  const colors = ['secondary', 'tertiary', 'sectary', 'septenary', 'eightieth']

  const { position, yellowCards, redCards, matchesPlayed, minutesPlayed } =
    player

  const { playerAverageRating, averageRating } = calculateAverageRating(
    selectedItem?.name ??
      items?.find((item) => item?.name === position?.split(', ')[0])?.name,
    database,
    player
  )

  const similarPlayers = getSimilarPlayers(player, database, statistics)

  const handleZoomIn = (title, content) => {
    setModalTitle(title)
    setModalContent(content)
    contentModal?.openModal()
  }

  const handleViewPDF = (title, content) => {
    setModalTitle(title)
    setModalContent(content)
    contentModal?.openModal()
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { value } = e.target

    const normalizedValue = value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    const filteredItems = database
      .filter((p) => {
        const normalizedName = p.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
        return normalizedName
          .toLowerCase()
          .includes(normalizedValue.toLowerCase())
      })
      .map((p) => p)

    setFilteredPlayers(filteredItems)
  }

  const handleSearchPlayer = (index) => {
    if (index >= 0 && index < searchPlayers.length) {
      const updatedArray = [...searchPlayers]
      updatedArray[index] = true
      setSearchPlayers(updatedArray)
    }
  }

  const handleVisible = (index, playerToCompare) => {
    if (index >= 0 && index < visibility.length) {
      const updatedArray = [...visibility]
      updatedArray[index] = !visibility[index]
      setVisibility(updatedArray)
    }
    handleVisibilityOfPlayersData(playerToCompare?.name)
  }

  const handleDelete = (index, playerToCompare) => {
    setPlayersToCompare(undefined, index)
    handleDeletePlayerToCompareData(playerToCompare?.name)
  }

  const handleOnDrag = (e, name) => {
    e?.dataTransfer?.setData('dropData', name)
  }

  const handleOnDrop = (e) => {
    const { player } = JSON.parse(e?.dataTransfer?.getData('dropData'))
    const index = findIndexOfEmptyPosition(playersToCompare)
    setPlayersToCompare(player, index)
    const { data } = getPlayerStatisticsPerPosition(
      selectedItem,
      player,
      colors[index]
    )
    handlePlayersToCompareData(data[0])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleSetItem = (item) => {
    setSelectedItem(item?.name)
    let playerStatistics = getPlayerStatisticsPerPosition(
      item?.name,
      player,
      'primary'
    )
    handleUpdateData(playerStatistics?.data[0], player.name)
    for (const pToC of playersToCompare) {
      if (pToC) {
        playerStatistics = getPlayerStatisticsPerPosition(item?.name, pToC)
        handleUpdateData(playerStatistics?.data[0], pToC.name)
      }
    }
    // setSelectedDatabase(item)
    // setSelectedPath(item.file)
  }

  useEffect(() => {
    setSelectedItem(
      items.find((item) => item.name === position?.split(', ')[0])?.name
    )
  }, [])

  useEffect(() => {
    const playerStatistics = getPlayerStatisticsPerPosition(
      selectedItem ??
        items.find((item) => item.name === position?.split(', ')[0])?.name,
      player,
      'primary'
    )
    if (data.length === 0) setData(playerStatistics.data)
    if (indicator.length === 0) setIndicator(playerStatistics.indicator)
    if (statistics.length === 0) setStatistics(playerStatistics.statistics)
  }, [])

  return (
    <div className='container px-4 py-6'>
      <header className='flex flex-col m-0 p-0 sm:flex-row justify-between items-center mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-16 mb-4'>
        <h1 className='flex flex-grow-0 m-0 p-0 text-quinary text-4xl sm:text-5xl uppercase tracking-normal'>
          overview
        </h1>
        <div className='flex flex-col sm:flex-row gap-3 m-0 p-0'>
          <Button
            color='primary'
            className='mb-2 sm:mb-0'
            onClick={() => {
              const content = (
                <PDFViewer height='100%' width='100%'>
                  <DocumentPDF radarChartRef={radarChartRef} similarPlayersRef={similarPlayersRef} normalDistributionChartsRef={normalDistributionChartsRef} player={player} />
                </PDFViewer>
              )
              handleViewPDF('Create report', content)
            }}
          >
            Create report
          </Button>
          {/* <Button
            color='primary'
            onClick={() => {
              handleBasePlayerData(indicator, data)
              // if exists player to compare, add it to data
              if (playersToCompare) {
                const playersToCompareStatistics =
                  getPlayerStatisticsPerPosition(
                    items.find((item) => item.name === position.split(', ')[0])
                      .name,
                    playersToCompare
                  )
                handlePlayersToCompareData(
                  store.data,
                  playersToCompareStatistics.data[0]
                )
              }
              router.push('/comparePlayers')
            }}
          >
            Compare players
          </Button> */}
        </div>
      </header>
      <section className='mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-16'>
        <ul className='flex items-end p-0 m-0'>
          {tabs.map((tab) => {
            const selectedStyle = 'border-t border-x rounded-t-lg border-quinary bg-primary pointer-events-none px-4 py-3 text-quaternary'
            const nonSelectedStyle = 'border-t border-x rounded-t-lg border-quinary hover:bg-primary hover:text-quaternary px-4 py-3 text-primary'
            return (
              <li key={tab.key} className='mr-2 mb-2'>
                <a href='#' onClick={() => handleSelectTab(tab)} className={tab.selected ? selectedStyle : nonSelectedStyle}>
                  {tab.name}
                </a>
              </li>
            )
          })}
        </ul>
      </section>
{tabs[0].selected &&
        <div className='border-t border-quinary m-0 p-0 w-fit mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-16'>
          <section className='flex flex-col-reverse lg:flex-row justify-between items-center'>
            <h2 className='text-quinary uppercase tracking-tight !p-0 !m-0 mb-4 lg:mb-0 lg:order-1'>
              Selected position
            </h2>
            <section className='flex items-center lg:order-2'>
              <CustomDropDown
                items={items}
                ripple={false}
                css={{ fontSize: '36px', fontWeight: 'bold' }}
                selectedItem={selectedItem}
                handleSetItem={handleSetItem}
              />
            </section>
          </section>
      <section className='grid 2xl:grid-rows-[20vh_45vh_35vh_15vh] xl:grid-rows-[25vh_45vh_35vh_10vh] lg:grid-rows-[30vh_50vh_35vh_10vh] gap-4 mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-16'>
        {/* Player Cards */}
        <div className='2xl:overflow-hidden overflow-x-auto'>
          <section className='grid grid-cols-6 gap-4 rounded-lg min-w-[1536px]'>
            <PlayerCard player={player} />
            {playersToCompare?.map((playerToCompare, i) => {
              return playerToCompare
                ? (
                  <PlayerCard player={playerToCompare} key={i} withOptions visible={visibility[i]} handleVisible={() => handleVisible(i, playerToCompare)} handleDelete={() => handleDelete(i, playerToCompare)} />
                  )
                : (
                  <section
                    className='flex justify-center items-center border rounded-lg h-full w-full'
                    key={i}
                  >
                    {searchPlayers[i]
                      ? (
                        <CustomTriggerDropDown
                          key='players'
                          items={filteredPlayers}
                          ripple={false}
                          css={{ fontSize: '20px', fontWeight: 'bold', width: '50%' }}
                          selectedItem={null}
                          onAction={(key) => {
                            const player = database.find(
                              (player) => player.key.toString() === key
                            )
                            setPlayersToCompare(player, i)
                            const { data } = getPlayerStatisticsPerPosition(
                              selectedItem,
                              player
                            )
                            handlePlayersToCompareData(data[0])
                          }}
                        >
                          <input
                            className='rounded-xl border-transparent bg-gray-100 px-3 py-1 text-base w-auto sm:text-xl focus:border-primary outline-none border-4 transition-all duration-500'
                            placeholder='Search player'
                            type='search'
                            onChange={handleChange}
                          />
                        </CustomTriggerDropDown>
                        )
                      : (
                        <AddButton onClick={() => handleSearchPlayer(i)} />
                        )}
                  </section>
                  )
            })}
          </section>
        </div>
        <section className='grid 2xl:grid-cols-[25%_1fr] xl:grid-cols-[30%_1fr] lg:grid-cols-[40%_1fr] gap-4'>
          {/* Similar Players */}
          <section className='border p-4 flex flex-col items-center rounded-lg overflow-y-auto'>
            <h3 className='uppercase tracking-normal'>similar players</h3>
            <ListView similarPlayersRef={similarPlayersRef} items={similarPlayers.slice(0, 10)} handleOnDrag={handleOnDrag} />
          </section>
          {/* Statistics per position */}
          <section className='border p-4 flex flex-col items-start rounded-lg' onDrop={handleOnDrop} onDragOver={handleDragOver}>
            <section className='flex w-full relative'>
              <IconButton handleClick={() => {}}>
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
                    <RadarChart
                      id='position'
                      radius='90%'
                      indicator={indicator}
                      data={data}
                      axisLabel
                      symbolSize={10}
                      fontSize={14}
                      width='100%'
                      height='100%'
                      chartRef={radarChartRef}
                    />
                  )}
              >
                <Zoom
                  fontSize='26px'
                  className='absolute right-0 top-1 cursor-pointer hover:scale-110'
                />
              </IconButton>
            </section>
            <RadarChart
              chartRef={radarChartRef}
              id='position'
              radius='80%'
              indicator={indicator}
              data={data}
              width='100%'
              height='100%'
            />
              </section>
            </section>
            <section className='grid lg:grid-cols-2 gap-4'>
              {/* Position Ranking */}
              <section className='border p-4 flex flex-col items-start justify-start rounded-lg'>
                <section className='flex w-full relative'>
                  <IconButton handleClick={() => {}}>
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
                        <GradeGaugeChart
                          id='position'
                          value={playerAverageRating}
                          averageRating={averageRating}
                          width='100%'
                          height='100%'
                        />
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
                  <GradeGaugeChart
                    id='position'
                    value={playerAverageRating}
                    averageRating={averageRating}
                    width='100%'
                    height='100%'
                  />
                </div>
              </section>
              {/* Statistics Ranking */}
              <section className='border p-4 flex flex-col items-start rounded-lg'>
                <div className='flex w-full relative'>
                  <IconButton handleClick={() => {}}>
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
                        'statistics ranking'

                      )}
                  >
                    <Zoom
                      fontSize='26px'
                      className='absolute right-0 top-1 cursor-pointer hover:scale-110'
                    />
                  </IconButton>
                </div>

              </section>
            </section>
            <section className='grid lg:grid-cols-2 gap-4'>
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
        </section>
      </section>
        </div>}
      {tabs[1].selected &&
        <div className='flex flex-col w-auto border-t border-quinary m-0 p-0 mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-16'>
          <h2 className='text-quinary uppercase tracking-tight !p-0 !m-0 mb-4 lg:mb-0'>
            Player metrics distribution
          </h2>
          <section className='grid grid-cols-3 auto-rows-fr h-screen gap-4'>
            {positionStatistics[selectedItem].map((statistic, index) => {
              const { normalData, percentile, metricValue, metricName } =
                getNormalDistributionData(player, database, statistic, selectedItem)

              return (
                <NormalDistributionChart
                  key={index}
                  id='position'
                  data={normalData}
                  metricValue={metricValue}
                  percentile={percentile}
                  metricName={formatString(metricName)}
                  height='100%'
                  width='100%'
                />
              )
            })}
          </section>
        </div>}
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
