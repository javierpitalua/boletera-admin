/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MotivosDeCancelacionListResponse } from '../models/MotivosDeCancelacionListResponse';
import type { SearchResultList } from '../models/SearchResultList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MotivosDeCancelacionService {
    /**
     * @param dominioId
     * @param id
     * @returns MotivosDeCancelacionListResponse OK
     * @throws ApiError
     */
    public static getApiV1MotivosDeCancelacionList(
        dominioId?: number,
        id?: number,
    ): CancelablePromise<MotivosDeCancelacionListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/MotivosDeCancelacion/List',
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
    public static getApiV1MotivosDeCancelacionLoadSelectList(
        searchTerm?: string,
    ): CancelablePromise<SearchResultList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/MotivosDeCancelacion/LoadSelectList',
            query: {
                'searchTerm': searchTerm,
            },
        });
    }
}
