import { Table, TableBody } from "@material-ui/core";
import { useContext } from "react";
import { ComponentInitializer } from "../../../ecs-serializable/src/definition/ComponentInitializer";
import { ComponentDefinition } from "../../../ecs-serializable/src/definition/ComponentDefinition";
import { NativeComponentsContext } from "../NativeComponentsContext";
import {
  ComponentPropertyValue,
  ComponentPropertyValueDefinition,
} from "../../../ecs-serializable/src/definition/ComponentPropertiesDefinition";
import { PropertyInfo } from "../../../property-bag/src/types/PropertyInfo";
import { typedKeys } from "../../../ecs-common/src/typedKeys";
import { ComponentPropertyEditor } from "./ComponentPropertyEditor";

export type ComponentInitializerEditorProps = {
  isVisible?: boolean;
  base?: ComponentInitializer;
  primary: ComponentInitializer;
  definition: ComponentDefinition;
  onUpdate: (
    initializer: ComponentInitializer,
    propertyName: string,
    propertyValue: ComponentPropertyValueDefinition
  ) => void;
  onReset: (initializer: ComponentInitializer, propertyName: string) => void;
};

export const ComponentInitializerEditor = ({
  base,
  primary,
  definition,
  onUpdate,
  onReset,
  isVisible,
}: ComponentInitializerEditorProps) => {
  const nativeComponents = useContext(NativeComponentsContext);
  const nativeComponent = nativeComponents[definition.nativeComponent];
  const propertyNames = typedKeys(nativeComponent.propertyInfos);
  return (
    <Table size="small">
      <TableBody>
        {propertyNames.map((propertyName) => (
          <ComponentPropertyEditor
            key={propertyName}
            isVisible={isVisible}
            baseProperties={base?.properties}
            primaryProperties={primary.properties}
            propertyName={propertyName}
            propertyInfo={
              nativeComponent.propertyInfos[
                propertyName
              ] as PropertyInfo<ComponentPropertyValue>
            }
            onUpdate={(newValue) => onUpdate(primary, propertyName, newValue)}
            onReset={() => onReset(primary, propertyName)}
          />
        ))}
      </TableBody>
    </Table>
  );
};
