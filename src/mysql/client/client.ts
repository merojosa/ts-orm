import MySqlSelectFields from "./select.types";
import MySqlDataTypeConverter from "./where.types";

type MySqlTypeScriptOrmClient<Schema extends object> = {
  [Table in keyof Schema]: {
    findAll(args: {
      select?: MySqlSelectFields<Schema, Table>;
      where: MySqlDataTypeConverter<Schema, Table>;
    }): Schema[Table];
  };
};

export const createMySqlClient = <Schema extends object>(
  schema: Schema
): MySqlTypeScriptOrmClient<Schema> => {
  const keys = Object.keys(schema);

  const object = keys.reduce((acc, key) => {
    return {
      ...acc,
      [key]: {
        findAll: (args: any) => console.log(`Console ${key}_findAll`, args),
      },
    };
  }, {} as MySqlTypeScriptOrmClient<Schema>);

  return object;
};
