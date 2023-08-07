'use client'

import { useState } from 'react'
// import { PDFViewer } from '@react-pdf/renderer'
import { Button } from '../../components/button.jsx'
import { CustomDropDown } from '../../components/dropdown/customDropDown.jsx'
import { CustomTriggerDropDown } from '../../components/dropdown/customTriggerDropDown.jsx'
import { ContentModal } from '../../components/contentModal.jsx'
// import { MyDocument } from '../../../components/documentPDF.jsx'
import dorsal from '../../assets/images/dorsal.png'
import { Avatar } from '@nextui-org/react'
import Image from 'next/image'
import { RadarChart } from '../../components/charts/radarChart.jsx'
import players from '../../constants/players.json'
import { positions, flags } from '../../constants/constants.js'
import {
  getPlayerStatisticsPerPosition,
  getUnusedStatistics,
  getValueByStat
} from '../../utils/functions.js'
import { AiOutlineZoomIn as Zoom } from 'react-icons/ai'
import { useModal } from '../../hooks/useModal.jsx'
import { useStore } from '../../store/store.js'

const ComparePlayers = () => {
  const basePlayer = useStore((state) => state.basePlayer)
  const [playerToCompare, setPlayerToCompare] = useStore((state) => [state.playerToCompare, state.setPlayerToCompare])
  const [data, setData] = useStore((state) => [state.data, state.setData])
  const [indicator, setIndicator] = useStore((state) => [state.indicator, state.setIndicator])
  const [selectedItem, setSelectedItem] = useStore(state => [state.selectedItem, state.setSelectedItem])
  const { handlePlayerToCompareData } = useStore()

  const contentModal = useModal()

  const items = positions.map((element, index) => {
    return {
      key: index,
      name: element
    }
  })

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

  const [filteredPlayers, setFilteredPlayers] = useState(players)
  // const [indicator, setIndicator] = useState([])
  const [modalTitle, setModalTitle] = useState(null)
  const [modalContent, setModalContent] = useState(null)
  const [selectedKeys, setSelectedKeys] = useState([])
  const basePlayerStatistics = getPlayerStatisticsPerPosition(
    selectedItem,
    basePlayer,
    'primary'
  )

  const handleChange = (e) => {
    e.preventDefault()
    const { value } = e.target

    const normalizedValue = value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    const filteredItems = players
      .filter((p) => {
        const normalizedName = p?.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
        return normalizedName
          .toLowerCase()
          .includes(normalizedValue.toLowerCase())
      })
      .map((p) => p)

    setFilteredPlayers(filteredItems)
  }

  const handleZoomIn = (title, content) => {
    setModalTitle(title)
    setModalContent(content)
    contentModal.openModal()
  }

  const handleDeleteStat = (key) => {
    setSelectedKeys(selectedKeys.filter(item => item !== key))
    setIndicator(indicator.filter(item => item?.name !== key))
  }

  const handleOnAction = (key) => {
    const newKey = filteredPositionStatsArray[key]
    setIndicator([...indicator, newKey])
    setSelectedKeys([...selectedKeys, newKey?.name])

    let newBasePlayerData = data.find(item => item?.name === basePlayer?.name)
    newBasePlayerData = { ...newBasePlayerData, value: [...newBasePlayerData.value, getValueByStat(basePlayer, newKey?.name)] }

    let newPlayerToCompareData

    if (playerToCompare) {
      newPlayerToCompareData = data.find(item => item?.name === playerToCompare?.name)
      newPlayerToCompareData = { ...newPlayerToCompareData, value: [...newPlayerToCompareData?.value, getValueByStat(playerToCompare, newKey?.name)] }
    }
    const newData = [newBasePlayerData, newPlayerToCompareData]
    setData(newData)
  }

  const filteredPositionStatsArray = getUnusedStatistics(basePlayerStatistics.indicator)

  return (
    <div className='container mx-auto px-8 pb-8'>
      <header className='flex justify-between items-center my-10'>
        <h1 className='flex flex-grow-0 text-quinary text-5xl uppercase tracking-normal'>
          compared players
        </h1>
        <div className='flex flex-grow-0 gap-3'>
          <Button color='secondary'>Create report</Button>
          <Button color='primary'>Add comparable player</Button>
        </div>
      </header>
      <section className='flex justify-between items-start'>
        <section className='flex'>
          <h2 className='text-quinary uppercase !p-0 !m-0'>
            Selected position
          </h2>
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
        <section className='flex flex-col'>

          {playerToCompare && (
            <section className='flex'>
              <section className='flex items-center'>
                <CustomDropDown
                  items={items}
                  ripple={false}
                  css={{ fontSize: '36px', fontWeight: 'bold' }}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              </section>
              <h2 className='text-quinary uppercase !p-0 !m-0'>
                Selected position
              </h2>
            </section>
          )}

          <CustomTriggerDropDown
            key='players'
            items={filteredPlayers}
            ripple={false}
            css={{ fontSize: '36px', fontWeight: 'bold' }}
            selectedItem={playerToCompare}
            onAction={(key) => {
              const playerToCompare = filteredPlayers.find((item) => item.key.toString() === key)
              setPlayerToCompare(
                playerToCompare
              )
              const playerToCompareStatistics = getPlayerStatisticsPerPosition(
                selectedItem,
                playerToCompare
              )
              handlePlayerToCompareData(data, playerToCompareStatistics.data[0])
            }}
          >
            <input
              className='rounded-xl border-transparent h-10 bg-gray-100 px-4 py-2 text-xl focus:border-primary outline-none border-2'
              placeholder='Search player'
              type='search'
              onChange={handleChange}
            />
          </CustomTriggerDropDown>
        </section>

      </section>
      <section className='flex gap-4 pb-4'>
        {selectedKeys.map((key, index) => {
          return (
            <span key={index} className='flex justify-between items-center gap-2 border-primary border-2 rounded-lg px-2 py-1 bg-primaryLight'>
              {key}
              <span className='uppercase cursor-pointer' onClick={() => handleDeleteStat(key)}>x</span>
            </span>
          )
        })}
      </section>
      <section className='grid grid-cols-[20%_60%_20%] min-h-screen'>
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
            <h3 className='uppercase flex tracking-normal'>
              {basePlayer?.name}
            </h3>
            <Image src={dorsal} alt='dorsal' width='50' height='50' />
            <div className='grid grid-cols-2'>
              <div>
                <p className='text-gray-400 font-medium text-xs pt-10'>
                  Position
                </p>
                <h3 className='text-base pt-2'>{basePlayer?.position}</h3>
              </div>
              <div>
                <p className='text-gray-400 font-medium text-xs pt-10'>
                  Place of birth
                </p>
                <div className='flex items-center'>
                  <Image
                    src={flags[basePlayer?.placeOfBirth]}
                    alt='flag'
                    width='15'
                    height='15'
                    style={{
                      objectFit: 'contain',
                      paddingBottom: '5px',
                      marginRight: '5px'
                    }}
                  />
                  <h3 className='text-base pt-2'>{basePlayer?.placeOfBirth}</h3>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div>
                <p className='text-gray-400 font-medium text-xs pt-10'>
                  Height
                </p>
                <h3 className='text-base pt-2'>{basePlayer?.height / 100} M</h3>
              </div>
              <div>
                <p className='text-gray-400 font-medium text-xs pt-10'>
                  Citizenship
                </p>
                <div className='flex items-center'>
                  <Image
                    src={flags[basePlayer?.citizenship]}
                    alt='flag'
                    width='15'
                    height='15'
                    style={{
                      objectFit: 'contain',
                      paddingBottom: '5px',
                      marginRight: '5px'
                    }}
                  />
                  <h3 className='text-base pt-2'>{basePlayer?.citizenship}</h3>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div>
                <p className='text-gray-400 font-medium text-xs pt-10'>
                  Weight
                </p>
                <h3 className='text-base pt-2'>{basePlayer?.weight} KG</h3>
              </div>
              <div>
                <p className='text-gray-400 font-medium text-xs pt-10'>
                  Date of birth(Age)
                </p>
                <h3 className='text-base pt-2'>
                  JAN 14, 2004({basePlayer?.age})
                </h3>
              </div>
            </div>
          </section>
        </section>
        <section className='border p-4 flex flex-col justify-center items-center rounded-lg'>
          <div className='flex w-full relative'>
            <CustomTriggerDropDown
              key='stats'
              items={filteredPositionStatsArray}
              ripple={false}
              css={{ fontSize: '30px', fontWeight: 'bold' }}
              selectedKeys={selectedKeys}
              onAction={(key) => handleOnAction(key)}
            >
              <h3 className='absolute left-0 top-1 cursor-pointer hover:scale-110'>
                add new
              </h3>
            </CustomTriggerDropDown>
            <h3 className='flex-1 uppercase tracking-normal text-center'>
              statistics to compare
            </h3>
            <Zoom
              fontSize='26px'
              className='absolute right-0 top-1 cursor-pointer hover:scale-110'
              onClick={() =>
                handleZoomIn(
                  'statistics to compare',
                  <RadarChart
                    id='position'
                    radius='90%'
                    indicator={basePlayerStatistics.indicator}
                    data={data}
                    axisLabel
                    symbolSize={10}
                    fontSize={14}
                    width='100%'
                    height='100vh'
                  />
                )}
            />
          </div>
          <RadarChart
            id='compare'
            radius='90%'
            indicator={basePlayerStatistics.indicator}
            data={data}
            axisLabel
            symbolSize={10}
            width='100%'
            height='100vh'
          />
        </section>
        {playerToCompare && (
          <section className='grid grid-cols-[1fr_40%] border rounded-lg'>
            <section className='p-4'>
              <h3 className='uppercase flex tracking-normal justify-end'>
                {playerToCompare?.name}
              </h3>
              <div className='flex justify-end'>
                <Image src={dorsal} alt='dorsal' width='50' height='50' />
              </div>
              <div className='grid grid-cols-2'>
                <div>
                  <p className='text-gray-400 font-medium text-xs pt-10'>
                    Position
                  </p>
                  <h3 className='text-base pt-2'>
                    {playerToCompare?.position}
                  </h3>
                </div>
                <div>
                  <p className='text-gray-400 font-medium text-xs pt-10'>
                    Place of birth
                  </p>
                  <div className='flex items-center'>
                    <Image
                      src={flags[playerToCompare?.placeOfBirth]}
                      alt='flag'
                      width='15'
                      height='15'
                      style={{
                        objectFit: 'contain',
                        paddingBottom: '5px',
                        marginRight: '5px'
                      }}
                    />
                    <h3 className='text-base pt-2'>
                      {playerToCompare?.placeOfBirth}
                    </h3>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div>
                  <p className='text-gray-400 font-medium text-xs pt-10'>
                    Height
                  </p>
                  <h3 className='text-base pt-2'>
                    {playerToCompare?.height / 100} M
                  </h3>
                </div>
                <div>
                  <p className='text-gray-400 font-medium text-xs pt-10'>
                    Citizenship
                  </p>
                  <div className='flex items-center'>
                    <Image
                      src={flags[playerToCompare?.citizenship?.split(', ')[0]]}
                      alt='flag'
                      width='15'
                      height='15'
                      style={{
                        objectFit: 'contain',
                        paddingBottom: '5px',
                        marginRight: '5px'
                      }}
                    />
                    <h3 className='text-base pt-2'>
                      {playerToCompare?.citizenship}
                    </h3>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div>
                  <p className='text-gray-400 font-medium text-xs pt-10'>
                    Weight
                  </p>
                  <h3 className='text-base pt-2'>
                    {playerToCompare?.weight} KG
                  </h3>
                </div>
                <div>
                  <p className='text-gray-400 font-medium text-xs pt-10'>
                    Date of birth(Age)
                  </p>
                  <h3 className='text-base pt-2'>
                    JAN 14, 2004({playerToCompare?.age})
                  </h3>
                </div>
              </div>
            </section>
            <section className='flex justify-start pt-4'>
              <Avatar
                src='/player_avatar.png'
                css={{ size: '$20' }}
                color='primary'
                bordered
              />
            </section>
          </section>
        )}
        {!playerToCompare &&
          <section className='flex justify-center border rounded-lg'>
            <h3 className='p-4'>Search a player to start comparing</h3>
          </section>}
      </section>
      {/* <PDFViewer>
        <MyDocument />
      </PDFViewer> */}
      <ContentModal
        visible={contentModal.visible}
        title={modalTitle}
        content={modalContent}
        footer={footer}
      />
    </div>
  )
}

export default ComparePlayers
