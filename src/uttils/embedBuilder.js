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

    tickerHandler(...args)
    {
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`${args[0]}`)
            .setDescription(`Price Change ${args[1]}% 
            Bid Price: ${args[2]} 
            Ask Price: ${args[3]}, 
            High Price: ${args[4]} 
            Low Price: ${args[5]} 
            Volume ${args[6]}`)
        return embed;
    }
}

module.exports = { Embed };