/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommandResult } from '../models/CommandResult';
import type { CreatePromocionRequest } from '../models/CreatePromocionRequest';
import type { DeletePromocionRequest } from '../models/DeletePromocionRequest';
import type { EditPromocionRequest } from '../models/EditPromocionRequest';
import type { PromocionesListResponse } from '../models/PromocionesListResponse';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PromocionesService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1PromocionesCreate(
        requestBody?: CreatePromocionRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Promociones/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1PromocionesEdit(
        requestBody?: EditPromocionRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Promociones/Edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1PromocionesDelete(
        requestBody?: DeletePromocionRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Promociones/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1PromocionesGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Promociones/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param dominioId
     * @param tipoDeDescuentoId
     * @param id
     * @returns PromocionesListResponse OK
     * @throws ApiError
     */
    public static getApiV1PromocionesList(
        dominioId?: number,
        tipoDeDescuentoId?: number,
        id?: number,
    ): CancelablePromise<PromocionesListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Promociones/List',
            query: {
                'DominioId': dominioId,
                'TipoDeDescuentoId': tipoDeDescuentoId,
                'Id': id,
            },
        });
    }
}
