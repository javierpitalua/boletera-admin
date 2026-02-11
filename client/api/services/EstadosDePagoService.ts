/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EstadosDePagoListResponse } from '../models/EstadosDePagoListResponse';
import type { SearchResultList } from '../models/SearchResultList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EstadosDePagoService {
    /**
     * @param dominioId
     * @param id
     * @returns EstadosDePagoListResponse OK
     * @throws ApiError
     */
    public static getApiV1EstadosDePagoList(
        dominioId?: number,
        id?: number,
    ): CancelablePromise<EstadosDePagoListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/EstadosDePago/List',
            query: {
                'DominioId': dominioId,
                'Id': id,
            },
        });
    }
    /**
     * @param searchTerm
     * @returns SearchResultList OK
     * @throws ApiError
     */
    public static getApiV1EstadosDePagoLoadSelectList(
        searchTerm?: string,
    ): CancelablePromise<SearchResultList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/EstadosDePago/LoadSelectList',
            query: {
                'searchTerm': searchTerm,
            },
        });
    }
}
