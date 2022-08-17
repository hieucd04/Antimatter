import {Decorator} from "@miniskylab/antimatter-decorator";
import {ComponentName} from "@miniskylab/antimatter-model";
import {SpacerProps} from "./model";

export const Name = Decorator.getValue<string>(ComponentName, SpacerProps);
