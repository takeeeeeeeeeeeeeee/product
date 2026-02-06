// src/dummyMemos.js
export const dummyMemos = [
  {
    id: 1,
    title: "サンプルメモ1",
    body: `# タイトル1
これは **太字** と *斜体* のサンプルです。
- リスト1
- リスト2
[リンク](https://example.com)
`,
    tags: ["仕事", "React"],
    createdAt: "2026-02-05T10:00:00",
    updatedAt: "2026-02-05T12:00:00",
  },
  {
    id: 2,
    title: "サンプルメモ2",
    body: `## タイトル2
- チェックリスト
- [ ] 未完了
- [x] 完了
`,
    tags: ["個人", "メモ"],
    createdAt: "2026-02-04T09:30:00",
    updatedAt: "2026-02-05T11:00:00",
  },
  {
    id: 3,
    title: "サンプルメモ3",
    body: `### タイトル3
\`\`\`js
console.log("コードブロックもOK");
\`\`\`
`,
    tags: ["コード", "テスト"],
    createdAt: "2026-02-03T15:00:00",
    updatedAt: "2026-02-04T08:00:00",
  },
];
