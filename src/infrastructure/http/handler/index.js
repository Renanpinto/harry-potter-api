import _ from 'lodash';
import humps from 'humps';
import EVENTS from '../../../domain/global/events';

const HTTP_METHODS_WITH_BODY = ['PATCH', 'POST', 'PUT'];

class Handler {
  constructor(request, response, command) {
    this.request = request;
    this.response = response;
    this.command = command;
  }

  setupListeners(command) {
    command.on(EVENTS.validationFailed, this.onValidationFailed.bind(this));
    command.on(EVENTS.success, this.onSuccess.bind(this));
    command.on(EVENTS.noContent, this.onNoContent.bind(this));
    command.on(EVENTS.internalError, this.onError.bind(this));
  }

  onValidationFailed({ errors }) {
    this.response.status(400).json({
      message: errors.details.reduce((finalString, { message }) => `${finalString} ${message},`, ''),
    });
  }

  onError(message) {
    this.response.status(500).json({ message });
  }

  onNoContent(message) {
    this.response.status(204).json({ message });
  }

  onSuccess(message) {
    this.response.status(200).json(message);
  }

  buildInput() {
    const queryParams = this.getQueryParams(this.request.query);
    const headers = this.getHeadersInWhitelist(this.request.headers);
    const paramsSources = [queryParams, this.request.params];

    if (HTTP_METHODS_WITH_BODY.includes(this.request.method)) {
      paramsSources.unshift(this.request.body);
    }

    if (headers) {
      paramsSources.push({ headers });
    }

    return Object.assign({}, ...paramsSources);
  }

  getHeadersInWhitelist(headers) {
    const camelCaseHeaders = humps.camelizeKeys(headers);

    const whitelisted = _.pick(camelCaseHeaders, this.headersWhitelist);

    return Object.keys(whitelisted).length !== 0 ? whitelisted : undefined;
  }

  getQueryParams(params) {
    const queryParams = {};

    Object.keys(params).forEach((queryParam) => {
      try {
        queryParams[queryParam] = JSON.parse(params[queryParam]);
      } catch (error) {
        queryParams[queryParam] = params[queryParam];
      }
    });

    return queryParams;
  }

  async handle() {
    try {
      this.setupListeners(this.command);
      await this.command.execute(this.buildInput());
    } catch (error) {
      console.log('erro', error);
      this.response.status(500);
      this.response.json(error.toString());
    }
  }
}

export default Handler;
