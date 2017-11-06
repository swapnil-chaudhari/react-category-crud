import React, { Component, PropTypes } from 'react';
import { FormField } from 'frontend-react-components';
import * as AppPropTypes from 'src/prop-types';
import { intlShape, intl } from 'react-intl';
import wrapFormatMessage from 'src/utils/wrap-format-message';
import { fieldMessages } from './i18n';


const propTypes = {
    onChange: PropTypes.func.isRequired,
    categoryDescription: PropTypes.string,
    errorMessage: PropTypes.oneOfType([PropTypes.string, AppPropTypes.messageDescriptor])
};

const CategoryDescription = ({
    categoryDescription,
    onChange,
    errorMessage
}, {
    intl: { formatMessage: intlFormatMessage }
}) => {
    const formatMessage = wrapFormatMessage(intlFormatMessage);
    return (
        <FormField
            errorMessage={ formatMessage(errorMessage) }
            help={ formatMessage(fieldMessages.categoryDescription.help) }
            isRequired
            label={ formatMessage(fieldMessages.categoryDescription.label) }
            id="category-description-input"
        >

        <input
            className="form-control"
            onChange={ onChange }
            value={ categoryDescription }
            placeholder={ formatMessage(fieldMessages.categoryDescription.placeholder) }
        />
        </FormField>
    );
};

CategoryDescription.propTypes = propTypes;

CategoryDescription.contextTypes = {
    intl: intlShape.isRequired
};

export default CategoryDescription;
