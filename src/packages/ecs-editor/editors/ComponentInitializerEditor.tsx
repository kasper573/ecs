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
import { createComponentOptions } from "../../ecs-serializable/factories/createComponentOptions";
import { ComponentOptions } from "../../ecs/Component";
import { updateComponentOptionsDefinition } from "../../ecs-serializable/factories/updateComponentOptionsDefinition";
import { typedKeys } from "../functions/typedKeys";
import { resolve } from "../../ecs/Resolvable";
import { PrimitiveType } from "../../ecs-serializable/types/PrimitiveTypes";
import { ComponentsContext } from "../ComponentsContext";
import { PrimitiveEditor } from "./PrimitiveEditor";

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
  const { nativeComponents } = useContext(ComponentsContext);

  const initializerOptions = useMemo(
    () => createComponentOptions(initializer.options),
    [initializer.options]
  );

  const updateOption = (optionName: string, optionValue: PrimitiveType) => {
    onChange({
      ...initializer,
      options: updateComponentOptionsDefinition(
        initializer.options,
        optionName as keyof ComponentOptions,
        optionValue as ComponentOptions[keyof ComponentOptions]
      ),
    });
  };

  const nativeComponent = nativeComponents[definition.nativeComponent];
  const optionNames = typedKeys(nativeComponent.options);
  return (
    <Table size="small">
      <TableBody>
        {optionNames.map((optionName) => {
          const optionType = nativeComponent.options[optionName];
          if (!optionType) {
            return null;
          }
          return (
            <TableRow key={optionName}>
              <TableCell>
                <Typography variant="caption">{optionName}</Typography>
              </TableCell>
              <TableCell>
                <PrimitiveEditor
                  type={optionType}
                  value={
                    optionType === "function"
                      ? initializerOptions[optionName]
                      : resolve(initializerOptions[optionName])
                  }
                  onChange={(updated) => updateOption(optionName, updated)}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
