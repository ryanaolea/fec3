import React, { useState } from 'react';
import axios from 'axios';
const localHost = 'http://127.0.0.1:3000';

const HelpfulTracker = ({ question_id, helpful, usage, reported }) => {
  const [yesCount, setYesCount] = useState(helpful);
  const [yesClicked, setYesClicked] = useState(false);
  const [reportState, setReportState] = useState(<u>Report</u>);
  const [reportClicked, setReportClicked] = useState(reported);

  const updateYesOrReport = (endpoint, body) => {
    axios.put(localHost + endpoint, body)
      .catch(err => console.error('Error submitting PUT req (HelpfulTracker.jsx): ', err))
  };

  const onYesClick = () => {
    let endpoint;
    let body;
    if (yesClicked === false) {
      if (usage === 'answer') {
        endpoint = `/qa/answers/${question_id}/helpful`;
        body = { helpfulness: yesCount + 1 };
      } else if (usage === 'question') {
        endpoint = `/qa/questions/${question_id}/helpful`;
        body = { question_helpfulness: yesCount + 1 };
      }
      setYesCount(prevYesCount => prevYesCount + 1);
      setYesClicked(true);
      updateYesOrReport(endpoint, body);
    }
  };

  const onReportClick = () => {
    let endpoint;
    let body;
    if (reportClicked === false) {
      if (usage === 'question') {
        endpoint = `/qa/questions/${question_id}/report`;
        body = { reported: 'Reported' };
      }
      setReportState('Reported');
      setReportClicked(true);
      updateYesOrReport(endpoint, body);
    }
  };

  return (
    <div>
      Helpful?&nbsp;
      <span onClick={onYesClick} className='clickable'><u>Yes</u></span> ({ yesCount })
      {usage === 'answer' ? null :
      <>
        &nbsp; | &nbsp;
        <span onClick={onReportClick} className='clickable'>{reportState}</span>
      </>
      }
    </div>
  );
}

export default HelpfulTracker;