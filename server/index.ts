require("dotenv").config();
import cors from "cors";
import express from "express";
import { google } from "googleapis";
import { secrets } from "./constants";

const app = express();
app.use(cors());

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const auth = new google.auth.JWT(
  secrets.client_email,
  undefined,
  secrets.private_key,
  SCOPES
);

const sheets = google.sheets({ version: "v4", auth });

app.get("/", (req, res, next) => {
  sheets.spreadsheets.values
    .get({
      spreadsheetId: secrets.spreadSheetId,
      range: "A1:Z",
      valueRenderOption: "UNFORMATTED_VALUE"
    })
    .then(result => {
      const values = result.data.values;
      const users: { name: string; records: { amount: number }[] }[] = [];
      values?.forEach(user => {
        const record = user.slice(1).map(x => {
          if (parseFloat(x)) {
            return {
              amount: x
            };
          } else {
            return {
              amount: 0
            };
          }
        });
        users.push({
          name: user[0],
          records: record
        });
      });
      res.send(users);
    })
    .catch(err => res.status(400).send(err));
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
