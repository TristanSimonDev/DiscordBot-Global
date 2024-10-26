function ColorOutput(text) {
    const colors = {
        red: 31,
        green: 32,
        yellow: 33,
        blue: 34,
        magenta: 35,
        cyan: 36,
        white: 37
    };

    return {
        red: () => console.log(`\x1b[${colors.red}m${text}\x1b[39m`),
        green: () => console.log(`\x1b[${colors.green}m${text}\x1b[39m`),
        yellow: () => console.log(`\x1b[${colors.yellow}m${text}\x1b[39m`),
        blue: () => console.log(`\x1b[${colors.blue}m${text}\x1b[39m`),
        magenta: () => console.log(`\x1b[${colors.magenta}m${text}\x1b[39m`),
        cyan: () => console.log(`\x1b[${colors.cyan}m${text}\x1b[39m`),
        white: () => console.log(`\x1b[${colors.white}m${text}\x1b[39m`)
    }
}


module.exports = {ColorOutput}