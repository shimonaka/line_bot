'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 5000;

const config = {
	channelSecret: '5580559e17b9b841ba5b0ab596b58188',
	channelAccessToken: '94pZcUUAbK4BDhBKRhq50emaTg/GFCF4JuxdJIlGn/cwJvG/8xTfXGL34UHMCgPQcyFWlD/AnV0jBd/1xvPy5hX/FyHCeMFSyjjO3nWjpiTSRvt8kRALeY7nw+8/uh7fzChyqW+lxLR1rXXSf6WFmgdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)')); //ブラウザ確認用(無くても問題ない)
app.post('/webhook', line.middleware(config), (req, res) => {
	console.log(req.body.events);

	//ここのif分はdeveloper consoleの"接続確認"用なので削除して問題ないです。
	if (req.body.events[0].replyToken === '00000000000000000000000000000000' && req.body.events[1].replyToken === 'ffffffffffffffffffffffffffffffff') {
		res.send('Hello LINE BOT!(POST)');
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

	let replyText = '';
	if (event.message.text === '回答を始める') {
		return client.replyMessage(event.replyToken, {
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
						"label": "未定",
						"text": "未定"
					}
				],
				"title": " 転職希望時期をお選びください！",
				"text": "ご希望の転職時期をお選びください"
			}
		});
	}

	if (event.message.text === 'すぐにでも' || event.message.text === '3ヵ月以内' || event.message.text === '半年以内' || event.message.text === '未定') {
		return client.replyMessage(event.replyToken, {
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
						"label": "学生",
						"text": "学生"
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
		});
	}


	if (event.message.text === 'アシスタント' || event.message.text === 'スタイリスト' || event.message.text === '学生' || event.message.text === 'それ以外') {
		return client.replyMessage(event.replyToken, {
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
						"label": "安定性",
						"text": "安定性"
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
				"text": "以下から最も近いものをお選びください"
			}
		});
	}


	if (event.message.text === '給料' || event.message.text === '安定性' || event.message.text === '成長スピード' || event.message.text === 'オシャレさ' || event.message.text === 'ママへの待遇') {
		return client.replyMessage(event.replyToken, {
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
						"label": "50代以上",
						"text": "50代以上"
					}
				],
				"title": "あなたの年代を教えてください",
				"text": "以下から最も近いものをお選びください"
			}
		});
	}

	if (event.message.text === '10代' || event.message.text === '20代' || event.message.text === '30代' || event.message.text === '40代' || event.message.text === '50代以上') {
		return client.replyMessage(event.replyToken, {
			"type": "text",
			"text": "ご回答ありがとうございます！\n担当者へお繋ぎしますので、しばらくお待ちください。"
			});
	}

}

// app.listen(PORT);
// console.log(`Server running at ${PORT}`);
(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT);
console.log(`Server running at ${PORT}`);