const express = require('express')
const cors = require('cors')

const app = express()
const db = require('./database')

app.use(cors())

app.get('/' , function(req,res){
    res.send('Hello World')
})

app.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/indexed-users", (req, res, next) => {
    const pageSize= +req.query.pageSize
    const currentIndex = +req.query.currentIndex

    const sql = `SELECT * FROM user LIMIT ${pageSize} OFFSET ${pageSize*(currentIndex - 1)}`
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
    // res.send("Done")
});

app.get("/api/search", (req,res, next)=>{
  const searchText = req.query.searchText

  const sql = `SELECT * FROM user WHERE name LIKE '%${searchText}%' `
  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
        "data":rows
    })
  });


}) 



app.listen(8080)