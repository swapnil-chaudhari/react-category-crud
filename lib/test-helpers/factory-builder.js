/*
 * Builds model factories for use in test.
 *
 * Returns a factory constructor, with `defaultValues`
 * that accepts new fields and field overrides from `values`,
 * and requires `requiredFields`
*/

const FactoryBuilder = (defaultValues = {}, requiredKeys = []) =>
    (values = {}) => {
        const instance = {
            ...defaultValues,
            ...values
        };

        const unsuppliedRequiredProperties = requiredKeys.length &&
            requiredKeys.filter(key => instance[key] === undefined);

        if (unsuppliedRequiredProperties && unsuppliedRequiredProperties.length)
            throw new Error(
                `Required properties [${unsuppliedRequiredProperties.join(', ')}] ` +
                `not found in: ${JSON.stringify(instance)}`
            );

        return instance;
    };

export default FactoryBuilder;
