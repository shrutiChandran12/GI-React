const logger = require('../utils/logger.js');
const errorutils = require('../utils/errorutils.js');
const origin = require('../utils/origin.js');
const constants = require('../utils/constants');
const headerutils = require('../utils/headerutil');

/**
 * Generate OTP for Registartion,forgot password
 * @param storeId,access_token
 * @return 200,OK if get success
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.generateOtp = function generateOtp(params, headers, callback) {
  if (!params.user_id) {
    logger.debug('Invalid Params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const otpGenerationUrl = `${constants.otp.replace(
    '{{storeId}}',
    headers.storeId,
  )}/generateOtp`;
  const reqHeader = headerutils.getWCSHeaders(headers);

  const reqBody = {
    logonId: params.user_id,
  };

  if (params.resend && params.resend === 'true') {
    reqBody.resend = true;
  }
  if (params.forgot_password && params.forgot_password === 'true') {
    reqBody.forgotPassword = true;
  }

  origin.getResponse(
    'POST',
    otpGenerationUrl,
    reqHeader,
    null,
    reqBody,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        logger.debug('Error while calling Generate Otp API');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

/**
 * Validate OTP
 * @param storeId,access_token
 * @return 200,OK if get success
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.validateOtp = function validateOtp(params, headers, callback) {
  if (!params.user_id || !params.otp) {
    logger.debug('Invalid Params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const otpValidationUrl = `${constants.otp.replace(
    '{{storeId}}',
    headers.storeId,
  )}/validateOtp`;
  const reqHeader = headerutils.getWCSHeaders(headers);

  const reqBody = {
    logonId: params.user_id,
    OTP: params.otp,
  };
  if (params.forgot_password && params.forgot_password === 'true') {
    reqBody.forgotPassword = true;
  }

  origin.getResponse(
    'POST',
    otpValidationUrl,
    reqHeader,
    null,
    reqBody,
    null,
    null,
    response => {
      if (response.status === 200) {
        const resJson = {
          message: 'OTP Validation Successfull',
        };
        callback(null, resJson);
      } else {
        logger.debug('Error while calling Validate Otp API');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};
