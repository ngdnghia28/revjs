import { VALIDATION_MESSAGES as msg } from '../validationmsg';
import { isSet } from '../../utils';
import { IModel, IModelManager, IValidationOptions } from '../../models/types';
import { Field } from '../../fields/field';
import { IModelOperation } from '../../operations/operation';
import { ModelValidationResult } from '../validationresult';

/**
 * Functions that match this interface can be added to [[Field.validators]] for
 * any field type.
 */
export type IFieldValidator =
    <T extends IModel>(
        manager: IModelManager,
        model: T,
        field: Field,
        operation: IModelOperation,
        result: ModelValidationResult,
        options?: IValidationOptions) => void;

/**
 * Functions that match this interface can be added to [[Field.asyncValidators]]
 * for any field type.
 */
export type IAsyncFieldValidator =
    <T extends IModel>(
        manager: IModelManager,
        model: T,
        field: Field,
        operation: IModelOperation,
        result: ModelValidationResult,
        options?: IValidationOptions) => Promise<void>;

/**
 * @private
 */
export function requiredValidator<T extends IModel>(manager: IModelManager, model: T, field: Field, operation: IModelOperation, result: ModelValidationResult, options?: IValidationOptions): void {
    if (!isSet(model[field.name])) {
        result.addFieldError(
            field.name,
            msg.required(field.name),
            'required'
        );
    }
}

/**
 * @private
 */
export function stringValidator<T extends IModel>(manager: IModelManager, model: T, field: Field, operation: IModelOperation, result: ModelValidationResult, options?: IValidationOptions): void {
    if (isSet(model[field.name]) && typeof model[field.name] != 'string') {
        result.addFieldError(
            field.name,
            msg.not_a_string(field.name),
            'not_a_string'
        );
    }
}

/**
 * @private
 */
export function stringEmptyValidator<T extends IModel>(manager: IModelManager, model: T, field: Field, operation: IModelOperation, result: ModelValidationResult, options?: IValidationOptions): void {
    if (typeof model[field.name] == 'string'
            && model[field.name].length == 0) {
        result.addFieldError(
            field.name,
            msg.string_empty(field.name),
            'string_empty'
        );
    }
}

/**
 * @private
 */
export function regExValidator<T extends IModel>(manager: IModelManager, model: T, field: Field, operation: IModelOperation, result: ModelValidationResult, options?: IValidationOptions): void {
    if (typeof model[field.name] == 'string'
            && typeof field.options.regEx == 'object'
            && field.options.regEx instanceof RegExp
            && !field.options.regEx.test(model[field.name])) {
        result.addFieldError(
            field.name,
            msg.no_regex_match(field.name),
            'no_regex_match'
        );
    }
}

/**
 * @private
 */
export function numberValidator<T extends IModel>(manager: IModelManager, model: T, field: Field, operation: IModelOperation, result: ModelValidationResult, options?: IValidationOptions): void {
    if (isSet(model[field.name]) && (
        isNaN(model[field.name]) || model[field.name] === '')) {
        result.addFieldError(
            field.name,
            msg.not_a_number(field.name),
            'not_a_number'
        );
    }
}

/**
 * @private
 */
export function integerValidator<T extends IModel>(manager: IModelManager, model: T, field: Field, operation: IModelOperation, result: ModelValidationResult, options?: IValidationOptions): void {
    if (isSet(model[field.name]) && !(/^(-?[1-9][0-9]*|0)$/.test(model[field.name]))) {
        result.addFieldError(
            field.name,
            msg.not_an_integer(field.name),
            'not_an_integer'
        );
    }
}

/**
 * @private
 */
export function booleanValidator<T extends IModel>(manager: IModelManager, model: T, field: Field, operation: IModelOperation, result: ModelValidationResult, options?: IValidationOptions): void {
    if (isSet(model[field.name]) && typeof model[field.name] != 'boolean') {
        result.addFieldError(
            field.name,
            msg.not_a_boolean(field.name),
            'not_a_boolean'
        );
    }
}

/**
 * @private
 */
export function minStringLengthValidator<T extends IModel>(manager: IModelManager, model: T, field: Field, operation: IModelOperation, result: ModelValidationResult, options?: IValidationOptions): void {
    if (typeof model[field.name] == 'string'
            && model[field.name].length < field.options.minLength) {
        result.addFieldError(
            field.name,
            msg.min_string_length(field.name, field.options.minLength),
            'min_string_length'
        );
    }
}

/**
 * @private
 */
export function maxStringLengthValidator<T extends IModel>(manager: IModelManager, model: T, field: Field, operation: IModelOperation, result: ModelValidationResult, options?: IValidationOptions): void {
    if (typeof model[field.name] == 'string'
            && model[field.name].length > field.options.maxLength) {
        result.addFieldError(
            field.name,
            msg.max_string_length(field.name, field.options.maxLength),
            'max_string_length'
        );
    }
}

/**
 * @private
 */
export function minValueValidator<T extends IModel>(manager: IModelManager, model: T, field: Field, operation: IModelOperation, result: ModelValidationResult, options?: IValidationOptions): void {
    if (isSet(model[field.name])
            && model[field.name] < field.options.minValue) {
        result.addFieldError(
            field.name,
            msg.min_value(field.name, field.options.minValue),
            'min_value'
        );
    }
}

/**
 * @private
 */
export function maxValueValidator<T extends IModel>(manager: IModelManager, model: T, field: Field, operation: IModelOperation, result: ModelValidationResult, options?: IValidationOptions): void {
    if (isSet(model[field.name])
            && model[field.name] > field.options.maxValue) {
        result.addFieldError(
            field.name,
            msg.max_value(field.name, field.options.maxValue),
            'max_value'
        );
    }
}
