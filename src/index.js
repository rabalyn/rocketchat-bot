const { driver } = require('@rocket.chat/sdk')

const commands = require('./commands')

require('dotenv').config()

const HOST = process.env.HOST
const USER = process.env.BOTUSER
const PASS = process.env.PASS
const SSL = process.env.SSL
const ROOMS = JSON.parse(process.env.ROOMS)

let myuserid
// this simple bot does not handle errors, different message types, server resets
// and other production situations

const runbot = async () => {
  try {
    await driver.connect({ host: HOST, useSsl: SSL })
  } catch (error) {
    console.error('could not connetc: ', error)
  }

  try {
    myuserid = await driver.login({ username: USER, password: PASS })
  } catch (error) {
    console.error('could not login: ', error)
  }

  try {
    await driver.joinRooms(ROOMS)
    console.log('joined rooms ')
  } catch (error) {
    console.error('could not join rooms: ', error)
  }

  try {
    await driver.subscribeToMessages()
  } catch (error) {
    console.error('could not subscribe: ', error)
  }

  try {
    await driver.reactToMessages(processMessages)
  } catch (error) {
    console.error('could not setup msgloop: ', error)
  }

  // when a message is created in one of the ROOMS, we
  // receive it in the processMesssages callback
}

// callback for incoming messages filter and processing
const processMessages = async (err, message, messageOptions) => {
  if (err) return console.error('error in processMessages: ', err)
  if (message.u._id === myuserid) return

  const roomname = await driver.getRoomName(message.rid)
  const { msg } = message
  const username = message.u.username
  console.log('got roomname ', roomname)

  if (roomname === 'general') {
    if (message.msg.toLowerCase().includes('guten morgen')) {
      await commands.greetings(driver, message)
    }

    if (msg.match(/^!ping$/)) {
      commands.pong(driver, roomname)
    }

    if (msg.match(/^!time/)) {
      commands.time(driver, roomname)
    }

    if (msg.match(/^!8ball/) && msg.split(/\W/).length > 5) {
      commands['8ball'](driver, roomname)
    }

    if (msg.match(/^!panf/)) {
      commands.panf(driver, roomname)
    }

    if (msg.match(/^!help/)) {
      commands.help(driver, roomname, username)
    }
  }

  if (roomname === 'test') {
  }

  if (message.rid === 'Bad75w5cfWrgZgDkDva97PdKhCqso7T3Rn') {
    await commands.debug(driver, message)
  }
}

runbot()
