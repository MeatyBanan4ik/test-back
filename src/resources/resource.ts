export default abstract class Resource {
  async toResponse(_data: any): Promise<{}> {
    return {};
  }

  async toArray(items: [any]): Promise<{}> {
    return Promise.all(items.map((item: any) => this.toResponse(item)));
  }
}
