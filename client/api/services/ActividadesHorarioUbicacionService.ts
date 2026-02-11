/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActividadesHorarioUbicacionListResponse } from '../models/ActividadesHorarioUbicacionListResponse';
import type { CommandResult } from '../models/CommandResult';
import type { CreateActividadHorarioUbicacionRequest } from '../models/CreateActividadHorarioUbicacionRequest';
import type { DeleteActividadHorarioUbicacionRequest } from '../models/DeleteActividadHorarioUbicacionRequest';
import type { EditActividadHorarioUbicacionRequest } from '../models/EditActividadHorarioUbicacionRequest';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ActividadesHorarioUbicacionService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ActividadesHorarioUbicacionCreate(
        requestBody?: CreateActividadHorarioUbicacionRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ActividadesHorarioUbicacion/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ActividadesHorarioUbicacionEdit(
        requestBody?: EditActividadHorarioUbicacionRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ActividadesHorarioUbicacion/Edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ActividadesHorarioUbicacionDelete(
        requestBody?: DeleteActividadHorarioUbicacionRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ActividadesHorarioUbicacion/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1ActividadesHorarioUbicacionGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ActividadesHorarioUbicacion/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param actividadId
     * @param ubicacionId
     * @param id
     * @returns ActividadesHorarioUbicacionListResponse OK
     * @throws ApiError
     */
    public static getApiV1ActividadesHorarioUbicacionList(
        actividadId?: number,
        ubicacionId?: number,
        id?: number,
    ): CancelablePromise<ActividadesHorarioUbicacionListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ActividadesHorarioUbicacion/List',
            query: {
                'ActividadId': actividadId,
                'UbicacionId': ubicacionId,
                'Id': id,
            },
        });
    }
}
