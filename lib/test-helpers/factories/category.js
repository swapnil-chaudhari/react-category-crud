import { FactoryBuilder } from 'lib/test-helpers';

const defaultValues = {
    categoryTitle: 'Test News Category Title',
    categoryDescription: 'Test News Category Description',
    categoryId: 100
};

const requiredKeys = [
    'categoryTitle',
    'categoryDescription',
    'categoryId'
];

const CategoryFactory = FactoryBuilder(defaultValues, requiredKeys);


export default CategoryFactory;
