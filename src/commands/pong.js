module.exports = async (driver, roomname) => {
  await driver.sendToRoom('pong', roomname)
}
