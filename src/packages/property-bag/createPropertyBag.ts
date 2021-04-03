import { keys } from "../ecs-common/nominal";
import { noRecursion } from "../ecs-common/noRecursion";
import { PropertyBagMethods } from "./types/PropertyBagMethods";
import { PropertyBag } from "./types/PropertyBag";
import { getPropertyValue } from "./getPropertyValue";
import { setPropertyValues } from "./setPropertyValues";
import { resetPropertyValue } from "./resetPropertyValue";
import { ResolvablePropertyValuesFor } from "./types/ResolvablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";
import { PropertyBagInstance } from "./types/PropertyBagInstance";

class Root {
  static propertyInfos = {};
}

type AllProps<
  DirectProperties extends PropertyInfoRecord<any, any>,
  Base extends PropertyBag<{}>
> = DirectProperties & (Base extends PropertyBag<infer P> ? P : never);

export const createPropertyBag = <
  DirectProperties extends PropertyInfoRecord<any, any>,
  Base extends PropertyBag<{}>,
  DeclarationContext
>(
  directProperties: DirectProperties,
  displayName: string = "",
  baseBag?: Base,
  getPropertyDeclarationContext: (
    bag: PropertyBagInstance<AllProps<DirectProperties, Base>>
  ) => DeclarationContext = (bag) => (bag as unknown) as DeclarationContext
) => {
  type Properties = AllProps<DirectProperties, Base>;
  const base = baseBag ?? Root;
  const propertyInfos = { ...base.propertyInfos, ...directProperties };

  const Bag = (class extends base implements PropertyBagMethods<Properties> {
    static displayName = displayName;
    static propertyInfos = propertyInfos;
    private readonly propertyValues: Partial<
      ResolvablePropertyValuesFor<Properties>
    > = {};

    constructor(values: Partial<ResolvablePropertyValuesFor<Properties>> = {}) {
      super();
      const getContext = () =>
        getPropertyDeclarationContext(
          this as PropertyBagInstance<AllProps<DirectProperties, Base>>
        );
      keys(directProperties).forEach((name) => {
        Object.defineProperty(this, name, {
          configurable: true,
          get: () =>
            getPropertyValue(
              this.propertyValues,
              propertyInfos[name],
              name,
              noRecursion(getContext)
            ),
        });
      });
      this.configure(values);
    }

    configure(values: Partial<ResolvablePropertyValuesFor<Properties>>) {
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
  } as unknown) as PropertyBag<Properties>;

  return Bag;
};
