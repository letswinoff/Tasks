import './App.css';
import Header from "./MyComponent/Header.js";
import { Todos } from "./MyComponent/Todos.js";
import { Footer } from "./MyComponent/Footer.js";
import { AddTodo } from "./MyComponent/AddTodo.js";
import { About } from "./MyComponent/About.js";
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo = [];
  }
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo)=>{
    console.log("I am ondelete", todo);
    // let index = todo.indexOf(todo);
    // todos.splice(index,1);

    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    console.log("deleted", todos)
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodo = (title, desc)=>{
    console.log("I am adding this todo", title, desc)
    let sno;
    if(todos.length === 0){
      sno = 0;
    }
    else{
      sno = todos[todos.length-1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo); 
    
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
    <Router>
      <Header title="Tasks:"/>
      <Switch>
        <Route exact path="/" render={()=>{
          return(
          <>
          <AddTodo addTodo={addTodo}/>
          <Todos todos={todos} onDelete={onDelete}/>
          </>)
        }}>
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
      

      <Footer/>
    </Router>
    </>
  )
}

export default App;
 