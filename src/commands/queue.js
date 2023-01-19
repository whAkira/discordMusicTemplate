const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
module.exports = {
    data:  new SlashCommandBuilder()
        .setName(`queue`)
        .setDescription(`Music system`),

    async execute(interaction) {
        const {member, guild, client} = interaction

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

            embed.setColor('Purple').setDescription(`${queue.songs.map(
                (song, id) => `\n**${id, 1}.**${song.name} - \`${song.formattedDuration}\``
            )}`)

            return interaction.reply({embeds: [embed]})

        } catch (err) {
            console.log(err)
            return interaction.reply({embeds: [embed.setColor('Red').setDescription(`⛔ | Something went wrong`)]})
        }
    }
}