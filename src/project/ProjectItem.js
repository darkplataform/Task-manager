import Modal from "../Modal"
import '../taskItem.css'

function ProjectItem({onClose, open, title, description}) {

  return (
    <Modal modalLable='Proyecto:' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>{title}</h2>
        <p>Especialista: {description}</p>
      </div>
    </Modal>
  )
}

export default ProjectItem
