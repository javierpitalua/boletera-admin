/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActividadesListResponse } from '../models/ActividadesListResponse';
import type { CommandResult } from '../models/CommandResult';
import type { CreateActividadRequest } from '../models/CreateActividadRequest';
import type { DeleteActividadRequest } from '../models/DeleteActividadRequest';
import type { EditActividadRequest } from '../models/EditActividadRequest';
import type { SearchResultList } from '../models/SearchResultList';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ActividadesService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ActividadesCreate(
        requestBody?: CreateActividadRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Actividades/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ActividadesEdit(
        requestBody?: EditActividadRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Actividades/Edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ActividadesDelete(
        requestBody?: DeleteActividadRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Actividades/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1ActividadesGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Actividades/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param eventoId
     * @param id
     * @returns ActividadesListResponse OK
     * @throws ApiError
     */
    public static getApiV1ActividadesList(
        eventoId?: number,
        id?: number,
    ): CancelablePromise<ActividadesListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Actividades/List',
            query: {
                'EventoId': eventoId,
                'Id': id,
            },
        });
    }
    /**
     * @param searchTerm
     * @returns SearchResultList OK
     * @throws ApiError
     */
    public static getApiV1ActividadesLoadSelectList(
        searchTerm?: string,
    ): CancelablePromise<SearchResultList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Actividades/LoadSelectList',
            query: {
                'searchTerm': searchTerm,
            },
        });
    }
}
