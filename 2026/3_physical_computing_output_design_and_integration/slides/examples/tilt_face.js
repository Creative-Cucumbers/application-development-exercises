basic.forever(function () {
    let x = input.acceleration(Dimension.X)
    if (x > 300) {
        basic.showIcon(IconNames.Happy)
    } else if (x < -300) {
        basic.showIcon(IconNames.Sad)
    } else {
        basic.showIcon(IconNames.Asleep)
    }
})
