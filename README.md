## Sentinel

Something of a clone to the ever popular [sentry](sentry.io) error and exception tracker. For legal and support reasons (or if you're not a little crazy like me), give a look to their open source, self-hosted software before you look here :)

The name is 100% a play on the `sentry` name in case that wasn't totally clear!

### TL;DR

```bash
# Clone repo
$ git clone git@github.com:DukeFerdinand/sentinel.git
# Install
$ yarn
# Setup your env
$ cp .env.local.example .env.local # then optionally edit the new .env.local file
# Run
$ yarn dev
# Test
$ yarn test
```

### Motivation

I'm weird, I _really_ like error handling and state management... So after I created a tool for work based on [Rust `Result` enums](https://doc.rust-lang.org/stable/std/result/enum.Result.html) (the tool of course I've stripped, improved for more than just that app, and released as `smartFetch` in my `ts-utils` repo btw), I realized I didn't have anywhere to use my more advanced decorator error hooks :)

In comes Sentinel! It was supposed to be another tool for work, but ultimately we scrapped it and my OSS baby was born! I'm kinda glad we did so I can experiment ;)

### Tech stack

Here's the layout, along with _planned_ features marked with `?` where they aren't actually implemented yet:

#### Frontend

- React + TS
- My ts-utils lib with `smartFetch`
- GQL (apollo)
- Next.js
- Emotion.js

#### Backend

- Next.js serverless functions (GQL, Auth ?)
- Node.js event ingesting functions ?
- MongoDB

#### Planned Integrations ?

- Generic JS module first
- React `HOC`
- Rust crate
- Python package (I use python for MQTT and Pi stuff a lot)

And of course tying it all together...

#### Hosting

UI and most serverless Next.js functions will be shipped via Vercel (parent company of Next.js now) for the first class citizen perks. Sorry Netlify I love you, but not this time. I need that zero effort SSR hosting! :(

Any general ingesting will mostly be serverless Node functions. This could be done with Vercel too, but I have an affinity for GCP because I basically taught it to myself in Grand Central while I was in NYC, though AWS would work too... Ultimately whatever is cheaper because they're just as complicated ;)

### Can I use this?

Sure! If you decide to use it for your own purposes gimme a shout and I'll link you here in the README :)

If for any reason you want to use it _with a company_, give me some company merch and we've got a deal!

Shoutouts and merch are totally optional as this is open source, but throwing back some respect keeps me and the community motivated :)

### Summary

Feel free to use it, just know that there are better funded options out there should you need anything beyond what I (a lone dev) can provide.

This is purely a passion project as well as an experience builder for Full Stack work :)
