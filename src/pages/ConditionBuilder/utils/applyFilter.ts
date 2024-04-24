import { ConditionGroup, Condition, DataItem, ConditionOperator } from "@/pages/ConditionBuilder/types";

const evaluateCondition = (condition: Condition, item: DataItem): boolean => {
    if (!condition.field || condition.value === '') {
        return false;
    }

    const fieldValue = getFieldValue(item, condition.field);
    if (fieldValue === undefined || fieldValue === '') return false;

    try {
        switch (condition.operator) {
            case ConditionOperator.EQUALS:
                return handleEqualsCondition(fieldValue, condition.value);
            case ConditionOperator.GREATER_THAN:
                return handleComparisonCondition(fieldValue, condition.value, ConditionOperator.GREATER_THAN);
            case ConditionOperator.LESS_THAN:
                return handleComparisonCondition(fieldValue, condition.value, ConditionOperator.LESS_THAN);
            case ConditionOperator.CONTAIN:
                return handleContainsCondition(fieldValue, condition.value, true);
            case ConditionOperator.NOT_CONTAIN:
                return handleContainsCondition(fieldValue, condition.value, false);
            case ConditionOperator.REGEX:
                return handleRegexCondition(fieldValue, condition.value);
            default:
                return true;
        }
    } catch (error) {
        // console.error("Error applying condition", { error, condition });
        return false;
    }
};

const getFieldValue = (item: DataItem, field: string): any => {
    if (field.includes('.')) {
        return field.split('.').reduce((o, k) => (o || {})[k], item);
    }
    return item[field];
};

const handleEqualsCondition = (fieldValue: string | number, value: string | number): boolean => {
    return String(fieldValue).toLowerCase() === String(value).toLowerCase();
};

const handleComparisonCondition = (fieldValue: string | number, value: string | number, operator: ConditionOperator.GREATER_THAN | ConditionOperator.LESS_THAN): boolean => {
    const numFieldValue = Number(fieldValue);
    const numValue = Number(value);
    if (isNaN(numFieldValue) || isNaN(numValue)) {
        return false;
    }
    return operator === ConditionOperator.GREATER_THAN ? numFieldValue > numValue : numFieldValue < numValue;
};

const handleContainsCondition = (fieldValue: any, value: any, isContain: boolean): boolean => {
    const result = String(fieldValue).toLowerCase().includes(String(value).toLowerCase());
    return isContain ? result : !result;
};

const handleRegexCondition = (fieldValue: string | number, value: string): boolean => {
    const stringValue = String(fieldValue);
    const regex = new RegExp(value, 'i');
    return regex.test(stringValue);
};

const applyFilter = (data: DataItem[], conditionLists: ConditionGroup[]): DataItem[] => {
    return data.filter(item => {
        return conditionLists.every(group => {
            return group.conditions.some(condition => evaluateCondition(condition, item))
                   || group.conditions.every(condition => !condition.field || condition.value === '');
        });
    });
};

export default applyFilter;
