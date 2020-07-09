# Workout Generator

This website will automatically generate balanced workouts filled with exercises that are accompanied by demonstration videos and descriptions.
The idea is that if the user provides the equipment they have available and the area of focus desired for the workout, we can generate a good workout for them.

Currently it only supports one format (4 Rounds of 3 exercises), but eventually the intention is to support workouts of different formats (like HIIT).

## How it's built

As of today, the site is built using the default SSG from Gatsby.
The data is coming from a Google Sheet that is updated and exported manually, then saved into the app as a static JSON file. The app is then transforms the default exported JSON into the format expected by the React client-side.

## Getting it running locally

First you'll need to have the Gatsby CLI installed locally.

```shell
npm i -g gatsby-cli
```

Then you can navigate into the project directory and start it up.

```shell
cd workout-generator/
gatsby develop
```

The site is now running at `http://localhost:8000`!
