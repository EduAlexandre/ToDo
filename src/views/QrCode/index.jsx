import { useState } from 'react'

import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';

import Qr from 'qrcode.react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import * as S from './styles'

function QrCode() {

  const [mac, setMac] = useState()
  const [redirect, setRedirect] = useState(false)

  async function handleSaveMac(){
    if(!mac){
     toast.error("Informe o número que aparaceu no seu celular")
    }else{
    localStorage.setItem('@todo/macaddress', mac)
    setRedirect(true)
    window.location.reload()
    }
   
   
  }

  return (
    <S.Container>
      { redirect && <Redirect to="/"/> }
      <Header />
        <S.Content>
          <h1>CAPTURE O QRCODE PELO APP</h1>          
          <p>suas atividades serão sincronizadas com a do seu celular.</p>

          <S.QrCodeArea>
            <Qr value='getmacaddress' size={350} />
          </S.QrCodeArea>

          <S.ValidationCode>
            <span>Digite a numeração que apareceu no celular</span>
            <input type="text" onChange={e => setMac(e.target.value)} value={mac} />
            <button type="button" onClick={handleSaveMac}>SINCRONIZAR</button>
          </S.ValidationCode>
        </S.Content>
      <Footer />
    </S.Container>
  )
}

export default QrCode

