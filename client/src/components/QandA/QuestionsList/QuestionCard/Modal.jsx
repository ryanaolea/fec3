import React, { useState, useRef } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
const { localhost } = require('/config.js');

const cloudinary_name = 'flightfulkiwi';
const cloudinary_url = 'https://api.cloudinary.com/v1_1/flightfulkiwi/image/upload';
const cloudinary_preset = 'fec_preset';

let title;
let title_body;
let buttonText;
let imageErrorMsg = 'Sorry! Maximum number of images (5) exceeded.';
let imageSuccessMsg = 'Thanks! You\'ve selected five (5) images.';

const Modal = ({ setShowModal, usage, product_name, questionOrProduct_id, onAorQAddition }) => {
  const [bodyTextValue, setBodyTextValue] = useState('');
  const [nicknameValue, setNicknameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [showImageInputButton, setShowImageInputButton] = useState(true);
  const [images, setImages] = useState([]);
  const [previewSources, setPreviewSources] = useState([]);

  // Close the modal when clicking outside the modal
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  // Determines displayed text based on whether Q or A
  if (usage === 'addAnswer') {
    title = 'Submit your answer';
    title_body = 'Your Answer';
    buttonText = 'Submit Answer';
  } else {
    title = 'Ask your question';
    title_body = 'Your Question';
    buttonText = 'Submit Question';
  }

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    const filesArray = [];
    for (let i = 0; i < files.length; i++) {
      filesArray.push(files[i]);
    }

    setImages(prevImages => [...filesArray, ...prevImages]);

    const previewDIV = document.getElementById('QA-modal-previews');
    // while (previewDIV.firstChild) {
    //   previewDIV.removeChild(previewDIV.lastChild);
    // }

    filesArray.forEach(imageFile => {
      const reader = new FileReader();
      reader.onload = () => {
        var image = new Image();
        image.height = 50;
        image.alt = 'Image to upload';
        image.src = reader.result;
        previewDIV.appendChild(image);
      };
      reader.readAsDataURL(imageFile);
    });
  };

  const tryAgainHandler = (e) => {
    e.preventDefault();
    setPreviewSources([]);
    setImages([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageURLs = [];

    // Uploads images to Cloudinary
    for (let k = 0; k < images.length; k++) {
      const data = new FormData();
      data.append('file', images[k]);
      data.append('upload_preset', cloudinary_preset);
      data.append('cloud_name', cloudinary_name);

      try {
        const result = await axios.post(cloudinary_url, data);
        imageURLs.unshift(result.data.url);
      } catch (err) {
        console.error( 'Error posting to Cloudinary: ', err );
      }
    }

    let endpoint;
    let body = {
      body: document.getElementById('QA-modal-body').value,
      // body: event.target.modalBody.value,
      name: document.getElementById('QA-modal-nickname').value,
      // name: event.target.modalName.value,
      email: document.getElementById('QA-modal-email').value
      // email: event.target.modalEmail.value
    };

    if (usage === 'addAnswer') {
      endpoint = `/qa/questions/${questionOrProduct_id}/answers`;
      body.photos = imageURLs;
    }

    if (usage === 'addQuestion') {
      endpoint = '/qa/questions';
      body.product_id = questionOrProduct_id;
    }

    try {
      const postReq = await axios.post(localHost + endpoint, body);
      onAorQAddition();
      // setShowModal(false);
    } catch (err) {
      console.error( 'Error posting from Modal: ', err );
    }

    // Closes modal on Submit
    setShowModal(false);
  };

  // Render the modal JSX in the portal div
  return ReactDom.createPortal(
    <div className='QA-modal-container' ref={modalRef} onClick={closeModal}>
      <div className='QA-modal-content'>
        <h3 className='QA-modal-title'>{title}</h3>
        <h4 className='QA-modal-subtitle'>About the {product_name}</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor='QA-modal-body'>{title_body}<span className='QA-modal-required-input'> *</span></label><br/>
          <textarea
            id='QA-modal-body' maxLength='1000' required
            rows='6' cols='40' name='modalBody'
          ></textarea>

          <br/>
          <br/>

          <label htmlFor='QA-modal-nickname'>What is your nickname?<span className='QA-modal-required-input'> *</span></label>
          <br/>
          <input type='text' id='QA-modal-nickname' maxLength='60'
            placeholder='Example: jack543!' size='30' required name='modalNickname'
          />
          <p id='QA-modal-disclaimer'>For privacy reasons, do not use your full name or email address</p>

          <br/>

          <label htmlFor='QA-modal-email'>Your email:<span className='QA-modal-required-input'> *</span></label>
          <br/>
          <input
            type='email' id='QA-modal-email' maxLength='60' required
            placeholder='jack@email.com' size='30' name='modalEmail'
          />
          <p id='QA-modal-disclaimer'>For authentication reasons, you will not be emailed</p>

          <br/>

          {usage === 'addAnswer' &&
          <>
            <label htmlFor='answer-photos'>Upload your photos (5 Max):</label><br/>
            {
              images.length > 5 ?
                <div>
                  <p className='QA-modal-img-error'>{ imageErrorMsg }</p>
                  <button onClick={tryAgainHandler}>Please Try Again!</button>
                </div>
                :
                <div>
                  { images.length < 5 &&
                  <input
                    type='file' id='answer-photos' accept='image/*'
                    multiple onChange={handleFileInputChange}
                  />
                  }
                  <br/>
                  <br/>
                  <div id='QA-modal-previews'></div>
                </div>
            }
          </>
          }

          <br/>

          <input type='submit' value={buttonText} className='QA-modal-submit-btn' />
        </form>

        <button className='QA-modal-X-btn'
          onClick={ () => setShowModal(false) }
        >X</button>
      </div>
    </div>,
    document.getElementById('thumbnail-portal')
  );
};

export default Modal;