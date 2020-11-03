"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let inProgressPromiseList = {};
let resolvedPromiseList = {};
const main = {
    async start(id) {
        return this.fetchData({ id });
    },
    /**
     *
     * Async service that manages concurrent requests and handle pending and resolved I/O async operations
     */
    async fetchData(params) {
        const { id } = params;
        /**
         * Track in progress promisess
         */
        if (!inProgressPromiseList[id])
            inProgressPromiseList[id] = this.performExpensiveOperation();
        /**
         * Return resolved promise
         */
        if (resolvedPromiseList[id])
            return resolvedPromiseList[id];
        /**
         * Update resolved promises
         * Reset pending promises
         */
        if (!resolvedPromiseList[id]) {
            resolvedPromiseList[id] = await Promise.resolve(inProgressPromiseList[id]);
            delete inProgressPromiseList[id];
        }
        return resolvedPromiseList[id];
    },
    /**
     *
     * Expensive I/O operation such as a database read, external http api requests...etc
     */
    performExpensiveOperation() {
        return new Promise(resolve => setTimeout(() => resolve("async operation is completed"), 1000));
    }
};
exports.default = main;
//# sourceMappingURL=index.js.map