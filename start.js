'use strict';

const Stratum = require('./libs/class.Stratum');

const stratum = new Stratum({
    coinbaseAddress: 'n1W99FwjX2HgBxVN9aYvpn91uhZfi9B8fj',
    blockBrand: '/@mintpond/ref-stratum/',
    host: "0.0.0.0",
    port: {
        number: 3010,
        diff: 10
    },
    rpc: {
        host: '172.0.0.1',
        port: 18444,
        user: 'rpcuser',
        password: "x"
    },
    jobUpdateInterval: 55,
    blockPollIntervalMs: 250
});

stratum.init();

stratum.on(Stratum.EVENT_CLIENT_CONNECT, ev => {
    console.log(`Client connected: ${ev.client.socket.remoteAddress}`);
});

stratum.on(Stratum.EVENT_CLIENT_DISCONNECT, ev => {
    console.log(`Client disconnected: ${ev.client.socket.remoteAddress} ${ev.reason}`);
});

stratum.on(Stratum.EVENT_SHARE_SUBMITTED, ev => {
    if (ev.share.isValidBlock) {
        console.log(`Valid block submitted by ${ev.share.client.workerName}`)
    }
    else if (ev.share.isValidShare) {
        console.log(`Valid share submitted by ${ev.share.client.workerName}`)
    }
    else {
        console.log(`Invalid share submitted by ${ev.share.client.workerName} ${ev.share.error.message}`)
    }
});

// Make sure Error can be JSON serialized
if (!Error.prototype.toJSON) {
    Error.prototype.toJSON = function () {
        const jsonObj = {};

        Object.getOwnPropertyNames(this).forEach(key => {
            jsonObj[key] = this[key];
        }, this);

        return jsonObj;
    }
}