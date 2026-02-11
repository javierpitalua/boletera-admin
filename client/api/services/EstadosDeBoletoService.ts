/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EstadosDeBoletoListResponse } from '../models/EstadosDeBoletoListResponse';
import type { SearchResultList } from '../models/SearchResultList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EstadosDeBoletoService {
    /**
     * @param dominioId
     * @param id
     * @returns EstadosDeBoletoListResponse OK
     * @throws ApiError
     */
    public static getApiV1EstadosDeBoletoList(
        dominioId?: number,
        id?: number,
    ): CancelablePromise<EstadosDeBoletoListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/EstadosDeBoleto/List',
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
    public static getApiV1EstadosDeBoletoLoadSelectList(
        searchTerm?: string,
    ): CancelablePromise<SearchResultList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/EstadosDeBoleto/LoadSelectList',
            query: {
                'searchTerm': searchTerm,
            },
        });
    }
}
