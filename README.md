#環境立ち上げ時作業

```
フロントエンドのホスト/ip　・・・　n.local/127.100.100.50
バックエンドのホスト/ip　・・・　b.n.local/127.100.100.100
バックエンドのURL　・・・　https://b.n.local
```

### hostsファイルにホスト名を設定(例)
```bash
127.100.100.50	n.local
127.100.100.100	b.n.local
```

### templateブランチをチェックアウト
```bash
git checkout -b template origin/template 
```

### .env、next_front/.env.localをコピー
```bash
cp .env.sample .env
cp next_front/.env.local.exapmle next_front/.env.local
```

### .envファイルにホストを設定(例)
```dotenv
WEB_IP=127.100.100.50
HTTP_CONF_SERVER_NAME=n.local
```

### next_front/.env.localにバックエンドホストを設定(例)
```dotenv
NEXT_PUBLIC_BACKEND_HOST=https://b.n.local
```

### コマンドでSSL証明書作成
```bash
bash docker_config/web/create_ssl_files.sh
```
### docker環境立ち上げ
```bash
bash compose_up.sh
```

### コンテナに接続
```bash
bash loginnode.sh

#インストール
cd next_front
npm install

#実行
npm run dev

###初回作成時
#タイプスクリプトのテンプレートでnextアップを立ち上げ
npx create-next-app --example with-typescript next_front
#muiのテンプレートを取りこみ
https://mui.com/store/items/devias-kit/
```
