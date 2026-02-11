/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CanalesDeVentaListResponse } from '../models/CanalesDeVentaListResponse';
import type { SearchResultList } from '../models/SearchResultList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CanalesDeVentaService {
    /**
     * @param dominioId
     * @param id
     * @returns CanalesDeVentaListResponse OK
     * @throws ApiError
     */
    public static getApiV1CanalesDeVentaList(
        dominioId?: number,
        id?: number,
    ): CancelablePromise<CanalesDeVentaListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/CanalesDeVenta/List',
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
    public static getApiV1CanalesDeVentaLoadSelectList(
        searchTerm?: string,
    ): CancelablePromise<SearchResultList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/CanalesDeVenta/LoadSelectList',
            query: {
                'searchTerm': searchTerm,
            },
        });
    }
}
