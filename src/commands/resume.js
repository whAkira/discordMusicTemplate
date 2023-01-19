const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
module.exports = {
    data:  new SlashCommandBuilder()
        .setName(`resume`)
        .setDescription(`Music system`),

    async execute(interaction) {
        const {options, member, guild, channel, client} = interaction

        const VC = member.voice.channel
        const embed = new EmbedBuilder()

        if(!VC)
            return interaction.reply({embeds: [embed.setColor("Red").setDescription(`You must be in voice channel to execute music`)], ephemeral: true})

        if(!member.voice.channelId === guild.members.me.voice.channelId)
            return interaction.reply({embeds: [embed.setColor("Red").setDescription(`You must be in voice channel to execute music`)], ephemeral: true})

        try {
            const queue = await client.distube.getQueue(VC)

            if(!queue)
                return interaction.reply({embeds: [embed.setColor("Red").setDescription(`Queue is empty`)], ephemeral: true})

            await queue.resume(VC)

            return interaction.reply({embeds: [embed.setColor("Blue").setDescription(`Queue has been paused`)], ephemeral: true})
        } catch (err) {
            console.log(err)

            return interaction.reply({embeds: [embed.setColor('Red').setDescription(`⛔ | Something went wrong`)]})
        }
    }
}