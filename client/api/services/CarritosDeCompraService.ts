/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarritosDeCompraListResponse } from '../models/CarritosDeCompraListResponse';
import type { CommandResult } from '../models/CommandResult';
import type { CreateCarritoDeCompraRequest } from '../models/CreateCarritoDeCompraRequest';
import type { DeleteCarritoDeCompraRequest } from '../models/DeleteCarritoDeCompraRequest';
import type { EditCarritoDeCompraRequest } from '../models/EditCarritoDeCompraRequest';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CarritosDeCompraService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1CarritosDeCompraCreate(
        requestBody?: CreateCarritoDeCompraRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/CarritosDeCompra/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1CarritosDeCompraEdit(
        requestBody?: EditCarritoDeCompraRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/CarritosDeCompra/Edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1CarritosDeCompraDelete(
        requestBody?: DeleteCarritoDeCompraRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/CarritosDeCompra/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1CarritosDeCompraGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/CarritosDeCompra/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param canalDeVentaId
     * @param dominioId
     * @param usuarioId
     * @param id
     * @returns CarritosDeCompraListResponse OK
     * @throws ApiError
     */
    public static getApiV1CarritosDeCompraList(
        canalDeVentaId?: number,
        dominioId?: number,
        usuarioId?: number,
        id?: number,
    ): CancelablePromise<CarritosDeCompraListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/CarritosDeCompra/List',
            query: {
                'CanalDeVentaId': canalDeVentaId,
                'DominioId': dominioId,
                'UsuarioId': usuarioId,
                'Id': id,
            },
        });
    }
}
