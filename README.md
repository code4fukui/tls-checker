# TLS-Checker

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A simple Deno script to check the remaining validity days of TLS certificates using `openssl`.

## Requirements

- [Deno](https://deno.land/)
- OpenSSL (must be available in your system's PATH)

## Usage

Check one or more hosts by passing them as arguments. The script will output the number of days remaining until each certificate expires.

```sh
deno run --allow-run https://code4fukui.github.io/tls-checker/tls-checker.js example.com github.com
```

### Example Output

```
example.com: 32 days
github.com: 58 days
```

### Getting the Full Expiry Date

To see the exact expiry date in addition to the remaining days, you can run the `getCertificateExpiry.js` module directly:

```sh
deno run --allow-run https://code4fukui.github.io/tls-checker/getCertificateExpiry.js example.com
```

This will produce a more detailed output:

```
example.com: 32 days - (Sun, 15 Sep 2024 23:59:59 GMT)
```

## License

MIT License.