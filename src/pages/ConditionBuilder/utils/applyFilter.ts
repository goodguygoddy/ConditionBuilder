import { ConditionGroup, Condition, DataItem, ConditionOperator, DataValue } from "@/pages/ConditionBuilder/types";

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

const getFieldValue = (item: DataItem, field: string): DataValue | undefined => {
    return field.split('.').reduce((acc: DataValue | undefined, key: string) => {
        return (typeof acc === "object" && acc !== null && key in acc) ? acc[key] : undefined;
    }, item as DataValue);
};

const handleEqualsCondition = (fieldValue: DataValue, value: string): boolean => {
    return String(fieldValue).toLowerCase() === String(value).toLowerCase();
};

const handleComparisonCondition = (fieldValue: DataValue, value: string, operator: ConditionOperator.GREATER_THAN | ConditionOperator.LESS_THAN): boolean => {
    const numFieldValue = Number(fieldValue);
    const numValue = Number(value);
    if (isNaN(numFieldValue) || isNaN(numValue)) {
        return false;
    }
    return operator === ConditionOperator.GREATER_THAN ? numFieldValue > numValue : numFieldValue < numValue;
};

const handleContainsCondition = (fieldValue: DataValue, value: string, isContain: boolean): boolean => {
    const result = String(fieldValue).toLowerCase().includes(String(value).toLowerCase());
    return isContain ? result : !result;
};

const handleRegexCondition = (fieldValue: DataValue, value: string): boolean => {
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
