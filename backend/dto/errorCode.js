module.exports = {
  SUCCESS: { result: true, code: "SUCCESS" },

  // GENERAL
  NOT_FOUND:          { result: false, code: "NOT_FOUND" },
  INVALID_PARAMETER:  { result: false, code: "INVALID_PARAMETER" },
  INTERNAL_EXCEPTION: { result: false, code: "INTERNAL_EXCEPTION" },
  UNAUTHORIZED:       { result: false, code: "UNAUTHORIZED" },
  DATABASE_EXCEPTION: { result: false, code: "DATABASE_EXCEPTION" },
  NO_DATABASE_TABLE: { result: false, code: "NO_DATABASE_TABLE" },
  PERMISSION_DENIED:  { result: false, code: "PERMISSION_DENIED" },

  // AUTH
  NO_USER_ACCOUNT:         { result: false, code: "NO_USER_ACCOUNT" },
  USER_EXIST:              { result: false, code: "USER_EXIST" },
  CONFIRM_EMAIL:           { result: false, code: "CONFIRM_EMAIL" },
  LONIN_FAILD:             { result: false, code: "LONIN_FAILD" },
  EXPIRED_TOKEN:           { result: false, code: "EXPIRED_TOKEN" },
  TOKEN_REQUIRED:          { result: false, code: "TOKEN_REQUIRED" },
  PASSWORD_RESET_REQUIRED: { result: false, code: "PASSWORD_RESET_REQUIRED" },

  // CONNECT
  NO_APP_DATA:             { result: false, code: "NO_APP_DATA" },
  NO_USER_CONNECT_TOKEN:   { result: false, code: "NO_USER_CONNECT_TOKEN" },
  NO_ACCESS_TOKEN_DATA:    { result: false, code: "NO_ACCESS_TOKEN_DATA" },
  EXPIRED_REFRESH_TOKEN:   { result: false, code: "EXPIRED_REFRESH_TOKEN" },
  NO_AD_ACCOUNT_ID_DATA:   { result: false, code: "NO_AD_ACCOUNT_ID_DATA" },

  NO_DATA: { result: false, code: "NO_DATA" },
}