const Chariot = require('chariot.js');
const timeout = 5000;
const oneSecond = 1000;
const oneMinute = 60*oneSecond;
const fifteenMinute = 15*oneMinute;
const thirtyMinute = 30*oneMinute;
const sixtyMinute = 60*oneMinute;

const reactionMessageArray = ['691867862595534888', '691912413649567774'];

const appleRole = '691841353100951573';
const cherryRole = '691841394783813663';
const orangeRole = '691841417668067348';
const peachRole = '691841300852637786';
const pearRole = '691841326530035844';
const northRole = '691841469668917288';
const southRole = '691841497619759145';
const gatesOpenRole = '691909410062336011';

class MessageReactionAdd extends Chariot.Event {
    constructor() {
        super('messageReactionAdd');
    }

    async execute(message, emoji, userID) {
        if (reactionMessageArray.includes(message.id)) {

            let member = message.channel.guild.members.get(userID);
            let roleToAdd = null;
            let roleName = null;
            let hemi = false;

            if (member.nick == null) {
                Chariot.Logger.event(`${emoji.name} was added to the role message by ${member.username}`);
            } else {
                Chariot.Logger.event(`${emoji.name} was added to the role message by ${member.nick}`);
            }

            if (emoji.name == '15min') {
                let msg = await message.channel.createMessage(`${member.mention}: Your gates are now open for 15 minutes. Have fun!`);
                member.addRole(gatesOpenRole, 'User selected the Gates Open role.');
                this.client.removeMessageReaction('691865508416323644', '691912413649567774', '15min:691917782945890324', userID);

                setTimeout(() => {
                    msg.delete();
                }, timeout);
                setTimeout(() => {
                    member.removeRole(gatesOpenRole, '15 minute timer elapsed');
                }, fifteenMinute);

                return;
            } else if (emoji.name == '30min') {
                let msg = await message.channel.createMessage(`${member.mention}: Your gates are now open for 30 minutes. Have fun!`);
                member.addRole(gatesOpenRole, 'User selected the Gates Open role.');
                this.client.removeMessageReaction('691865508416323644', '691912413649567774', '30min:691918217446162493', userID);

                setTimeout(() => {
                    msg.delete();
                }, timeout);
                setTimeout(() => {
                    member.removeRole(gatesOpenRole, '30 minute timer elapsed');
                }, thirtyMinute);

                return;
            } else if (emoji.name == '60min') {
                let msg = await message.channel.createMessage(`${member.mention}: Your gates are now open for 60 minutes. Have fun!`);
                member.addRole(gatesOpenRole, 'User selected the Gates Open role.');
                this.client.removeMessageReaction('691865508416323644', '691912413649567774', '160min:691918464214106142', userID);

                setTimeout(() => {
                    msg.delete();
                }, timeout);
                setTimeout(() => {
                    member.removeRole(gatesOpenRole, '60 minute timer elapsed');
                }, sixtyMinute);

                return;
            }

            if (emoji.name == "acapple") {
                roleToAdd = appleRole;
                roleName = "Apples";
            } else if (emoji.name == "accherry") {
                roleToAdd = cherryRole;
                roleName = "Cherrys";
            } else if (emoji.name == "acorange") {
                roleToAdd = orangeRole;
                roleName = "Oranges";
            } else if (emoji.name == "acpeach") {
                roleToAdd = peachRole;
                roleName = "Peaches";
            } else if (emoji.name == "acpear") {
                roleToAdd = pearRole;
                roleName = "Pears";
            } else if (emoji.name == "north") {
                hemi = true;
                roleToAdd = northRole;
                roleName = "Northern Hemisphere";
            } else if (emoji.name == "south") {
                hemi = true;
                roleToAdd = southRole;
                roleName = "Southern Hemisphere";
            }

            if (roleToAdd != null) {
                member.addRole(roleToAdd, `User selected the ${roleName} role.`);
    
                if (hemi == true) {
                    let msg = await message.channel.createMessage(`${member.mention}: Your island is located in the ${roleName}`);
                    setTimeout(() => {
                        msg.delete();
                    }, timeout);
                } else {
                    let msg = await message.channel.createMessage(`${member.mention}: Your island grows ${roleName}`);
                    setTimeout(() => {
                        msg.delete();
                    }, timeout);
                }
    
                
                if (member.nick == null) {
                    Chariot.Logger.event(`${roleName} role was granted to ${member.username}`)
                } else {
                    Chariot.Logger.event(`${roleName} role was granted to ${member.nick}`)
                }
            }
        }
    }
}

module.exports = new MessageReactionAdd()