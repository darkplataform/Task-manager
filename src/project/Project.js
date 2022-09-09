import '../task.css'
import {useState} from 'react'
import TaskItem from '../TaskItem'
import EditTask from '../EditTask'

function Project({id, clientName, specialist, status, created}) {

  const [checked, setChecked] = useState(status!=="")
  const [open, setOpen] = useState({edit:false, view:false})

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }
  
   /* function to update document in firestore */

   /* function to delete a document from firstore */ 

  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div>
        <input 
          id={`checkbox-${id}`} 
          className='checkbox-custom'
          name="checkbox" 
          checked={checked} 
          type="checkbox" />
        <label 
          htmlFor={`checkbox-${id}`} 
          className="checkbox-custom-label" 
          onClick={() => setChecked(!checked)} ></label>
      </div>
      <div className='task__body'>
        <h2>{clientName}</h2>
        <h3>Especialista:{specialist}</h3>
        <h4>{status}</h4>
        <p>Fecha Registro: {created? new Date(created?.seconds * 1000).toLocaleDateString("en-US"):""}</p>
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <button 
              className='task__editButton' 
              onClick={() => setOpen({...open, edit: true})}>
              Editar
            </button>
            <button className='task__deleteButton'>Delete</button>
          </div>
          <button 
            onClick={() => setOpen({...open, view: true})}>
            Ver
          </button>
        </div>
      </div>

      {open.view &&
        <TaskItem 
          onClose={handleClose} 
          title={clientName} 
          description={specialist} 
          open={open.view} />
      }

      {open.edit &&
        <EditTask 
          onClose={handleClose} 
          toEditTitle={clientName} 
          toEditDescription={specialist} 
          open={open.edit}
          id={id} />
      }

    </div>
  )
}

export default Project