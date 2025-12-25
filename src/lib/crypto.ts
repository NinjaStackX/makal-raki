const KEY_STR =
  process.env.ENCRYPTION_KEY || "12345678901234567890123456789012"; // يجب أن يكون 32 حرف
const IV = new Uint8Array(16); // ناقل ثابت للسرعة

async function getRuntimeKey() {
  return await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(KEY_STR),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

export const encrypt = async (text: string) => {
  const key = await getRuntimeKey();
  const encoded = new TextEncoder().encode(text);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: IV },
    key,
    encoded
  );
  return Buffer.from(encrypted).toString("hex");
};

export const decrypt = async (hash: string) => {
  const key = await getRuntimeKey();
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: IV },
    key,
    Buffer.from(hash, "hex")
  );
  return new TextDecoder().decode(decrypted);
};
