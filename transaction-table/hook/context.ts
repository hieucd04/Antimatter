import {useContext} from "react";
import {ControlButtonTypeContext, HrPositionContext, TransactionTableContext} from "../model";

export function useTransactionTableContext(): TransactionTableContext { return useContext(TransactionTableContext); }

export function useControlButtonTypeContext(): ControlButtonTypeContext { return useContext(ControlButtonTypeContext); }

export function useHrPositionContext(): HrPositionContext { return useContext(HrPositionContext); }
