import axios, { AxiosError, AxiosResponse, HttpStatusCode, isAxiosError } from "axios";
import { GlobalError } from "./types";

export type ErrorMessage = {
  message: string;
  code: string | null;
};

const HTTP_ERROR_DESCRIPTIONS: Partial<Record<HttpStatusCode, string>> = {
  [HttpStatusCode.BadRequest]: "Некорректный запрос (400): проверьте введенные данные.",
  [HttpStatusCode.Unauthorized]: "Необходима авторизация (401): войдите в аккаунт.",
  [HttpStatusCode.Forbidden]: "Доступ запрещен (403): недостаточно прав для операции.",
  [HttpStatusCode.NotFound]: "Ресурс не найден (404): проверьте адрес или параметры.",
  [HttpStatusCode.Conflict]: "Конфликт данных (409): попробуйте обновить данные и повторить.",
  [HttpStatusCode.UnprocessableEntity]: "Ошибка валидации (422): проверьте корректность заполненных полей.",
  [HttpStatusCode.TooManyRequests]: "Слишком много запросов (429): повторите попытку немного позже.",
  [HttpStatusCode.InternalServerError]: "Внутренняя ошибка сервера (500): попробуйте повторить запрос позже.",
  [HttpStatusCode.BadGateway]: "Ошибка шлюза (502): проблема на стороне промежуточного сервиса.",
  [HttpStatusCode.ServiceUnavailable]: "Сервис временно недоступен (503): попробуйте повторить запрос позже.",
  [HttpStatusCode.GatewayTimeout]: "Тайм-аут шлюза (504): сервис долго не отвечает, попробуйте позже.",
};

const ERROR_DESCRIPTIONS: Record<string, string> = {
  [AxiosError.ERR_BAD_OPTION_VALUE]: "Недопустимое значение параметра в конфигурации.",
  [AxiosError.ERR_BAD_OPTION]: "Недопустимый параметр в конфигурации.",
  [AxiosError.ERR_DEPRECATED]: "Используется устаревшая возможность: обновите конфигурацию.",
  [AxiosError.ERR_CANCELED]: "Запрос отменен пользователем.",
  [AxiosError.ERR_NETWORK]: "Сетевая ошибка: не удалось установить соединение с сервером.",
  [AxiosError.ECONNABORTED]: "Превышено время ожидания ответа от сервера.",
  [AxiosError.ETIMEDOUT]: "Тайм-аут соединения: сервер не ответил вовремя.",
  [AxiosError.ERR_FR_TOO_MANY_REDIRECTS]: "Слишком много перенаправлений при выполнении запроса.",
  [AxiosError.ERR_BAD_REQUEST]: "Некорректный запрос: проверьте параметры и тело запроса.",
  [AxiosError.ERR_BAD_RESPONSE]: "Сервер вернул некорректный или неполный ответ.",
  [AxiosError.ERR_INVALID_URL]: "Некорректный URL запроса.",
  [AxiosError.ERR_NOT_SUPPORT]: "Операция не поддерживается в текущем окружении выполнения.",
};

export class ErrorUtils {
  static getErrors(error: unknown): ErrorMessage {
    let errorMessages: ErrorMessage;

    if (axios.isAxiosError(error)) {
      if (error.response) {
        // ответ от сервера
        errorMessages = this._getResponseErrors(error.response, error.message, error.code);
      } else if (error.request) {
        // запрос ушел - ответ не пришел
        errorMessages = this._getRequestErrors(error.code);
      } else {
        // локальный инстанс ошибки
        const axiosValidationMessage = this._tryGetLocalErrorFromData(error);

        if (axiosValidationMessage) {
          errorMessages = axiosValidationMessage;
        } else {
          errorMessages = {
            message: "Не удалось отправить запрос",
            code: error.code ?? null,
          };
        }
      }
    } else {
      // ошибка не является инстансом AxiosError
      errorMessages = this._handleNotAxiosError(error);
    }

    return this._processErrorMessages(errorMessages);
  }

  private static _getResponseErrors(response: AxiosResponse, message: string, code?: string): ErrorMessage {
    // Попытка распознать модель ошибки, которую прислал сервер
    const errorMessageFromData = this._tryGetErrorFromData(response);

    if (errorMessageFromData?.message) {
      return errorMessageFromData;
    }

    // сообщение из списка статусов
    const errorMessageFromStatus = HTTP_ERROR_DESCRIPTIONS[response.status as HttpStatusCode];

    if (errorMessageFromStatus) {
      return { message: errorMessageFromStatus, code: code ?? null };
    }

    return { message, code: code ?? null };
  }

  private static _tryGetErrorFromData(response: AxiosResponse): ErrorMessage | undefined {
    if (!response.data) {
      return undefined;
    }

    const data = response.data as GlobalError;

    return { message: data?.message, code: data.code };
  }

  private static _tryGetLocalErrorFromData(error: AxiosError): ErrorMessage | undefined {
    if (isAxiosError(error) && error.code) {
      return { message: error.message, code: error.code };
    }

    return undefined;
  }

  private static _getRequestErrors(code?: string): ErrorMessage {
    if (code) {
      /* Получаем сообщение об ошибке на основе кода ошибки */
      const errorMessage = ERROR_DESCRIPTIONS[code];

      if (errorMessage) {
        return { message: errorMessage, code };
      }
    }

    return { message: "Не удалось получить ответ от сервера", code: null };
  }

  private static _handleNotAxiosError(error: unknown): ErrorMessage {
    if (error instanceof Error) {
      return { message: "Ошибка на стороне клиента", code: null };
    }

    return typeof error === "string"
      ? { message: error, code: null }
      : { message: "Ошибка на стороне клиента", code: null };
  }

  private static _processErrorMessages(message: ErrorMessage): ErrorMessage {
    return {
      ...message,
    };
  }
}
