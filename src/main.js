import { Events, HTML5Video, Log, Playback, PlayerError } from '@clappr/core'
import mpegts from 'mpegts.js'

const MIMETYPES = ['video/flv', 'video/x-flv']
const EXTENSION = 'flv'

export default class MpegtsJSPlayback extends HTML5Video {
  get name () {
    return 'mpegts'
  }

  get supportedVersion () {
    // eslint-disable-next-line no-undef
    return { min: CLAPPR_CORE_VERSION }
  }

  get isHTML5Video () {
    return true
  }

  get mpegts () {
    return this._player
  }

  getPlaybackType () {
    return this._playbackType
  }

  play () {
    !this._player && this._setup()
    super.play()
  }

  stop () {
    super.stop()
    this._destroy()
  }

  destroy () {
    this._destroy()
    super.destroy()
  }

  // skipping setup `setupSrc` on tag video
  _setupSrc () { }

  _setup () {
    this._destroy()

    const mediaDataSource = {
      type: EXTENSION,
      url: this.options.src
    }
    const mpegtsConfig = this.options.playback.mpegtsConfig || {}
    this._playbackType = mpegtsConfig.isLive ? Playback.LIVE : Playback.VOD

    const enableLogging = mpegtsConfig.enableLogging || false
    mpegts.LoggingControl.enableAll = enableLogging

    this._player = mpegts.createPlayer(mediaDataSource, mpegtsConfig)
    this._player.on(mpegts.Events.ERROR, this._onError.bind(this))
    this._player.attachMediaElement(this.el)
    this._player.load()
  }

  _onError (type, details, data) {
    if(this.options.playback.hlsFallback)
    {
      this._player.configure({ source: this.options.playback.hlsFallback, mimeType: "video/hls" })
    } else 
      {
        Log.error(`mpegts: ${type}: ${details}`, data)

        const formattedError = this.createError({
        code: data.code || type,
        description: data.msg || details,
        raw: data,
        level: PlayerError.Levels.FATAL
        })

        this.trigger(Events.PLAYBACK_ERROR, formattedError)
        this.stop()
      }
  }

  _destroy () {
    if (!this._player) {
      return
    }

    this._player.destroy()
    delete this._player
  }
}

MpegtsJSPlayback.canPlay = (resource, mimeType = '') => {
  const resourceParts = (resource.split('?')[0].match(/.*\.(.*)$/) || [])
  const isFLV = ((resourceParts.length > 1 && resourceParts[1].toLowerCase() === EXTENSION) ||
    MIMETYPES.indexOf(mimeType) !== -1)
  return mpegts.isSupported() && isFLV
}

// eslint-disable-next-line no-undef
MpegtsJSPlayback.version = () => VERSION
