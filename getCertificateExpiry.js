// openssl s_client -servername example.com -connect example.com.cc:443 </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer -dates

/**
 * 指定したホストのTLS証明書の有効期限と残り日数を取得
 * @param host ホスト名 (例: "example.com")
 * @param port ポート番号 (デフォルト443)
 */
export const getCertificateExpiry = async (host, port = 443) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  // openssl s_client で証明書取得
  const cmd1 = new Deno.Command("openssl", {
    args: ["s_client", "-servername", host, "-connect", `${host}:${port}`],
    stdout: "piped",
    stderr: "piped",
  });

  const { stdout } = await cmd1.output();
  const s1text = decoder.decode(stdout);

  // 証明書部分抽出
  const certMatch = s1text.match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/);
  if (!certMatch) {
    throw new Error("証明書を取得できませんでした。");
  }

  // openssl x509 で有効期限取得
  const cmd2 = new Deno.Command("openssl", {
    args: ["x509", "-noout", "-enddate"],
    stdin: "piped",
    stdout: "piped",
  });
  const p2 = cmd2.spawn();
  const w = p2.stdin.getWriter();
  await w.write(encoder.encode(certMatch[0]));
  await w.close();

  const { stdout: s2 } = await p2.output();
  const enddateStr = decoder.decode(s2).trim().replace("notAfter=", "");

  // 有効期限Dateに変換
  const expiryDate = new Date(enddateStr);
  const now = new Date();
  const remainingDays = Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return { expiryDate, remainingDays };
}

// テスト実行
if (import.meta.main) {
  const host = Deno.args[0];
  if (!host) {
    console.log("getCertificateExpiry.js [host]");
    Deno.exit(1);
  }
  const { expiryDate, remainingDays } = await getCertificateExpiry(host);
  console.log(`${host}: ${remainingDays} days - (${expiryDate.toUTCString()})`);
}
