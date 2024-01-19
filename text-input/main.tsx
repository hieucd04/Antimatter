import {AllPropertiesMustPresent, EMPTY_STRING, inheritTextStyleFrom, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {useTypography} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {forwardRef, JSX, MutableRefObject} from "react";
import * as ReactNative from "react-native";
import {TextInputProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export const TextInput = forwardRef(function TextInput(
    {
        style = Variant.Default,
        value = EMPTY_STRING,
        focusable = true,
        autoFocus = false,
        editable = true,
        secureTextEntry = false,
        contextMenuHidden = false,
        autoCorrect = true,
        maxLength,
        keyboardType = "default",
        selection,
        onChangeText,
        onSelectionChange,
        onBlur,
        onFocus,
        onKeyPress
    }: TextInputProps,
    ref: MutableRefObject<TextInput>
): JSX.Element
{
    const props: AllPropertiesMustPresent<TextInputProps> = {
        style, value, focusable, autoFocus, editable, secureTextEntry, contextMenuHidden, autoCorrect, maxLength, keyboardType, selection,
        onChangeText, onSelectionChange, onBlur, onFocus, onKeyPress
    };

    Ts.Error.throwIfNullOrUndefined(style);
    const computedStyle = useComputedStyle(style, props);

    return (
        <View style={() => computedStyle}>
            <ReactNative.TextInput
                ref={ref}
                editable={editable}
                focusable={focusable}
                autoCorrect={autoCorrect}
                secureTextEntry={secureTextEntry}
                style={{
                    ...inheritTextStyleFrom(computedStyle),
                    ...useTypography(computedStyle),
                    width: "100%",
                    height: "100%"
                }}
                value={value ?? EMPTY_STRING}
                maxLength={maxLength}
                autoFocus={autoFocus}
                contextMenuHidden={contextMenuHidden}
                selection={selection}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                onSelectionChange={onSelectionChange}
                onBlur={onBlur}
                onFocus={onFocus}
                onKeyPress={onKeyPress}
            />
        </View>
    );
});

export type TextInput = ReactNative.TextInput;
