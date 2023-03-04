import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelVariant} from "@miniskylab/antimatter-label";
import {FooterStyle} from "../model";

export const Default: FooterStyle = function ()
{
    const footerStyle: ReturnType<typeof Default> = {};

    footerStyle.Root = function (labelProps)
    {
        const defaultLabelStyle = LabelVariant.Default(labelProps);
        const labelStyle: ReturnType<typeof footerStyle.Root> = {...defaultLabelStyle};

        labelStyle.Root = {
            ...defaultLabelStyle.Root,
            width: "100%",
            minWidth: 300,
            lineHeight: 28,
            padding: 15,
            fontSize: 16,
            fontWeight: "bold",
            color: Color.White,
            backgroundColor: Color.Background,
            textAlign: "center"
        };

        return labelStyle;
    };

    return footerStyle;
};