const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const {Embed} = require("../uttils/embedBuilder");
module.exports = {
    data:  new SlashCommandBuilder()
        .setName(`pause`)
        .setDescription(`Music system`),

    async execute(interaction) {
        const {member, guild, client} = interaction

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

            await queue.pause(VC)
            return interaction.reply({embeds: [response.setColor("Blue").setDescription(`Queue has been paused`)], ephemeral: true})
        } catch (err) {
            console.log(err)

            return interaction.reply({embeds: [embed.errHandler("Red", `⛔ | Something went wrong`)]})
        }
    }
}