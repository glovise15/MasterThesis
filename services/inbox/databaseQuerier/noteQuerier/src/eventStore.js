const wolkenkitClient = require('wolkenkit-client');

const run = async function () {
    try {
        return await wolkenkitClient.connect({ host: 'local.wolkenkit.io', port: 3000 }).catch((err) => {
            console.log(err)
        });

    } catch (ex) {
        console.error(ex);
    }
};
const wolkenkit = run();
module.exports = wolkenkit;
