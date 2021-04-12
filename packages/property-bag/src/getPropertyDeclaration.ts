import { DeclarablePropertyValuesFor } from "./types/DeclarablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";
import { PropertyValueFor } from "./types/PropertyValueFor";
import { Declarative } from "./types/Declarable";

export const getPropertyDeclaration = <
  Properties extends PropertyInfoRecord<any, Types>,
  Name extends keyof Properties,
  Types,
  DeclarationContext
>(
  values: Partial<DeclarablePropertyValuesFor<Properties, DeclarationContext>>,
  info: Properties[Name],
  name: Name
) =>
  values[name] as Declarative<
    DeclarationContext,
    PropertyValueFor<Properties, Name>
  >;
