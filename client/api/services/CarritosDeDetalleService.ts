/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarritosDeDetalleListResponse } from '../models/CarritosDeDetalleListResponse';
import type { CommandResult } from '../models/CommandResult';
import type { CreateCarritoDeDetalleRequest } from '../models/CreateCarritoDeDetalleRequest';
import type { DeleteCarritoDeDetalleRequest } from '../models/DeleteCarritoDeDetalleRequest';
import type { EditCarritoDeDetalleRequest } from '../models/EditCarritoDeDetalleRequest';
import type { SelectListItem } from '../models/SelectListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CarritosDeDetalleService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1CarritosDeDetalleCreate(
        requestBody?: CreateCarritoDeDetalleRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/CarritosDeDetalle/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1CarritosDeDetalleEdit(
        requestBody?: EditCarritoDeDetalleRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/CarritosDeDetalle/Edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1CarritosDeDetalleDelete(
        requestBody?: DeleteCarritoDeDetalleRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/CarritosDeDetalle/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1CarritosDeDetalleGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/CarritosDeDetalle/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param actividadHorarioUbicacionId
     * @param tipoDeBoletoId
     * @param zonaId
     * @param carritoDeCompraId
     * @param id
     * @returns CarritosDeDetalleListResponse OK
     * @throws ApiError
     */
    public static getApiV1CarritosDeDetalleList(
        actividadHorarioUbicacionId?: number,
        tipoDeBoletoId?: number,
        zonaId?: number,
        carritoDeCompraId?: number,
        id?: number,
    ): CancelablePromise<CarritosDeDetalleListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/CarritosDeDetalle/List',
            query: {
                'ActividadHorarioUbicacionId': actividadHorarioUbicacionId,
                'TipoDeBoletoId': tipoDeBoletoId,
                'ZonaId': zonaId,
                'CarritoDeCompraId': carritoDeCompraId,
                'Id': id,
            },
        });
    }
}
