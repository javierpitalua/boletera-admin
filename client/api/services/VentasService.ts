/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommandResult } from '../models/CommandResult';
import type { CreateVentaRequest } from '../models/CreateVentaRequest';
import type { DeleteVentaRequest } from '../models/DeleteVentaRequest';
import type { EditVentaRequest } from '../models/EditVentaRequest';
import type { SelectListItem } from '../models/SelectListItem';
import type { VentasListResponse } from '../models/VentasListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VentasService {
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1VentasCreate(
        requestBody?: CreateVentaRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Ventas/Create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1VentasEdit(
        requestBody?: EditVentaRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Ventas/Edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CommandResult OK
     * @throws ApiError
     */
    public static postApiV1VentasDelete(
        requestBody?: DeleteVentaRequest,
    ): CancelablePromise<CommandResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Ventas/Delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SelectListItem OK
     * @throws ApiError
     */
    public static getApiV1VentasGetDescription(
        id?: number,
    ): CancelablePromise<SelectListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Ventas/GetDescription',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param dominioId
     * @param canalDeVentaId
     * @param carritoCompraId
     * @param estadoDeVentaId
     * @param id
     * @returns VentasListResponse OK
     * @throws ApiError
     */
    public static getApiV1VentasList(
        dominioId?: number,
        canalDeVentaId?: number,
        carritoCompraId?: number,
        estadoDeVentaId?: number,
        id?: number,
    ): CancelablePromise<VentasListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Ventas/List',
            query: {
                'DominioId': dominioId,
                'CanalDeVentaId': canalDeVentaId,
                'CarritoCompraId': carritoCompraId,
                'EstadoDeVentaId': estadoDeVentaId,
                'Id': id,
            },
        });
    }
}
