import {Button} from "@miniskylab/antimatter-button";
import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {HeaderContext, Props} from "./models";

/**
 * This section of the calendar shows the current time frame that the calendar is displaying and allows users to navigate to a different
 * time frame.
 */
export function Component({
    style,
    headline,
    onPrevPress,
    onNextPress,
    onHeadlinePress
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, headline, onPrevPress, onNextPress, onHeadlinePress
    };

    const context = useMemo<HeaderContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <HeaderContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Button
                    style={computedStyle.BackwardNavigator}
                    icon={DefaultIconSet.ChevronLeft}
                    disabled={!onPrevPress}
                    onPress={onPrevPress}
                />
                <Button
                    style={computedStyle.Headline}
                    label={headline}
                    disabled={!onHeadlinePress}
                    onPress={onHeadlinePress}
                />
                <Button
                    style={computedStyle.ForwardNavigator}
                    icon={DefaultIconSet.ChevronRight}
                    disabled={!onNextPress}
                    onPress={onNextPress}
                />
            </View>
        </HeaderContext.Provider>
    );
}
