import { Modal } from '@nextui-org/react'

export const ContentModal = ({
  visible,
  title,
  content,
  footer
}) => {
  return (
    <Modal
      closeButton
      blur
      aria-labelledby='modal-title'
      open={visible}
      fullScreen
    >
      <Modal.Header>
        <h2 id='modal-title' size={24} transform='uppercase'>
          {title}
        </h2>
      </Modal.Header>
      <Modal.Body>
        {content}
      </Modal.Body>
      <Modal.Footer>
        {footer}
      </Modal.Footer>
    </Modal>
  )
}
