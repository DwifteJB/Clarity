(async () => {
    // MODULES
    const packageJson = require("./package.json")
    require("dotenv").config();
    
    const charm = require("charm")()
    charm.pipe(process.stdout);
    charm.reset()
    charm.foreground("blue").write(`[${packageJson.name}@${packageJson.version}] by Dwifte\n`)
    charm.foreground("white").write("Roblox Connection")
    charm.foreground("red").write(" X\n")
    charm.foreground("white").write("Website Connection")
    charm.foreground("red").write(" X\n")
    charm.foreground("white").write("Discord Bot Connection")
    charm.foreground("red").write(" X\n\n")

    const path = require("path");
    global.rootFolder = path.resolve(__dirname);

    const Roblox = require("./roblox/index")
    const Bot = require("./bot/index.js/index")
    const Website = require("./web/index")

    if (!process.env.ROBLOSECURITY) {
        console.log("ROBLOSECURITY not found.")
        return process.exit(1)
    }
    
    if (!process.env.SERVER_KEY) {
        console.log("SERVER_KEY not found.")
        return process.exit(1)
    }
    
    const Roblox = new clientHandler(process.env.ROBLOSECURITY, process.env.SERVER_KEY, process.env.LOGHOOK_URL, process.env.RANK_UPHOOK_URL)
    await Roblox.login()

    charm.foreground("white")
    charm.position(0,2)
    charm.erase("line")
    charm.write(`Roblox Connection (${Roblox.Client.UserName})`)
    charm.foreground("green").write(" √")
    
    Website(Roblox)
    Bot(Roblox)

})()
