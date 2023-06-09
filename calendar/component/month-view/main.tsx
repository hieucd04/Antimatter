import {Button} from "@miniskylab/antimatter-button";
import {GregorianCalendar} from "@miniskylab/antimatter-framework";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {MonthContext, MonthViewContext, Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    selectedMonth,
    data,
    onMonthPress
}: Props): JSX.Element
{
    const props: Required<Props> = {
        style, selectedMonth, data, onMonthPress
    };

    const context = useMemo<MonthViewContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <MonthViewContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {data.map(monthInfo => (
                    <MonthContext.Provider
                        key={`${monthInfo.value.getMonth()}${monthInfo.value.getFullYear()}`}
                        value={useMemo(() => monthInfo, [monthInfo.value.getTime(), monthInfo.isExtraneous])}
                    >
                        <Button
                            style={computedStyle.GridCell}
                            label={GregorianCalendar.getShortMonthName(monthInfo.value.getMonth())}
                            onPress={() => { onMonthPress(new Date(monthInfo.value)); }}
                        />
                    </MonthContext.Provider>
                ))}
            </View>
        </MonthViewContext.Provider>
    );
}
