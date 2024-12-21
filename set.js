const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUFmYWw3MWxBV2hOd3NYYmVYaTBkbjR3RzJ4dHprL3I0VWswNUIxMVpXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNGtPQWduWlBja045di9xbFhUU2QrNHhQL1UzU0JIRDdhcVB0WGFCTzBScz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwR2c0eW4rR0pPR0tHSmhteFdxaDVkTTNwWU5QaDZoSS9hcWE1ckYwOFdJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDZXJGeTkvN29hRzhWNGNVdStJcEFZQlFEVnRtTFdPbVIxOTMvZ2d1bTA4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFPeFUwQ2txd1NVQ1EzSGg2dGxub2dBSGUzNW5xTXJIb1puR1VERUd1V0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZVUjlWSFVtWk5YTkVpbDlTaG0waFZVL3o5ZmQ3d2d5Tkc5STA3cUhyeEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR04rN3BxUTc5cG1BUVlkWHh2K3Jrc0Vxb2RNenNCS3NyRHVXN1RZOWNXUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicnA2QUM2UmJqRllWdDI4Y3FoWVo1V1h5TVl3WkZMSjRjVXNvb2hkZjJHZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNWVW1WdEdYWEhqVGZ3QzJzcVFzN1FadlVGV2tzczFtU2FYYmU0ekJlNXdPclZteXc1Z3hoZUdISUNVSDVJeVByTzV1NDBpcFRoQ2NqRDNmQXBOOGlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc2LCJhZHZTZWNyZXRLZXkiOiI2QWNnNGVlcjVkTkhVUjhPQmJwMmVaaEhNUzl6WVBIakd3RDZRK1B0SmxNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIxcnN1aTBCclNZbURTdkFsOWVjdGJ3IiwicGhvbmVJZCI6IjI4MmViMzZjLTYwYWMtNGYzNC04Zjk2LTc5Y2VjNjM4ZGRjYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUcDMrRGxHTiswNDdkV05TZUo3QWNXM2pEb3M9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWs3MmJ4UlNyUldKbVJUNHBVeFNFVUdsWEpBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRCVjFTQlc2IiwibWUiOnsiaWQiOiIyNTY3NTc1ODIxNzA6NTdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2Qi/CdkI7wnZCN8J2QhPCdkJFf8J2fjvCdn4/isb3htYnKs+G2puG2oOG2puG1ieG1iOG0rOG2nOG2nOG1kuG1mOKBv+G1lyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTEdOeHJRQ0VKRERtcnNHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQUFOejZKdE1KWC9SVlJSN2lvSzlaNndBWTczdWFOUHhIcE5xb0VGTFV3cz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiYTFCeldKa00zV3NZMnhGRCtTM2FPS0xoQ3JPTnpNbklaQWhQZ3UvSzAzOWZOc2NSZXQwQ1hDWXNPaGV4S1dRMGJTanZHcWZ0MkVkY2VyamYrbUF3Q0E9PSIsImRldmljZVNpZ25hdHVyZSI6IlduMWlEMUY0UkxXekM5SU4vNFU1eFA1eERPdlA2QVZhYVpud0srM3NwN3pOSjRhUVJ0YllLUFlBS1ZoMXJSNlBXcU5nb1F3dnQvWFR0d2dESjl3bGhRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU2NzU3NTgyMTcwOjU3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFBRGMraWJUQ1YvMFZVVWU0cUN2V2VzQUdPOTdtalQ4UjZUYXFCQlMxTUwifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzQ3NzkyOTR9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Benjamin",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 256757582170",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LONER_AI',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
