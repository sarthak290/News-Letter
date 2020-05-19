const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req,res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const Fname = req.body.fname;
    const Lname = req.body.lname;
    const Email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME:Fname, 
                    LNAME:Lname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/32d725fefd";

    const options = {
        method: "POST",
        auth: "sarthak1:58aada2631985f7fa29d5afb6c5f8b91-us18"
    };
    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");

        } else {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    
    request.write(jsonData);
    request.end();



});





app.post("/failure", function (req, res) {
    res.redirect("/");
})



app.listen(process.env.PORT || 3000, function () {
    console.log("started at 3000");
})



// 58aada2631985f7fa29d5afb6c5f8b91-us18

// 32d725fefd

// data '{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}' \