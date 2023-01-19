const {SlashCommandBuilder} = require("discord.js");
const {Embed} = require('../uttils/embedBuilder')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription(`Music system`)
        .addStringOption(option =>
            option.setName(`query`)
            .setDescription(`Provide the name or song url`)
            .setRequired(true)
        ),

    async execute(interaction) {

        const {options, member, guild, channel, client} = interaction

        const query = options.getString(`query`)

        const VC = member.voice.channel

        const embed = new Embed()

        if(!VC)
            return interaction.reply({embeds: [embed.vcError()], ephemeral: true})

        if(!member.voice.channelId === guild.members.me.voice.channelId)
            return interaction.reply({embeds: [embed.vcError()], ephemeral: true})


        try {
            client.distube.play(VC, query, { textChannel: channel, member: member })
            return interaction.reply({ content: `🎶 Request recieved` })
        } catch (err) {
            console.log(err)
            return interaction.reply({embeds: [embed.errHandler("Red", `⛔ | Something went wrong`)]})
        }
    }
}