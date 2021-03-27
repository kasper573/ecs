import { Table, TableBody } from "@material-ui/core";
import { useContext, useMemo } from "react";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { createComponentProperties } from "../../ecs-serializable/factories/createComponentProperties";
import { updateComponentPropertiesDefinition } from "../../ecs-serializable/factories/updateComponentPropertiesDefinition";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/factories/createComponentPropertiesDefinition";
import { keys } from "../../nominal";
import { NativeComponentsContext } from "../NativeComponentsContext";
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

  const baseProperties = useMemo(
    () => (base ? createComponentProperties(base.properties) : {}),
    [base]
  );

  const primaryProperties = useMemo(
    () => (primary ? createComponentProperties(primary.properties) : {}),
    [primary]
  );

  const updateValue = (propertyName: string, propertyValue: unknown) => {
    onChange({
      ...primary,
      properties: updateComponentPropertiesDefinition(
        primary.properties,
        propertyName,
        propertyValue
      ),
    });
  };

  const resetValue = (updatedProperties: Record<string, unknown>) =>
    onChange({
      ...primary,
      properties: createComponentPropertiesDefinition(updatedProperties),
    });

  const hasBase = !!base;
  const nativeComponent = nativeComponents[definition.nativeComponent];
  const propertyNames = keys(nativeComponent.propertyInfos);
  return (
    <Table size="small">
      <TableBody>
        {propertyNames.map((propertyName) => (
          <ComponentPropertyEditor
            key={propertyName}
            hasBase={hasBase}
            baseProperties={baseProperties}
            primaryProperties={primaryProperties}
            propertyName={propertyName}
            propertyInfo={nativeComponent.propertyInfos[propertyName]}
            onUpdate={(newValue) => updateValue(propertyName, newValue)}
            onReset={resetValue}
          />
        ))}
      </TableBody>
    </Table>
  );
};
