import './taskManager.css'
//import Task from './Task'
import AddTask from './AddTask'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from './firebase'
import Project from './project/Project'

function TaskManager() {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])

  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
      /*querySnapshot.docs.map(doc => (
      console.log(doc.id)
      ))*/
    })
  },[])

  return (
    <div className='taskManager'>
      <header>Administrador de Proyectos</header>
      <div className='taskManager__container'>
        <button 
          onClick={() => setOpenAddModal(true)}>
          Agregar Proyecto +
        </button>
        {tasks.map((task) => (
          <Project
            id={task.id}
            key={task.id}
            clientName={task.data.clientName}
            specialist={task.data.specialist} 
            status={task.data.status}
            created={task.data.created}
          />
        ))}
      </div>

      {openAddModal &&
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }

    </div>
  )
}

export default TaskManager
