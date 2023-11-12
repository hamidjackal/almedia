import { AppLoggerMiddleware } from './logger.middleware';

describe('AppLoggerMiddleware', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => 0);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(new AppLoggerMiddleware()).toBeDefined();
  });

  it('should log request', () => {
    const middleware = new AppLoggerMiddleware();
    const logger = middleware['logger'];
    const logSpy = jest.spyOn(logger, 'log');
    const request = {
      method: 'GET',
      baseUrl: '/',
    };
    const response = {
      on: jest.fn(),
      statusCode: 200,
    };
    const next = jest.fn();
    middleware.use(request as any, response as any, next);

    expect(logSpy).not.toHaveBeenCalled();
    response.on.mock.calls[0][1]();
    expect(logSpy).toHaveBeenCalledWith('GET / 200 0ms');
    expect(next).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
