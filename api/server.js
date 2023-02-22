'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
	channelSecret: '976f8460fc78264d113930079a04b9d7',
	channelAccessToken: 'deJtWZHN0BRwjhfvpgDgulQD2P+3RdmXji887Zu5+Ls3+9P4LIRGKAdOGt5m8QAZNPuTs8Q5JDWBtkh3swuu8etgQQaJCWbymVqvYeEB7df+VPoTWJKmJ0KxS71N4gEEE6l23P+mOLl3jyABf8/xkwdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('LINE BOT 疎通確認!(GET)')); //ブラウザ確認用(無くても問題ない)
app.post('/webhook', line.middleware(config), (req, res) => {
	console.log(req.body.events);

	//ここのif分はdeveloper consoleの"接続確認"用なので削除して問題ないです。
	if (req.body.events[0].replyToken === '00000000000000000000000000000000' && req.body.events[1].replyToken === 'ffffffffffffffffffffffffffffffff') {
		res.send('LINE BOT 疎通確認!(POST)');
		console.log('疎通確認用');
		return;
	}


	Promise
		.all(req.body.events.map(handleEvent))
		.then((result) => res.json(result));
});

const client = new line.Client(config);

async function handleEvent(event) {
	if (event.type !== 'message' || event.message.type !== 'text') {
		return Promise.resolve(null);
	}

	const userMessage = event.message.text;


	if (userMessage === '回答を始める') {
		const question1 = {
			"type": "template",
			"altText": "this is a buttons template",
			"template": {
				"type": "buttons",
				"actions": [
					{
						"type": "message",
						"label": "すぐにでも",
						"text": "すぐにでも"
					},
					{
						"type": "message",
						"label": "3ヵ月以内",
						"text": "3ヵ月以内"
					},
					{
						"type": "message",
						"label": "半年以内",
						"text": "半年以内"
					},
					{
						"type": "message",
						"label": "1年以内",
						"text": "1年以内"
					},
					{
						"type": "message",
						"label": "時期未定",
						"text": "時期未定"
					},
					{
						"type": "message",
						"label": "良いサロンが見つかれば",
						"text": "良いサロンが見つかれば"
					}
				],
				"title": "転職希望時期をお選びください！",
				"text": "ご希望の転職時期をお選びください"
			}
		};
		const question2 = {
			"type": "template",
			"altText": "this is a buttons template",
			"template": {
				"type": "buttons",
				"actions": [
					{
						"type": "message",
						"label": "アシスタント",
						"text": "アシスタント"
					},
					{
						"type": "message",
						"label": "スタイリスト",
						"text": "スタイリスト"
					},
					{
						"type": "message",
						"label": "アイリスト",
						"text": "アイリスト"
					},
					{
						"type": "message",
						"label": "学生",
						"text": "学生"
					},
					{
						"type": "message",
						"label": "ブランク有り",
						"text": "ブランク有り"
					},
					{
						"type": "message",
						"label": "それ以外",
						"text": "それ以外"
					}
				],
				"title": "現在の技術ランクを教えてください",
				"text": "一番あなたに近いものを教えてください"
			}
		};
		const question3 = {
			"type": "template",
			"altText": "this is a buttons template",
			"template": {
				"type": "buttons",
				"actions": [
					{
						"type": "message",
						"label": "給料",
						"text": "給料"
					},
					{
						"type": "message",
						"label": "スタイリスト",
						"text": "スタイリスト"
					},
					{
						"type": "message",
						"label": "安定",
						"text": "安定"
					},
					{
						"type": "message",
						"label": "成長スピード",
						"text": "成長スピード"
					},
					{
						"type": "message",
						"label": "オシャレさ",
						"text": "オシャレさ"
					},
					{
						"type": "message",
						"label": "ママへの待遇",
						"text": "ママへの待遇"
					}
				],
				"title": "働くお店に求めることは何ですか？",
				"text": "一番あなたに近いものを教えてください"
			}
		};
		const question4 = {
			"type": "template",
			"altText": "this is a buttons template",
			"template": {
				"type": "buttons",
				"actions": [
					{
						"type": "message",
						"label": "10代",
						"text": "10代"
					},
					{
						"type": "message",
						"label": "20代",
						"text": "20代"
					},
					{
						"type": "message",
						"label": "30代",
						"text": "30代"
					},
					{
						"type": "message",
						"label": "40代",
						"text": "40代"
					},
					{
						"type": "message",
						"label": "50代",
						"text": "50代"
					},
					{
						"type": "message",
						"label": "60代以上",
						"text": "60代以上"
					}
				],
				"title": "あなたの年代を教えてください",
				"text": "以下から最も近いものをお選びください"
			}
		};
		const message = {
			type: 'text',
			text: 'ご回答ありがとうございます！\n担当者へお繋ぎしますので、しばらくお待ちください。'
		};
		await client.pushMessage(event.source.userId, question1);
		await client.pushMessage(event.source.userId, question2);
		await client.pushMessage(event.source.userId, question3);
		await client.pushMessage(event.source.userId, question4);
		await client.replyMessage(event.replyToken, message);
	} else {
		// save the answers to a database or send them to a webhook
	}

}

// app.listen(PORT);
// console.log(`Server running at ${PORT}`);
(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT);
console.log(`Server running at ${PORT}`);