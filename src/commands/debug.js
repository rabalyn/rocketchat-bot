module.exports = async (driver, message) => {
  const response = 'got ya message @' + message.u.username + ': ' + message.msg
  await driver.sendToRoomId(response, message.rid)
}
