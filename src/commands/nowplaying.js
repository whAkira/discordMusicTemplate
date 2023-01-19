const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const {Embed} = require("../uttils/embedBuilder");
module.exports = {
    data:  new SlashCommandBuilder()
        .setName(`nowplaying`)
        .setDescription(`Music system`),

    async execute(interaction) {
        const {member, guild, channel, client} = interaction

        const VC = member.voice.channel
        const embed = new Embed()
        const response = new EmbedBuilder()

        if(!VC)
            return interaction.reply({embeds: [embed.vcError()], ephemeral: true})

        if(!member.voice.channelId === guild.members.me.voice.channelId)
            return interaction.reply({embeds: [embed.vcError()], ephemeral: true})

        try {
            const queue = await client.distube.getQueue(VC)

            if(!queue)
                return interaction.reply({embeds: [embed.errHandler('Red', `Queue is empty`)], ephemeral: true})

            const song = queue.songs[0]
            return interaction.reply({embeds: [response
                    .setColor("Blue")
                    .setDescription(`🎶 **Curently playing: ** \`${song.name}\` -\`${song.formattedDuration}\`.\n**Link:** ${song.url}`)
                    .setThumbnail(song.thumbnail)
                ]})
        } catch (err) {
            console.log(err)

            return interaction.reply({embeds: [embed.errHandler('Red', `⛔ | Something went wrong`)]})
        }
    }
}