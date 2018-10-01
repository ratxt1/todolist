import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      history: [
        {list: [], completed: []}
      ],
      current: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const history = this.state.history.slice(0, this.state.current + 1);
    const currentList = history[history.length - 1].list  
    const list = currentList.slice().concat([this.state.value]);
    const completed = history[history.length -1].completed.slice()
    
    this.setState({
      value: '',
      history: history.concat([
        {list:list, completed:completed}
      ]),
      current: (this.state.current + 1)
    })
    console.log(this.state.history[this.state.current])
    event.preventDefault()
  }
  
  Undo() {
    if (this.state.current != 0) {
      this.setState({
        current: this.state.current-1
      })
    }
  }
  
  Redo() {
    if (this.state.current < this.state.history.length - 1) {
      console.log(this.state.history.length, this.state.current)
      this.setState({
        current: this.state.current+1
      })
    }
  }
  
  handleDelete(e, index) {
    console.log(index)
    const history = this.state.history.slice(0, this.state.current + 1);
    const currentList = history[history.length - 1].list.slice() 
    let completedItem = currentList.splice(index, 1)
    const completed = history[history.length -1].completed.slice().concat([completedItem]);
    this.setState({
      history: history.concat([{
        list:currentList, completed:completed
      }]),
      current: (this.state.current + 1)
    })
    
    e.preventDefault()
  }

  render() {
    var list = this.state.history[this.state.current].list
    var completed = this.state.history[this.state.current].completed
    var items = list.map((value, index) => (
      <li key={value}>
        <button onClick={(event) => this.handleDelete(event, index)}>
          {value}
        </button>
      </li>
    ))
    
    var completedItems = completed.map((value, index) => (
      <li key={value}>
        {value}
      </li>
    ))

    return ( 
      <div className="to-do-list-app">
        <form onSubmit={this.handleSubmit}>
          <label>
            Add to List:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form> 
        <div>
          <button onClick={() => this.Undo()}>Undo</button>
          <button onClick={() => this.Redo()}>Redo</button>
        </div> 
        <label>
          To Do:
          <div>{items}</div>
        </label> 
        <label>
          Completed:
          <div>{completedItems}</div>
        </label> 
        
      </div>    
    );
  }
}

export default App;
