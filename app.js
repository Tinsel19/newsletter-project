const express = require("express");
const bodyParser = require("body-parser");
var request = require("request");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    console.log(firstName);
    console.log(lastName);
    console.log(email);

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data)
    options = {
        url: " https://us10.api.mailchimp.com/3.0/lists/10f5eaac12",
        method: "POST",
        headers: {
            "Authorization": "Tinsel19 ad7ca2ac22ccce7093ead7632fbe4b14-us10"
        },
        body: jsonData 
    }

    request(options, function (error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            }else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });
})

app.post("/failure", function (req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("server running at port 3000");
})

// ApI key 
// ad7ca2ac22ccce7093ead7632fbe4b14-us10

// list id 
// 10f5eaac12