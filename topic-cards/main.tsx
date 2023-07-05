import {Layer} from "@miniskylab/antimatter-framework";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {Card} from "./component";
import {TopicCardsContext, TopicCardsProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function TopicCards({
    style = Variant.FourColumns,
    cards = []
}: TopicCardsProps): JSX.Element
{
    const props: Required<TopicCardsProps> = {
        style, cards
    };

    const context = useMemo<TopicCardsContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <TopicCardsContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {cards.map((cardProps, i) => (
                    <Card.Component
                        key={i}
                        {...cardProps}
                        style={computedStyle.Card}
                    />
                ))}
                {renderShadow()}
            </View>
        </TopicCardsContext.Provider>
    );

    function renderShadow(): JSX.Element
    {
        return (
            <View
                style={viewProps => ({
                    ...computedStyle.Root(viewProps),
                    position: "absolute",
                    marginTop: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    zIndex: Layer.Ambient
                })}
            >
                <View
                    pointerEvents={"none"}
                    style={() => ({
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: Layer.AlwaysOnTop
                    })}
                />
                {cards.map((cardProps, i) => (
                    <Card.Component
                        key={i}
                        {...cardProps}
                        style={cardProps => ({
                            ...computedStyle.Card(cardProps),
                            Content: viewProps => ({
                                ...computedStyle.Card(cardProps).Content(viewProps),
                                ...computedStyle.Card(cardProps).Shadow(),
                                backgroundColor: undefined
                            }),
                            Icon: iconProps => ({...computedStyle.Card(cardProps).Icon(iconProps), opacity: 0}),
                            Image: imageProps => ({...computedStyle.Card(cardProps).Image(imageProps), opacity: 0}),
                            Title: labelProps => ({...computedStyle.Card(cardProps).Title(labelProps), opacity: 0}),
                            Description: labelProps => ({...computedStyle.Card(cardProps).Description(labelProps), opacity: 0}),
                            CtaContainer: viewProps => ({...computedStyle.Card(cardProps).CtaContainer(viewProps), opacity: 0})
                        })}
                    />
                ))}
            </View>
        );
    }
}