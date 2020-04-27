import React, { Component } from "react";
import "./App.css";
import TodoList from "./TodoList";

// Add font and Ficon
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash);
//

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: "",
      },
    };
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //Assign & display input value
  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  }

  //Assign & display input value
  handleSubmit(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    // console.log(newItem);
    if (newItem.text !== "") {
      const newItems = [...this.state.items, newItem];
      this.setState({
        items: newItems,
        currentItem: {
          text: "",
          key: "",
        },
      });
    }
  }
  deleteItem(key) {
    const filteredItems = this.state.items.filter((item) => item.key !== key);
    this.setState({
      items: filteredItems,
    });
  }
  setUpdate(text, key) {
    console.log("items:" + this.state.items);
    const items = this.state.items;
    items.map((item) => {
      if (item.key === key) {
        // console.log(item.key + "    " + key);
        item.text = text;
      }
    });
    this.setState({
      items: items,
    });
  }

  render() {
    return (
      <div className="App">
        <div id="to-do-form">
          <p>
            <input
              type="text"
              placeholder="Enter item"
              onChange={this.handleInput}
              value={this.state.currentItem.text}
            />
            <button onClick={this.handleSubmit}>Add</button>
          </p>
        </div>
        <TodoList
          itemList={this.state.items}
          deleteItem={this.deleteItem}
          setUpdate={this.setUpdate}
        />
      </div>
    );
  }
}
