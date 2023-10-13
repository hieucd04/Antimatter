import {ButtonContextHook} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {NavButtonContextHook, NavButtonStyle, NavButtonVariant} from "@miniskylab/antimatter-nav-button";
import {PressableContextHook, PressableStyle} from "@miniskylab/antimatter-pressable";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {NavbarStyle} from "../models";

const Navbar__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        columnGap: 10,
        width: "100%",
        height: 50,
        backgroundColor: Color.Ambient,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 20,
        shadowColor: Color.White__a10,
        shadowOpacity: 1
    };
};

const Navbar__Tab__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const navButtonContext = NavButtonContextHook.useNavButtonContext();

    const inheritedStyle = NavButtonVariant.Default(navButtonContext.props)(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        flexDirection: "column",
        alignSelf: "stretch",
        minWidth: 90,
        maxWidth: 90,
        height: "auto",
        paddingHorizontal: 0,
        paddingVertical: 0,
        opacity: 1,
        ...pressableState.pressed
            ? {
                borderColor: Color.Primary,
                backgroundColor: Color.Primary
            }
            : {
                borderColor: Color.Transparent,
                backgroundColor: Color.Transparent
            }
    };
};

const Navbar__Tab__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const navButtonContext = NavButtonContextHook.useNavButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = NavButtonVariant.Default(navButtonContext.props)(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        animations: undefined,
        height: 30,
        paddingTop: 2,
        fontSize: 25,
        color: pressableContext.state.pressed
            ? Color.Ambient
            : pressableContext.props.disabled || pressableContext.state.hovered
                ? Color.Primary
                : Color.White
    };
};

const Navbar__Tab__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const navButtonContext = NavButtonContextHook.useNavButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = NavButtonVariant.Default(navButtonContext.props)(buttonContext.props).Label(labelProps);

    return {
        ...inheritedStyle,
        height: 20,
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: 13,
        color: pressableContext.state.pressed
            ? Color.Ambient
            : pressableContext.props.disabled || pressableContext.state.hovered
                ? Color.Primary
                : Color.White
    };
};

const Navbar__Tab: NavButtonStyle = function (navButtonProps)
{
    return function (buttonProps)
    {
        return {
            ...NavButtonVariant.Default(navButtonProps)(buttonProps),
            Root: Navbar__Tab__Root,
            Icon: Navbar__Tab__Icon,
            Label: Navbar__Tab__Label
        };
    };
};

export const Default: NavbarStyle = function ()
{
    return {
        Root: Navbar__Root,
        Tab: Navbar__Tab
    };
};