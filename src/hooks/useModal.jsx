'use client'

import { useState } from 'react'

export const useModal = (initialValue = false) => {
  const [visible, setVisible] = useState(initialValue)
  const openModal = () => setVisible(true)
  const closeModal = () => setVisible(false)

  return {
    visible,
    openModal,
    closeModal
  }
}
