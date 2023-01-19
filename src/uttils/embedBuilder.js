/* Custom embed builder, for further development */

const {EmbedBuilder} = require("discord.js");

class Embed {

    constructor()
    {

    }

    errHandler(color, description)
    {
        const embed = new EmbedBuilder().setColor(color).setDescription(description);
        return embed;
    }

    vcError()
    {
        const embed = new EmbedBuilder().setColor("Red").setDescription(`You must be in voice channel to execute music`);
        return embed;
    }
}

module.exports = { Embed };