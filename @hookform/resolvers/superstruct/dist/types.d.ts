import { FieldValues, ResolverOptions, ResolverResult, UnpackNestedValue } from 'react-hook-form';
import { validate, Struct } from 'superstruct';
declare type Options = Parameters<typeof validate>[2];
export declare type Resolver = <T extends Struct<any, any>>(schema: T, factoryOtions?: Options) => <TFieldValues extends FieldValues, TContext>(values: UnpackNestedValue<TFieldValues>, context: TContext | undefined, options: ResolverOptions<TFieldValues>) => ResolverResult<TFieldValues>;
export {};
