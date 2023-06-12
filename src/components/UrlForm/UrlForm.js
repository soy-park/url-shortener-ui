import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      urlToShorten: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.title && this.state.urlToShorten) {
      const newUrl = {
        id: this.props.urls.length,
        long_url: this.state.urlToShorten,
        short_url: `http://localhost:3001/useshorturl/${this.props.urls.length}`,
        title: this.state.title
      }
      this.props.addUrl(newUrl)
    } else {
      alert("Please add title and url to shorten")
    }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={this.handleNameChange}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={this.handleNameChange}
        />

        <button type="submit">
          Shorten Please!
        </button>
      </form>
    );
  }
}

export default UrlForm;
