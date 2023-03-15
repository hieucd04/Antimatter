import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ButtonStyle} from "../model";
import {OutlinedRectangular} from "./outlined-rectangular";

export const SolidRectangular: ButtonStyle = function (buttonProps, buttonState)
{
    const outlinedRectangularButtonStyle = OutlinedRectangular(buttonProps, buttonState);
    const buttonStyle: ReturnType<ButtonStyle> = {...outlinedRectangularButtonStyle};

    buttonStyle.Root = {
        ...outlinedRectangularButtonStyle.Root,
        ...buttonState.pressed
            ? {
                borderColor: Color.Primary__b10,
                backgroundColor: Color.Primary__b10
            }
            : buttonState.hovered
                ? {
                    borderColor: Color.Primary__w25,
                    backgroundColor: Color.Primary__w25
                }
                : {
                    borderColor: Color.Primary,
                    backgroundColor: Color.Primary
                }
    };

    buttonStyle.Icon = function (iconProps)
    {
        const inheritedIconStyle = outlinedRectangularButtonStyle.Icon(iconProps);
        const iconStyle: ReturnType<IconStyle> = {...inheritedIconStyle};

        iconStyle.Root = {
            ...inheritedIconStyle.Root,
            color: Color.Ambient
        };

        return iconStyle;
    };

    buttonStyle.Label = function (labelProps)
    {
        const inheritedLabelStyle = outlinedRectangularButtonStyle.Label(labelProps);
        const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

        labelStyle.Root = {
            ...inheritedLabelStyle.Root,
            color: Color.Ambient
        };

        return labelStyle;
    };

    return buttonStyle;
};
