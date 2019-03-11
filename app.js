const express = require("express"),
      app = express(),
      port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("{data: 12812938712983}");// 만약 res.sned("문자열인 객체") 이렇게 보내면 data를 html로 인식함
    // res.json({messageL : "Hi from js object~"}); // 이건 json으로 인식함
});

app.listen(port, () => {
    console.log(`Server has started on ${port}`);
})

