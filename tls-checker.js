import { getCertificateExpiry } from "./getCertificateExpiry.js";

if (!Deno.args.length) {
  console.log("tlschecker [host] ...");
  Deno.exit(1);
}
for (const host of Deno.args) {
  const { expiryDate, remainingDays } = await getCertificateExpiry(host);
  console.log(`${host}: ${remainingDays} days`); // (${expiryDate.toUTCString()})`);
}
