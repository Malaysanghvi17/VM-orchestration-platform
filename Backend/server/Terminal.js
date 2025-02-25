const os = require('os');
const npty = require('node-pty');

class Terminal {
    #terminal = null;

    constructor() {
        const shell = os.platform() == 'win32' ? 'powershell.exe' : 'zsh';

        try {
            this.#terminal = npty.spawn(shell, [], {
                name: 'xterm-256color',
                cols: 80,
                rows: 20,
                cwd: process.env.HOME,
                env: process.env,
            });

            // Handle errors
            this.#terminal.on('error', (err) => {
                console.error('Terminal error:', err);
                // If an error occurs, kill the terminal
                this.kill();
            });

        } catch (err) {
            console.error('Error creating terminal:', err);
            // If an error occurs during creation, set terminal to null
            this.#terminal = null;
        }
    }

    write(data) {
        if (this.#terminal) {
            this.#terminal.write(data);
        }
    }

    onData(cb) {
        if (this.#terminal) {
            this.#terminal.onData(cb);
        }
    }

    onExit(cb) {
        if (this.#terminal) {
            this.#terminal.onExit(cb);
        }
    }

    kill() {
        if (this.#terminal) {
            this.#terminal.kill();
            this.#terminal = null; // Set terminal to null after killing
        }
    }

    resize(cols = 80, rows = 20) {
        if (this.#terminal) {
            this.#terminal.resize(cols, rows);
        }
    }
}

module.exports = Terminal;


// const os = require('os');
// const npty = require('node-pty');

// class Terminal {
// 	#terminal = null;
// 	constructor() {
// 		const shell = os.platform() == 'win32' ? 'powershell.exe' : 'zsh';

// 		this.#terminal = npty.spawn(shell, [], {
// 			name: 'xterm-256color',
// 			cols: 80,
// 			rows: 20,
// 			cwd: process.env.HOME,
// 			env: process.env,
// 		})

// 	}

// 	write(data) {
// 		this.#terminal.write(data);
// 	}

// 	onData(cb) {
// 		this.#terminal.onData(cb);
// 	}

// 	onExit(cb) {
// 		this.#terminal.onExit(cb);
// 	}

// 	kill() {
// 		this.#terminal.kill();
// 	}

// 	resize(cols=80, rows=20) {
// 		this.#terminal.resize(cols, rows);
// 	}
// }

// module.exports = Terminal;