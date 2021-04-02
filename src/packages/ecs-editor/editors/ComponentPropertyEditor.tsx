import { MenuItem, TableCell, TableRow, Typography } from "@material-ui/core";
import styled from "styled-components";
import { PropertyInfo } from "../../property-bag/types/PropertyInfo";
import { getPropertyValue } from "../../property-bag/getPropertyValue";
import { resetPropertyValue } from "../../property-bag/resetPropertyValue";
import { useMenu } from "../hooks/useMenu";
import { propertySupportsDeclarative } from "../../property-bag/propertySupportsDeclarative";
import { isPropertyDeclarative } from "../../property-bag/isPropertyDeclarative";
import { getPropertyDeclaration } from "../../property-bag/getPropertyDeclaration";
import { getPrimitiveEditor } from "./PrimitiveEditor";
import { FunctionEditor } from "./FunctionEditor";

export type ComponentPropertyEditorProps = {
  hasBase: boolean;
  baseProperties: Record<string, unknown>;
  primaryProperties: Record<string, unknown>;
  propertyName: string;
  propertyInfo: PropertyInfo<unknown>;
  onUpdate: (newValue: unknown) => void;
  onReset: (updatedPrimaryProperties: Record<string, unknown>) => void;
};

export const ComponentPropertyEditor = ({
  hasBase,
  baseProperties,
  primaryProperties,
  propertyName,
  propertyInfo,
  onUpdate,
  onReset,
}: ComponentPropertyEditorProps) => {
  const baseValue = getPropertyValue(
    baseProperties,
    propertyInfo,
    propertyName
  );

  const primaryValue = getPropertyValue(
    primaryProperties,
    propertyInfo,
    propertyName,
    baseValue
  );

  const isDeclarative = isPropertyDeclarative(
    primaryProperties,
    propertyInfo,
    propertyName
  );

  const hasBaseDiff = hasBase && primaryProperties.hasOwnProperty(propertyName);

  const PrimitiveEditor = getPrimitiveEditor(propertyInfo.type);

  const setDeclarative = (toDeclarative: boolean) =>
    onUpdate(toDeclarative ? () => {} : propertyInfo.defaultValue);

  const resetValue = () => {
    const updatedProperties = { ...primaryProperties };
    resetPropertyValue(updatedProperties, propertyInfo, propertyName);
    onReset(updatedProperties);
  };

  const [openMenu, menu] = useMenu([
    hasBaseDiff && <MenuItem onClick={resetValue}>Reset</MenuItem>,
    propertySupportsDeclarative(propertyInfo) && (
      <MenuItem onClick={() => setDeclarative(!isDeclarative)}>
        {isDeclarative ? "Make imperative" : "Make declarative"}
      </MenuItem>
    ),
  ]);

  if (!PrimitiveEditor || propertyInfo.hidden) {
    // No editor available for this type,
    // or this property has opted out of being editable
    return null;
  }

  return (
    <>
      <TableRow key={propertyName} onContextMenu={openMenu}>
        <TableCell>
          <PropertyName $hasBaseDiff={hasBaseDiff}>{propertyName}</PropertyName>
        </TableCell>
        <TableCell>
          {isDeclarative ? (
            <FunctionEditor
              value={getPropertyDeclaration(
                primaryProperties,
                propertyInfo,
                propertyName
              )}
              onChange={onUpdate}
            />
          ) : (
            <PrimitiveEditor value={primaryValue} onChange={onUpdate} />
          )}
        </TableCell>
      </TableRow>
      {menu}
    </>
  );
};

const PropertyName = styled(Typography).attrs({ variant: "caption" })<{
  $hasBaseDiff: boolean;
}>`
  font-weight: ${({ $hasBaseDiff }) => ($hasBaseDiff ? "bold" : "inherit")};
`;
