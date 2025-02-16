import React, { Component } from 'react';
import './App.css';
import { getUrls, addUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    getUrls()
    .then(data => {
      this.setState({ urls: data.urls })
    })
    .catch(err => {throw new Error(`${err.message}`)})
  }

  submitUrl = (newUrl) => {
    addUrl(newUrl)
      .then(data => { 
        this.setState({ urls: [...this.state.urls, data] })
      })
      .catch(err => {throw new Error(`${err.message}`)})
    }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm urls={this.state.urls} addUrl={this.submitUrl} />
        </header>
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
