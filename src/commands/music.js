/*
For further scaling you can implement all music commands inside this file
Just delete test command and uncomment code below to get started

@Discord MUSIC_BOT
 */

const {SlashCommandBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName(`test`)
        .setDescription(`Test command`),

    async execute(interaction) {
        interaction.reply({content: `Developers command`})
    }
}

/*
const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
module.exports = {
    data:  new SlashCommandBuilder()
        .setName(`music`)
        .setDescription(`Music system`)
        .addSubcommand(subcommand =>
            subcommand
                .setName(`play`)
                .setDescription(`Play a song`)
                .addStringOption(option =>
                    option.setName(`query`)
                        .setDescription(`Provide the name or song url`)
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName(`volume`)
                .setDescription(`Adjust song volume`)
                .addIntegerOption(option =>
                    option.setName(`percent`)
                        .setDescription(`Provide the name or song url`)
                        .setMinValue(1)
                        .setMaxValue(100)
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName(`settings`)
                .setDescription(`Select an option`)
                .addStringOption(option =>
                    option.setName(`options`)
                        .setDescription(`Select an option`)
                        .addChoices(
                            {name: `queue`, value: "queue"},
                            {name: `skip`, value: "skip"},
                            {name: `pause`, value: "pause"},
                            {name: `resume`, value: "resume"},
                            {name: `stop`, value: "stop"},
                        ))
        ),

    async execute(interaction) {
        const {options, member, guild, channel, client} = interaction

        const sub = options.getSubcommand()
        const query = options.getString(`query`),
            volume = options.getString(`percent`),
            option = options.getString(`options`)

        const VC = member.voice.channel
        const embed = new EmbedBuilder()

        if(!VC)
            return interaction.reply({embeds: [embed.setColor("Red").setDescription(`You must be in voice channel to execute music`)], ephemeral: true})

        if(!member.voice.channelId === guild.members.me.voice.channelId)
            return interaction.reply({embeds: [embed.setColor("Red").setDescription(`You must be in voice channel to execute music`)], ephemeral: true})


        try {
            switch (sub) {
                case `play`:
                    client.distube.play(VC, query, { textChannel: channel, member: member })
                    return interaction.reply({ content: `🎶 Request recieved` })
                case `volume`:
                    client.distube.setVolume(VC, volume)
                    return interaction.reply({content: `🔉 Volume has been set to ${volume}%` })
                case 'settings':
                    const queue = await client.distube.getQueue(VC)

                    if(!queue)
                        return interaction.reply({embeds: [embed.setColor("Red").setDescription(`Queue is empty`)], ephemeral: true})

                    switch (option) {
                        case 'skip':
                            await queue.skip(VC)
                            return interaction.reply({embeds: [embed.setColor("Blue").setDescription(`Track has been skipped`)], ephemeral: true})

                        case 'stop':
                            await queue.stop(VC)
                            return interaction.reply({embeds: [embed.setColor("Blue").setDescription(`Queue has been stopped`)], ephemeral: true})

                        case 'pause':
                            await queue.pause(VC)
                            return interaction.reply({embeds: [embed.setColor("Blue").setDescription(`Queue has been paused`)], ephemeral: true})

                        case 'resume':
                            await queue.resume(VC)
                            return interaction.reply({embeds: [embed.setColor("Blue").setDescription(`Queue has resumed`)], ephemeral: true})

                        case 'queue':
                            embed.setColor('Purple').setDescription(`${queue.songs.map(
                                (song, id) => `\n**${id, 1}.**${song.name} - \`${song.formattedDuration}\``
                            )}`)
                            return interaction.reply({embeds: [embed]})
                    }
            }
        } catch (err) {
            console.log(err)

            return interaction.reply({embeds: [embed.setColor('Red').setDescription(`⛔ | Something went wrong`)]})
        }
    }
}
*/