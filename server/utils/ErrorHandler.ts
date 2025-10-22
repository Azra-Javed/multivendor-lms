class ErrorHandler extends Error {
  statusCode: number;
  constructor(message: any, statusCode: number) {
    super(message);
    // Calls the parent Error class constructor to initialize the 'message' property.
    // The built-in Error class only stores the message, so we manually add 'statusCode' here.
    this.statusCode = statusCode;

    // Node.js method that removes this custom class (ErrorHandler) from the stack trace,
    // so the stack shows where the error actually occurred instead of where it was created.
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
