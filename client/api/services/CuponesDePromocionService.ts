/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommandResult } from '../models/CommandResult';
import type { CreateCuponDePromocionRequest } from '../models/CreateCuponDePromocionRequest';
import type { CuponesDePromocionListResponse } from '../models/CuponesDePromocionListResponse';
import type { DeleteCuponDePromocionRequest } from '../models/DeleteCuponDePromocionRequest';
import type { EditCuponDePromocionRequest } from '../models/EditCuponDePromocionRequest';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CuponesDePromocionService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1CuponesDePromocionCreate(
        requestBody?: CreateCuponDePromocionRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/CuponesDePromocion/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1CuponesDePromocionEdit(
        requestBody?: EditCuponDePromocionRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/CuponesDePromocion/Edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1CuponesDePromocionDelete(
        requestBody?: DeleteCuponDePromocionRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/CuponesDePromocion/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1CuponesDePromocionGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/CuponesDePromocion/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param dominioId
     * @param id
     * @returns CuponesDePromocionListResponse OK
     * @throws ApiError
     */
    public static getApiV1CuponesDePromocionList(
        dominioId?: number,
        id?: number,
    ): CancelablePromise<CuponesDePromocionListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/CuponesDePromocion/List',
            query: {
                'DominioId': dominioId,
                'Id': id,
            },
        });
    }
}
