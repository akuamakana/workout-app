const logSpy = (fn: 'log' | 'info' | 'warn' | 'error' | 'dir' = 'error') => jest.spyOn(console, fn);

export default logSpy;
