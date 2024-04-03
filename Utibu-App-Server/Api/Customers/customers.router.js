const router = require("express").Router();
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//Create Account
router.post("/signup", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  const customerID = Math.floor(Math.random() * 100000);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  // const hashedPassword = await bcrypt.hash(password, 10);

  new sql.Request().query(
    `select * from Customers where Email = '${email}'`,
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      } else {
        if (result.recordset[0]) {
          res.status(409).send({
            message: "Email already in use",
          });
        } else {
          new sql.Request().query(
            `select * from Customers where Phone = '${phoneNumber}'`,
            (err, result) => {
              if (err) {
                console.log(err);
              } else if (result.recordset[0]) {
                res.status(409).send({
                  message: "Phone number already in use",
                });
              } else {
                bcrypt.genSalt(10, (err, salt) => {
                  if (err) {
                    console.log(err);
                  }
                  bcrypt.hash(password, salt, (error, hash) => {
                    if (error) {
                      console.log(error);
                    }

                    new sql.Request().query(
                      `insert into Customers (Customer_ID, First_Name, Last_Name, Email, Phone, Password) values ('${customerID}', '${firstName}', '${lastName}', '${email}', '${phoneNumber}', '${hash}')`,
                      (err, results) => {
                        if (err) {
                          console.log(err);
                          res.status(500).send("Internal Server Error");
                        } else {
                          console.log(results);
                          res.status(200).send("Customer added");
                        }
                      }
                    );
                  });
                });
              }
            }
          );
        }
        console.log(result);
      }
    }
  );
});

//Login
router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  new sql.Request().query(
    `select * from Customers where Email = '${email}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else if (result.recordsets[0].length === 0) {
        console.log(result);
        res.status(401).send("Incorrect Email or Password");
      } else if (result.recordsets[0].length > 0) {
        const compare = bcrypt.compareSync(
          password,
          result.recordset[0].Password
        );
        const tokenPayload  = {
          email: email
        }
        const token = jwt.sign(tokenPayload, 'SECRET' )
        if (compare) {
          res.status(200).send({
            customerID: result.recordset[0].Customer_ID,
            name: result.recordset[0].First_Name,
            message: "Login Successful",
            token: token
          });
          console.log(token)
        } else {
          res.status(401).send("Incorrect Email or Password");
        }
      }

      console.log(result);
    }
  );
});

//Update Password
router.put("/resetpassword", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log(err);
    }
    bcrypt.hash(password, salt, (error, hash) => {
      if (error) {
        console.log(error);
      }

      new sql.Request().query(
        `update Customers set Password = '${hash}' where Email = '${email}'`,
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
          } else {
            console.log(results);
            res.status(200).send("Password updated!");
          }
        }
      );
    });
  });

  
});

module.exports = router;
