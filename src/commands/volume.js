const {SlashCommandBuilder} = require("discord.js");
const {Embed} = require("../uttils/embedBuilder");
module.exports = {
    data:  new SlashCommandBuilder()
        .setName(`volume`)
        .setDescription(`Adjust song volume`)
        .addIntegerOption(option =>
            option.setName(`percent`)
                .setDescription(`Provide the name or song url`)
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true)
        ),

    async execute(interaction) {
        const {options, member, guild, channel, client} = interaction

        const volume = options.getInteger(`percent`)

        const VC = member.voice.channel
        const embed = new Embed()

        if(!VC)
            return interaction.reply({embeds: [embed.vcError()], ephemeral: true})

        if(!member.voice.channelId === guild.members.me.voice.channelId)
            return interaction.reply({embeds: [embed.vcError()], ephemeral: true})


        try {
            client.distube.setVolume(VC, volume)
            return interaction.reply({content: `🔉 Volume has been set to ${volume}%` })
        } catch (err) {
            console.log(err)
            return interaction.reply({embeds: [embed.errHandler("Red", `⛔ | Something went wrong`)]})
        }
    }
}