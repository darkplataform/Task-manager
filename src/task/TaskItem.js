import Modal from "../Modal"
import '../taskItem.css'

function TaskItem({onClose, open, taskName, instructions}) {

  return (
    <Modal modalLable='Tarea:' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>{taskName}</h2>
        <p>Instrucciones: {instructions}</p>
      </div>
    </Modal>
  )
}

export default TaskItem
