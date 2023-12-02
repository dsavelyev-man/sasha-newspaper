const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express()

app.engine("handlebars", engine({

}))
app.set("view engine", "handlebars")
app.set("views", "./views")

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const papers = [
    {
        title: "Первая новость",
        description: "Lorem Ipsum - это текст-'рыба', часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной 'рыбой' для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
        date: (new Date()).toLocaleString("ru")
    }
]

app.get("/", (req, res) => {

    res.render("newspaper", {
        papers
    })
})

app.post("/", (req, res) => {
    const result = req.body;

    if(!result.title || !result.description) return res.redirect("/");

    papers.unshift({
        title: result.title,
        description: result.description,
        date: (new Date()).toLocaleString("ru")
    })

    res.redirect("/");
})

app.listen(3000, () => {
    console.log(`server started http://localhost:3000`)
})