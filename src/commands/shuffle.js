const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const {Embed} = require("../uttils/embedBuilder");
module.exports = {
    data:  new SlashCommandBuilder()
        .setName(`shuffle`)
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
                return interaction.reply({embeds: [embed.errHandler("Red", `Queue is empty`)], ephemeral: true})


            await queue.shuffle()
            return interaction.reply({embeds: [response.setColor("Blue").setDescription(`Shuffled songs in the queue`)], ephemeral: true})

        } catch (err) {
            console.log(err)

            return interaction.reply({embeds: [embed.errHandler('Red', `⛔ | Something went wrong`)]})
        }
    }
}