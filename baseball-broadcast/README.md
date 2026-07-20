# ⚾ House League LIVE

A kids sports broadcasting website for **house league baseball** — made by a kid, for kid baseball fans!

Kid announcers call the games, kid players get their stats tracked, and the app builds
**leaderboards** and **standings** automatically from the numbers you type in.

## What's inside

- **📺 Live** — the game that's on air right now, plus what's coming up and the standings.
- **⚾ Broadcasts** — every game with score, announcers, and play-by-play.
- **🏆 Leaders** — top players in batting average, on-base %, home runs, RBI, steals, and more.
- **🧢 Teams** — every team and its roster with stats.
- **🎙️ Announcers** — meet the kid announcer crew.
- **🎛️ Score Booth** — YOUR control room: add teams and players, and type in stats after each game.
- **⭐ About** — the kid who made the app.

Everything you enter in the Score Booth **saves in your browser**, so it's still there next time.

## How the stats work

- **Batting Average** = hits ÷ at-bats. Strikeouts count as at-bats; **walks do not**.
- **On-Base %** = (hits + walks) ÷ (at-bats + walks).
- **Standings** are built from every game you mark as **Final**.

## Run it on your computer

```bash
cd baseball-broadcast
npm install
npm run dev
```

Then open the link it prints (usually http://localhost:5173).

To build a version you can put online:

```bash
npm run build
```

The finished site lands in the `dist/` folder.
