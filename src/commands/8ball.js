const answers = require('./8ball_answers')

module.exports = async (driver, roomname) => {
  const response = answers[Math.floor(Math.random() * Math.floor(answers.length))]
  await driver.sendToRoom(response, roomname)
}
