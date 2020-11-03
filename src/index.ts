type InProgressPromiseList = {
    [id: string]: Promise<any>
}

type ResolvedPromiseList = {
    [id: string]: Promise<string>
}

type Params = {
    id: string
}

let inProgressPromiseList: InProgressPromiseList = {};

let resolvedPromiseList: ResolvedPromiseList= {};

const main = {

    async start(id: string): Promise<string> {
        return this.fetchData({ id })
    },

    /**
     *
     * Async service that manages concurrent requests and handle pending and resolved I/O async operations
     */
    async fetchData(params: Params): Promise<string> {
        const { id } = params;

        /**
         * Track in progress promisess
         */
        if (!inProgressPromiseList[id]) inProgressPromiseList[id] = this.performExpensiveOperation()

        /**
         * Return resolved promise
         */
        if (resolvedPromiseList[id]) return resolvedPromiseList[id]

        /**
         * Update resolved promises
         * Reset pending promises
         */
        if (!resolvedPromiseList[id]) {
            resolvedPromiseList[id] = await Promise.resolve(inProgressPromiseList[id])
            delete inProgressPromiseList[id]
        }

        return resolvedPromiseList[id]
    },

    /**
     *
     * Expensive I/O operation such as a database read, external http api requests...etc
     */
    performExpensiveOperation(): Promise<string> {
        return new Promise(resolve => setTimeout(() => resolve("async operation is completed"), 1000))
    }
}

export default main
