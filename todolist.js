class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      history: [
        {list: []}
      ],
      current: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  renderList() {
    // let list = this.state.history[this.state.current].slice()
    // console.log(list)
    
    return <ul>{ items }</ul>
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const history = this.state.history.slice(0, this.state.current + 1);
    const currentList = history[history.length - 1].list  
    const list = currentList.slice().concat([this.state.value]);
    
    this.setState({
      value: '',
      history: history.concat([{
        list:list
      }]),
      current: (this.state.current + 1)
    })
    event.preventDefault()
  }
  
  Undo(e) {
    if (this.state.current != 0) {
      this.setState({
        current: this.state.current-1
      })
    }
    e.preventDefault()
  }
  
  Redo(e) {
    if (this.state.current < this.state.history.length - 1) {
      console.log(this.state.history.length, this.state.current)
      this.setState({
        current: this.state.current+1
      })
    }
    e.preventDefault()
  }
  
  handleDelete(e, index) {
    console.log(index)
    const history = this.state.history.slice(0, this.state.current + 1);
    const currentList = history[history.length - 1].list.slice() 
    currentList.splice(index, 1)
    this.setState({
      history: history.concat([{
        list:currentList
      }]),
      current: (this.state.current + 1)
    })
    
    e.preventDefault()
  }

  render() {
    let list = this.state.history[this.state.current].list
    let items = list.map((value, index) => (
      <li key={value}>
        <button onClick={(event) => this.handleDelete(event, index)}>
          {value}
        </button>
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
       <div>{items}</div>  
       <div>
          <button onClick={() => this.Undo()}>Undo</button>
          <button onClick={() => this.Redo()}>Redo</button>
        </div>
      </div>    
    );
  }
}

ReactDOM.render(
  <ToDoList />,
  document.getElementById('root')
);