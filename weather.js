const Discord = require("discord.js");
const weather = require("weather-js");

module.exports.run = async (bot, message, args) => {
  //!weather <city>

  weather.find({search: args.join(" "), degreeType: 'C' }, function(err, result) {

    let jsicon = ""
	
    if (err) message.channel.send(err);

    if(result === undefined || result.length === 0){
      message.channel.send('Укажите локацию!')
      return;
    }



    var current = result[0].current;
    var location = result[0].location;

    const embed = new Discord.RichEmbed()
      .setDescription(`**${current.skytext}**`)
      .setAuthor(`Погода в ${current.observationpoint}`)
      .setColor("#78F5FF")
      .addField('Часовой пояс', `UTC${location.timezone}`, true)
      .addField('Ветры',current.winddisplay, true)
      .addField('Влажность', `${current.humidity}%`, true)
      .setFooter("MoreBot", jsicon);

      message.channel.send({embed});
  });

}

module.exports.help = {
  name: "weather"
}
