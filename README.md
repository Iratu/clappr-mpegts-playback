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
