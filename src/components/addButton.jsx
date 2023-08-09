import { IoMdAdd } from 'react-icons/io'

export const AddButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className='flex items-center justify-center text-base tracking-wide bg-primary px-2 py-1 rounded-md shadow-lg hover:translate-y-1'>
      <IoMdAdd size='1em' className='mr-1' color='#fafafa' />
      <span className='text-quaternary'>Add player</span>
    </button>

  )
}
