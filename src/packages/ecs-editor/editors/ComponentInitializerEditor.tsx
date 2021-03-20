import { Table, TableBody } from "@material-ui/core";
import { useContext, useMemo } from "react";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { createComponentProperties } from "../../ecs-serializable/factories/createComponentProperties";
import { updateComponentPropertiesDefinition } from "../../ecs-serializable/factories/updateComponentPropertiesDefinition";
import { typedKeys } from "../functions/typedKeys";
import { EditorStateContext } from "../EditorStateContext";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/factories/createComponentPropertiesDefinition";
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
  const { nativeComponents } = useContext(EditorStateContext);

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

  const nativeComponent = nativeComponents[definition.nativeComponent];
  const propertyNames = typedKeys(nativeComponent.propertyInfos);
  return (
    <Table size="small">
      <TableBody>
        {propertyNames.map((propertyName) => (
          <ComponentPropertyEditor
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
