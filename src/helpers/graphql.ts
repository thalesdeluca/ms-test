
class GraphQLHelper {
  static getSchema(model: any) {
    const Model = new model();
    return Model.buildSchema();
  }
}

export default GraphQLHelper;
