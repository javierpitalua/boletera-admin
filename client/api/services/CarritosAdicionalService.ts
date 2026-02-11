/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarritosAdicionalListResponse } from '../models/CarritosAdicionalListResponse';
import type { CommandResult } from '../models/CommandResult';
import type { CreateCarritoAdicionalRequest } from '../models/CreateCarritoAdicionalRequest';
import type { DeleteCarritoAdicionalRequest } from '../models/DeleteCarritoAdicionalRequest';
import type { EditCarritoAdicionalRequest } from '../models/EditCarritoAdicionalRequest';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CarritosAdicionalService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1CarritosAdicionalCreate(
        requestBody?: CreateCarritoAdicionalRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/CarritosAdicional/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1CarritosAdicionalEdit(
        requestBody?: EditCarritoAdicionalRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/CarritosAdicional/Edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1CarritosAdicionalDelete(
        requestBody?: DeleteCarritoAdicionalRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/CarritosAdicional/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1CarritosAdicionalGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/CarritosAdicional/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param articuloAdicionalId
     * @param carritoDeCompraId
     * @param id
     * @returns CarritosAdicionalListResponse OK
     * @throws ApiError
     */
    public static getApiV1CarritosAdicionalList(
        articuloAdicionalId?: number,
        carritoDeCompraId?: number,
        id?: number,
    ): CancelablePromise<CarritosAdicionalListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/CarritosAdicional/List',
            query: {
                'ArticuloAdicionalId': articuloAdicionalId,
                'CarritoDeCompraId': carritoDeCompraId,
                'Id': id,
            },
        });
    }
}
