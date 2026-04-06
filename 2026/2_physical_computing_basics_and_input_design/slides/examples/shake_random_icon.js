input.onGesture(Gesture.Shake, function () {
    let pick = randint(0, 3)
    if (pick == 0) {
        basic.showIcon(IconNames.Heart)
    } else if (pick == 1) {
        basic.showIcon(IconNames.Happy)
    } else if (pick == 2) {
        basic.showIcon(IconNames.SmallDiamond)
    } else {
        basic.showIcon(IconNames.Umbrella)
    }
})
