const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUdsVzhKaWt5dTIzNTBKRzVKV0poUWJrcitLaFVWdWpnYmgxMk5RT0RuVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicXpNNWEwS3FqVW9FT1h3QlRnRlhIMnUxSzQwMml4Ty9HaTJWcitFU0tSZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SlN3d1l3SHc1enpxK1lEb2hCYmZrV1IxbGphbktLQlUrVkJnR0VKRkY0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhdU10T0RVdTZ5RG5NTkdWeWRZekoxQkpEUGlHNXJpYmpmTkFDdG9qbWdZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFGaURyZEFYa2pTTEcyakM4cGZROE93bnJOeGtxNlY1R3JhWURIT2g2blE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNudnR0NkNPeVNJd1ovTmFaQkgzbHozYUVPaGE4OThKWDhiNXVsWldTMTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUltSDBrZ2dBRGYzVURmZ0FHd2t2RWhqcTVERDNwMXdYekU5a1lqdDhVOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMVFEd253cXJ1Y0ZBL2pDV2FpeUp3S1JGKzBHZEdNbS96eTAybU9pRm5FOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5QY3JYS1RITVBIQ3BYQXZBbDBHTm1BZzBMeERCdENKcWxaWjdJK1BvaC90eEN4VWExdk9sOGE5dlpPa3hhR041SDYvQW5VSXdrYjVqZXBKVXk4dWlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODYsImFkdlNlY3JldEtleSI6IlBhTWpKUnhEMmQzckNyVGd5THBxUENzNGluVjFSUnRaOHdqK1pRRzNsRjQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik94MlZ1VG95U3ZLWVlqREREOXlVOVEiLCJwaG9uZUlkIjoiM2QyYzUxZjAtZjcxMi00OTY3LTgwODQtY2RlNjI5MmE0MzUxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdzbS85N1R4ZnRTZHhvMDArV3VBRm1BazJ5QT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJacE9MQ21KNWlYekNMTytuOHJtWGMzOEFjSUU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWENIUlFUOFIiLCJtZSI6eyJpZCI6IjI1Njc1NzU4MjE3MDo1NkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZCL8J2QjvCdkI3wnZCE8J2QkV/wnZ+O8J2fj+KxveG1icqz4bam4bag4bam4bWJ4bWI4bSs4bac4bac4bWS4bWY4oG/4bWXIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMQ054clFDRUt5b21yc0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJBQU56Nkp0TUpYL1JWUlI3aW9LOVo2d0FZNzN1YU5QeEhwTnFvRUZMVXdzPSIsImFjY291bnRTaWduYXR1cmUiOiJVL1NWYkN4SVFhRVRwQ0l3bXpUL250MzNqQmtuL1NFT1FPaVZOT3JhWGk0bXBaNURjdmxMbkxjWFJVbnc0NVl6ZDM3TmVTbEdKU1l0VStydld3c3FEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiY3dPM2p0U3JYZUNaVkNPVmFoQ0t4d0JVZXV6M0NjK3A1QUI1YTh1b2xjSzdYTlhoZnk0T3JjZlJ4Z0hqTzZkR0lUcHZmZ2hmNGJNSG8rblpTTkxlaHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTY3NTc1ODIxNzA6NTZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUUFEYytpYlRDVi8wVlVVZTRxQ3ZXZXNBR085N21qVDhSNlRhcUJCUzFNTCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNDc3NTg2Nn0=',
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
