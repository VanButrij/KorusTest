// preferences = (perf, volumeCredits) => {

// }

function statement(invoice, plays) {
    let totalAmount = 0;
    debugger;
    let volumeCredits = 0;
    let comediesCount = 0;
    let result = `Счет для ${invoice.customer}: <br/><br/>`;
    const format = new Intl.NumberFormat("ru-RU",
        {
            style: "currency", currency: "RUB",
            minimumFractionDigits: 2
        }).format;
    for (let perf of invoice.performance) {
        let thisAmount = 0;
        for (let n = 0; n<plays.length; n++) {
            if (perf.playId == plays[n]) {
                switch (perf.type) {
                    case "tragedy":
                        thisAmount += 40000;
                        if (perf.audience > 30) {
                            thisAmount += 1000 * (perf.audience - 30);
                        }
                        break;
                    case "comedy":
                        thisAmount += 30000;
                        if (perf.audience > 20) {
                            thisAmount += 10000 + 500 * (perf.audience - 20);
                        }
                        thisAmount += 300 * perf.audience;
                        break;
                    default:
                        throw new Error(`неизвестный тип: ${perf.type}`);
                }
            }
        }
        // Добавление бонусов
        debugger;
        volumeCredits += Math.max(perf.audience - 30, 0);
        // Дополнительный бонус за каждые 10 комедий
        if ( perf.type = "comedy") { 
            comediesCount++;
            if ((comediesCount % 10) == 0){
                volumeCredits += Math.floor(perf.audience / 5) 
            }
        };

        // Вывод строки счета
        result += ` ${perf.playId}: ${format(thisAmount / 100)} <br/><br/>`;
        result +=  `(${perf.audience} мест) <br/><br/>`;
        totalAmount += thisAmount;


    }
    result += `Итого с вас: ${(format(totalAmount/100))} <br/><br/>`;
    result += `Вы заработали: ${volumeCredits} бонусов <br/><br/>`;
    return result;
}

invoices = {
    
        "customer": "MDT",
        "performance": [
            {
                "playId": "Гамлет",
                "audience": 55,
                "type": "tragedy"
            },
            {
                "playId": "Ромео и Джульетта",
                "audience": 35,
                "type": "tragedy"
            },
            {
                "playId": "Отелло",
                "audience": 40,
                "type": "comedy"
            }
        ]
    
    }

plays = ["Гамлет",  "Отелло", "Гамлет", "Гамлет", "Ромео и Джульетта"]

document.writeln(statement(invoices, plays));