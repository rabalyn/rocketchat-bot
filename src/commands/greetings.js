module.exports = async (driver, message) => {
  const response = `Guten Morgen @${message.u.username}`
  await driver.sendToRoomId(response, message.rid)
}
