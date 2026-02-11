/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApartadosBoletoDestinatarioListResponse } from '../models/ApartadosBoletoDestinatarioListResponse';
import type { CommandResult } from '../models/CommandResult';
import type { CreateApartadoBoletoDestinatarioRequest } from '../models/CreateApartadoBoletoDestinatarioRequest';
import type { DeleteApartadoBoletoDestinatarioRequest } from '../models/DeleteApartadoBoletoDestinatarioRequest';
import type { EditApartadoBoletoDestinatarioRequest } from '../models/EditApartadoBoletoDestinatarioRequest';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApartadosBoletoDestinatarioService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ApartadosBoletoDestinatarioCreate(
        requestBody?: CreateApartadoBoletoDestinatarioRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ApartadosBoletoDestinatario/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ApartadosBoletoDestinatarioEdit(
        requestBody?: EditApartadoBoletoDestinatarioRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ApartadosBoletoDestinatario/Edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ApartadosBoletoDestinatarioDelete(
        requestBody?: DeleteApartadoBoletoDestinatarioRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ApartadosBoletoDestinatario/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1ApartadosBoletoDestinatarioGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ApartadosBoletoDestinatario/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param apartadoDeBoletoId
     * @param id
     * @returns ApartadosBoletoDestinatarioListResponse OK
     * @throws ApiError
     */
    public static getApiV1ApartadosBoletoDestinatarioList(
        apartadoDeBoletoId?: number,
        id?: number,
    ): CancelablePromise<ApartadosBoletoDestinatarioListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ApartadosBoletoDestinatario/List',
            query: {
                'ApartadoDeBoletoId': apartadoDeBoletoId,
                'Id': id,
            },
        });
    }
}
