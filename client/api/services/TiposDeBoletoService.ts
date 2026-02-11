/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResultList } from '../models/SearchResultList';
import type { TiposDeBoletoListResponse } from '../models/TiposDeBoletoListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TiposDeBoletoService {
    /**
     * @param searchTerm
     * @returns SearchResultList OK
     * @throws ApiError
     */
    public static getApiV1TiposDeBoletoLoadSelectList(
        searchTerm?: string,
    ): CancelablePromise<SearchResultList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/TiposDeBoleto/LoadSelectList',
            query: {
                'searchTerm': searchTerm,
            },
        });
    }
    /**
     * @param dominioId
     * @param id
     * @returns TiposDeBoletoListResponse OK
     * @throws ApiError
     */
    public static getApiV1TiposDeBoletoList(
        dominioId?: number,
        id?: number,
    ): CancelablePromise<TiposDeBoletoListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/TiposDeBoleto/List',
            query: {
                'DominioId': dominioId,
                'Id': id,
            },
        });
    }
}
