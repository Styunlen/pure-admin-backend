/**
 * @param {Response} res: client's response object
 * @param {err} err: database error details
 * @produces application/json application/xml
 * @consumes application/json application/xml
 **/
import { messages } from "../../utils/messages";
function getErrorDetails(err) {
  let errMsg;
  err = err ?? "无";
  if (typeof err == "string") {
    errMsg = `详细错误: ${err}`;
  } else {
    errMsg = {};
    for (const key of Reflect.ownKeys(err)) {
      errMsg[String(key)] = err[key];
    }
  }
  return errMsg;
}

function retWithDatabaseError(res, err, msg?: string) {
  const errMsg = getErrorDetails(err);
  res.status(500).json({
    success: false,
    data: {
      message: `${messages.errMsg.databaseError} ${msg ?? ""}`,
      err: errMsg
    }
  });
}

function retWithQueryInvaildError(res, err, msg?: string) {
  const errMsg = getErrorDetails(err);
  res.status(403).json({
    success: false,
    data: {
      message: `${messages.errMsg.queryInvalid} ${msg ?? ""}`,
      err: errMsg
    }
  });
}

function retWithAccessViolation(res, errMsg?: string) {
  res.status(403).json({
    success: false,
    data: {
      message: messages.errMsg.operationInvalid,
      err: `${errMsg ?? ""}`
    }
  });
}

export const errorManger = {
  retWithDatabaseError,
  retWithQueryInvaildError,
  retWithAccessViolation
};
