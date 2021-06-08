import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import * as S from './styles'
import logo from '../../assets/logo.png'
import bell from '../../assets/bell.png'
import api from '../../services/api'
import isConnected from '../../utils/isConnected'

function Header({ clickNotification }){

  const [lateCount, setLateCount] = useState()


   async function lateVerify() {
      await api.get(`/task/filter/late/${isConnected}`)
        .then(response => {
           setLateCount(response.data.length)           
        })
   }

   async function handleLogOut(){
     localStorage.removeItem('@todo/macaddress')
     window.location.reload()
   }

   useEffect(() => {
     lateVerify()
   },[])


  return (
    <S.Container>
      <S.LeftSide>
        <img src={logo} alt="Logo" />
      </S.LeftSide>
      <S.RightSide>
        <Link to="/">Início</Link>
          <span className="dividir"></span>
        <Link to="/task" >Nova Tarefa</Link>
          <span className="dividir"></span>
       { !isConnected 
        ? <Link to="/qrcode">Sincronizar celular</Link>
        : <button type="button" onClick={handleLogOut}>SAIR</button>
       }
        {
          lateCount &&
          <>
            <span className="dividir"></span>
          <button onClick={clickNotification} id="notification">
            <img src={bell} alt="Notificação" />
            <span>{lateCount}</span> 
          </button>
          </>
        }
      </S.RightSide>
    </S.Container>
  )
}

export default Header