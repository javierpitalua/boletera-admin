/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommandResult } from '../models/CommandResult';
import type { CreateReembolsoRequest } from '../models/CreateReembolsoRequest';
import type { DeleteReembolsoRequest } from '../models/DeleteReembolsoRequest';
import type { ReembolsosListResponse } from '../models/ReembolsosListResponse';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReembolsosService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ReembolsosCreate(
        requestBody?: CreateReembolsoRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Reembolsos/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ReembolsosDelete(
        requestBody?: DeleteReembolsoRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Reembolsos/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1ReembolsosGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Reembolsos/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param motivoDeCancelacionId
     * @param ventaId
     * @param id
     * @returns ReembolsosListResponse OK
     * @throws ApiError
     */
    public static getApiV1ReembolsosList(
        motivoDeCancelacionId?: number,
        ventaId?: number,
        id?: number,
    ): CancelablePromise<ReembolsosListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Reembolsos/List',
            query: {
                'MotivoDeCancelacionId': motivoDeCancelacionId,
                'VentaId': ventaId,
                'Id': id,
            },
        });
    }
}
