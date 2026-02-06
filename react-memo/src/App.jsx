// src/App.jsx
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./index.css";
import { dummyMemos } from "./dummyMemos";

function App() {
  const [memos, setMemos] = useState(() => {
    const saved = localStorage.getItem("memos");
    return saved ? JSON.parse(saved) : dummyMemos;
  });
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sortKey, setSortKey] = useState("updated"); // updated, created, title

  const deleteMemo = (id) => {
    setMemos(memos.filter((m) => m.id !== id));
    if (id === selectedId) setSelectedId(null);
  };

  const createMemo = () => {
    const now = new Date().toISOString();
    const newMemo = {
      id: Date.now(),
      title: "新しいメモ",
      body: `# 新規メモ
- [ ] タスク1
- [ ] タスク2`,
      tags: ["新規"],
      createdAt: now,
      updatedAt: now,
    };
    setMemos([newMemo, ...memos]);
    setSelectedId(newMemo.id);
  };

  const updateMemo = (id, field, value) => {
    setMemos(
      memos.map((m) =>
        m.id === id
          ? { ...m, [field]: value, updatedAt: new Date().toISOString() }
          : m
      )
    );
  };

  const addTag = (id, tag) => {
    setMemos(
      memos.map((m) =>
        m.id === id && tag && !m.tags.includes(tag)
          ? { ...m, tags: [...m.tags, tag], updatedAt: new Date().toISOString() }
          : m
      )
    );
  };

  const removeTag = (id, tag) => {
    setMemos(
      memos.map((m) =>
        m.id === id
          ? { ...m, tags: m.tags.filter((t) => t !== tag), updatedAt: new Date().toISOString() }
          : m
      )
    );
  };

  const selectedMemo = memos.find((m) => m.id === selectedId);
  const allTags = Array.from(new Set(memos.flatMap((m) => m.tags)));

  const visibleMemos = memos
    .filter(
      (m) =>
        (m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.body.toLowerCase().includes(search.toLowerCase()))
    )
    .filter((m) => (tagFilter ? m.tags.includes(tagFilter) : true))
    .sort((a, b) => {
      if (sortKey === "updated") return new Date(b.updatedAt) - new Date(a.updatedAt);
      if (sortKey === "created") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortKey === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={createMemo}>＋ 新規メモ</button>

        <input
          className="search"
          placeholder="検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="tag-filter">
          <strong>タグ:</strong>
          <button
            onClick={() => setTagFilter("")}
            className={tagFilter === "" ? "active" : ""}
          >
            すべて
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setTagFilter(tag)}
              className={tagFilter === tag ? "active" : ""}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="sort-filter">
          <strong>並べ替え:</strong>
          <button onClick={() => setSortKey("updated")}>更新日</button>
          <button onClick={() => setSortKey("created")}>作成日</button>
          <button onClick={() => setSortKey("title")}>タイトル</button>
        </div>

        <ul>
          {visibleMemos.map((m) => (
            <li
              key={m.id}
              className={m.id === selectedId ? "active" : ""}
              onClick={() => setSelectedId(m.id)}
            >
              <div className="memo-header">
                <span className="title">{m.title || "（無題）"}</span>
                <button
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMemo(m.id);
                  }}
                >
                  🗑
                </button>
              </div>
              <small className="date">
                更新: {new Date(m.updatedAt).toLocaleDateString()}
              </small>
              <div className="tag-list">
                {m.tags.map((t) => (
                  <span
                    key={t}
                    className="tag"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(m.id, t);
                    }}
                  >
                    {t} ×
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "ライトモード" : "ダークモード"}
        </button>
      </div>

      {/* Editor */}
      <div className="editor">
        {selectedMemo ? (
          <>
            <input
              value={selectedMemo.title}
              onChange={(e) =>
                updateMemo(selectedMemo.id, "title", e.target.value)
              }
              placeholder="タイトル"
            />
            <textarea
              value={selectedMemo.body}
              onChange={(e) =>
                updateMemo(selectedMemo.id, "body", e.target.value)
              }
              placeholder="本文を入力..."
            />
            <div className="tag-editor">
              <input
                placeholder="タグ追加"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTag(selectedMemo.id, e.target.value.trim());
                    e.target.value = "";
                  }
                }}
              />
            </div>
            <div className="markdown-preview">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {selectedMemo.body}
              </ReactMarkdown>
            </div>
          </>
        ) : (
          <p className="empty">メモを選択してください</p>
        )}
      </div>
    </div>
  );
}

export default App;
