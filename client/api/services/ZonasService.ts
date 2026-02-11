/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResultList } from '../models/SearchResultList';
import type { ZonasListResponse } from '../models/ZonasListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ZonasService {
    /**
     * @param searchTerm
     * @returns SearchResultList OK
     * @throws ApiError
     */
    public static getApiV1ZonasLoadSelectList(
        searchTerm?: string,
    ): CancelablePromise<SearchResultList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Zonas/LoadSelectList',
            query: {
                'searchTerm': searchTerm,
            },
        });
    }
    /**
     * @param dominioId
     * @param id
     * @returns ZonasListResponse OK
     * @throws ApiError
     */
    public static getApiV1ZonasList(
        dominioId?: number,
        id?: number,
    ): CancelablePromise<ZonasListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Zonas/List',
            query: {
                'DominioId': dominioId,
                'Id': id,
            },
        });
    }
}
