import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ColProps } from '../grid/col';
import { ConfigConsumerProps } from '../config-provider';
declare const ValidateStatuses: ["success", "warning", "error", "validating", ""];
export declare type FormLabelAlign = 'left' | 'right';
export interface FormItemProps {
    prefixCls?: string;
    className?: string;
    id?: string;
    htmlFor?: string;
    label?: React.ReactNode;
    labelAlign?: FormLabelAlign;
    labelCol?: ColProps;
    wrapperCol?: ColProps;
    help?: React.ReactNode;
    extra?: React.ReactNode;
    validateStatus?: (typeof ValidateStatuses)[number];
    hasFeedback?: boolean;
    required?: boolean;
    style?: React.CSSProperties;
    colon?: boolean;
}
export default class FormItem extends React.Component<FormItemProps, any> {
    static defaultProps: {
        hasFeedback: boolean;
    };
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        label: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        labelAlign: PropTypes.Requireable<string>;
        labelCol: PropTypes.Requireable<object>;
        help: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        validateStatus: PropTypes.Requireable<"" | "error" | "success" | "warning" | "validating">;
        hasFeedback: PropTypes.Requireable<boolean>;
        wrapperCol: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        id: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        colon: PropTypes.Requireable<boolean>;
    };
    helpShow: boolean;
    componentDidMount(): void;
    getHelpMessage(): {} | null | undefined;
    getControls(children: React.ReactNode, recursively: boolean): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>[];
    getOnlyControl(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
    getChildProp(prop: string): any;
    getId(): any;
    getMeta(): any;
    getField(): any;
    onHelpAnimEnd: (_key: string, helpShow: boolean) => void;
    renderHelp(prefixCls: string): JSX.Element;
    renderExtra(prefixCls: string): JSX.Element | null;
    getValidateStatus(): "error" | "" | "success" | "validating";
    renderValidateWrapper(prefixCls: string, c1: React.ReactNode, c2: React.ReactNode, c3: React.ReactNode): JSX.Element;
    renderWrapper(prefixCls: string, children: React.ReactNode): JSX.Element;
    isRequired(): any;
    onLabelClick: () => void;
    renderLabel(prefixCls: string): JSX.Element;
    renderChildren(prefixCls: string): JSX.Element[];
    renderFormItem: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export {};
