import React, { useState } from 'react';

function Hero() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [allComplete, setAllComplete] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addItem();
    }
  };

  function addItem() {
    if (!newItem) {
      alert("Enter a task");
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
      completed: false
    };
    setItems(oldItems => [...oldItems, item]);
    setNewItem("");
    setAllComplete(false);
  }

  function deleteTask(id) {
    const newArray = items.filter(item => item.id !== id);
    setItems(newArray);
    setAllComplete(newArray.length > 0 && newArray.every(item => item.completed));
  }

  function toggleTaskCompletion(id) {
    const newItems = items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(newItems);
    setAllComplete(newItems.every(item => item.completed));
  }

  function toggleAllCompletion() {
    const newAllComplete = !allComplete;
    const newItems = items.map(item => ({
      ...item,
      completed: newAllComplete
    }));
    setItems(newItems);
    setAllComplete(newAllComplete);
  }

  return (
    <section className="todoapp">
      <header className="header">
        <form onSubmit={e => e.preventDefault()}>
          <h1>todos</h1>
          <input className="new-todo"
            type="text"
            placeholder="What needs to be done?" autoFocus
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </form>
      </header>

      <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          checked={allComplete}
          onChange={toggleAllCompletion}
        />
        <label htmlFor="toggle-all">
          Mark all as complete
        </label>
        <ul className="todo-list">
          {items.map(item => (
            <li key={item.id} className={item.completed ? 'completed' : ''}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTaskCompletion(item.id)}
                />
                <label>{item.value}</label>
                <button className="destroy" onClick={() => deleteTask(item.id)}></button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{items.filter(item => !item.completed).length}</strong> items left
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>
          <li>
            <a href="#/">Active</a>
          </li>
          <li>
            <a href="#/">Completed</a>
          </li>
        </ul>

        <button className="clear-completed" onClick={() => setItems(items.filter(item => !item.completed))}>
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default Hero;
