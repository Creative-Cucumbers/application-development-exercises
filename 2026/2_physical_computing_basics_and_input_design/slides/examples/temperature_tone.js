basic.forever(function () {
    let temp = input.temperature()
    let pitch = Math.map(temp, 15, 35, 220, 880)
    music.playTone(pitch, music.beat(BeatFraction.Half))
    basic.pause(100)
})
