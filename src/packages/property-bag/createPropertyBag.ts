import { PropertyBagMethods } from "./types/PropertyBagMethods";
import { PropertyBag } from "./types/PropertyBag";
import { getPropertyValue } from "./getPropertyValue";
import { setPropertyValues } from "./setPropertyValues";
import { resetPropertyValue } from "./resetPropertyValue";
import { ResolvablePropertyValuesFor } from "./types/ResolvablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";

class Root {
  static propertyInfos = {};
}

export const createPropertyBag = <
  DirectProperties extends PropertyInfoRecord<any, any>,
  Base extends PropertyBag<{}>
>(
  directProperties: DirectProperties,
  displayName: string = "",
  baseBag?: Base
) => {
  type BaseProperties = Base extends PropertyBag<infer P> ? P : never;
  type Properties = DirectProperties & BaseProperties;
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
      Object.keys(directProperties).forEach((name) => {
        Object.defineProperty(this, name, {
          configurable: true,
          get: () => getPropertyValue(propertyInfos, this.propertyValues, name),
        });
      });
      this.configure(values);
    }

    configure(values: Partial<ResolvablePropertyValuesFor<Properties>>) {
      setPropertyValues(this.propertyValues, values);
      return this;
    }

    reset<Name extends keyof Properties>(name: Name) {
      resetPropertyValue(propertyInfos, this.propertyValues, name);
    }

    static extend<ExtensionProperties extends PropertyInfoRecord<any, any>>(
      extensionProperties: ExtensionProperties,
      extensionName?: string
    ) {
      return createPropertyBag(extensionProperties, extensionName, Bag);
    }
  } as unknown) as PropertyBag<Properties>;

  return Bag;
};
