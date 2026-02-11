/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoletosListResponse } from '../models/BoletosListResponse';
import type { CommandResult } from '../models/CommandResult';
import type { CreateBoletoRequest } from '../models/CreateBoletoRequest';
import type { DeleteBoletoRequest } from '../models/DeleteBoletoRequest';
import type { EditBoletoRequest } from '../models/EditBoletoRequest';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoletosService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1BoletosCreate(
        requestBody?: CreateBoletoRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Boletos/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1BoletosEdit(
        requestBody?: EditBoletoRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Boletos/Edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1BoletosDelete(
        requestBody?: DeleteBoletoRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Boletos/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1BoletosGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Boletos/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param actividadHorarioUbicacionId
     * @param canalDeVentaId
     * @param estadoDeBoletoId
     * @param tipoDeBoletoId
     * @param ventaId
     * @param zonaId
     * @param id
     * @returns BoletosListResponse OK
     * @throws ApiError
     */
    public static getApiV1BoletosList(
        actividadHorarioUbicacionId?: number,
        canalDeVentaId?: number,
        estadoDeBoletoId?: number,
        tipoDeBoletoId?: number,
        ventaId?: number,
        zonaId?: number,
        id?: number,
    ): CancelablePromise<BoletosListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Boletos/List',
            query: {
                'ActividadHorarioUbicacionId': actividadHorarioUbicacionId,
                'CanalDeVentaId': canalDeVentaId,
                'EstadoDeBoletoId': estadoDeBoletoId,
                'TipoDeBoletoId': tipoDeBoletoId,
                'VentaId': ventaId,
                'ZonaId': zonaId,
                'Id': id,
            },
        });
    }
}
