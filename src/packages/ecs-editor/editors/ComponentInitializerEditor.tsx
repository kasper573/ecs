import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useContext, useMemo } from "react";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { createComponentProperties } from "../../ecs-serializable/factories/createComponentProperties";
import { updateComponentPropertiesDefinition } from "../../ecs-serializable/factories/updateComponentPropertiesDefinition";
import { typedKeys } from "../functions/typedKeys";
import { EditorStateContext } from "../EditorStateContext";
import { PropertyInfo } from "../../property-bag/types/PropertyInfo";
import { getPropertyValue } from "../../property-bag/getPropertyValue";
import { renderPrimitiveEditor } from "./PrimitiveEditor";

export type ComponentInitializerEditorProps = {
  initializer: ComponentInitializer;
  definition: ComponentDefinition;
  onChange: (updated: ComponentInitializer) => void;
};

export const ComponentInitializerEditor = ({
  initializer,
  definition,
  onChange,
}: ComponentInitializerEditorProps) => {
  const { nativeComponents } = useContext(EditorStateContext);

  const initializerOptions = useMemo(
    () => createComponentProperties(initializer.properties),
    [initializer.properties]
  );

  const updateOption = (optionName: string, optionValue: unknown) => {
    onChange({
      ...initializer,
      properties: updateComponentPropertiesDefinition(
        initializer.properties,
        optionName,
        optionValue
      ),
    });
  };

  const nativeComponent = nativeComponents[definition.nativeComponent];
  const propertyNames = typedKeys(nativeComponent.propertyInfos);
  return (
    <Table size="small">
      <TableBody>
        {propertyNames.map((propertyName) => {
          const info: PropertyInfo<unknown> =
            nativeComponent.propertyInfos[propertyName];
          if (info.hidden) {
            // This property has opted out of being editable
            return null;
          }
          const editor = renderPrimitiveEditor({
            type: info.type,
            value: getPropertyValue(
              nativeComponent.propertyInfos,
              initializerOptions,
              propertyName
            ),
            onChange: (updated) => updateOption(propertyName, updated),
          });
          if (!editor) {
            // No editor available for this type
            return null;
          }
          return (
            <TableRow key={propertyName}>
              <TableCell>
                <Typography variant="caption">{propertyName}</Typography>
              </TableCell>
              <TableCell>{editor}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
