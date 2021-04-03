import { Table, TableBody } from "@material-ui/core";
import { useContext } from "react";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { updateComponentPropertiesDefinition } from "../../ecs-serializable/functions/updateComponentPropertiesDefinition";
import { keys } from "../../ecs-common/nominal";
import { NativeComponentsContext } from "../NativeComponentsContext";
import {
  ComponentPropertyValue,
  ComponentPropertyValueDefinition,
} from "../../ecs-serializable/types/ComponentPropertiesDefinition";
import { PropertyInfo } from "../../property-bag/types/PropertyInfo";
import { ComponentPropertyEditor } from "./ComponentPropertyEditor";

export type ComponentInitializerEditorProps = {
  base?: ComponentInitializer;
  primary: ComponentInitializer;
  definition: ComponentDefinition;
  onChange: (updated: ComponentInitializer) => void;
};

export const ComponentInitializerEditor = ({
  base,
  primary,
  definition,
  onChange,
}: ComponentInitializerEditorProps) => {
  const nativeComponents = useContext(NativeComponentsContext);

  const updateValue = (
    propertyName: string,
    propertyValue: ComponentPropertyValueDefinition
  ) => {
    onChange({
      ...primary,
      properties: updateComponentPropertiesDefinition(
        primary.properties,
        propertyName,
        propertyValue
      ),
    });
  };

  const resetValue = (propertyName: string) => {
    const updatedProperties = { ...primary.properties };
    delete updatedProperties[propertyName];
    onChange({
      ...primary,
      properties: updatedProperties,
    });
  };

  const nativeComponent = nativeComponents[definition.nativeComponent];
  const propertyNames = keys(nativeComponent.propertyInfos);
  return (
    <Table size="small">
      <TableBody>
        {propertyNames.map((propertyName) => (
          <ComponentPropertyEditor
            key={propertyName}
            baseProperties={base?.properties}
            primaryProperties={primary.properties}
            propertyName={propertyName}
            propertyInfo={
              nativeComponent.propertyInfos[
                propertyName
              ] as PropertyInfo<ComponentPropertyValue>
            }
            onUpdate={(newValue) => updateValue(propertyName, newValue)}
            onReset={() => resetValue(propertyName)}
          />
        ))}
      </TableBody>
    </Table>
  );
};
