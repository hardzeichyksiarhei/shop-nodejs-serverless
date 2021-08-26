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
    const body: ResponseBodyVO = {};
    if (this.code) body.code = this.code;
    if (this.message) body.message = this.message;
    if (this.data) body.data = this.data;

    return {
      statusCode: this.statusCode,
      body: JSON.stringify(body),
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
