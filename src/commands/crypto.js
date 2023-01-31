const {SlashCommandBuilder} = require("discord.js");
const {Embed} = require('../uttils/embedBuilder')
module.exports = {
    data: new SlashCommandBuilder()
        .setName(`ticker`)
        .setDescription(`24hr ticker statistics`)
        .addStringOption(option =>
            option.setName(`symbol`)
                .setDescription(`Type ticker id`)
                .setRequired(true)
        ),

    async execute(interaction) {
        const {options} = interaction;

        const ticker = options.getString(`symbol`).toUpperCase()
        const embed = new Embed()

        try {
            const queue = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${ticker}`).then(q => q.json())

            interaction.reply({embeds: [embed.tickerHandler(queue.symbol,
                    queue.priceChangePercent,
                    queue.bidPrice,
                    queue.askPrice,
                    queue.highPrice,
                    queue.lowPrice,
                    queue.volume)
                ]})
        } catch (err) {

        }
    }
}