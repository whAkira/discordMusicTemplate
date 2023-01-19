const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
module.exports = {
    data:  new SlashCommandBuilder()
        .setName(`seek`)
        .setDescription(`Move to second un track`)
        .addIntegerOption(option =>
            option.setName(`seconds`)
                .setDescription(`Amounts of seconds to forwards`)
                .setMinValue(0)
                .setRequired(true)
        ),

    async execute(interaction) {
        const {options, member, guild, client} = interaction

        const sec = options.getInteger(`seconds`)

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

            await queue.seek(queue.currentTime + sec)

            return interaction.reply({embeds: [embed.setColor("Blue").setDescription(`Track has been skipped`)], ephemeral: true})
        } catch (err) {
            console.log(err)

            return interaction.reply({embeds: [embed.setColor('Red').setDescription(`⛔ | Something went wrong`)]})
        }
    }
}