/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActividadesPorZonaListResponse } from '../models/ActividadesPorZonaListResponse';
import type { CommandResult } from '../models/CommandResult';
import type { CreateActividadPorZonaRequest } from '../models/CreateActividadPorZonaRequest';
import type { DeleteActividadPorZonaRequest } from '../models/DeleteActividadPorZonaRequest';
import type { EditActividadPorZonaRequest } from '../models/EditActividadPorZonaRequest';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ActividadesPorZonaService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ActividadesPorZonaCreate(
        requestBody?: CreateActividadPorZonaRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ActividadesPorZona/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ActividadesPorZonaEdit(
        requestBody?: EditActividadPorZonaRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ActividadesPorZona/Edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ActividadesPorZonaDelete(
        requestBody?: DeleteActividadPorZonaRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ActividadesPorZona/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1ActividadesPorZonaGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ActividadesPorZona/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param tipoDeDistribucionId
     * @param actividadHorarioUbicacionId
     * @param zonaId
     * @param id
     * @returns ActividadesPorZonaListResponse OK
     * @throws ApiError
     */
    public static getApiV1ActividadesPorZonaList(
        tipoDeDistribucionId?: number,
        actividadHorarioUbicacionId?: number,
        zonaId?: number,
        id?: number,
    ): CancelablePromise<ActividadesPorZonaListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ActividadesPorZona/List',
            query: {
                'TipoDeDistribucionId': tipoDeDistribucionId,
                'ActividadHorarioUbicacionId': actividadHorarioUbicacionId,
                'ZonaId': zonaId,
                'Id': id,
            },
        });
    }
}
