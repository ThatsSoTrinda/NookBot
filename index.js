const Chariot = require('chariot.js');

class NookBot extends Chariot.Client {
    constructor() {
        super(new Chariot.Config(
            'YOURTOKENHERE',
            {
                prefix: 'w!',
                defaultHelpCommand: true,
                primaryColor: 'YELLOW',
                owner: [
                    '155847589877645312' // Trinda
                ]
            },
            {
                messageLimit: 50,
                defaultImageFormat: 'png'
            }
        ));
    }
}

module.exports = new NookBot();