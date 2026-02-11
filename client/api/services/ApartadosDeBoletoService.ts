/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApartadosDeBoletoListResponse } from '../models/ApartadosDeBoletoListResponse';
import type { CommandResult } from '../models/CommandResult';
import type { CreateApartadoDeBoletoRequest } from '../models/CreateApartadoDeBoletoRequest';
import type { DeleteApartadoDeBoletoRequest } from '../models/DeleteApartadoDeBoletoRequest';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApartadosDeBoletoService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ApartadosDeBoletoCreate(
        requestBody?: CreateApartadoDeBoletoRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ApartadosDeBoleto/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1ApartadosDeBoletoDelete(
        requestBody?: DeleteApartadoDeBoletoRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/ApartadosDeBoleto/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1ApartadosDeBoletoGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ApartadosDeBoleto/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param actividadHorarioUbicacionId
     * @param canalDeVentaId
     * @param tipoDeBoletoId
     * @param zonaId
     * @param id
     * @returns ApartadosDeBoletoListResponse OK
     * @throws ApiError
     */
    public static getApiV1ApartadosDeBoletoList(
        actividadHorarioUbicacionId?: number,
        canalDeVentaId?: number,
        tipoDeBoletoId?: number,
        zonaId?: number,
        id?: number,
    ): CancelablePromise<ApartadosDeBoletoListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ApartadosDeBoleto/List',
            query: {
                'ActividadHorarioUbicacionId': actividadHorarioUbicacionId,
                'CanalDeVentaId': canalDeVentaId,
                'TipoDeBoletoId': tipoDeBoletoId,
                'ZonaId': zonaId,
                'Id': id,
            },
        });
    }
}
