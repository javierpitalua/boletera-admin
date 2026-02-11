/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommandResult } from '../models/CommandResult';
import type { CreateVentaPagoRequest } from '../models/CreateVentaPagoRequest';
import type { VentasPagoListResponse } from '../models/VentasPagoListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VentasPagoService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1VentasPagoCreate(
        requestBody?: CreateVentaPagoRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/VentasPago/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param estadoDePagoId
     * @param formaDePagoId
     * @param ventaId
     * @param id
     * @returns VentasPagoListResponse OK
     * @throws ApiError
     */
    public static getApiV1VentasPagoList(
        estadoDePagoId?: number,
        formaDePagoId?: number,
        ventaId?: number,
        id?: number,
    ): CancelablePromise<VentasPagoListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/VentasPago/List',
            query: {
                'EstadoDePagoId': estadoDePagoId,
                'FormaDePagoId': formaDePagoId,
                'VentaId': ventaId,
                'Id': id,
            },
        });
    }
}
