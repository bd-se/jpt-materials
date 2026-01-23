# Lintルール

## 制定したいルール（気づいたこと）

- [ ] ファイル名のタイトル
- [ ] ボタン、メニューを示すときの強調 「」 なのか [] なのか（角かっこは、リンクと誤認されるので使いたくない）
    - [ ] 「メニュー１」 - 「サブメニュー」
    - [ ] 「ボタン」
    - [ ] メニューの階層は、ハイフン か ＞ か --> か
- [ ] 脚注（ドキュメントリンクの管理が楽になるが、近くにリンクがある方が便利ともいえる）
- [ ] 手順の箇条書きに、「～してください」 「～します」は入れずに、「クリック」「選択」 といった文末にする。

GitHub のタイトル入れるやつ。Obsidian でも害にはならない。

```json title=polaris_config.json
{
    "name": "aaa"
}
```

ファイル名は、強調せずに１行あけて上に書く

coverity.yaml ファイル例（独自スクリプトの場合）

```yaml
capture:
    build:
        clean-command: clean.sh
        build-command: build-it.sh
```

## ルール

VSCode のプラグイン Markdownlint のルールとGitHub のルールを優先的に採用する。
GitHub 固有のルールは全て採用せず、Obsidian など他ツールでも共通して使われるルールを採用する。

### 設定方法

VSCode 拡張機能 markdownlint をインストールしてください。

自動的に .markdownlint-cli2.yaml や関連するルールを読み込み、チェックを行います。

## Obsidian / GitHubで共通しており、採用すべき構文

GitHub: [基本的な書き込みと書式設定の構文 - GitHub ドキュメント](https://docs.github.com/ja/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
Obsidian: [ノートをフォーマットする - Obsidian 日本語ヘルプ - Obsidian Publish](https://publish.obsidian.md/help-ja/%E3%82%AC%E3%82%A4%E3%83%89/%E3%83%8E%E3%83%BC%E3%83%88%E3%82%92%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%83%E3%83%88%E3%81%99%E3%82%8B)

- 空行を入れて段落を区切る
- Heading / 見出し
  - シャープ1個は先頭限定（タイトル）
  - シャープ2個から4個まで程度を使う
  - 水平線を使ったフォーマットは使用しない
- 水平線
  - ハイフン３個 （なんでもいいが、長すぎるのはやめたい）
- Styling / 強調
  - Bold  アスタリスク または アンダーバー 2個で囲む（単語または短い文を強調）
  - Italic アスタリスク または アンダーバー 2個で囲む（使用箇所を決めたい）
- リスト
  - ハイフン と スペース
  - インデントはスペース2個
  - 番号付きリストと混合していい
- 番号付きリスト
  - 半角数字とピリオドとスペース
  - 順序なしリストと混合してよい
- Quote
  - ＞ 引用
- Alerts / Callout / コールアウト
  - 引用の拡張。純粋なMarkdown構文ではないが、見た目がき「れいなのでGitHub と Obsidian で共通で使えるキーワードを採用する
  - ```> [!NOTE]```
  - 使用可能なキーワード
    - NOTE（青）
    - IMPORTANT（青緑・緑） （Obsidian では Tip と Importantが同じ）
    - WARNING （GitHub では黄色。Obsidian では Caution も同じ）
    - 参考
      - [GitHub](https://docs.github.com/ja/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)
      - [Obsidian](https://help.obsidian.md/callouts)
- Quoting Code / コードブロック
  - バッククオーテーション3つで囲む。言語やファイルやもコマンドを入れる。
  - コマンドの場合は、shell とする（bat だとしても使わない）
  - フォーマットの無いプレーンテキストの場合は、何も入れない(逆に yaml, json などは入れる)
  - 参考 サポート言語とキーワード
    - [GitHub](https://rouge-ruby.github.io/docs/file.Languages.html)
    - [Obsidian](https://prismjs.com/#supported-languages)
- インラインコード
  - 文中で、コードを使う場合に使用する。ただの強調には使わないこと。
- 外部リンク
  - ```[タイトル](フルURL)```
- 内部リンク
  - ```[ページ名](dir/file.md)```
  - 画像
    - ```![画像名(Alt)](image.png)```
    - ファイル名にスペースを入れない
    - Obsidianのデフォルトで、画像をペーストすると ファイル名にスペースが入ってしまう。**Paste image rename** などのプラグインを入れておく。
- Section Link / セクションリンク
  - GitHub フォーマット ```[Section Name](#section-name)```
  - Obsidian フォーマット ```[セクション表示名](#セクション名)  または [[#セクション名]]```
  - GitHub はスペースがハイフンに変換されてリンクができる。スペースを使わないでできるだけ日本語でセクション名を定義する。
- Mermaid による図
  - 使ってもよいのでは？（要検討）
- テーブル
  - できれば使わない
- ToC
  - 自動表示されないが、メンテナンスが大変なので、自分で書かない方がいいのでは？（要検討）
- タグ
  - Obsidian のタグは、行の先頭につけると見出しと誤認されるので、コメント的に文末につける。
- 脚注
  - GitHubもObsidianも使えるが、プレビューでうまくジャンプしないので、使わない。同じ場所にURLがあった方が良い。同じドキュメントを何度も別の場所から参照するのなら、構造がおかしい。
