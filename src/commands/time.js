module.exports = async (driver, roomname) => {
  const response = new Date().toLocaleTimeString()
  await driver.sendToRoom(response, roomname)
}
