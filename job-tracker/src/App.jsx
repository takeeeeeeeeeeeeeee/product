import { useEffect, useState } from "react";
import "./App.css";

const initialJobs = [
  {
    id: 1,
    company: "○○株式会社",
    position: "フロントエンドエンジニア",
    status: "面接予定",
    date: "2026-05-15",
    url: "https://example.com",
    memo: "React / TypeScript の質問対策",
  },
  {
    id: 2,
    company: "△△株式会社",
    position: "Webエンジニア",
    status: "書類選考",
    date: "2026-05-18",
    url: "https://example.com",
    memo: "ポートフォリオ提出済み",
  },
  {
    id: 3,
    company: "□□株式会社",
    position: "Reactエンジニア",
    status: "結果待ち",
    date: "2026-05-10",
    url: "https://example.com",
    memo: "最終面接終了",
  },
];

const statusList = [
  "すべて",
  "応募中",
  "書類選考",
  "面接予定",
  "結果待ち",
  "内定",
  "見送り",
];

function App() {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : initialJobs;
  });

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("応募中");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");
  const [memo, setMemo] = useState("");

  const [filter, setFilter] = useState("すべて");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("dateAsc");
  const [editingId, setEditingId] = useState(null);
  const [viewMode, setViewMode] = useState("list");

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const resetForm = () => {
    setCompany("");
    setPosition("");
    setStatus("応募中");
    setDate("");
    setUrl("");
    setMemo("");
    setEditingId(null);
  };

  const saveJob = () => {
    if (!company || !position) return;

    if (editingId) {
      setJobs(
        jobs.map((job) =>
          job.id === editingId
            ? { ...job, company, position, status, date, url, memo }
            : job
        )
      );
    } else {
      setJobs([
        {
          id: Date.now(),
          company,
          position,
          status,
          date,
          url,
          memo,
        },
        ...jobs,
      ]);
    }

    resetForm();
  };

  const editJob = (job) => {
    setCompany(job.company);
    setPosition(job.position);
    setStatus(job.status);
    setDate(job.date);
    setUrl(job.url || "");
    setMemo(job.memo);
    setEditingId(job.id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const isUpcomingInterview = (job) => {
    if (job.status !== "面接予定" || !job.date) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const interviewDate = new Date(job.date);
    interviewDate.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil(
      (interviewDate - today) / (1000 * 60 * 60 * 24)
    );

    return diffDays >= 0 && diffDays <= 3;
  };

  const filteredJobs = jobs
    .filter((job) => {
      const keyword = search.toLowerCase();

      const matchFilter = filter === "すべて" || job.status === filter;

      const matchSearch =
        job.company.toLowerCase().includes(keyword) ||
        job.position.toLowerCase().includes(keyword) ||
        job.memo.toLowerCase().includes(keyword);

      return matchFilter && matchSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "dateAsc") {
        return (
          new Date(a.date || "9999-12-31") -
          new Date(b.date || "9999-12-31")
        );
      }

      if (sortOrder === "dateDesc") {
        return (
          new Date(b.date || "0000-01-01") -
          new Date(a.date || "0000-01-01")
        );
      }

      return b.id - a.id;
    });

  const getStatusCount = (targetStatus) => {
    if (targetStatus === "すべて") return jobs.length;
    return jobs.filter((job) => job.status === targetStatus).length;
  };

  return (
    <div className="container">
      <h1>就職活動管理アプリ</h1>

      <div className="form">
        <input
          type="text"
          placeholder="企業名"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          placeholder="職種"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>応募中</option>
          <option>書類選考</option>
          <option>面接予定</option>
          <option>結果待ち</option>
          <option>内定</option>
          <option>見送り</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="url"
          placeholder="求人URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <textarea
          placeholder="メモ"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />

        <button onClick={saveJob}>
          {editingId ? "更新する" : "追加する"}
        </button>

        {editingId && (
          <button className="cancel-btn" onClick={resetForm}>
            編集をキャンセル
          </button>
        )}
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="企業名・職種・メモで検索"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="dateAsc">面接日が近い順</option>
          <option value="dateDesc">面接日が遠い順</option>
          <option value="newest">追加が新しい順</option>
        </select>
      </div>

      <div className="status-summary">
        {statusList.map((item) => (
          <div key={item} className="summary-card">
            <span>{item}</span>
            <strong>{getStatusCount(item)}件</strong>
          </div>
        ))}
      </div>

      <div className="filters">
        {statusList.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={filter === item ? "active" : ""}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="list-header">
        <p className="count">表示中の求人: {filteredJobs.length}件</p>

        <div className="view-toggle">
          <button
            className={viewMode === "list" ? "active-view" : ""}
            onClick={() => setViewMode("list")}
          >
            📄 リスト表示
          </button>

          <button
            className={viewMode === "grid" ? "active-view" : ""}
            onClick={() => setViewMode("grid")}
          >
            🪟 グリッド表示
          </button>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <p className="empty">該当する求人がありません</p>
      ) : (
        <div className={`job-list ${viewMode}`}>
          {filteredJobs.map((job) => (
            <div className={`job-card ${job.status}`} key={job.id}>
              <div className="top">
                <div>
                  <h2>{job.company}</h2>
                  <p className="position">{job.position}</p>
                </div>

                <span className={`status ${job.status}`}>{job.status}</span>
              </div>

              {job.date && <p className="date">🗓️ {job.date}</p>}

              {isUpcomingInterview(job) && (
                <p className="warning">⚠️ 3日以内に面接予定</p>
              )}

              {job.memo && <p className="memo">{job.memo}</p>}

              {job.url && (
                <a
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                  className="url-link"
                >
                  ↗ 求人を見る
                </a>
              )}

              <div className="card-actions">
                <button className="edit-btn" onClick={() => editJob(job)}>
                  ✎ 編集
                </button>

                <button className="delete-btn" onClick={() => deleteJob(job.id)}>
                  🗑 削除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;