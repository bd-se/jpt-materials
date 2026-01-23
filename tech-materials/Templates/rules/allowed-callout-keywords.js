
// rules/allowed-callout-keywords.js
// カスタムルール: コールアウトのキーワードをホワイトリストで制御
// 例: > [!NOTE] の NOTE, TIP, IMPORTANT, WARNING, CAUTION のみ許可

/** @type import("markdownlint").Rule */
module.exports = {
  names: ["allowed-callout-keywords", "callout-keywords"],
  description:
    "Only allow specified keywords in GitHub-style and Obsidian callouts: [!NOTE|IMPORTANT|WARNING|CAUTION]",
  information: new URL(
    "https://docs.github.com/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts"
  ), // 参考リンク
  tags: ["alert", "admonition", "blockquote", "compatibility"],
  // micromark/markdown-it どちらでも動かせますが、ここでは none で生テキストを走査
  parser: "none",

  // config: { allow: ["NOTE","TIP",...], caseInsensitive: true } を受け付ける
  function: (params, onError) => {
    const cfg = params.config || {};
    const allowedFromConfig = Array.isArray(cfg.allow) ? cfg.allow : null;
    const caseInsensitive =
      typeof cfg.caseInsensitive === "boolean" ? cfg.caseInsensitive : true;

    // 既定の許可リスト (GitHub Alerts and Obsidian)
    const defaultAllowed = ["NOTE", "IMPORTANT", "WARNING"];
    const allowed = (allowedFromConfig && allowedFromConfig.length > 0)
      ? allowedFromConfig
      : defaultAllowed;

    const toKey = (s) => (caseInsensitive ? String(s).toUpperCase() : String(s));

    // 行ごとに走査
    const lines = params.lines || [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // パターン: 先頭に blockquote (>) があり、[!KEYWORD] を含む独立行
      // 例: "> [!NOTE]" （行頭/空白の後に > 、さらに [! ... ] ）
      const match =
        /^\s*>\s*\[\!\s*([A-Za-z]+)\s*\]\s*$/.exec(line) ||
        /^\s*>\s*\[\!\s*([A-Za-z]+)\s*\]\s*>?\s*$/.exec(line); // 一部レンダラーの差異を考慮

      if (match) {
        const keyword = match[1];
        const key = toKey(keyword);

        // 許可チェック
        const allowedSet = new Set(allowed.map(toKey));
        if (!allowedSet.has(key)) {
          // 違反: 許可されていないキーワード
          onError({
            lineNumber: i + 1,
            detail: `Disallowed callout keyword: "${keyword}". Allowed: ${Array.from(allowedSet).join(", ")}`,
            context: line.trim(),
            range: [
              line.indexOf("[!"),
              // "[!KEYWORD]" の長さをだいたい指定（強調表示用）
              `[!${keyword}]`.length
            ]
          });
        }

        // 次行に本文があるかの簡易チェック（空行や終端は違反にしない柔らかい運用）
        const next = lines[i + 1] || "";
        if (!/^\s*>\s+.+/.test(next)) {
          // 本文が blockquote の次行にない場合、警告レベルで通知したいなら別ルールに分ける／ここでは報告しない
          // onError({ lineNumber: i + 1, detail: "Callout must be followed by content ('> ...') on next line." });
        }
      }
    }
  }
};
