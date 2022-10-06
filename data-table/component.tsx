import {Button} from "@miniskylab/antimatter-button";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import {Enum} from "@miniskylab/antimatter-typescript";
import React from "react";
import {DataTableRow} from "./components";
import {DataTableProps, IControlButton, IControlPanel} from "./model";

export function DataTable({
    className,
    minRowCount = 15,
    title,
    subTitle,
    columns,
    rows,
    selectedRow,
    mode = DataTableRow.Mode.ReadOnly,
    onChangeRow,
    onSwitchMode,
    onSelectRow,
    onAddNewRow,
    onSaveRow,
    onDeleteRow,
    onCancel
}: DataTableProps): JSX.Element
{
    const containerClassName = bem(className, "Container");
    const {modeButton, actionButton, cancelButton} = getControlPanelModel();

    return (
        <div className={bem(className)}>
            {renderControlPanel()}
            <div className={containerClassName}>
                <div className={bem(className, "Scroll")}>
                    {renderRows()}
                </div>
            </div>
        </div>
    );

    function isEmptyRow(rowId: string): boolean
    {
        return rowId === undefined;
    }

    function isSelectedRow(rowId: string): boolean
    {
        return rowId === selectedRow?.id;
    }

    function isAddNewButton(rowId: string): boolean
    {
        return rowId === null;
    }

    function getControlPanelModel(): IControlPanel
    {
        switch (mode)
        {
            case DataTableRow.Mode.Draft:
                return {
                    modeButton: {modifier: "Draft", icon: Icomoon.Quill, text: "Draft-Mode"},
                    actionButton: {modifier: "Edit", icon: Icomoon.FloppyDisk, text: "Save", onClick: onSaveRow},
                    cancelButton: {modifier: String.EMPTY, icon: Icomoon.XMarkInsideCircle, text: "Cancel", onClick: onCancel}
                };

            case DataTableRow.Mode.Edit:
                return {
                    modeButton: {modifier: "Edit", icon: Icomoon.Quill, text: "Edit-Mode", onClick: switchMode},
                    actionButton: {modifier: "Edit", icon: Icomoon.FloppyDisk, text: "Save", onClick: onSaveRow},
                    cancelButton: {modifier: String.EMPTY, icon: Icomoon.XMarkInsideCircle, text: "Cancel", onClick: onCancel}
                };

            case DataTableRow.Mode.Delete:
                return {
                    modeButton: {modifier: "Delete", icon: Icomoon.Fire, text: "Delete-Mode", onClick: switchMode},
                    actionButton: {modifier: "Delete", icon: Icomoon.TrashCan, text: "Delete", onClick: onDeleteRow},
                    cancelButton: {modifier: String.EMPTY, icon: Icomoon.XMarkInsideCircle, text: "Cancel", onClick: onCancel}
                };

            default:
            case DataTableRow.Mode.ReadOnly:
                return {
                    modeButton: {modifier: "Disabled", icon: Icomoon.Eye, text: "Read-Only"},
                    actionButton: {modifier: "Disabled", icon: Icomoon.FloppyDisk, text: "Save"},
                    cancelButton: {modifier: "Disabled", icon: Icomoon.XMarkInsideCircle, text: "Cancel"}
                };
        }
    }

    function getAddNewButtonModel(): IControlButton
    {
        switch (mode)
        {
            case DataTableRow.Mode.ReadOnly:
                return {modifier: String.EMPTY, icon: Icomoon.PlusCircle, onClick: onAddNewRow};

            default:
                return {modifier: "Disabled", icon: Icomoon.NotAllowed};
        }
    }

    function getRowMode(rowId: string): DataTableRow.Mode
    {
        return !isEmptyRow(rowId) && isSelectedRow(rowId)
            ? mode
            : DataTableRow.Mode.ReadOnly;
    }

    function renderControlPanel(): JSX.Element
    {
        return (
            <div className={bem(className, "ControlPanel")}>
                <div className={bem(className, "Title")}>
                    <Label className={bem("DataTable-MainTitle")} text={title}/>
                    <Label className={bem("DataTable-SubTitle")} text={subTitle}/>
                </div>
                <Button
                    className={bem("DataTable-ControlButton", null, actionButton.modifier)}
                    icon={actionButton.icon}
                    label={actionButton.text}
                    onClick={actionButton.onClick}
                />
                <Button
                    className={bem("DataTable-ControlButton", null, modeButton.modifier)}
                    icon={modeButton.icon}
                    label={modeButton.text}
                    onClick={modeButton.onClick}
                />
                <Button
                    className={bem("DataTable-ControlButton", null, cancelButton.modifier)}
                    icon={cancelButton.icon}
                    label={cancelButton.text}
                    onClick={cancelButton.onClick}
                />
            </div>
        );
    }

    function renderRows(): JSX.Element[]
    {
        const rowJsxElements = [];

        const headerValues = columns.map(x => x.name).filter(x => !!x);
        if (headerValues && headerValues.length > 0)
        {
            rowJsxElements.push(
                <React.Fragment key={-1}>
                    <DataTableRow.Component
                        className={bem("DataTable-Row", null, "Header")}
                        values={headerValues}
                    />
                    <div className={bem(className, "Hr")}/>
                </React.Fragment>
            );
        }

        const rowIds = rows ? Object.keys(rows) : [];
        if (mode === DataTableRow.Mode.Draft)
        {
            if (selectedRow)
            {
                rowIds.push(selectedRow.id);
            }
        }
        else
        {
            rowIds.push(null);
        }

        const rowCount = rowIds.length > minRowCount ? rowIds.length : minRowCount;
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++)
        {
            const rowId = rowIds[rowIndex];
            if (isAddNewButton(rowId))
            {
                const addNewButton = getAddNewButtonModel();
                rowJsxElements.push(
                    <Button
                        key={rowIndex}
                        className={bem("DataTable-AddNewButton", null, addNewButton.modifier)}
                        icon={addNewButton.icon}
                        onClick={addNewButton.onClick}
                    />
                );

                continue;
            }

            const rowMode = getRowMode(rowId);
            const rowData = rowMode === DataTableRow.Mode.Edit || rowMode === DataTableRow.Mode.Draft
                ? selectedRow.data
                : rowId
                    ? rows[rowId]
                    : {};

            const canSelect = !isEmptyRow(rowId) && mode === DataTableRow.Mode.ReadOnly;
            const canEdit = !isEmptyRow(rowId) && (rowMode === DataTableRow.Mode.Edit || rowMode === DataTableRow.Mode.Draft);
            rowJsxElements.push(
                <DataTableRow.Component
                    {...rowData}
                    key={rowIndex}
                    mode={rowMode}
                    columns={columns}
                    containerClassName={containerClassName}
                    className={bem("DataTable-Row")}
                    onClick={canSelect ? () => { onSelectRow(rowId); } : undefined}
                    onChange={canEdit ? newRowData => { onChangeRow(newRowData); } : undefined}
                />
            );
        }

        return rowJsxElements;
    }

    function switchMode(): void
    {
        switch (mode)
        {
            case DataTableRow.Mode.ReadOnly:
                onSwitchMode(DataTableRow.Mode.Draft);
                break;

            case DataTableRow.Mode.Edit:
                onSwitchMode(DataTableRow.Mode.Delete);
                break;

            case DataTableRow.Mode.Delete:
                onSwitchMode(DataTableRow.Mode.Edit);
                break;

            default:
                throw new Error(`No valid mode to switch to from mode "${Enum.getName(DataTableRow.Mode, mode)}"`);
        }
    }
}
