import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
const app = express();

import { TableData } from "./store/store";

const cors_options = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(cors_options));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
  );
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/get-users", (req: Request, res: Response) => {
  fs.readFile("src/helpers/codeshare.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "Something went wrong..." });
      return;
    }

    let users: TableData[] = JSON.parse(data);

    res.status(200).send({
      success: true,
      message: "Successfully fetched users data",
      data: users,
    });
  });
});

app.post("/api/add-user", (req: Request, res: Response) => {
  const { name, email, gender, address, phone } = req.body as TableData;

  if (!name || !email || !gender || !address || !phone) {
    res
      .status(400)
      .send({ success: false, message: "Please provide all values." });
    return;
  }

  fs.readFile("src/helpers/codeshare.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "Something went wrong..." });
      return;
    }

    let users: TableData[] = JSON.parse(data);

    const newUser = {
      id: uuidv4(),
      name,
      email,
      gender,
      address,
      phone,
    };

    users.push(newUser);

    fs.writeFile("src/helpers/codeshare.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "Something went wrong..." });
        return;
      }
    });

    res.status(200).send({
      success: true,
      message: "User added successfully!",
      data: users,
    });
  });
});

app.patch("/api/update-user", (req: Request, res: Response) => {
  const { id, name, email, gender, address, phone } = req.body as TableData;

  if (!name || !email || !gender || !address || !phone || !id) {
    res
      .status(400)
      .send({ success: false, message: "Please provide all values." });
    return;
  }

  fs.readFile("src/helpers/codeshare.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "Something went wrong..." });
      return;
    }

    let users = JSON.parse(data) as TableData[];
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      res.status(404).send({ success: false, message: "User not found" });
      return;
    }

    const updatedUser = {
      ...users[userIndex],
      name,
      email,
      gender,
      address,
      phone,
    };

    users[userIndex] = updatedUser;

    fs.writeFile("src/helpers/codeshare.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "Something went wrong..." });
        return;
      }

      res.status(201).send({
        success: true,
        message: "User updated successfully",
        data: users,
      });
    });
  });
});

app.post("/api/remove-user", (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).send({ success: false, message: "Please provide an ID." });
    return;
  }

  fs.readFile("src/helpers/codeshare.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "Something went wrong..." });
      return;
    }

    let users: TableData[] = JSON.parse(data);
    const updatedUsers = users.filter((user) => user.id !== id);

    fs.writeFile(
      "src/helpers/codeshare.json",
      JSON.stringify(updatedUsers),
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send({ error: "Something went wrong..." });
          return;
        }

        res.send({
          success: true,
          message: "User removed successfully.",
          data: updatedUsers,
        });
      }
    );
  });
});

app.listen(3001, () => {
  console.log("app listening on port 3001!");
});
