/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommandResult } from '../models/CommandResult';
import type { CreateMesaRequest } from '../models/CreateMesaRequest';
import type { DeleteMesaRequest } from '../models/DeleteMesaRequest';
import type { EditMesaRequest } from '../models/EditMesaRequest';
import type { MesasListResponse } from '../models/MesasListResponse';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MesasService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1MesasCreate(
        requestBody?: CreateMesaRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Mesas/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1MesasEdit(
        requestBody?: EditMesaRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Mesas/Edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1MesasDelete(
        requestBody?: DeleteMesaRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Mesas/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1MesasGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Mesas/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param actividadPorZonaId
     * @param id
     * @returns MesasListResponse OK
     * @throws ApiError
     */
    public static getApiV1MesasList(
        actividadPorZonaId?: number,
        id?: number,
    ): CancelablePromise<MesasListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Mesas/List',
            query: {
                'ActividadPorZonaId': actividadPorZonaId,
                'Id': id,
            },
        });
    }
}
