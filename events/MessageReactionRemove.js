const Chariot = require('chariot.js');
const timeout = 5000;

const reactionMessageArray = ['691867862595534888', '691912413649567774'];

const appleRole = '691841353100951573';
const cherryRole = '691841394783813663';
const orangeRole = '691841417668067348';
const peachRole = '691841300852637786';
const pearRole = '691841326530035844';
const northRole = '691841469668917288';
const southRole = '691841497619759145';

class MessageReactionRemove extends Chariot.Event {
    constructor() {
        super('messageReactionRemove');
    }

    async execute(message, emoji, userID) {
        if (reactionMessageArray.includes(message.id)) {

            let member = message.channel.guild.members.get(userID);
            let roleToRemove = null;
            let roleName = null;
            let hemi = false;

            if (member.nick == null) {
                Chariot.Logger.event(`${emoji.name} was removed from the role message by ${member.username}`);
            } else {
                Chariot.Logger.event(`${emoji.name} was removed from the role message by ${member.nick}`);
            }

            if (emoji.name == "acapple") {
                roleToRemove = appleRole;
                roleName = "Apples";
            } else if (emoji.name == "accherry") {
                roleToRemove = cherryRole;
                roleName = "Cherrys";
            } else if (emoji.name == "acorange") {
                roleToRemove = orangeRole;
                roleName = "Oranges";
            } else if (emoji.name == "acpeach") {
                roleToRemove = peachRole;
                roleName = "Peaches";
            } else if (emoji.name == "acpear") {
                roleToRemove = pearRole;
                roleName = "Pears";
            } else if (emoji.name == "north") {
                hemi = true;
                roleToRemove = northRole;
                roleName = "Northern Hemisphere";
            } else if (emoji.name == "south") {
                hemi = true;
                roleToRemove = southRole;
                roleName = "Southern Hemisphere";
            }

            if (roleToRemove != null) {
                member.removeRole(roleToRemove, `User removed the ${roleName} role.`);
    
                if (hemi == true) {
                    let msg = await message.channel.createMessage(`${member.mention}: Your island is **no longer** located in the ${roleName}`);
                    setTimeout(() => {
                        msg.delete();
                    }, timeout);
                } else {
                    let msg = await message.channel.createMessage(`${member.mention}: Your island **no longer** grows ${roleName}`);
                    setTimeout(() => {
                        msg.delete();
                    }, timeout);
                }
    
                
                if (member.nick == null) {
                    Chariot.Logger.event(`${roleName} role was taken from ${member.username}`)
                } else {
                    Chariot.Logger.event(`${roleName} role was taken from ${member.nick}`)
                }
            }
        }
    }
}

module.exports = new MessageReactionRemove()