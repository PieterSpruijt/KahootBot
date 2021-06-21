const readline = require("readline");
const Kahoot = require("kahoot.js-updated");
console.log(`https://github.com/PieterSpruijt/KahootBot`)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("What is the kahoot code? ", function (code) {
    rl.question("how many bots? ", function (amount) {
        rl.question("what is the prefix name of the bots? ", function (name) {
            for (var i = 0; i < amount; i++) {
                console.log('joining bot ' + i + '/' + amount);
                let client = new Kahoot;
                client.setMaxListeners(Number.POSITIVE_INFINITY);
                client.join(code, name + `#` + i).catch(e => { console.log(`${i} join failed`) })
                client.on("QuestionStart", question => {
                    let answer = Math.floor(
                        Math.random() * question.quizQuestionAnswers[question.questionIndex]
                    ) + 0;
                    console.log(`${client.name.split(`#`)[1]} answered ${answer}`);
                    question.answer(answer);
                });
                client.on("Disconnect", (reason) => {
                    console.log(`${client.name.split(`#`)[1]} disconnected`);
                });
            }
            rl.close();

        });
    });
});
