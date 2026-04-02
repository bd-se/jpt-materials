# Black Duck PoVガイド(Docker Swarmによるインストール)

Black Duckサーバは Docker Container により提供されます。ここでは、インストール手順を説明します。

詳細:

- [Docker Swarm を使用した Black Duck 導入の概要](https://documentation.blackduck.com/ja-JP/bundle/bd-hub/page/Install_Swarm/Overview.html)
- GitHubリポジトリのReadme: [Running Black Duck in Docker (Using Docker Swarm)](https://github.com/blackducksoftware/hub/blob/master/docker-swarm/README.md)

## Black Duckサーバー要求仕様

- ハードウェア要求仕様
    - 最小構成 (120sph)
        - 11CPU, 54GB RAM, 250GB 以上の空ストレージ
        - 12CPU, 58GB RAM, 350GB 以上の空ストレージ（BDBAを利用する場合）
- Docker要求仕様
    - Docker バージョン： 23.x, 25.0.2(CE or EE)
    - OS : 上記 Docker バージョンをサポートするLinux
- ネットワーク要求仕様
    - Black Duckサーバへのアクセスポート
        - Port 443 – Black Duck サーバへのアクセス（ブラウザ等）
        - Port 55436 – レポート用DBアクセスポート
        - Black Duck サーバからのインターネットへのアクセス（https）

> [!NOTE]
> 詳細は[スケーリングガイドライン](https://documentation.blackduck.com/ja-JP/bundle/blackduck-compatibility/page/topics/Black-Duck-Hardware-Scaling-Guidelines.html)を参照 （120sphが最小構成）

## ダウンロードとインストール

### ダウンロード

Docker Swarm の 設定ファイルを、Black Duck Software の GitHubからダウンロードします。

1. [https://github.com/blackducksoftware/hub](https://github.com/blackducksoftware/hub) より 「hub-2025.10.0.tar.gz」 または 「v2025.10.0.tar.gz」といった最新バージョンのファイルをダウンロード
    - （参考）wget などのコマンドで、バージョン指定の上、直接ダウンロードも可能です。wget による取得の場合は、ファイル名に hub が含まれなくなりますが、内容は同じです。

```shell
wget https://github.com/blackducksoftware/hub/archive/v2025.x.x.tar.gz
```

### 設定

ダウンロードした設定ファイルの tar.gz ファイルを展開し、設定の編集を行います。

1. tar.gz ファイルを、Black Duck サーバーをインストールするマシンの任意の場所に展開
    - コマンド例1：

    ```shell
    gunzip v2025.x.x.tar.gz
    ```

    - コマンド例2:

    ```shell
    tar xvf v2025.x.x.tar
    ```

2. 展開してできた docker-swarm ディレクトリ下の設定ファイルを編集
    - env ファイルに変数を指定
    - 個別の設定をしたい場合は、 docker-compose.local.overrides.yaml を編集

編集項目や詳細手順は、[Installing Black Duck using Docker Swarm Administrative Tasks](https://documentation.blackduck.com/ja-JP/bundle/bd-hub/page/Install_Swarm/environmentFilesAndVariables.html) を参照ください。

- 設定ファイルの説明：[配布(Distribution)](https://documentation.blackduck.com/ja-JP/bundle/bd-hub/page/Install_Swarm/Distribution.html)

### インストール

ダウンロード・編集した docker swarm 設定ファイルを用いて、docker コマンドでコンテナの起動を行います。

最小構成のインストール例:

```shell
docker swarm init
docker stack deploy -c docker-compose.yml -c sizes-gen05/120sph.yaml -c docker-compose.local-overrides.yml hub
```

```-c sizes-gen05/120sph.yaml``` を指定することにより、最小構成（120sph）の設定がなされます。

BDBAコンテナを使用する例：

```shell
docker swarm init
docker stack deploy -c docker-compose.yml -c sizes-gen05/120sph.yaml -c docker-compose.bdba.yml -c docker-compose.local-overrides.yml hub
```

```-c docker-compose.bdba.yml``` を指定することにより、BDBA コンテナが追加で起動します。

スニペット機能を使用し、ソースコードをBlack Duck サーバにアップロードする場合

blackduck-config.envを編集した上で、起動

```text
ENABLE_SOURCE_UPLOADS=true
```

- 詳細: [インストール： Black Duck](https://documentation.blackduck.com/ja-JP/bundle/bd-hub/page/Install_Swarm/Install.html)

### 初回ログイン

コンテナが起動したら、https://<ホスト名>:443 にブラウザでアクセスし、起動確認と初回ログインを実施します。

- ユーザー名: sysadmin
- パスワード: blackduck

初回ログイン時に、ライセンスキーの入力を求められます。トライアル用ライセンスキーはSEから連絡します。

### Black Duck サーバーの停止

```shell
docker stack rm hub
```

### ログ取得

[ログファイルとヒートマップデータのダウンロード](https://documentation.blackduck.com/ja-JP/bundle/bd-hub/page/Administration/LogFiles_1.html) を参照ください。
