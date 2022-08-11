import React, { useState } from 'react'
import ModalLateral from './components/modalLateral/ModalLateral'

const PersonalDevelopmentScreen = () => {
    const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
        <button onClick={() => setModalOpen(true)} >Open Modal</button>
        { isModalOpen && <ModalLateral onClose={() => setModalOpen(false)} /> }
    </div>
  )
}

export default PersonalDevelopmentScreen