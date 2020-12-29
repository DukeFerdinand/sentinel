## Sentinel

[![CircleCI](https://circleci.com/gh/DukeFerdinand/sentinel.svg?style=shield)](https://circleci.com/gh/DukeFerdinand/sentinel)

Something of a clone to the ever popular [sentry](sentry.io) error and exception tracker. For legal and support reasons (or if you're not a little crazy like me), give a look to their open source, self-hosted software before you look here :)

The name is 100% a play on the `sentry` name in case that wasn't totally clear!

### TL;DR

```bash
# Clone repo
$ git clone git@github.com:DukeFerdinand/sentinel.git
# Install
$ yarn
# Setup your env
$ cp .env.local.example .env.local # then make sure to edit the new .env.local file
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
- Tailwind CSS

#### Backend

- Next.js functions (Apollo GQL Server, GQL Auth)
- Google Cloud Function for ingesting new issues
- Google Cloud Firestore

#### Planned Integrations ?

- Generic JS module first
- React `HOC`
- Python package (I use python for MQTT and Pi stuff a lot)
- Rust crate

And of course tying it all together...

#### Hosting

UI and most serverless Next.js functions will be shipped via Vercel (parent company of Next.js now) for the first class citizen perks. Sorry Netlify I love you, but not this time. I need that zero effort API Route hosting! :(

Any general ingesting will mostly be serverless Python functions. This could be done with Vercel too, but I have an affinity for Google Cloud Platform because I basically taught it to myself in Grand Central while I was in NYC :)

**Update on the Vercel functions now that I've experimented**: They're WAY too slow for my use case (800ms - 1000ms, no noticeable spinup difference), and I have no idea where to begin on speeding them up. I scrapped the log function for ingesting, rewrote it in Python, and am now a happy customer of Google's Cloud Functions (~200ms per un-optimized request after initial spin up) :)

It's technically not free, but as long as I don't go over 1 million logs in a month, then it won't really be a problem! Even if I do go over, it's PENNIES to run the load that I need.

### Can I use this?

Sure! If you decide to use it for your own purposes gimme a shout and I'll link you here in the README :)

If for any reason you want to use it _with a company_, give me some company merch and we've got a deal!

Shoutouts and merch are totally optional as this is open source, but throwing back some respect keeps me and the community motivated :)

### Summary

Feel free to use it, just know that there are better funded options out there should you need anything beyond what I (a lone dev) can provide.

This is purely a passion project as well as an experience builder for Full Stack work :)
