const router = require("express").Router();
const sql = require("mssql/msnodesqlv8");

//Getting All Medicine
router.post("/get-medicine", (req, res) => {
  const category = req.body.category
  new sql.Request().query(`select * from Medicine where Category = '${category}'`, (err, results)=>{
    if(err){
        console.log(err)
        res.status(500).send("Internal Server Error");
    }if(results){
      return res.status(200).send(results.recordsets); 
  }
    
  });
});

//Getting data for each medicine
router.post("/get-medicine-info", (req, res) => {
  const medicineID = req.body.medicineID
  new sql.Request().query(`select * from Medicine where MedicineID = '${medicineID}'`, (err, results)=>{
    if(err){
        console.log(err)
        res.status(500).send("Internal Server Error");
    }if(results){
      return res.status(200).send(results.recordsets[0][0]); 
  }
    
  });
});




module.exports = router;
