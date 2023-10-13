import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";

export const OutlinedBadge: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        paddingVertical: 7,
        paddingHorizontal: 14,
        borderRadius: 17,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: Color.Negative,
        color: Color.White,
        fontSize: 14,
        fontWeight: "bold",
        textAlignVertical: "top"
    };
};