"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
function get(url, options = {}) {
    return new Promise(async (resolve, reject) => {
        // For Node.js environment
        if (globalThis.process) {
            const { get } = await Promise.resolve().then(() => require('https'));
            const { URL } = await Promise.resolve().then(() => require('url'));
            const { hostname, pathname } = new URL(url);
            const params = Object.assign({ hostname, path: pathname, port: 443 }, options);
            const request = get(params, (response) => {
                let body = '';
                response.on('data', (chunk) => {
                    body += chunk;
                });
                response.on('end', () => {
                    try {
                        const data = JSON.parse(body);
                        return resolve(data);
                    }
                    catch (_a) {
                        return reject(new Error('Parse error'));
                    }
                });
            });
            request.on('error', () => reject(new Error('Request error')));
            request.end();
            return true;
        }
        // For Deno environment
        if (globalThis.Deno) {
            let response = null;
            try {
                response = await fetch(url, options);
            }
            catch (_a) {
                return reject(new Error('Request error'));
            }
            if (response.ok) {
                try {
                    const data = await response.json();
                    return resolve(data);
                }
                catch (_b) {
                    return reject(new Error('Parse error'));
                }
            }
            return reject(Error('Request error'));
        }
    });
}
exports.get = get;
//# sourceMappingURL=fetcher.js.map