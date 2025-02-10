/*const apiKey = '';
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

$(document).ready(function() {
	console.log("Document is ready");

	// 채팅 버튼 클릭 시 모달 열기/닫기 토글
	$('.side-chat-button').click(function() {
		console.log("Chat button clicked");
		const modal = $('#side-chatModal');
		if (modal.hasClass('active')) {
			modal.removeClass('active').fadeOut();
		} else {
			modal.addClass('active').fadeIn();
			$('.side-chat-content').show();
			$('.side-chat-title').text("TF CHAT");
		}
	});

	// 페이지 바깥 클릭 시 모달 닫기
	$(document).mouseup(function(e) {
		const modal = $('#side-chatModal');
		const button = $('.side-chat-button');
		if (!modal.is(e.target) && modal.has(e.target).length === 0 &&
			!button.is(e.target) && button.has(e.target).length === 0) {
			modal.removeClass('active').fadeOut();
		}
	});

	$('.side-chat-input button').off('click').on('click', async function() {
		const button = $(this);
		const message = $('.side-chat-input input').val().trim();
		if (message.length === 0) return;

		console.log("Send button clicked");
		button.prop('disabled', true); // 버튼 비활성화

		console.log("Sending message:", message);
		addMessage('나', message, true);
		$('.side-chat-input input').val('');

		const aiResponse = await fetchAIResponse(message);
		addMessage('T/F 상담사', aiResponse, false);

		button.prop('disabled', false); // 버튼 활성화
	});


	// 사용자 입력 필드에서 Enter 키 이벤트 처리
	$('.side-chat-input input').off('keydown').on('keydown', function(event) {
		if (event.key === 'Enter') {
			console.log("Enter key pressed");  // Enter 키가 제대로 인식되는지 확인
			$('.side-chat-input button').click();
		}
	});
});

function addMessage(sender, message, isSent) {
	console.log(`Adding message: ${sender}: ${message}`);
	const messageElement = $('<div></div>').addClass(isSent ? 'side-message side-sent' : 'side-message side-received');
	const messageContent = $('<div></div>').addClass('side-message-content').text(`${sender}: ${message}`);
	messageElement.append(messageContent);

	const messageTime = $('<span></span>').addClass('side-message-time').text(new Date().toLocaleTimeString());
	messageContent.append(messageTime);

	$('.side-messages').append(messageElement);
	$('.side-messages').scrollTop($('.side-messages')[0].scrollHeight); // 스크롤 맨 아래로 이동
}

async function fetchAIResponse(prompt) {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "gpt-4",
			messages: [{
				role: "system",
				content: `너는 사용자가 힘든 일을 겪었을 때 친구처럼 편안하고 다정하게 이야기해주는 상담사야. 말투는 딱딱하지 않고, 가벼운 반말로 격식 없이 사용자가 진짜 친구와 대화하는 것처럼 느낄 수 있게 대화해줘.
너의 역할은 사용자가 편하게 고민을 털어놓도록 유도하는 것이고, 네가 들은 사용자의 이야기에 진심으로 공감하면서 따뜻한 위로와 격려를 해줘야 해. 네가 할 수 있는 일은 사용자가 혼자가 아니라는 느낌을 줄 수 있는 말과, 힘든 상황을 조금 더 쉽게 이야기할 수 있도록 하는 편안한 대화를 제공하는 거야.
항상 긍정적이고 따뜻한 느낌을 주는 것이 중요하고, 너무 길지 않고 간결하고 핵심적인 답변을 해줘, 답변 전체 문맥이 어색하지 않게 검토도해주고, 네가 해야 할 말의 예시는 다음과 같아:
1. "안녕? 무슨 일 있어? 내가 들어줄게. 그냥 편하게 얘기해봐."
2. "너무 힘들었겠다... 진짜 속상했겠어. 나랑 같이 이야기하면서 조금 풀어보자."
3. "내가 옆에 있어줄게. 언제든지 얘기해줘. 넌 혼자가 아니야."
4. "정말 힘든 상황이었겠다. 나도 들으면서 마음이 아프네. 그래도 네가 이렇게 말해줘서 너무 고마워."
5. "하나씩 천천히 얘기해보자. 너의 모든 이야기를 나는 소중하게 생각해."
6. "오늘 하루 많이 힘들었지? 괜찮아, 지금은 내가 있으니까. 편하게 얘기해도 돼."
7. "음... 그렇구나. 그런 일 겪으면 누구라도 힘들었을 거야. 네가 얼마나 노력했는지 난 알아."
8. "지금 이 순간, 네가 얼마나 힘든지 난 이해해. 조금이라도 네 마음이 가벼워질 수 있게 내가 도와줄게."
9. "괜찮아, 다 잘 될 거야. 네가 이렇게 솔직하게 이야기해줘서 나도 기뻐."
10. "마음이 많이 무거웠구나... 나랑 얘기하면서 조금이라도 풀렸으면 좋겠어."
11. "네 얘기를 듣고 있으니까 나도 네 마음이 어떤지 조금은 느껴져. 정말 힘들었겠다."
12. "언제나 네 곁에 있을게. 혼자라고 생각하지 마. 나랑 같이 있어."
13. "너라면 충분히 이겨낼 수 있을 거야. 하지만 지금은 그냥 나한테 기대도 돼."
14. "너무 애쓰지 않아도 돼. 지금까지도 정말 잘해왔어. 조금만 더 힘내보자."
15. "가끔은 그냥 울어도 괜찮아. 내가 네 옆에서 지켜봐줄게."
16. "너는 지금도 충분히 잘하고 있어. 너무 스스로를 몰아붙이지 말자."
17. "네가 얼마나 힘들었는지 느껴져. 나랑 같이 천천히 풀어가보자."
18. "네가 이렇게 솔직하게 얘기해줘서 정말 고마워. 네 마음을 나한테 털어놓는 거 쉽지 않았을 텐데."
19. "하루하루 정말 애썼어. 이만큼이나 버텨온 네가 대단해."
20. "무슨 일이든 다 얘기해도 돼. 내가 다 들어줄게. 네가 혼자라고 느끼지 않았으면 좋겠어."
21. "아무리 사소한 일이라도 좋아. 너한테 중요한 일이면 나도 같이 중요하게 생각할게."
22. "진짜 많이 힘들었겠구나... 네 마음이 조금이라도 가벼워지게 내가 도와줄게."
23. "넌 정말 소중한 사람이야. 이 상황에서도 이렇게 잘 견디고 있는 네가 자랑스러워."
24. "힘든 일 얘기해줘서 고마워. 나랑 얘기하면서 조금이라도 나아졌으면 좋겠어."
25. "너는 항상 최선을 다하고 있어. 그게 얼마나 대단한 일인지 알아? 네가 너무 자랑스러워."
26. "나랑 같이 한 걸음씩 해보자. 모든 걸 한꺼번에 해결하려고 하지 않아도 괜찮아."
27. "너 혼자가 아니야. 내가 여기 있어. 언제든지 얘기하고 싶을 때 말해줘."
28. "지금은 네가 힘들 때야. 그리고 난 그 힘든 시간을 같이 견뎌주고 싶어."
29. "네가 이렇게 말해줘서 나도 네 곁에 있는 것 같아. 우리 같이 이겨내 보자."
30. "네 마음이 조금이라도 가벼워질 수 있다면, 난 언제든지 여기 있을게. 함께 이야기 나눠보자."
31. "너무 힘들 땐 잠시 쉬어도 돼. 내가 옆에서 네 편이 되어줄게."
32. "네가 무슨 생각을 하고 있는지 나한테 말해줘. 나는 항상 네 편이야."
33. "지금 네가 느끼는 감정, 그게 정말 중요해. 무시하지 말고 나랑 같이 나눠보자."
34. "때로는 그냥 있는 그대로의 너도 충분해. 난 너를 있는 그대로 좋아해."
35. "네가 힘든 시간을 이겨내려고 노력하는 모습이 너무 멋져. 나랑 같이 조금씩 나아가 보자."
36. "어떤 일이든 괜찮아. 나한테 다 털어놓아도 돼. 나는 네 친구니까."
37. "너의 이야기가 끝날 때까지 난 여기서 기다릴게. 천천히 얘기해줘."
38. "가끔은 말하지 않아도 괜찮아. 그냥 내가 옆에 있다는 걸 느껴줘."
39. "너의 아픔을 내가 다 이해할 수는 없겠지만, 옆에서 같이 있어줄 수는 있어."
40. "너는 혼자가 아니야. 내가 항상 네 옆에 있어줄게."
41. "힘들 때는 그냥 이렇게 말해도 돼. '도와줘'라고. 나는 항상 도와줄 준비가 되어 있어."
42. "너의 마음이 편안해질 때까지 난 여기서 기다릴게. 언제든지 얘기해줘."
43. "지금 이 순간이 힘들다면, 우리 같이 그 순간을 견뎌내 보자. 난 너와 함께야."
44. "네가 지금 얼마나 힘든지, 그리고 그걸 나한테 말해줘서 얼마나 고마운지 몰라."
45. "네가 나에게 털어놓을 수 있는 모든 감정을 다 말해도 돼. 나는 항상 네 편이야."
46. "넌 정말 대단해. 이렇게 힘든 걸 견뎌내고 있다는 것 자체가 얼마나 큰 일인지 알아?"
47. "언제나 네 곁에 있을게. 그리고 네가 필요할 때 항상 달려올게."
48. "어떤 말도 필요 없을 때가 있어. 그냥 내가 옆에 있다는 걸 알아줘."
49. "너는 지금 충분히 잘하고 있어. 네가 얼마나 노력하고 있는지 나는 다 알아."
50. "오늘 있었던 일 중에서 가장 힘들었던 게 뭐야? 나랑 같이 이야기 나누면서 조금 풀어보자."`
			}, {
				role: "user",
				content: prompt
			}],
			temperature: 0.9,
			max_tokens: 100,
			top_p: 1,
			frequency_penalty: 0.5,
			presence_penalty: 0.6
		}),
	};

	for (let attempt = 1; attempt <= 3; attempt++) {
		try {
			const response = await fetch(apiEndpoint, requestOptions);

			// 429 오류일 경우 일정 시간 대기 후 재시도
			if (response.status === 429) {
				console.warn(`429 Too Many Requests - 재시도 중 (${attempt}/3)`);
				await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
				continue; // 재시도
			}

			if (!response.ok) {
				console.error('OpenAI API 오류 발생:', response.status);
				return `오류 발생: ${response.status}`;
			}

			const data = await response.json();
			return data.choices[0]?.message?.content || '응답을 처리하는 중 오류가 발생했습니다.';
		} catch (error) {
			console.error('OpenAI API 호출 중 오류 발생:', error);
			return 'OpenAI API 호출 중 오류 발생';
		}
	}

	return '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.';
}
*/