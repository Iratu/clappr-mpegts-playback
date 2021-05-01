[![npm version](https://badge.fury.io/js/clappr-mpegts-playback.svg)](https://badge.fury.io/js/clappr-mpegts-playback)
[![](https://data.jsdelivr.com/v1/package/npm/clappr-mpegts-playback/badge)](https://www.jsdelivr.com/package/npm/clappr-mpegts-playback)

Clappr hook for MpegTS.js
https://github.com/xqq/mpegts.js

Include the script and add this to the Clappr player:
```
plugins:[MpegtsJSPlayback],
playback: {
  mpegtsConfig: {
    isLive: true,
  }
},
```
Build this with Yarn,
`yarn install`
`yarn build`
`yarn release`

Based on: https://github.com/andrefilimono/clappr-flvjs-playback
