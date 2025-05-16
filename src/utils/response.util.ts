import { HttpStatus } from "@nestjs/common";

export class ResponseEntity <T> {
    success: boolean;
    message: string;
    data: T
    status: number;

    constructor (success: boolean, message: string, data: T, status: number) {
        this.message = message;
        this.success = success;
        this.data = data;
        this.status = status;
    }

    static ok <T> (message: string, data: T): ResponseEntity<T> {
        return new ResponseEntity(true, message, data, HttpStatus.OK);
    }

    static created <T> (message: string, data: T): ResponseEntity<T> {
        return new ResponseEntity(true, message, data, HttpStatus.CREATED);
    }

    static notFound <T> (message: string, data: T): ResponseEntity<T> {
        return new ResponseEntity(false, message, data, HttpStatus.NOT_FOUND);
    }
}