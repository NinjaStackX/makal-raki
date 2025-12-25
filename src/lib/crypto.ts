const KEY_STR =
  process.env.ENCRYPTION_KEY || "12345678901234567890123456789012";
const IV = new Uint8Array(16);

// بديل Buffer.from(hash, "hex")
const hexToUint8Array = (hex: string) =>
  new Uint8Array(hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));

// بديل .toString("hex")
const uint8ArrayToHex = (arrayBuffer: ArrayBuffer) =>
  Array.from(new Uint8Array(arrayBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

const getRuntimeKey = () =>
  crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(KEY_STR),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );

export const encrypt = async (text: string) => {
  const key = await getRuntimeKey();
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: IV },
    key,
    new TextEncoder().encode(text)
  );
  return uint8ArrayToHex(encrypted);
};

export const decrypt = async (hash: string) => {
  const key = await getRuntimeKey();
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: IV },
    key,
    hexToUint8Array(hash)
  );
  return new TextDecoder().decode(decrypted);
};
