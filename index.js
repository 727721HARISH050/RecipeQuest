import express from "express";
import bodyParser from "body-parser"
import axios from "axios";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
let result="";
let ingre="";
app.get("/" , (req,res)=>
{   
    
    res.render("index.ejs",

  { recipeSearch : "Waiting for Search..."}
    );
     
});
app.post("/search" , async(req,res) =>
{
     result = req.body["recipeSearch"];
    try{
        const recipe  = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s="+result);
        
        if(recipe.data.meals === null)
        {
            res.render("index.ejs" , 
            {
                recipeSearch : "Invalid Food Search...."
            })
        }else{

            res.render("index.ejs" , 
            {
                
                post : recipe.data.meals,
                ingre:ingre,
                ingre_class : "dontshowingre"
            })
        }
  
    }catch(error)
    {
        res.render("index.ejs" , 
        {
            recipeSearch : "Invalid Food Search...."
        })
    }
})
// app.post("/view" , async(req , res)=>
// {
//     const index = req.body["id"];
   
//     console.log(index);
//     try{
//         const recipe  = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s="+result);
        
//         ingre = recipe.data.meals[index];
//         if(recipe.data.meals === null)
//         {
//             res.render("index.ejs" , 
//             {
//                 recipeSearch : "Invalid Food Search...."
//             })
//         }else{

//             res.render("index.ejs",
//             {
//                 post : recipe.data.meals,
//                 ingre : ingre,
//                 ingre_class : "dontshowingre",
               
//             } 
//            )
//         }
  
//     }catch(error)
//     {
//         res.render("index.ejs" , 
//         {
//             recipeSearch : "Invalid Food Search...."
//         })
//     }
      
// })
app.post("/cancel" , async(req,res) =>
{
    
    try{
        const recipe  = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s="+result);
        console.log(recipe.data.meals[0])
        if(recipe.data.meals === null)
        {
            res.render("index.ejs" , 
            {
                recipeSearch : "Invalid Food Search...."
            })
        }else{

            res.render("index.ejs" , 
            {
                
                post : recipe.data.meals,
                ingre_class : "dontshowingre"
            })
        }
  
    }catch(error)
    {
        res.render("index.ejs" , 
        {
            recipeSearch : "Invalid Food Search...."
        })
    }
})
app.listen(port ,()=>
{
    console.log("Successfully Running at port: "+port);
})