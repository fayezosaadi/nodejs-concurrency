import main from "./index";

const performExpensiveOperationSpy = jest.spyOn(main, 'performExpensiveOperation')

describe('Nodejs Concurrency', () => {
    test('should call async procedure once for concurrent requests with the same params', done => {
        for (let i = 0; i < 2; i++) {
            main.start('A').then(() => done());
        }

        expect(performExpensiveOperationSpy).toHaveBeenCalledTimes(1)
    })

    test('should call async procedure twice for non concurrent requests with the same params', done => {
        for (let i = 0; i < 2; i++) {
            main.start('A').then(() => done());
        }

        setTimeout(() => main.start('A').then(() => done()), 2000)

        expect(performExpensiveOperationSpy).toHaveBeenCalledTimes(2)
    })
})



