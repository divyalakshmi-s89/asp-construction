# ASP Construction website + enquiry API

One Express server serves the website (`public/index.html`) and the API.
Status: syntax-checked only; not run end to end.

## Project structure
    server.js            Express server: serves the site, saves enquiries, public /api/config
    package.json         scripts: npm run dev / npm start
    .env.example         copy to .env (OWNER_WHATSAPP_NUMBER, PORT)
    public/
      index.html         page shell only
      css/styles.css     all styling; theme colours are at the top
      js/config.js       ALL editable content: contact details, banner slides, services, locations, image slots
      js/main.js         builds the page, banner slider, navigation
      js/form.js         enquiry form: validation, saving, WhatsApp button
      images/            asp-logo.png is used as a temporary image in every slot; put your own photos here, then reference them in config.js (e.g. "/images/hero-1.jpg")

## Run locally
    cp .env.example .env     (Windows: copy .env.example .env)
    npm install
    npm run dev              then open http://localhost:4000

## How enquiries work
1. The customer fills in the Contact form; it is validated in the browser and again on the server.
2. The server saves the enquiry (`data/enquiries.jsonl` in development; replace `load`/`save` in `server.js` with MongoDB or another database for production).
3. Only after it is saved, a **Send Enquiry on WhatsApp** button appears. It opens `https://wa.me/<number>?text=<encoded message>`.
4. The customer must press Send in WhatsApp. Nothing is sent automatically and no messaging API is used.
If saving fails, the form keeps the customer's details and shows an error. Retrying within 10 minutes will not create a duplicate record.

## Owner WhatsApp number
Set `OWNER_WHATSAPP_NUMBER` in `.env`: digits only, country code first, no `+` or spaces (for example `91XXXXXXXXXX`).
Until it is set to a valid number, the WhatsApp button is not shown. The number is public by design: the server returns it at `/api/config`.
Restart the server after editing `.env`.

## Before going live
Replace the sample contact details in the `CONFIG` block of `public/index.html`, set `verified:true`, add the privacy notice link,
and move enquiry storage to a real database.
