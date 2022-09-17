import {Icon} from "@miniskylab/antimatter-icon";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {TopbarProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Topbar({
    className
}: TopbarProps): JSX.Element
{
    return (
        <div className={bem(className)}>
            <Icon className={bem("Topbar-Logo")} name={Icomoon.MiniSkyLab}/>
            <div className={bem(className, "Container")}>
                <Icon className={bem("Topbar-Icon")} name={Icomoon.Sun}/>
                <Icon className={bem("Topbar-Icon")} name={Icomoon.Sun}/>
                <Icon className={bem("Topbar-Icon")} name={Icomoon.Sun}/>
                <Icon className={bem("Topbar-Icon")} name={Icomoon.Sun}/>
                <Icon className={bem("Topbar-Icon")} name={Icomoon.Menu}/>
            </div>
            <div className={bem(className, "Container", "Right")}>
                <Icon className={bem("Topbar-Icon")} name={Icomoon.Moon}/>
                <Icon className={bem("Topbar-Icon")} name={Icomoon.User}/>
            </div>
        </div>
    );
}
