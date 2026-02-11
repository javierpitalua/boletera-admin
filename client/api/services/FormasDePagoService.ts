/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormasDePagoListResponse } from '../models/FormasDePagoListResponse';
import type { SearchResultList } from '../models/SearchResultList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FormasDePagoService {
    /**
     * @param dominioId
     * @param id
     * @returns FormasDePagoListResponse OK
     * @throws ApiError
     */
    public static getApiV1FormasDePagoList(
        dominioId?: number,
        id?: number,
    ): CancelablePromise<FormasDePagoListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/FormasDePago/List',
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
    public static getApiV1FormasDePagoLoadSelectList(
        searchTerm?: string,
    ): CancelablePromise<SearchResultList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/FormasDePago/LoadSelectList',
            query: {
                'searchTerm': searchTerm,
            },
        });
    }
}
