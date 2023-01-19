const {SlashCommandBuilder} = require("discord.js");
const {Embed} = require("../uttils/embedBuilder");
module.exports = {
    data: new SlashCommandBuilder()
        .setName(`loop`)
        .setDescription(`Display loop options`)
        .addStringOption(option =>
            option.setName(`options`)
                .setDescription(`Loop options`)
                .addChoices(
                    {name: `off`, value: `off`},
                    {name: `songs`, value: `songs`},
                    {name: `queue`, value: `queue`},
                )
                .setRequired(true)
        ),

    async execute (interaction) {
        const {member, options, client, guild} = interaction

        const option = options.getString(`options`)

        const VC = member.voice.channel;
        const embed = new Embed();

        if(!VC)
            return interaction.reply({embeds: [embed.vcError()], ephemeral: true})

        if(!member.voice.channelId === guild.members.me.voice.channelId)
            return interaction.reply({embeds: [embed.vcError()], ephemeral: true})

        try {
            const queue = await client.distube.getQueue(VC)

            if(!queue)
                return interaction.reply({embeds: [embed.errHandler("Red", `Queue is empty`)], ephemeral: true})

            let mode = null

            switch (option)
            {
                case `off`:
                    mode = 0;
                    break;
                case `song`:
                    mode = 1;
                    break;
                case `queue`:
                    mode = 2;
                    break;
            }

            mode = await queue.setRepeatMode(mode)

            mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song"): "Off";

            return interaction.reply({embeds: [embed.errHandler("Orange", `Set repeat mode to \`${mode}\`.`)]})
        } catch (err) {
            console.log(err)
            return interaction.reply({embeds: [embed.errHandler("Red", `⛔ | Something went wrong`)]})
        }
    }
}