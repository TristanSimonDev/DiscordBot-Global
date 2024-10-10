function ColorOutput(input) {
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
        get red() {
            return `\x1b[${colors.red}m${input}\x1b[39m`;
        },
        get green() {
            return `\x1b[${colors.green}m${input}\x1b[39m`;
        },
        get yellow() {
            return `\x1b[${colors.cyan}m${input}\x1b[39m`;
        },
        get blue() {
            return `\x1b[${colors.blue}m${input}\x1b[39m`;
        },
        get magenta() {
            return `\x1b[${colors.magenta}m${input}\x1b[39m`;
        },
        get cyan() {
            return `\x1b[${colors.cyan}m${input}\x1b[39m`;
        }
    }
}


module.exports = {ColorOutput}