/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResultList } from '../models/SearchResultList';
import type { TiposDeDistribucionListResponse } from '../models/TiposDeDistribucionListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TiposDeDistribucionService {
    /**
     * @param searchTerm
     * @returns SearchResultList OK
     * @throws ApiError
     */
    public static getApiV1TiposDeDistribucionLoadSelectList(
        searchTerm?: string,
    ): CancelablePromise<SearchResultList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/TiposDeDistribucion/LoadSelectList',
            query: {
                'searchTerm': searchTerm,
            },
        });
    }
    /**
     * @param dominioId
     * @param id
     * @returns TiposDeDistribucionListResponse OK
     * @throws ApiError
     */
    public static getApiV1TiposDeDistribucionList(
        dominioId?: number,
        id?: number,
    ): CancelablePromise<TiposDeDistribucionListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/TiposDeDistribucion/List',
            query: {
                'DominioId': dominioId,
                'Id': id,
            },
        });
    }
}
