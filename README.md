## Sentinel

A not-so-hidden alternative to the ever popular [sentry](sentry.io) error and exception tracker. For legal and support reasons (or if you're not a little crazy like me), give a look to their open source, self-hosted software before you look here :)

The name is 100% a play on the `sentry` name in case that wasn't totally clear!

### TL;DR

```bash
# Clone repo
$ git clone git@github.com:DukeFerdinand/sentinel.git
# Change to your service
$ cd <service>
# Install or run for the language
$ yarn || cargo run || pip install
# Alternately coming soon...
$ docker-compose up
```

### Motivation

I'm weird, I _really_ like error handling and state management... So after I created a tool for work based on [Rust `Result` enums](https://doc.rust-lang.org/stable/std/result/enum.Result.html) (the tool of course I've stripped, improved for more than just that app, and released as `smartFetch` in my `ts-utils` repo btw), I realized I didn't have anywhere to use my more advanced decorator error hooks :)

In comes Sentinel! It was supposed to be another tool for work, but ultimately we scrapped it and my OSS baby was born! I'm kinda glad we did so I can experiment ;)

### Tech stack

Here's the layout, along with _planned_ features marked with `?` where they aren't actually implemented yet:

#### Frontend

- React + TS
- My ts-utils lib with `smartFetch`
- GQL ?
- Next.js
- Emotion.js

#### Backend

- Rust primarily ?
- Some node services for GQL layer ?
- Postgres for user services ?
- MongoDB for fluid data (errors + exceptions) ?

#### Planned Integrations ?

- Generic JS module first
- React `HOC`
- Rust crate
- Python package (I use python for MQTT and Pi stuff a lot)

And of course tying it all together...

#### Vercel, Docker, and Kubernetes

Fairly self explanatory, all of the backend bullet points listed above can basically be put in their own container and shipped. I have an affinity for GCP because I basically taught it to myself in Grand Central while I was in NYC, but AWS would work too... Ultimately whatever is cheaper because they're just as complicated ;)

UI will be shipped via Vercel (parent company of Next.js now) for the first class citizen perks. Sorry Netlify I love you, but not this time. I need that zero effort SSR hosting! :(

### Can I use this?

Sure! If you decide to use it for your own purposes gimme a shout and I'll link you here in the README :)

If you want to use it _professionally_ though, gimme a shout along with a job offer and we've got a deal! Perk for you: you get to hire the creator of this lovely app, and perk for me I get paid to do it :)

### Summary

Feel free to use it, just know that there are better funded options out there should you need anything beyond what I (a lone dev) can provide.

This is purely a passion project as well as a resume builder for Full Stack work :)
