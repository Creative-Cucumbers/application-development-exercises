basic.forever(function () {
    let x = input.acceleration(Dimension.X)
    let fire = input.buttonIsPressed(Button.A) ? 1 : 0

    serial.writeLine("{\"x\":" + x + ",\"fire\":" + fire + "}")
    basic.pause(50)
})
