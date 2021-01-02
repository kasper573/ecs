export class Container<T> extends Array<T> {
  remove(item: T) {
    const index = this.indexOf(item);
    if (index !== -1) {
      this.splice(index, 1);
    }
  }

  filterType<C extends T>(type: Class<C>) {
    return this.filter((item) => item instanceof type) as C[];
  }

  findType<C extends T>(type: Class<C>) {
    return this.find((item) => item instanceof type) as C | undefined;
  }

  resolveType<C extends T>(type: Class<C>) {
    const instance = this.findType(type);
    if (!instance) {
      throw new Error(`Could not resolve instance of ${type?.name}`);
    }
    return instance;
  }
}

type Class<T> = new (...args: any[]) => T;
