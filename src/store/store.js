import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      basePlayer: {},
      setBasePlayer: (basePlayer) => set((state) => ({ basePlayer })),
      playersToCompare: [undefined, undefined, undefined, undefined, undefined],
      setPlayersToCompare: (playerToCompare, index) => {
        const oldArray = get().playersToCompare
        const newArray = [...oldArray]
        newArray[index] = playerToCompare
        set((state) => ({ playersToCompare: newArray }))
      },
      data: [],
      setData: (data) => set((state) => ({ data })),
      indicator: [],
      setIndicator: (indicator) => set((state) => ({ indicator })),
      statistics: [],
      setStatistics: (statistics) => set((state) => ({ statistics })),
      selectedItem: null,
      setSelectedItem: (selectedItem) => set((state) => ({ selectedItem })),
      handleBasePlayerData: (indicator, data) => {
        // Lógica para actualizar el estado 'data' en función de 'selectedItem'
        set({ indicator })
        const oldArray = get().data
        const newArray = [...oldArray]
        newArray[0] = data
        set({ data: newArray })
      },
      handlePlayersToCompareData: (newData) => {
        // Lógica para actualizar el estado 'data' en función de 'selectedItem'
        const oldArray = get().data
        const newArray = [...oldArray, newData]
        set((state) => ({ data: newArray }))
      },
      notVisibleData: [],
      handleVisibilityOfPlayersData: (name) => {
        // Lógica para actualizar el estado 'data' en función de 'selectedItem'
        const oldArray = get().data
        const oldNotVisibleData = get().notVisibleData
        const alreadyNotVisible = oldNotVisibleData.find((d) => d.name === name)
        if (alreadyNotVisible) {
          const newArray = [...oldArray, alreadyNotVisible]
          const newNotVisibleData = oldNotVisibleData.filter((d) => d.name !== name)
          set((state) => ({ data: newArray }))
          set((state) => ({ notVisibleData: newNotVisibleData }))
        } else {
          const newData = oldArray.find((d) => d.name === name)
          const newNotVisibleData = [...oldNotVisibleData, newData]
          const newArray = oldArray.filter((d) => d.name !== name)
          set((state) => ({ notVisibleData: newNotVisibleData }))
          set((state) => ({ data: newArray }))
        }
      },
      handleDeletePlayerToCompareData: (name) => {
        // Lógica para actualizar el estado 'data' en función de 'selectedItem'
        const oldArray = get().data
        const newArray = oldArray.filter((d) => d.name !== name)
        set((state) => ({ data: newArray }))
      },
      handleUpdateData: (newData, name) => {
        const oldArray = get().data
        let newArray = oldArray.filter((d) => d.name !== name)
        newArray = [...newArray, newData]
        set((state) => ({ data: newArray }))
      },
      databases: [
        {
          key: 1,
          name: '5 latinoamerica',
          file: '/5Latinoamerica.json'
        },
        {
          key: 2,
          name: 'Primera',
          file: '/Primera.json'
        },
        {
          key: 3,
          name: 'Uruguay - Chile - Paraguay - Colombia',
          file: '/Uruguay - Chile - Paraguay - Colombia.json'
        }
      ],
      setDatabases: (width, height) => {
        set({ windowDimensions: { width, height } })
      },
      database: null,
      setDatabase: (database) => {
        set({ database })
      },
      selectedPath: '/5Latinoamerica.json',
      setSelectedPath: (path) => {
        set({ selectedPath: path })
      },
      selectedDatabase: {
        key: 1,
        name: '5 latinoamerica',
        file: '/5Latinoamerica.json'
      },
      setSelectedDatabase: (database) => {
        set({ selectedDatabase: database })
      },
      tabs: [
        {
          key: 0,
          name: 'Player info',
          selected: true
        },
        {
          key: 1,
          name: 'Distributions & Percentiles',
          selected: false
        }
      ],
      handleSelectTab: (newSelectedTab) => {
        let foundSelected = false

        const updatedTabs = get().tabs.map(tab => {
          if (tab.selected) {
            if (!foundSelected) {
              return { ...tab, selected: false }
            }
            foundSelected = true
          }
          if (tab.name === newSelectedTab.name) {
            return { ...tab, selected: true }
          }

          return tab
        })

        set({ tabs: updatedTabs })
      }
    }),
    {
      name: 'players-storage'
    }
  )
)
