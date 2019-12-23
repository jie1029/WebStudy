const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
var ejs = require('ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', './views');

app.use((req, res, next) => {
    console.log('new request', req.method, req.path, new Date().toLocaleTimeString());
    next();
});

var students = {};
var index = -1;
var currentStu = {};
var subject = [
    ["1학년", "창의공학설계입문", "CD0001", "전준철", "수9/목89", "id =1"],
    ["1학년", "컴퓨터공학입문", "CD0002", "황준화", "목7", "id =2"],
    ["1학년", "기초프로그래밍", "CD0003", "고재필", "월89/수8", "id =3"],
    ["2학년", "디지털공학실험", "CD0004", "조재한", "금89", "id =4"],
    ["2학년", "자바프로그래밍", "CD0005", "김영학", "월23/화1", "id =5"],
    ["2학년", "자료구조", "CD0006", "손민영", "화7/수67", "id =6"],
    ["2학년", "자료구조응용및실습", "CD0007", "손기봉", "목89", "id =7"],
    ["2학년", "웹프로그래밍", "CD0008", "정진우", "목56/금3", "id =8"],
    ["2학년", "전자시스템", "CD0009", "한규필", "월89/화2", "id ='9'"],
    ["2학년", "C++프로그래밍", "CD0010", "황준화", "화67/목3", "id =10"],
    ["3학년", "운영체제", "CD0011", "최태영", "화3/목89", "id =11"],
    ["3학년", "컴퓨터네트워크", "CD0012", "김태형", "월3/목23", "id =12"],
    ["3학년", "데이터베이스", "CD0013", "오병우", "수67/목4", "id =13"],
    ["3학년", "프로그래밍언어개념", "CD0014", "오길호", "화67/수8", "id =14"],
    ["3학년", "소프트웨어공학", "CD0015", "이이섭", "월5/화89", "id =15"],
    ["3학년", "영상처리", "CD0016", "김성영", "월5/화67", "id =16"],
    ["4학년", "창의설계프로젝트1(종합설계)", "CD0017", "윤현주", "수AB", "id =17"],
    ["4학년", "컴퓨터시스템보안", "CD0018", "전준철", "화56/목2", "id =18"],
    ["4학년", "컴파일러구성", "CD0019", "윤현주", "수67/목6", "id =19"],
    ["4학년", "컴퓨터비전", "CD0020", "고재필", "월67/화7", "id =20"],
    ["4학년", "알고리즘문제해결", "CD0021", "정유철", "목5/금23", "id =21"],
    ["4학년", "웹및모바일최신기술", "CD0022", "오병우", "월5/화56", "id =22"]
]

app.get('/', (req, res) => res.sendFile(__dirname + "/loginPage.html"));

app.get('/join', (req, res) => res.render(__dirname + "/join"));

app.post('/join/OK', (req, res) => {
    if (req.body.stuName != "" && req.body.stuId != "" && req.body.stuPassword != "" && req.body.stuMail != "") {
        if(!req.body.stuLang)
        {
            res.send('<script>alert("동의해주세요!"); window.location.href="/join" </script>');
        }
        index++;
        students[index] = {
            name: req.body.stuName,
            id: req.body.stuId,
            passWord: req.body.stuPassword,
            eMail: req.body.stuMail

        }

        res.sendFile(__dirname + "/loginPage.html");
    }
    else {
        res.send('<script>alert("정보를 제대로 입력해주세요!"); window.location.href="/join" </script>');
    }
    console.log(students[index]);
    console.log(Number(index));
});

app.get('/main', (req, res) => {


    res.render("main", { current: currentStu.name });

});

app.get('/myInformation', (req, res) => {

    res.render("information", { name: currentStu.name, email: currentStu.eMail, id: currentStu.id });
});

app.get('/search/all', (req, res) => {
    let j = 0;
    let grade = [];
    let name = [];
    let code = [];
    let professor = [];
    let time = [];
    let id = [];
    for (let i = 0; i < subject.length; i++) {
        grade[j] = subject[i][0];
        name[j] = subject[i][1];
        code[j] = subject[i][2];
        professor[j] = subject[i][3];
        time[j] = subject[i][4];
        id[j] = subject[i][5];
        j++
    }

    console.log(grade.length);
    res.render("searchAll", { grade: grade, name: name, code: code, professor: professor, time: time, id: id });
});

