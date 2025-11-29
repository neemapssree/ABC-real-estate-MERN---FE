import React from 'react'
import Modal from 'react-bootstrap/Modal';

const ModalView = ({children, setShowModal,setBookingModal,showModal,propname,title,resetmodal}) => {    
  
  const closeModal = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={closeModal} className='modalShow'>
        <Modal.Header closeButton onClick={resetmodal}>
          <Modal.Title>{title} {propname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>        
    </Modal>
  )
}

export default ModalView