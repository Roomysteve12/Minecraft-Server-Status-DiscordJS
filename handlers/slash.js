let slash = []
const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Slash Commands");
table.setHeading('Slash Command', ' Load status');
module.exports = (client) => {
    readdirSync("./slash/").forEach(dir => {
        const commands = readdirSync(`./slash/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../slash/${dir}/${file}`);
            if (pull.name) {
                client.slash.set(pull.name, pull);
                slash.push(pull);
                table.addRow(file, 'REGISTERED');
            } else {
                table.addRow(file, `UNREGISTERED`);
                continue;
             }
          }
    });
    console.log(table.toString());
client.on("ready",async ()=> {
    await client.application.commands.set(slash)
 })
}
