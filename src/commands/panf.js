module.exports = async (driver, roomname) => {
  const response = 'https://panf-dev.übersprung.de/'
  await driver.sendToRoom(response, roomname)
}
