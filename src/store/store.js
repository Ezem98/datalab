import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      basePlayer: {},
      setBasePlayer: (basePlayer) => set((state) => ({ basePlayer })),
      playerToCompare: null,
      setPlayerToCompare: (playerToCompare) =>
        set((state) => ({ playerToCompare }))
    }),
    {
      name: 'players-storage'
    }
  )
)
