/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EstadosDeVentaListResponse } from '../models/EstadosDeVentaListResponse';
import type { SearchResultList } from '../models/SearchResultList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EstadosDeVentaService {
    /**
     * @param searchTerm
     * @returns SearchResultList OK
     * @throws ApiError
     */
    public static getApiV1EstadosDeVentaLoadSelectList(
        searchTerm?: string,
    ): CancelablePromise<SearchResultList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/EstadosDeVenta/LoadSelectList',
            query: {
                'searchTerm': searchTerm,
            },
        });
    }
    /**
     * @param dominioId
     * @param id
     * @returns EstadosDeVentaListResponse OK
     * @throws ApiError
     */
    public static getApiV1EstadosDeVentaList(
        dominioId?: number,
        id?: number,
    ): CancelablePromise<EstadosDeVentaListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/EstadosDeVenta/List',
            query: {
                'DominioId': dominioId,
                'Id': id,
            },
        });
    }
}
