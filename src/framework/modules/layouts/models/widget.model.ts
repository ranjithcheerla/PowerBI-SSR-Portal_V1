export interface WidgetError {
    message: string;
    type: ErrorType;
}

export enum ErrorType {
    'WARNING' = 0,
    'info' = 1,
    'error' = 2
}

export interface Help {
    showIcon?: boolean;
    helpText: string;
}
