import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import "./App.css";

class App extends Component {
  constructor(props) {
    // set up state
    super(props);
    this.state = {
      userInput: "",
      list: [],
    };
  }

   // Load list from localStorage when component mounts
  componentDidMount() {
    const savedList = localStorage.getItem("todoList");
    if (savedList) {
      this.setState({ list: JSON.parse(savedList) });
    }
  }

  // Save list to localStorage whenever it changes
  componentDidUpdate(prevProps, prevState) {
    if (prevState.list !== this.state.list) {
      localStorage.setItem("todoList", JSON.stringify(this.state.list));
    }
  }

  // set the userInput value
  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  //add item to the list
  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        id: Date.now(),
        value: this.state.userInput,
      };

      //update list
      const list = [...this.state.list];
      list.push(userInput);

      //reset state
      this.setState({
        list,
        userInput: "",
      });
    }
  }

  //delete item from the list
  deleteItem(key) {
    const list = [...this.state.list];

    //filter out item being deleted
    const updatedList = list.filter((item) => item.id !== key);

    this.setState({
      list: updatedList,
    });
  }

  editItem = (index) => {
    const todos = [...this.state.list];
    const editedTodo = prompt("Edit the item:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      let updatedTodos = [...todos];
      updatedTodos[index].value = editedTodo;
      this.setState({
        list: updatedTodos,
      });
    }
  }

  render() {
    return (
      <div className="my-container">
      <Container>
        <h1>
          To Do List:
        </h1>
        <hr />
        <Row className="list-container">
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                aria-label="add something"
                placeholder="Add an item to your list"
                value={this.state.userInput}
                onChange={(e) => this.updateInput(e.target.value)}
              />
              <Button
                className="btn-add"
                onClick={() => this.addItem()}>
                Add
              </Button>
            </InputGroup>

          </Col>

        </Row>
        <Col>
          <ListGroup>
            {/* map over and print items */}
            {this.state.list.map((item, index) => {
              return (
                <div key={index} >
                  <ListGroup.Item
                    className="list-group-item-custom fade-in"
                    action>
                    {item.value}
                    <span>
                      <Button
                        className="btn-edit"
                        onClick={() => this.editItem(index)}>
                        Edit
                      </Button>
                      <Button style={{ marginRight: "10px", marginLeft: "10px" }}
                        className= "btn-delete"
                        onClick={() => this.deleteItem(item.id)}>
                        Delete
                      </Button>
                    </span>
                  </ListGroup.Item>
                </div>
              );
            })}
          </ListGroup>
        </Col>
      </Container>
      </div>
    );
  }




}

export default App;
