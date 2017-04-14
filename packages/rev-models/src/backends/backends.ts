
import { InMemoryBackend } from './inmemory';
import { ModelOperationResult } from '../operations/operationresult';
import { Model } from '../models/model';
import { IWhereQuery } from '../queries/query';
import { ICreateOptions } from '../operations/create';
import { IUpdateOptions } from '../operations/update';
import { IReadOptions } from '../operations/read';
import { IRemoveOptions } from '../operations/remove';
export * from './inmemory';

export interface IBackend {
    create<T extends Model>(model: T, result: ModelOperationResult<T>, options: ICreateOptions): Promise<void>;
    update<T extends Model>(model: T, where: IWhereQuery, result: ModelOperationResult<T>, options: IUpdateOptions): Promise<void>;
    remove<T extends Model>(model: new() => T, where: IWhereQuery, result: ModelOperationResult<T>, options: IRemoveOptions): Promise<void>;
    read<T extends Model>(model: new() => T, where: IWhereQuery, result: ModelOperationResult<T>, options: IReadOptions): Promise<void>;
}

let configuredBackends: {[backendName: string]: IBackend};

export function get(backendName: string): IBackend {
    if (!backendName) {
        throw new Error('BackendError: you must specify the name of the backend to get.');
    }
    if (!(backendName in configuredBackends)) {
        throw new Error(`BackendError: Backend '${backendName}' has has not been configured.`);
    }
    return configuredBackends[backendName];
}

export function configure(backendName: string, backend: IBackend) {
    if (!backendName) {
        throw new Error('BackendError: you must specify a name for the backend to configure.');
    }
    if (!backend || typeof backend != 'object') {
        throw new Error('BackendError: you must pass an instance of a backend class to backends.configure().');
    }
    if (typeof backend.create != 'function' || typeof backend.update != 'function'
        || typeof backend.read != 'function' || typeof backend.remove != 'function') {
        throw new Error('BackendError: the specified backend does not fully implement the IBackend interface.');
    }
    configuredBackends[backendName] = backend;
}

export function getAll(): {[backendName: string]: IBackend} {
    return configuredBackends;
}

export function resetBackends(): void {
    configuredBackends = {
        default: new InMemoryBackend()
    };
}

resetBackends();