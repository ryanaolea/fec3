import React from 'react';
import Title from './components/Title.jsx';
import Overview from './components/Overview.jsx';
import Ratings from './components/Ratings.jsx';
import Related from './components/Related.jsx';
import QandA from './components/QandA.jsx';
import axios from 'axios';
const { localhost } = require('/config.js');

const findId = (element) => {
  let id;
  let moduleIds = {
    'Overview': true,
    'Related': true,
    'QandA': true,
    'Ratings': true,
  };

  const recurseNodeTree = (node) => {
    if (node === null) {
      return;
    } else if (node.id === 'thumbnail-portal') {
      id = 'Modal';
    } else if (moduleIds[node.id] !== undefined) {
      id = node.id;
      return;
    } else if (node.parentElement) {
      recurseNodeTree(node.parentElement);
    }
  };
  recurseNodeTree(element);

  if (id === undefined && element.outerHTML.indexOf('button') > -1) {
    id = 'Modal';
  } else if (id === undefined && element.outerHTML.indexOf('img') > -1) {
    id = 'Overview';
  }

  return id;
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_Id: 40344,
      product_name: 'Camo Onesie',
      outfit: [40344],
    };
    this.handleProductNameChange = this.handleProductNameChange.bind(this);
    this.relatedClickHandler = this.relatedClickHandler.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);
  }

  addToOutfit () {
    console.log('adding to outfit');
    this.setState((state) => ({
      outfit: [...state.outfit, state.product_Id]
    }));
  }

  handleProductNameChange (name) {
    this.setState({product_name: name});
  }

  relatedClickHandler (e, itemId, itemName, cb) {
    e.preventDefault();
    this.setState({
      product_Id: itemId,
      product_name: itemName
    });
    cb(itemId);
  }

  render () {
    window.addEventListener('click', function (e) {
      let element;
      if (e.target.parentNode === null) {
        element = e.target;
      } else {
        element = e.target.parentNode;
      }
      let time = new Date().toLocaleString();
      let body = {
        time: time,
        element: e.target.outerHTML.slice(0, 25),
        widget: findId(element)
      };
      // console.log('this is your click event', body);

      axios.post(`${localhost}/interactions`, body)
        .catch((err) => console.error('this is the interactions error', err));

    });

    return (
      <div>
        <Title />
        <Overview
          product_Id={this.state.product_Id}
          handleProductNameChange={this.handleProductNameChange}
        />
        <Related
          product_Id={this.state.product_Id}
          product_name={this.state.product_name}
          relatedClickHandler={this.relatedClickHandler}
          outfit={this.state.outfit}
          addToOutfit={this.addToOutfit}
        />
        <QandA
          product_id={this.state.product_Id}
          product_name={this.state.product_name}
        />
        <Ratings
          product_Id={this.state.product_Id}
          productName={this.state.product_name}
        />
      </div>
    );
  }


}

export default App;
