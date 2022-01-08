import React from 'react';
import QuestionBody from './QuestionCard/QuestionBody.jsx';
import Answers from './Answers.jsx';
import QuestionDetails from './QuestionCard/QuestionDetails.jsx';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerCounter: 0,
      showMoreBtn: false,
      showCollapseBtn: false,
      accordionDisplay: false
    };
    this.onSeeMoreClick = this.onSeeMoreClick.bind(this);
    this.onCollapseClick = this.onCollapseClick.bind(this);
    this.onAccordionClick = this.onAccordionClick.bind(this);
  }

  componentDidMount() {
    this.initialSetter();
  }

  initialSetter() {
    if (Object.keys(this.props.answers).length <= 2) {
      this.setState({
        answerCounter: Object.keys(this.props.answers).length
      });
    } else {
      this.setState({
        answerCounter: 2,
        showMoreBtn: true
      });
    }
  }

  onSeeMoreClick() {
    if (Object.keys(this.props.answers).length - this.state.answerCounter === 0) {
      this.setState({
        showCollapseBtn: true
      });
    } else if (Object.keys(this.props.answers).length - this.state.answerCounter <= 2) {
      this.setState({
        answerCounter: Object.keys(this.props.answers).length,
        showCollapseBtn: true
      });
    } else {
      this.setState({
        answerCounter: this.state.answerCounter + 2
      });
    }
  }

  onCollapseClick() {
    if (Object.keys(this.props.answers).length <= 2) {
      this.setState({
        answerCounter: Object.keys(this.props.answers).length,
        showCollapseBtn: false
      });
    } else {
      this.setState({
        answerCounter: 2,
        showMoreBtn: true,
        showCollapseBtn: false
      });
    }
  }

  onAccordionClick() {
    this.setState({
      accordionDisplay: !this.state.accordionDisplay
    });
  }

  render() {
    return (
      <div className='QA-question-card'>
        <div className='QA-question-card-question'>
          <div className='QA-symbol'>Q:</div>
          <QuestionBody
            body={this.props.body}
            onAccordionClick={this.onAccordionClick}
          />
          <QuestionDetails
            asker={this.props.asker}
            date={this.props.date}
            helpful={this.props.helpful}
            reported={this.props.reported}
            question_id={this.props.question_id}
            product_name={this.props.product_name}
            onAorQAddition={this.props.onAorQAddition}
          />
        </div>

        <div className='QA-question-card-answers'>
          {
            (this.state.accordionDisplay &&
            Object.keys(this.props.answers).length > 0) &&
              <>
                <div className='QA-symbol-and-answers'>
                  <div className='QA-symbol'>A:</div>
                  <Answers
                    answers={this.props.answers}
                    key={this.props.question_id * 3}
                    answerCounter={this.state.answerCounter}
                    showMore={this.state.showMoreBtn}
                    collapse={this.state.showCollapseBtn}
                  />
                </div>
                {
                  !this.state.showMoreBtn ? null
                    : !this.state.showCollapseBtn
                      ?
                      <>
                        <button className='QA-card-btn-see' onClick={this.onSeeMoreClick}>See more answers</button>
                      </>
                      :
                      <>
                        <button className='QA-card-btn-collapse' onClick={this.onCollapseClick}>Collapse answers</button>
                      </>
                }
              </>
          }
        </div>
      </div>
    );
  }
}

export default QuestionCard;
