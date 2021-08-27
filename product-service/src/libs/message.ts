export class ResponseBodyVO {
  code?: string;
  message?: string;
  data?: object;
}

export class ResponseVO {
  statusCode: number;
  body: string;
}

enum StatusCode {
  OK = 200,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

class Result {
  private statusCode: number;
  private code: string;
  private message: string;
  private data?: any;

  constructor(statusCode: number, data?: any) {
    this.statusCode = statusCode;
    this.data = data;
  }

  setCode(code: string) {
    this.code = code;
    return this;
  }

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  setData(data: any) {
    this.data = data;
    return this;
  }

  bodyToString() {
    const prepareBody: ResponseBodyVO = {};
    if (this.code) prepareBody.code = this.code;
    if (this.message) prepareBody.message = this.message;
    if (this.data) prepareBody.data = this.data;

    return {
      statusCode: this.statusCode,
      body:
        prepareBody.data && Object.keys(prepareBody).length === 1
          ? JSON.stringify(this.data)
          : JSON.stringify(prepareBody),
    };
  }
}

export class MessageUtil {
  static success(data: object, statusCode = StatusCode.OK): ResponseVO {
    const result = new Result(statusCode, data);
    return result.bodyToString();
  }

  static error(
    message: string,
    statusCode: StatusCode = StatusCode.INTERNAL_SERVER,
    code: string = "INTERNAL_SERVER"
  ) {
    const result = new Result(statusCode);
    result.setCode(code).setMessage(message);
    return result.bodyToString();
  }
}
