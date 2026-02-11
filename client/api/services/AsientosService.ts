/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AsientosListResponse } from '../models/AsientosListResponse';
import type { CommandResult } from '../models/CommandResult';
import type { CreateAsientoRequest } from '../models/CreateAsientoRequest';
import type { DeleteAsientoRequest } from '../models/DeleteAsientoRequest';
import type { EditAsientoRequest } from '../models/EditAsientoRequest';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AsientosService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1AsientosCreate(
        requestBody?: CreateAsientoRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Asientos/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1AsientosEdit(
        requestBody?: EditAsientoRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Asientos/Edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1AsientosDelete(
        requestBody?: DeleteAsientoRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Asientos/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1AsientosGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Asientos/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param actividadPorZonaId
     * @param mesaId
     * @param id
     * @returns AsientosListResponse OK
     * @throws ApiError
     */
    public static getApiV1AsientosList(
        actividadPorZonaId?: number,
        mesaId?: number,
        id?: number,
    ): CancelablePromise<AsientosListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Asientos/List',
            query: {
                'ActividadPorZonaId': actividadPorZonaId,
                'MesaId': mesaId,
                'Id': id,
            },
        });
    }
}
