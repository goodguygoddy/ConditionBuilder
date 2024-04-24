export enum ConditionOperator {
  EQUALS = '=',
  GREATER_THAN = '>',
  LESS_THAN = '<',
  CONTAIN = '*',
  NOT_CONTAIN = '!*',
  REGEX = '\\',
}

export type DataValue = string | number | DataObject;

export interface DataObject {
  [key: string]: DataValue;
}

export interface DataItem extends DataObject {}


export enum ConditionType {
  AND = '&&',
  OR = '||'
}

export interface Condition {
  id: string;
  field: string;
  operator: ConditionOperator;
  value: string;
  type: ConditionType;
}

export interface ConditionGroup {
  id: string;
  type: ConditionType;
  conditions: Condition[];
}
