import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {YearInfo} from "../type";
import {Props} from "./props";

export const YearViewContext = createContext<YearViewContext>({});
export type YearViewContext = ComponentContext<Props>;

export const YearContext = createContext<YearContext>(undefined);
export type YearContext = YearInfo;