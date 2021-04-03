import { keys } from "../ecs-common/nominal";
import { noRecursion } from "../ecs-common/noRecursion";
import { PropertyBagMethods } from "./types/PropertyBagMethods";
import { PropertyBag } from "./types/PropertyBag";
import { getPropertyValue } from "./getPropertyValue";
import { setPropertyValues } from "./setPropertyValues";
import { resetPropertyValue } from "./resetPropertyValue";
import { DeclarablePropertyValuesFor } from "./types/DeclarablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";
import { PropertyBagInstance } from "./types/PropertyBagInstance";

class Root {
  static propertyInfos = {};
}

type AllProps<
  DirectProperties extends PropertyInfoRecord<any, any>,
  Base extends PropertyBag<{}, DeclarationContext>,
  DeclarationContext
> = DirectProperties &
  (Base extends PropertyBag<infer P, DeclarationContext> ? P : never);

export const createPropertyBag = <
  DirectProperties extends PropertyInfoRecord<any, any>,
  Base extends PropertyBag<{}, DeclarationContext>,
  DeclarationContext
>(
  directProperties: DirectProperties,
  displayName: string = "",
  baseBag?: Base,
  getPropertyDeclarationContext: (
    bag: PropertyBagInstance<
      AllProps<DirectProperties, Base, DeclarationContext>,
      DeclarationContext
    >
  ) => DeclarationContext = (bag) => (bag as unknown) as DeclarationContext
) => {
  type Properties = AllProps<DirectProperties, Base, DeclarationContext>;
  const base = baseBag ?? Root;
  const propertyInfos = { ...base.propertyInfos, ...directProperties };

  const Bag = (class
    extends base
    implements PropertyBagMethods<Properties, DeclarationContext> {
    static displayName = displayName;
    static propertyInfos = propertyInfos;
    private readonly propertyValues: Partial<
      DeclarablePropertyValuesFor<Properties, DeclarationContext>
    > = {};

    constructor(
      values: Partial<
        DeclarablePropertyValuesFor<Properties, DeclarationContext>
      > = {}
    ) {
      super();
      const getContext = () =>
        getPropertyDeclarationContext(
          this as PropertyBagInstance<
            AllProps<DirectProperties, Base, DeclarationContext>,
            DeclarationContext
          >
        );
      keys(directProperties).forEach((name) => {
        Object.defineProperty(this, name, {
          configurable: true,
          get: () =>
            getPropertyValue(
              this.propertyValues,
              propertyInfos[name],
              name,
              // We assume context is resolved, it's more helpful to pretend that it's
              // always resolved than to have a precise type definition and have to always guard against undefined.
              // You should not be using recursive contexts.
              noRecursion(getContext)!
            ),
        });
      });
      this.configure(values);
    }

    configure(
      values: Partial<
        DeclarablePropertyValuesFor<Properties, DeclarationContext>
      >
    ) {
      setPropertyValues(this.propertyValues, values);
      return this;
    }

    reset<Name extends keyof Properties>(name: Name) {
      resetPropertyValue(this.propertyValues, propertyInfos[name], name);
    }

    static extend<ExtensionProperties extends PropertyInfoRecord<any, any>>(
      extensionProperties: ExtensionProperties,
      extensionName?: string
    ) {
      return createPropertyBag(
        extensionProperties,
        extensionName,
        Bag,
        getPropertyDeclarationContext as any
      );
    }
  } as unknown) as PropertyBag<Properties, DeclarationContext>;

  return Bag;
};
