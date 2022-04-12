# Yellow Jacket Check-In

![Yellow Jacket](src/favicon.webp)

## Overview

Web Application made as a replacement to CSG's old Google Sheets App Script.

Tap on a name, sends a text to all of the interested people.

## Deployment

### Production

1. Create the .env in the `functions` folder. The README contains all the info for this.
2. `firebase login`
3. `yarn deploy`
4. Go into the `functions` folder
5. Run `yarn deploy` again.

### Testing

Do everything such as Production but run `yarn deploy:testing` instead. This will build and push to the `testing` channel.

## Technologies

- Firebase
  - Auth
  - Local Database (currently unused)
  - Hosting
- React
  - Frontend
  - TailwindCSS (utility classes for CSS)

## Layout

- `/functions`
  - Grabs spreadsheet data (secure)
  - Sends texts (secure)
  - Contains the README for .env deployment.
- `/src`
  - All frontend code to interact with the data.
  - `./models/`
    - All typescript interfaces
    - `students.ts` contains the schema of the Google Sheet
  - `./services/`
    - All platform specific functions
    - These should be abstracted so you don't think about what you're using, you just use it. For instance, everything Firebase should go on a file here.