/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResultList } from '../models/SearchResultList';
import type { TiposDeDescuentoListResponse } from '../models/TiposDeDescuentoListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TiposDeDescuentoService {
    /**
     * @param searchTerm
     * @returns SearchResultList OK
     * @throws ApiError
     */
    public static getApiV1TiposDeDescuentoLoadSelectList(
        searchTerm?: string,
    ): CancelablePromise<SearchResultList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/TiposDeDescuento/LoadSelectList',
            query: {
                'searchTerm': searchTerm,
            },
        });
    }
    /**
     * @param id
     * @returns TiposDeDescuentoListResponse OK
     * @throws ApiError
     */
    public static getApiV1TiposDeDescuentoList(
        id?: number,
    ): CancelablePromise<TiposDeDescuentoListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/TiposDeDescuento/List',
            query: {
                'Id': id,
            },
        });
    }
}