app.get('/search', (req, res) => {
    let j = 0;
    let grade = [];
    let name = [];
    let code = [];
    let professor = [];
    let time = [];
    let id = [];

    if (req.query.cGrade != "") {
        for (let i = 0; i < subject.length; i++) {

            if (subject[i][0] == req.query.cGrade) {
                grade[j] = subject[i][0];
                name[j] = subject[i][1];
                code[j] = subject[i][2];
                professor[j] = subject[i][3];
                time[j] = subject[i][4];
                id[j] = subject[i][5];
                j++
            }
        }
        console.log(grade.length);
        res.render("search", { grade: grade, name: name, code: code, professor: professor, time: time, id: id });
    }
    else if (req.query.cSub != "") {
        for (let i = 0; i < subject.length; i++) {
            let temp = subject[i][1];
            if (temp.match(req.query.cSub) == req.query.cSub) {
                grade[j] = subject[i][0];
                name[j] = subject[i][1];
                code[j] = subject[i][2];
                professor[j] = subject[i][3];
                time[j] = subject[i][4];
                id[j] = subject[i][5];
                j++
            }

        }
        console.log(grade.length);
        res.render("search", { grade: grade, name: name, code: code, professor: professor, time: time, id: id });
    }
    else if (req.query.cCode != "") {
        for (let i = 0; i < subject.length; i++) {
            let temp = subject[i][2];
            if (temp == req.query.cCode) {
                grade[j] = subject[i][0];
                name[j] = subject[i][1];
                code[j] = subject[i][2];
                professor[j] = subject[i][3];
                time[j] = subject[i][4];
                id[j] = subject[i][5];
                j++
            }

        }
        console.log(grade.length);
        res.render("search", { grade: grade, name: name, code: code, professor: professor, time: time, id: id });
    }
});
app.get('/search/:id', (req, res) => {
    let plan = req.params.id;
    res.send('<h1>여기는 코드 ' + plan + ' 의 강의 계획서 입니다<h1>');
});

app.post('/login', (req, res) => {


    if (index == -1) {
        res.send('<script>alert("먼저 회원가입을 해주세요!"); window.location.href="/" </script>');
    }
    else {
        for (let i = 0; i <= index; i++) {
            if (students[i].id == req.body.stuId && students[i].passWord == req.body.stuPassword) {
                currentStu = students[i];
                res.send('<script>window.location.href="/main" </script>');
                break;
            }
        }
        res.send('<script>alert("아이디/비밀번호를 확인하세요."); window.location.href="/" </script>');
    }
});

app.get('/application', (req, res) => {
    res.render('application');
});

var addList = [[]];
var addCode = [];
var listIndex = -1;
app.post('/application', (req, res) => {
    let value = req.body.value;
    let j = 0;
    for (let i = 0; i < subject.length; i++) {
        let temp = subject[i][2];
        if (temp == value) {
            addCode[0] = subject[i][0];
            addCode[1] = subject[i][1];
            addCode[2] = subject[i][3];
            addCode[3] = subject[i][4];
            addCode[4] = subject[i][5];
            j++;
        }
    }

    if (addCode == '0') {
        let err;
        err = "<p>잘못검색 하셨습니다<p>";
        res.json(arr);
    }
    res.json(addCode);

});
addList[++listIndex] = addCode;
app.post('/application/OK', (req, res) => {

    console.log(addList);
    console.log(listIndex);
    let times = req.body.times;
    console.log(times);

    if (times != undefined) {
        for (let i = 0; i < times.length; i++) {
            let codeSplit = addCode[3].split("/");
            console.log(codeSplit);
            for(let j=0; j<codeSplit.length; j++){
            if (times[i].match(codeSplit[j]) == codeSplit[j]) {
                let err = 'error';
                res.json(err);
            }
        }
        }
    }
    res.json(addCode);
});
// res = str.replace(/[^0-9]/g,""); 숫자만 추출

app.listen(3000, () => {
    console.log('Server running at port: 3000!');
});
