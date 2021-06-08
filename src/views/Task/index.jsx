import { useState, useEffect } from 'react'

import { format } from 'date-fns'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';


import Header from '../../components/Header'
import Footer from '../../components/Footer'
import * as S from './styles'

import isConnected from '../../utils/isConnected'
import TypeIcons from '../../utils/typeIcons'
import api from '../../services/api'

function Task({match}) {
 

   const [redirect, setRedirect] = useState(false)
   
   const [type, setType] = useState()
   const [id, setId] = useState()
   const [done, setDone] = useState(false)
   const [title, setTitle] = useState()
   const [description, setDescription] = useState()
   const [date, setDate] = useState()
   const [hour, setHour] = useState()
  
 

   async function handleSave(){

    if(!title)
    return toast.error('Você precisa informar o título da tarefa')      
    else if(!description)
       return toast.error('Você precisa informar a descrição da tarefa')  
    else if(!type)
       return toast.error('Você precisa informar o tipo tarefa')
    else if(!date)
       return toast.error('Você precisa definir a data da tarefa')
    else if(!hour)
       return toast.error('Você precisa definir o horário da tarefa')

   if(match.params.id){
     await api.put(`/task/${match.params.id}`, {
       macaddress: isConnected,
       type,
       done,
       title,
       description,
       when: `${date}T${hour}:00.000`
     }).then(() => {      
       toast.info('Tarefa atualizada com sucesso')
       setRedirect(true)
     }).catch(err => {
       console.error(err)
       toast.error('Tente novamente')
     })
   }else{
     await api.post('/task', {
       macaddress: isConnected,
       type,
       title,
       description,
       when: `${date}T${hour}:00.000`
     }).then(() => {
        toast.info('Tarefa cadastrada com sucesso')
       setRedirect(true)
     }).catch(err => {
       console.error(err)
     })
   }
}

   async function loadTask(){
     await api.get(`/task/${match.params.id}`)
      .then(response => {
        setDone(response.data.done)
        setType(response.data.type)
        setTitle(response.data.title)
        setDescription(response.data.description)
        setDate(format( new Date(response.data.when), 'yyyy-MM-dd'))
        setHour(format( new Date(response.data.when), 'HH:mm'))
      })
   }

   async function hadleRemove(){
      // next line no-restricted-globals
     const res = window.confirm('Deseja Realmente remover a tarefa ?')
     if(res === true){
       await api.delete(`/task/${match.params.id}`)
        .then(() => setRedirect(true))
        toast.info('Tarefa excluída!')
     }
   }

   useEffect(() => {
     if(!isConnected)
       setRedirect(true)         
     loadTask()  
   },[]) 
  return (

     <S.Container>
       { redirect && <Redirect to="/" />}
       <Header clickNotification={Notification} />   

       <S.Form>
         <S.TypeIcons>
           {
             TypeIcons.map((icon, index) => (
                index > 0 && 
                 <button type="button" onClick={() => setType(index)}>
                    <img key={index} src={icon} alt="Tipo da Tarefa"
                    className={type && type !== index && 'inative'}/>
                </button>
             ))
           }
         </S.TypeIcons> 

       <S.Input>
         <span>Título</span>
         <input type="text" placeholder="Título da tarefa...." 
           onChange={e => setTitle(e.target.value)} value={title}
         />       
       </S.Input> 

       <S.TextArea>
         <span>Título</span>
         <textarea rows="5" placeholder="Detalhes da tarefa..." 
          onChange={e => setDescription(e.target.value)} value={description}
         />       
       </S.TextArea>

       <S.Input>
         <span>Data</span>
         <input type="date" placeholder="Título da tarefa...." 
          onChange={e => setDate(e.target.value)} value={date}
         />           
       </S.Input> 

       <S.Input>
         <span>Hora</span>
         <input type="time" placeholder="Título da tarefa...." 
           onChange={e => setHour(e.target.value)} value={hour}
         />               
       </S.Input> 

       <S.Options>
         <div>
           <input type="checkbox" 
             checked={done}
             onChange={() => setDone(!done)}
           />
           <span>CONCLUÍDO</span>
         </div>
         { match.params.id && <button type="button" onClick={hadleRemove}>EXCLUIR</button>}
       </S.Options>

       <S.Save>
         <button type="button" onClick={handleSave}>SALVAR</button>          
       </S.Save>

       </S.Form>       
        <Footer />
     </S.Container>
  )
}

export default Task;