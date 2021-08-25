import React, {Component} from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner/';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {

  constructor () {
    super();
    this.updateChar();
  }

  gotService = new GotService();
  state = {
    char: {},
    loading: true,
    error: false,
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  updateChar() {
    const id = Math.floor(Math.random()*140 * 10); //10 - 140
    this.gotService.getCharacter(id)
          .then(this.onCharLoaded)
          .catch(this.onError);
  }

  render() {
    const {char, loading, error} = this.state;

    const Content = () => {
      return error ? <ErrorMessage/> :loading ? <Spinner/> : <View char={char}/>;
    }

    if (loading) {
      return <Spinner/>
    }

    return (
      <div className="random-block rounded">
        <Content loading={loading} />
      </div>
    );
  }
}

const View = ({char}) => {
  const {name, gender, born, died, culture} = char;

  return (
    <>
      <h4>Random Character: {name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender </span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born </span>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died </span>
          <span>{died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture </span>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  )
}
