# ChatGPT 2FA Kódy - Dokumentace

Tato dokumentace popisuje systém pro zobrazování 2FA kódů z ChatGPT emailů pro administrátory kurzů AI Dovednosti.

## Přehled systému

Systém se skládá z následujících částí:

1. **Make.com Automatizace** - Sleduje emaily v ucty@aiinstitute.cz, extrahuje 2FA kódy a ukládá je do Airtable
2. **Airtable Databáze** - Ukládá 2FA kódy a související informace
3. **Next.js Aplikace** - Zobrazuje 2FA kódy administrátorům na stránce `/admin/codes`

## Nastavení

### 1. Airtable

V Airtable je vytvořena databáze s následující strukturou:

- **Base ID**: appYxRvYKY9KxhIcG
- **Tabulka**: Codes
- **Sloupce**:
  - `InstituteEmail` (Text) - Email institutu (např. institute1@advomate.cz)
  - `InstituteNumber` (Číslo) - Číslo extrahované z emailu (např. 1 z institute1@advomate.cz)
  - `Code` (Text) - 2FA verifikační kód
  - `ReceivedAt` (Datum a čas) - Kdy byl email přijat
  - `EmailSubject` (Text) - Předmět emailu
  - `Used` (Zaškrtávací políčko) - Zda byl kód použit

### 2. Make.com Automatizace

Make.com automatizace je nastavena následovně:

1. **Trigger**: Sleduje nové emaily v ucty@aiinstitute.cz od no-reply@openai.com
2. **Parser**: Extrahuje 2FA kód z HTML obsahu emailu pomocí regulárního výrazu `<h1[^>]*>(\d{6})<\/h1>`
3. **Airtable Modul**: Vytvoří nový záznam v Airtable s extrahovanými daty

### 3. Next.js Aplikace

Pro zprovoznění aplikace je potřeba:

1. Vytvořit soubor `.env.local` s následujícími proměnnými:
   ```
   NEXT_PUBLIC_AIRTABLE_PAT=your_airtable_personal_access_token
   NEXT_PUBLIC_AIRTABLE_BASE_ID=your_airtable_base_id
   NEXT_PUBLIC_AIRTABLE_2FA_BASE_ID=appYxRvYKY9KxhIcG
   ```

2. Nainstalovat závislosti:
   ```
   npm install
   ```

3. Spustit vývojový server:
   ```
   npm run dev
   ```

4. Nebo nasadit na produkci:
   ```
   npm run build
   npm start
   ```

## Použití

1. Administrátoři navštíví stránku `https://aidovednosti.cz/admin/codes`
2. Zobrazí se jim všechny 2FA kódy seskupené podle dnů
3. Stránka se automaticky aktualizuje každých 15 sekund

### Režim prezentace

Pro použití během kurzu je k dispozici speciální režim prezentace:

1. Klikněte na tlačítko "Začít sledovat nové kódy" na začátku kurzu
2. Systém bude zobrazovat pouze nové kódy, které přijdou po aktivaci režimu
3. Kódy jsou zobrazeny ve velkém, dobře čitelném formátu vhodném pro promítání
4. Počítadlo ukazuje, kolik nových kódů přišlo od začátku sledování
5. Pro ukončení režimu klikněte na "Ukončit sledování"

## Údržba

### Přidání nového účtu institutu

Když přidáte nový účet institutu (např. institute10@advomate.cz), není potřeba dělat žádné změny v kódu. Make.com automatizace bude automaticky extrahovat číslo institutu z emailové adresy a ukládat kódy do Airtable.

### Řešení problémů

1. **Kódy se nezobrazují**: Zkontrolujte, zda Make.com automatizace běží a zda jsou správně nastaveny proměnné prostředí
2. **Chyby v API**: Zkontrolujte konzoli prohlížeče a logy serveru pro detailnější informace o chybách

## Bezpečnostní poznámky

- Administrátorská stránka je chráněna heslem, které je uloženo v proměnné prostředí `ADMIN_PASSWORD`
- Pro přístup k administraci je nutné se přihlásit na stránce `/admin/login`
- Přihlášení je platné po dobu 8 hodin, poté je nutné se znovu přihlásit
- Pro zvýšení bezpečnosti zvažte pravidelnou změnu hesla a omezení přístupu na IP adresy vaší organizace
