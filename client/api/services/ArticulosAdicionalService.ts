/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArticulosAdicionalListResponse } from '../models/ArticulosAdicionalListResponse';
import type { CommandResult } from '../models/CommandResult';
import type { CreateArticuloAdicionalRequest } from '../models/CreateArticuloAdicionalRequest';
import type { DeleteArticuloAdicionalRequest } from '../models/DeleteArticuloAdicionalRequest';
import type { EditArticuloAdicionalRequest } from '../models/EditArticuloAdicionalRequest';
import type { SearchResultList } from '../models/SearchResultList';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ArticulosAdicionalService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ArticulosAdicionalCreate(
        requestBody?: CreateArticuloAdicionalRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ArticulosAdicional/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ArticulosAdicionalEdit(
        requestBody?: EditArticuloAdicionalRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ArticulosAdicional/Edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ArticulosAdicionalDelete(
        requestBody?: DeleteArticuloAdicionalRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ArticulosAdicional/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1ArticulosAdicionalGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ArticulosAdicional/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param actividadHorarioUbicacionId
     * @param dominioId
     * @param id
     * @returns ArticulosAdicionalListResponse OK
     * @throws ApiError
     */
    public static getApiV1ArticulosAdicionalList(
        actividadHorarioUbicacionId?: number,
        dominioId?: number,
        id?: number,
    ): CancelablePromise<ArticulosAdicionalListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ArticulosAdicional/List',
            query: {
                'ActividadHorarioUbicacionId': actividadHorarioUbicacionId,
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
    public static getApiV1ArticulosAdicionalLoadSelectList(
        searchTerm?: string,
    ): CancelablePromise<SearchResultList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ArticulosAdicional/LoadSelectList',
            query: {
                'searchTerm': searchTerm,
            },
        });
    }
}
