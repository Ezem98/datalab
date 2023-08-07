import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      basePlayer: {},
      setBasePlayer: (basePlayer) => set((state) => ({ basePlayer })),
      playerToCompare: null,
      setPlayerToCompare: (playerToCompare) =>
        set((state) => ({ playerToCompare })),
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
        set({ data })
      },
      handlePlayerToCompareData: (prevData, data) => {
        // Lógica para actualizar el estado 'data' en función de 'selectedItem'
        set({ data: [prevData[0], data] })
      }
    }),
    {
      name: 'players-storage'
    }
  )
)
