import "./infra/config";
import app from "./server";
import connection from "./infra/connection";
import Tables from "./infra/createTables";
import InsertUsers from "./infra/inserts/insertUsers";
import InsertVehicles from "./infra/inserts/InsertVehicles";
import InsertVehiclesData from "./infra/inserts/insertVehicleData";

connection.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log(`Conectado ao banco ${process.env.DB_NAME}`);
    Tables.init(connection);
    InsertUsers.init(connection);
    InsertVehicles.init(connection);
    InsertVehiclesData.init(connection);

    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Servidor rodando em: http://localhost:${process.env.PORT || 3000}`
      );
    });
  }
});

export default app;
