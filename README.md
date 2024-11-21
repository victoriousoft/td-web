# Tower Defense web 

Ročníková práce 3.E š. r. 2024/2025

Repozitář obsahuje webovou stránku, která slouží jako přístupový bod ke hře.

## Předpoklady

- [Node.js](https://nodejs.org/en/)
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2) konfigurace
- [MySQL](https://www.mysql.com/) databáze.


## Konfigurace
Projekt obsahuje `.env.example`, který slouží jako šablona pro konfiguraci. Pro správnou funkčnost je nutné vytvořit soubor `.env` a vyplnit všechny proměnné.

## Instalace

Nainstálování NPM balíčků:
```bash
$ npm i
```

Aplikování databázového schématu:
```bash
$ npx prisma db push
```

## Spuštění

Spuštění development serveru:
```bash
$ npm run dev
```

## Build

Vytvoření a spuštění produkčního buildu:
```bash
$ npm run build && node build/
```