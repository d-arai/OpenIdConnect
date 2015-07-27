# README

Express4+Passportを利用してOpen ID ConnectでGoogle認証を行う機能を
勉強するために作成したパッケージです。

尚、PassportのOpenidConnectStrategyで使用する以下項目については
自分の登録した情報を入力して下さい。

- クライアント ID
- クライアントシークレット
- リダイレクトURI

以下、サイトを参考にさせて頂きました。
- Node.jsでOpenID Connect認証
  (http://christina04.hatenablog.com/entry/2014/12/14/194921)
- node.jsのpassport-openidconnectを試す
  (http://kirimanjirou.com/blog/?p=309)

## 動作環境

- express (4.x.x)
- express-session
- ejs
- passport
- passport-openidconnect

## 起動方法

1) "npm install"を実行する。

2) appを起動してwebサーバーを立ち上げます。

3) Chromeブラウザから"http://localhost:3000"にアクセスします。

4) ログインページで"ログイン"をクリックするとGoogleアカウントの認証を
   求められます。
   認証OKならGoogleの名前とイメージが表示されログイン状態となります。

