# TLS-Checker

`openssl` を使用してTLS証明書の有効期限の残り日数を確認する、シンプルなDenoスクリプトです。

## 要件

- [Deno](https://deno.land/)
- OpenSSL（システムのPATHが通っている必要があります）

## 使用方法

引数に1つ以上のホストを渡して確認します。スクリプトは、各証明書の有効期限までの残り日数を出力します。

```sh
deno run --allow-run https://code4fukui.github.io/tls-checker/tls-checker.js example.com github.com
```

### 出力例

```
example.com: 32 days
github.com: 58 days
```

### 詳細な有効期限の取得

残り日数に加えて正確な有効期限を確認するには、`getCertificateExpiry.js` モジュールを直接実行します。

```sh
deno run --allow-run https://code4fukui.github.io/tls-checker/getCertificateExpiry.js example.com
```

これにより、より詳細な出力が得られます。

```
example.com: 32 days - (Sun, 15 Sep 2024 23:59:59 GMT)
```

## ライセンス

MIT License.
