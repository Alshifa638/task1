
let express=require("express");
let app=express();

app.use(express.json());
app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
       res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Orihgin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
const port=2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));


let baseURL="https://jsonplaceholder.typicode.com/";
let axios=require("axios");
app.get("/myserver/:fetchURL",function(req,res){
    const startHrTime = process.hrtime.bigint();
    let {fetchURL}=req.params;
axios
.get(baseURL+`${fetchURL}`)
.then(function (response){
     const endHrTime = process.hrtime.bigint();
    const elapsedTimeInMs = Number(endHrTime - startHrTime) / 1000000.0;
    console.log(startHrTime,endHrTime)
   
res.send({data:response.data,status:response.status,TimeTaken:elapsedTimeInMs});
})
.catch(function(error){
if(error.response){
        let {status,statusText}=error.response;
        console.log(status,statusText);
        res.status(401).send(statusText);
    } 
    else res.status(404).send(error);
});
});
app.post("/myserver/post",function(req,res){
    const startHrTime = process.hrtime.bigint();

    let body ={method:req.body.method,data:req.body.data,fetchURL:req.body.fetchURL};
    axios.post(baseURL+`${req.body.fetchURL}`,body)
    .then(function (response){
        const endHrTime = process.hrtime.bigint();
        const elapsedTimeInMs = Number(endHrTime - startHrTime) / 1000000.0;
        res.send({data:response.data,status:response.status,TimeTaken:elapsedTimeInMs});
    })
    .catch(function (error){
        if(error.response){
            let {status,statusText}=error.response;
            console.log(status,statusText);
            res.status(401).send(statusText);
        }else res.status(404).send(error);
    });
  })