/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommandResult } from '../models/CommandResult';
import type { CreatePrecioDeBoletoRequest } from '../models/CreatePrecioDeBoletoRequest';
import type { DeletePrecioDeBoletoRequest } from '../models/DeletePrecioDeBoletoRequest';
import type { EditPrecioDeBoletoRequest } from '../models/EditPrecioDeBoletoRequest';
import type { PreciosDeBoletoListResponse } from '../models/PreciosDeBoletoListResponse';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PreciosDeBoletoService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1PreciosDeBoletoCreate(
        requestBody?: CreatePrecioDeBoletoRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/PreciosDeBoleto/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1PreciosDeBoletoEdit(
        requestBody?: EditPrecioDeBoletoRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/PreciosDeBoleto/Edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1PreciosDeBoletoDelete(
        requestBody?: DeletePrecioDeBoletoRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/PreciosDeBoleto/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1PreciosDeBoletoGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/PreciosDeBoleto/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param actividadHorarioUbicacionId
     * @param tipoDeBoletoId
     * @param zonaId
     * @param id
     * @returns PreciosDeBoletoListResponse OK
     * @throws ApiError
     */
    public static getApiV1PreciosDeBoletoList(
        actividadHorarioUbicacionId?: number,
        tipoDeBoletoId?: number,
        zonaId?: number,
        id?: number,
    ): CancelablePromise<PreciosDeBoletoListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/PreciosDeBoleto/List',
            query: {
                'ActividadHorarioUbicacionId': actividadHorarioUbicacionId,
                'TipoDeBoletoId': tipoDeBoletoId,
                'ZonaId': zonaId,
                'Id': id,
            },
        });
    }
}
