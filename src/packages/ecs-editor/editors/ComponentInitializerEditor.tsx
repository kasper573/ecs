import { Table, TableBody } from "@material-ui/core";
import { useContext } from "react";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
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
}: ComponentInitializerEditorProps) => {
  const nativeComponents = useContext(NativeComponentsContext);
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
            onUpdate={(newValue) => onUpdate(primary, propertyName, newValue)}
            onReset={() => onReset(primary, propertyName)}
          />
        ))}
      </TableBody>
    </Table>
  );
};
