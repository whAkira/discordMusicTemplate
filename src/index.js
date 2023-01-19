const { Client, GatewayIntentBits, Partials, Collection} = require('discord.js');
const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember, Channel } = Partials

const {DisTube} = require('distube')
const {SpotifyPlugin} = require('@distube/spotify')

const fs = require('node:fs')

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates],
    partials: [User, Message, GuildMember, ThreadMember, Channel],
})

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: false,
    emitAddSongWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin()
    ]
})


// Events handler
function loadEvents() {
    const _eventFiles = fs.readdirSync(`./src/events`).filter((f) => f.endsWith('.js'))
    _eventFiles.forEach((f) => {
        const event = require(`../src/events/${f}`)
        client.on(event.name, (...args) => event.execute(...args))
        })
}


// Commands handler
client.commands = new Collection()
function loadCommands() {
    let _commands = []
    const _commandFiles = fs.readdirSync('./src/commands').filter((f) => f.endsWith('.js'))
    _commandFiles.forEach(async (f) => {
        const command = require(`../src/commands/${f}`)
        client.commands.set(command.data.name, command)
        _commands.push(command.data.toJSON())
    })
    client.application.commands.set(_commands)
}


// START
require('dotenv').config()
client.login(process.env.TOKEN).then(() =>{
    loadCommands()
    loadEvents()
})