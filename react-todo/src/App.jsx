import { useState, useEffect, useRef } from "react";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [dateOrder, setDateOrder] = useState("asc");
  const isFirstRender = useRef(true);

  const today = new Date().toISOString().slice(0, 10);

  const overdueCount = todos.filter(
    (t) => !t.done && t.date < today
  ).length;

  /* ---------- localStorage ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /* ---------- actions ---------- */
  const addTodo = () => {
    if (!text.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        date: today,
        done: false,
      },
    ]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  /* ---------- filter + sort ---------- */
  const visibleTodos = todos
    .filter((t) => {
      if (filter === "active") return !t.done;
      if (filter === "done") return t.done;
      return true;
    })
    .sort((a, b) =>
      dateOrder === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    );

  return (
    <div className="container">
      <h1>Todo App</h1>

      {overdueCount > 0 && (
        <p className="overdue-alert">
          ⚠️ 期限切れタスク {overdueCount} 件
        </p>
      )}

      <div className="input-area">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="タスク入力"
        />
        <button onClick={addTodo}>追加</button>
      </div>

      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          すべて
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          未完了
        </button>
        <button
          className={filter === "done" ? "active" : ""}
          onClick={() => setFilter("done")}
        >
          完了
        </button>
      </div>

      <div className="sort-toggle">
        <span>並び順</span>
        <div className="toggle">
          <button
            className={dateOrder === "asc" ? "active" : ""}
            onClick={() => setDateOrder("asc")}
          >
            古い順
          </button>
          <button
            className={dateOrder === "desc" ? "active" : ""}
            onClick={() => setDateOrder("desc")}
          >
            新しい順
          </button>
        </div>
      </div>

      <ul>
        {visibleTodos.map((t) => (
          <li
            key={t.id}
            className={`todo-item
              ${t.date === today ? "today" : ""}
              ${t.done ? "done" : ""}
              ${!t.done && t.date < today ? "overdue" : ""}
            `}
          >
            <span onClick={() => toggleTodo(t.id)}>
              {t.text}
            </span>
            <small>📅 {t.date}</small>
            <button onClick={() => deleteTodo(t.id)}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
