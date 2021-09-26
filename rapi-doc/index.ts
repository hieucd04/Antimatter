import {ComponentName, Decorator} from "@miniskylab/antimatter/infrastructures";
import {RapidDocComponentProps} from "./models/rapi-doc-component-props";
import {RapiDocExporter} from "./models/rapi-doc-exporter";
import {RapiDocComponent} from "./rapi-doc-component";

export const RapiDocComponentName = Decorator.getValue(ComponentName, RapidDocComponentProps) as string;

export {RapiDocComponent};
export {RapidDocComponentProps};

export type {RapiDocExportProps as RapiDocProps} from "./models/rapi-doc-export-props";
export const RapiDoc = new RapiDocExporter().export(RapiDocComponent);
