module.exports = async (driver, roomname, username) => {
  const response =
      `Available commands:
        guten morgen - good morning @${username}!
        !ping - pong
        !time - current time
        !8ball - answers your questions
        `
      //! panf - link to next pizza order

  await driver.sendToRoom(response, roomname)
}
