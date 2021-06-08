import { useState, useEffect, useCallback } from 'react'
import { Link, Redirect } from 'react-router-dom'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FilterCard from '../../components/FilterCard'
import TaskCard from '../../components/TaskCard'
import * as S from './styles'

import isConnected from '../../utils/isConnected'
import api from '../../services/api'

function Home() {

   const [filterActived, setFilterActived] = useState('all')
   const [task, setTask] = useState([])
   const [redirect, setRedirect] = useState(false)
   
const loadTasks = useCallback(async () =>{
await api.get(`/task/filter/${filterActived}/${isConnected}`)
        .then(response => {
           setTask(response.data)           
        })
},[filterActived],)
   

   function Notification(){
      setFilterActived('late')
   }

   useEffect(() => {
     loadTasks()
     if(!isConnected)
       setRedirect(true)     
   },[filterActived, loadTasks]) 
  return (

     <S.Container>
        {redirect && <Redirect to="/qrcode" /> }
      <Header clickNotification={Notification}/>
           <S.FilterArea>
              <button type="button" onClick={() => setFilterActived("all")}>
                <FilterCard title="Todos"  actived={filterActived === 'all'} />
              </button>
              <button type="button" onClick={() => setFilterActived("today")}>
                <FilterCard title="Hoje" actived={filterActived === 'today'} />
              </button> 
              <button type="button" onClick={() => setFilterActived("week")}>
                <FilterCard title="Semana" actived={filterActived === 'week'} />
              </button>
              <button type="button" onClick={() => setFilterActived("month")}>
                 <FilterCard title="Mês" actived={filterActived === 'month'} />
              </button> 
              <button type="button" onClick={() => setFilterActived("year")}>
                 <FilterCard title="Ano" actived={filterActived === 'year'} />
              </button>               
           </S.FilterArea>

           <S.Title>
              <h3>{ filterActived === 'late' ? 'TAREFAS ATRASADAS' : 'TAREFAS'}</h3>
           </S.Title>

           <S.Content>
              {
                 task.map(t => (
               <Link to={`/task/${t._id}`}>     
                 <TaskCard 
                   key={t._id}
                   type={t.type}
                   title={t.title}
                   when={t.when}
                   done={t.done}
                   />
               </Link>    
                 ))
              }              
           </S.Content>
        <Footer />
     </S.Container>
  )
}

export default Home;