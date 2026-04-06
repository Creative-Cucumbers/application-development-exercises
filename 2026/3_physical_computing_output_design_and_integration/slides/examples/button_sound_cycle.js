let noteIndex = 0
let notes = [262, 330, 392, 523]

input.onButtonPressed(Button.A, function () {
    noteIndex = (noteIndex + 1) % notes.length
    music.playTone(notes[noteIndex], music.beat(BeatFraction.Half))
    basic.showNumber(noteIndex + 1)
})
