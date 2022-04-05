
import React, {createRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import './App.scss';

// Redux 
const T = 'ISTHERE'
const state = {
  message: [
    {author: 'Federico García Lorca.', text: 'La poesía no quiere adeptos, quiere amantes'},
    {author: 'Pablo Neruda.', text: 'Me enamoré de la vida, es la única que no me dejará sin antes yo hacerlo'},
    {author: 'Mario Benedetti.', text: 'La perfección es una pulida colección de errores'}, 
    {author: 'Jorge Luis Borges.', text: 'Hay derrotas que tienen más dignidad que una victoria'},
    {author: 'Antonio Machado.', text: 'Es propio de aquellos con mentes estrechas embestir contra todo aquello que no les cabe en la cabeza'},
    {author: 'Pablo Neruda.', text: 'Muere lentamente quien no viaja, quien no oye música, quien no encuentra gracia en sí mismo'},
    {author: 'Maya Angelou.', text: 'Si siempre intentas ser normal nunca descubrirás lo extraordinario que puedes llegar a ser'},
    {author: 'Frida Khalo.', text: 'La mujer que lee almacena su belleza para la vejez'}
  ]
}

const getMessage = (number) => {
  if(number < state.message.length){
    return {
      type: T , 
      author: state.message[number].author, 
      message: state.message[number].text
    }
  }
}

const reducerMessage = (state = [], action ) =>  {
  switch (action.type){
    case T: 
    return [action.message, action.author]
    default:
    return state
  }
}

const store = createStore(reducerMessage)

//React 

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      number : Math.floor(Math.random() * 8), 
      color: 0
    }
    this.author = createRef()
    this.txt = createRef(); 
    this.handleClick = this.handleClick.bind(this)
    this.props.submitGetMessage(this.state.number)
  }
  changeBackground(){
    let cl = this.state.color; 
    let clr = Math.floor(Math.random()* 6)
    document.body.classList.remove('bg-color-'+cl)
    document.body.classList.add('bg-color-'+clr) 
    this.setState({
      color:  clr
    })  
  }
  handleClick(){
    let num = Math.floor(Math.random() * 8)
    
    if(this.state.number != num){
      this.setState({
        number: num
      })
      this.props.submitGetMessage(num) 
      this.changeBackground()
    }else {
      this.handleClick()
    }
    
  }
  render() {
    return (
      <div id="quote-box" className='quote-box movement'>
        <div ref={this.txt} className={'color-'+this.state.color} id='text'><p> {this.props.messages[0]} </p></div>
        <div ref={this.author} className={'color-'+this.state.color} id='author'><p> -{this.props.messages[1]} </p></div>   
        <a id='tweet-quote' className={'bg-color-'+this.state.color} href={'https:\\twitter.com/intent/tweet?text=' + this.props.messages[0]+ ' - '+this.props.messages[1]} target='_blank'>
        <FontAwesomeIcon icon={faTwitter} />
        </a>
        <button className={'bg-color-'+this.state.color} id="new-quote" 
        onClick={this.handleClick} 
        >Presionar</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {messages: state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitGetMessage: (msg) => {
      dispatch(getMessage(msg))
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App)

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
};

export default AppWrapper;
