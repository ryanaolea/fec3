import React, { useState } from 'react';
import Modal from './Modal.jsx';

let displayElement;
let component;

const AddQuestionOrAnswer = ({ questionOrProduct_id, product_name, usage, onAorQAddition }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  if (usage === 'addAnswer') {
    displayElement = <span className='clickable' onClick={openModal}><u>Add Answer</u></span>;
    component =
      <Modal
        setShowModal={setShowModal} usage={usage} product_name={product_name}
        questionOrProduct_id={questionOrProduct_id} onAorQAddition={onAorQAddition}
      />;
  } else {
    displayElement = <button className='QA-add-question-btn' onClick={openModal}>Add a Question +</button>;
    component =
      <Modal
        setShowModal={setShowModal} usage={usage} product_name={product_name}
        questionOrProduct_id={questionOrProduct_id} onAorQAddition={onAorQAddition}/>;
  }

  return (
    <div className='QA-add-QorA'>
      {displayElement}
      {showModal
        ? component
        : null
      }
    </div>
  );
};

export default AddQuestionOrAnswer;