'use client'

import { PDFViewer } from '@react-pdf/renderer'
import { DocumentPDF } from '../../components/documentPDF.jsx'
import { useStore } from '../../store/store.js'

const PDFDocumentViewer = () => {
  const { basePlayer } = useStore()

  return (
    <PDFViewer style={{ width: '100%', height: '90vh' }}>
      <DocumentPDF player={basePlayer} />
    </PDFViewer>
  )
}

export default PDFDocumentViewer
