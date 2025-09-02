import { 
    calculateDynamicGridLayout, 
    getAutoFlowGridClasses, 
    getGridContainerClasses,
    getGridContainerClassesWithRows 
} from './dynamicGridLayout';
import { FieldConfig } from '@/common/types/formType';

// Mock field configurations for testing
const mockFields: FieldConfig[] = [
    {
        type: "input",
        key: "field1",
        label: "Field 1",
        gridCols: 6,
        required: true,
    },
    {
        type: "input",
        key: "field2",
        label: "Field 2",
        gridCols: 6,
        required: true,
        isHide: (dependentValues: any) => dependentValues?.hideField2,
        getDependentValue: (formValues: any) => ({ hideField2: formValues.hideField2 }),
    },
    {
        type: "input",
        key: "field3",
        label: "Field 3",
        gridCols: 12,
        required: true,
    },
];

describe('Dynamic Grid Layout', () => {
    describe('getGridContainerClasses', () => {
        it('should return correct grid container classes', () => {
            const result = getGridContainerClasses();
            expect(result).toBe('grid grid-cols-12 gap-4 auto-rows-auto');
        });
    });

    describe('getGridContainerClassesWithRows', () => {
        it('should return correct grid container classes with rows', () => {
            const result = getGridContainerClassesWithRows();
            expect(result).toBe('grid grid-cols-12 gap-4 auto-rows-min');
        });
    });

    describe('getAutoFlowGridClasses', () => {
        it('should return correct grid classes for visible fields', () => {
            const field = mockFields[0]; // field1 with gridCols: 6
            const result = getAutoFlowGridClasses(field, {});
            expect(result).toBe('col-span-6');
        });

        it('should return hidden class for hidden fields', () => {
            const field = mockFields[1]; // field2 with isHide logic
            const result = getAutoFlowGridClasses(field, { hideField2: true });
            expect(result).toBe('hidden');
        });

        it('should return visible class when field should not be hidden', () => {
            const field = mockFields[1]; // field2 with isHide logic
            const result = getAutoFlowGridClasses(field, { hideField2: false });
            expect(result).toBe('col-span-6');
        });

        it('should return col-span-12 for fields without gridCols', () => {
            const field = { ...mockFields[0], gridCols: undefined };
            const result = getAutoFlowGridClasses(field, {});
            expect(result).toBe('col-span-12');
        });
    });

    describe('calculateDynamicGridLayout', () => {
        it('should calculate correct layout for visible fields only', () => {
            const formValues = { hideField2: true }; // Hide field2
            const result = calculateDynamicGridLayout(mockFields, formValues);
            
            // field1 should be visible and take first 6 columns
            expect(result.field1.isVisible).toBe(true);
            expect(result.field1.colStart).toBe(1);
            expect(result.field1.colEnd).toBe(6);
            expect(result.field1.rowStart).toBe(1);
            
            // field2 should be hidden
            expect(result.field2.isVisible).toBe(false);
            expect(result.field2.colStart).toBe(0);
            expect(result.field2.colEnd).toBe(0);
            
            // field3 should be visible and take full width on next row
            expect(result.field3.isVisible).toBe(true);
            expect(result.field3.colStart).toBe(1);
            expect(result.field3.colEnd).toBe(12);
            expect(result.field3.rowStart).toBe(2);
        });

        it('should handle all fields visible', () => {
            const formValues = { hideField2: false }; // Show all fields
            const result = calculateDynamicGridLayout(mockFields, formValues);
            
            // field1: first 6 columns, row 1
            expect(result.field1.isVisible).toBe(true);
            expect(result.field1.colStart).toBe(1);
            expect(result.field1.colEnd).toBe(6);
            expect(result.field1.rowStart).toBe(1);
            
            // field2: next 6 columns, row 1
            expect(result.field2.isVisible).toBe(true);
            expect(result.field2.colStart).toBe(7);
            expect(result.field2.colEnd).toBe(12);
            expect(result.field2.rowStart).toBe(1);
            
            // field3: full width, row 2
            expect(result.field3.isVisible).toBe(true);
            expect(result.field3.colStart).toBe(1);
            expect(result.field3.colEnd).toBe(12);
            expect(result.field3.rowStart).toBe(2);
        });

        it('should handle fields without isHide callback', () => {
            const fieldsWithoutHide = mockFields.filter(f => !f.isHide);
            const result = calculateDynamicGridLayout(fieldsWithoutHide, {});
            
            expect(result.field1.isVisible).toBe(true);
            expect(result.field3.isVisible).toBe(true);
            expect(result.field2).toBeUndefined(); // field2 not in the array
        });
    });
});
