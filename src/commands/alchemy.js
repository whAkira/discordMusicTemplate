const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`alchemy`)
        .setDescription(`Alchemy test`)
        .addStringOption(option =>
            option.setName(`address`).setDescription(`Paste contract adress`).setRequired(true))
        .addIntegerOption(option =>
            option.setName(`id`).setDescription(`Type id here`).setMinValue(1).setMaxValue(10000).setRequired(true)
        ),

    async execute(interaction) {

        const { options } = interaction
        const contractAddress = options.getString(`address`)
        const nftId = options.getInteger(`id`).toString()
        try {
            const data = await fetch(`https://eth-mainnet.g.alchemy.com/v2/HIfcKpG0U3xsz-6jbLYpfX3fDhDZYBum/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${nftId}`).then(r => r.json())
            console.log(data)
            const embed = new EmbedBuilder()
                .setTitle(`${data.title}`)
                .setImage(`${data.media[0].gateway}`)
                .addFields(
                    {name: `Contract address: `, value: `${data.contract.address}`},
                    {name: `Total supply`, value: `${data.contractMetadata.totalSupply}`, inline: true},
                    {name: "Token type", value: `${data.contractMetadata.tokenType}`, inline: true},
                    {name: "Floor price: ", value: `${data.contractMetadata.openSea.floorPrice}`},
                )

            interaction.reply({embeds: [embed]})
        } catch (err) {
            console.log(err)
        }

    }
}