# Claude Certified Architect: Professional (CCAR-P)

Giáo trình 12 bài, dựng từ khóa "CCAR-P Full Course: All 16 Episodes" (169 phút), tháng 10/2026. Nguồn: [video khóa CCAR-P](https://www.youtube.com/watch?v=YjjeATv2Edc).

> Khác CCA-F ở chỗ: Foundations hỏi bạn có xây được không. Professional hỏi bạn **có nên xây** và có bảo vệ được quyết định đó không. Cùng công nghệ, khác công việc.

Mỗi bài có: mục tiêu, lý thuyết, ví dụ, mã, thực hành, bài tập, bẫy.

## Kỳ thi

| Hạng mục | Giá trị |
|---|---|
| Số câu | 63 |
| Thời gian | 120 phút, dưới 2 phút mỗi câu |
| Điểm đạt | 720 trên thang 100 đến 1.000 |
| Dạng | chọn một, và multiple response có ghi rõ chọn mấy |
| Giám sát | trực tuyến qua camera hoặc tại trung tâm |
| Hiệu lực | 12 tháng, sau đó gia hạn miễn phí nếu không để hết hạn |
| Thi lại | giãn cách tăng dần, tối đa số lần mỗi năm |

Không có đề luyện chính thức cho kỳ này. Đăng ký qua mạng đối tác của Anthropic.

Bảy domain, trong đó integration là phần lớn nhất, gần một phần năm.

---

## 01 · Bản đồ đề và ba bậc pattern

**Mục tiêu**

- Nhớ ba con số: 63 câu, 120 phút, 720 điểm.
- Đặt một bài toán vào đúng bậc: model tăng cường, workflow, agent.
- Áp luật "đơn giản nhất còn đủ".

### Lý thuyết

Ba bậc, mỗi bậc đổi độ linh hoạt lấy độ dự đoán được.

| Bậc | Ai chọn bước | Đặc điểm |
|---|---|---|
| Model tăng cường | Không có bước | Một call cộng tool, memory |
| Workflow | Code của bạn | Đường đi cố định, biết trước |
| Agent | Model | Đường đi vẽ lúc chạy, có thể khác mỗi lần |

Luật trên cùng: dùng pattern đơn giản nhất còn đủ yêu cầu, không lên một bậc cao hơn. Agentic đổi latency và chi phí lấy hiệu năng, chỉ đáng khi việc thật sự mở và khó.

Hai lỗi kiến trúc hay gặp:

| Lỗi | Hình dạng | Hậu quả |
|---|---|---|
| Over-orchestration | Cả đội agent cho một đường thẳng | Coordination chiếm phần lớn công việc |
| Gold plating | Gắn mọi tool và safeguard | Hóa đơn và bề mặt rủi ro tăng |

Câu trả lời thắng thường là bậc thấp nhất vẫn thỏa mọi ràng buộc trong stem.

### Ví dụ

Một team dạy hóa đơn tự xử lý bằng agent. Việc cố định: đọc field, đối chiếu đơn mua, gửi đi.

| Dấu hiệu | Kết luận |
|---|---|
| Cùng field, cùng kiểm tra mỗi lần | Workflow |
| Demo chạy được, production mỗi ngày một đường | Pattern sai, không phải cần tune |
| Chuyên gia sửa | Xóa agent, thay bằng một chuỗi bước |

Bài học: bước điều trị đúng là xóa code, không phải tinh chỉnh.

### Mã

Không có code đặc thù. Khi làm đề, vẽ ba bậc rồi khoanh bậc thấp nhất thỏa stem.

### Thực hành

1. Lấy ba việc đang dùng AI.
2. Với mỗi việc, xác định ai chọn bước tiếp theo.
3. Ghi cái mất nếu leo lên một bậc.
4. Chọn lại bậc thấp nhất còn đủ.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Phân loại 6 hệ thống theo ba bậc | 15 phút | Mỗi cái nêu ai chọn bước |
| 2 | Chỉ ra một ca over-orchestration | 10 phút | Nêu được chi phí coordination |
| 3 | Viết lý lẽ bảo vệ bậc thấp hơn | 15 phút | Nêu được ràng buộc nào bị vi phạm nếu leo |

### Bẫy

Chọn agent vì roadmap cần chữ "autonomous". Đề thưởng cho bậc thấp nhất thỏa yêu cầu.

---

## 02 · Khi nào agent thứ hai là gánh nặng

**Mục tiêu**

- Nêu hai lý do chính đáng để tách agent.
- Định lượng chi phí multi-agent.
- Gắn thiết kế với một giá trị kinh doanh và nêu giá phải trả.

### Lý thuyết

Hai lý do chính đáng:

| Lý do | Cơ chế |
|---|---|
| Cô lập context | Subagent chỉ thấy phần nó cần |
| Bề rộng | Nhiều hướng độc lập chạy song song |

Ngoài hai lý do đó, tách agent thường là coordination độn thêm. Mỗi agent thêm một handoff, mỗi handoff là chỗ rơi context.

Dữ liệu từ Anthropic: hệ multi-agent đốt khoảng 15 lần token so với chat thường. Đó là quyết định ngân sách, không phải chi tiết kỹ thuật.

Điều kiện loại: nếu mọi agent cần cùng context, hoặc mỗi bước phụ thuộc bước trước, multi-agent là sai hình dạng.

Năm giá trị kinh doanh: hiệu quả, chuyển đổi, năng suất, chi phí, đạt mục tiêu hiệu năng đã hứa. Kiến trúc phải phục vụ một trong số đó.

### Ví dụ

Hệ nghiên cứu 5 agent: planner, searcher, summarizer, checker, writer. Production chậm, đắt, nửa số bug là agent chờ nhau.

| Phân tích | Kết quả |
|---|---|
| Truy xem việc thật nằm ở đâu | Hai agent làm việc thật |
| Ba agent còn lại | Chuyển lời |
| Sửa | Bỏ ba, giữ hai |

Team được giao "chuyển đổi tổ chức" nên chọn bản hoành tráng; ràng buộc thật là chi phí và độ tin cậy, cả hai đều tệ hơn.

### Mã

Không có code đặc thù. Khung trả lời: "thiết kế này phục vụ [giá trị], và nó làm [giá trị khác] xấu đi [bao nhiêu]".

### Thực hành

1. Với một hệ nhiều agent, đếm số handoff.
2. Xác định agent nào chỉ chuyển lời.
3. Tính token tiêu thụ so với một agent đơn.
4. Viết một câu nêu giá trị và giá phải trả.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Đếm handoff và chi phí | 15 phút | Có số |
| 2 | Chỉ ra agent thừa | 10 phút | Nêu được việc nó làm |
| 3 | Viết câu bảo vệ hai bước | 10 phút | Có giá trị và giá |

### Bẫy

Trả lời theo giá trị người ta nói to nhất, không theo ràng buộc thật trong stem.

---

## 03 · Chọn model, viết prompt, cache

**Mục tiêu**

- Chọn model theo ba trục và bằng eval set.
- Dùng system prompt như template có slot.
- Đặt cache đúng thứ tự.

### Lý thuyết

| Trục | Câu hỏi |
|---|---|
| Capability | Có vượt ngưỡng chất lượng không |
| Speed | Có ai đang chờ không |
| Cost | Nhân với khối lượng ra bao nhiêu |

Hai điểm bắt đầu hợp lý: model rẻ trước, nâng nếu không đạt; hoặc model mạnh nhất, đo rồi tối ưu xuống. Cái quyết định là eval set, không phải cảm giác.

Một đòn ít người dùng: một số model có tham số effort đổi trí tuệ lấy tốc độ và chi phí. Tinh chỉnh effort thường tốt hơn đổi model.

Prompt: system prompt là lệnh đứng, viết như template có slot, không viết lại mỗi lần. Zero shot là mặc định; few-shot khi cần ví dụ; chain of thought chỉ khi thật sự cần suy luận nhiều bước, vì nó thêm latency.

Cache: đặt nội dung tĩnh trước, nội dung đổi sau.

| Sai | Đúng |
|---|---|
| Hướng dẫn ở đầu, tin nhắn người dùng ở giữa, chính sách ở cuối | Chính sách và tool ở đầu, tin nhắn người dùng ở cuối |

### Ví dụ

Pipeline trích xuất chạy model đắt, độ chính xác vượt mục tiêu, chi phí đau.

| Phương án | Kết luận |
|---|---|
| Giữ model, giảm max_tokens và temperature | Vặn núm |
| Xuống một tier, chạy lại eval set | Đúng |
| Thêm routing layer | Xây thứ chưa cần |
| Thêm ví dụ cho tự tin hơn | Đổ token vào chỗ không phải vấn đề |

### Mã

```python
resp = client.messages.create(
    model="claude-sonnet-5-5",          # xuống tier sau khi eval đạt
    max_tokens=1024,
    system=[
        {"type": "text", "text": POLICY},                  # tĩnh
        {"type": "text", "text": TOOL_GUIDE,
         "cache_control": {"type": "ephemeral"}},
    ],
    messages=[{"role": "user", "content": question}],      # đổi
)
print(resp.usage.cache_read_input_tokens)
```

### Thực hành

1. Chạy cùng một task trên hai tier.
2. Ghi chất lượng, latency, giá.
3. Tách prompt thành phần tĩnh và phần đổi.
4. Đặt cache, đo lần hai.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | So hai tier trên eval set | 25 phút | Có số ba trục |
| 2 | Viết system prompt dạng template | 15 phút | Có slot rõ ràng |
| 3 | Đo cache read | 15 phút | Lần hai lớn hơn 0 |

### Bẫy

Nhảy lên model to nhất. Tài liệu nói tinh chỉnh effort thường thắng đổi model.

---

## 04 · Integration và least privilege

**Mục tiêu**

- Đọc danh sách tool như danh sách quyền.
- Bỏ capability thay vì log quanh nó.
- Phát hiện lỗi danh tính.

### Lý thuyết

Ở tầng kiến trúc, tool không phải "năng lực", mà là **quyền**. Câu hỏi đổi từ "agent làm được gì cho ta" sang "agent làm được gì với ta nếu người khác viết chỉ dẫn".

| Vấn đề | Sửa |
|---|---|
| Tool không ai dùng vẫn tồn tại | Xóa khỏi cấu hình |
| Tool nguy hiểm | Xóa capability, không log quanh nó |
| Agent dùng tài khoản chung thấy mọi bản ghi | Cấp quyền theo người dùng |

Log chỉ cho biết cửa chuồng đã mở sau khi ngựa đi mất. Tool không tồn tại là tool kẻ tấn công không với tới.

Chi phí thứ hai của danh sách tool dài: mỗi tool được mô tả đầy đủ trên **mọi** request, tốn token trước khi người dùng nói câu nào, và cho model thêm tool để chọn nhầm.

### Ví dụ

Agent support có bốn tool: đọc tài khoản, soạn trả lời, hoàn tiền, xóa bản ghi. Không ai nhớ lần cuối dùng hoàn tiền hay xóa.

| Phương án | Kết luận |
|---|---|
| Thêm log cho hai tool nguy hiểm | Không ngăn được |
| Thêm bước xác nhận trước khi hoàn tiền | Giảm, không bỏ |
| Xóa hai tool khỏi cấu hình | Đúng |
| Đổi sang model mạnh hơn | Sai hướng |

### Mã

```json
{
  "tools": ["read_account", "draft_reply"]
}
```

Danh sách tool là bản kê quyền. Nếu một tool không có trong danh sách, không có đường nào gọi nó.

### Thực hành

1. Liệt kê tool của một agent đang chạy.
2. Đánh dấu tool không dùng trong 30 ngày.
3. Xóa chúng khỏi cấu hình, chạy lại.
4. Kiểm quyền danh tính: agent có thấy bản ghi người khác không.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Rà danh sách tool | 15 phút | Có tool bị xóa |
| 2 | Viết lý do xóa | 10 phút | Nêu capability, không nêu log |
| 3 | Kiểm lỗi danh tính | 15 phút | Nêu được ai chạy quyền ai |

### Bẫy

Thêm log và bước xác nhận rồi coi là đã xử lý. Capability vẫn còn.

---

## 05 · RAG: chunk và truy xuất

**Mục tiêu**

- Chunk theo ranh giới ngữ nghĩa.
- Nhận ra index cũ gây trả lời tự tin sai.
- Đo chất lượng truy xuất.

### Lý thuyết

Model không biết tài liệu riêng của công ty. Mỗi câu hỏi, hệ thống tìm đoạn liên quan rồi dán vào prompt. Câu trả lời chỉ tốt bằng thứ được lấy ra.

| Bước | Lỗi thường gặp |
|---|---|
| Chunk | Cắt theo số ký tự, cắt giữa điều khoản |
| Index | Không dựng lại sau khi tài liệu đổi |
| Truy xuất | Đo độ trễ, không đo độ liên quan |

Nguyên tắc chunk: cắt theo ranh giới của tài liệu (điều, mục, hàm), để mỗi mảnh tự nó có nghĩa. Kích thước là đánh đổi có chủ đích, không phải con số tròn.

### Ví dụ

Tài liệu sản phẩm cập nhật thứ Sáu. Cuối tuần trợ lý vẫn trả lời nhanh, tự tin, và sai toàn bộ về chính sách mới.

| Chẩn đoán | Kết quả |
|---|---|
| Model | Không đổi |
| Prompt | Không đổi |
| Index | Bản sao từ trước thứ Sáu |
| Kết luận | Lỗi truy xuất, không phải hallucination |

### Mã

```python
# Chunk theo cấu trúc, không theo độ dài
chunks = []
for section in doc.sections:          # điều, mục, hàm
    for para in section.paragraphs:
        chunks.append({"text": para.text, "section": section.title})
```

### Thực hành

1. Lấy một tài liệu dài, chunk theo số ký tự.
2. Kiểm xem có điều khoản nào bị cắt đôi.
3. Chunk lại theo cấu trúc.
4. So chất lượng trả lời ở hai cách.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Tìm chunk bị cắt đôi | 15 phút | Có ít nhất một ca |
| 2 | Chunk lại theo cấu trúc | 20 phút | Không điều khoản nào bị cắt |
| 3 | Đo độ liên quan của top-3 | 15 phút | Có điểm số |

### Bẫy

Tăng context window để chứa nhiều chunk hơn. Đó là tăng sức chứa, không sửa chỗ cắt.

---

## 06 · Monitoring: bảng xanh, câu trả lời rác

**Mục tiêu**

- Giải thích vì sao hệ LLM hỏng mà dashboard vẫn xanh.
- Kể tên bốn lớp quan sát.
- Phân biệt log và watch.

### Lý thuyết

Phần mềm thường hỏng ồn ào. Hệ LLM có thể trả 200, nội dung hợp lệ, và sai.

| Lớp | Ghi gì |
|---|---|
| Trace | Toàn bộ đường đi một request, từng chặng, có thời gian |
| Per-stage | Mỗi chặng: độ trễ và chất lượng đầu ra |
| Sampling + judge | Lấy mẫu, chấm theo rubric |
| Cost meter | Token vào ra mỗi request từ `usage` |

Một request được log không phải request được theo dõi.

### Ví dụ

Hệ retrieval trả lời kém dần một tuần, không alarm nào kêu: latency bình thường, error rate phẳng.

| Thiếu gì | Hậu quả |
|---|---|
| Điểm liên quan của retrieval | Không biết chặng nào hỏng |
| Thời gian từng chặng | Không biết chậm ở đâu |
| Mẫu chấm định kỳ | Chỉ biết khi khách phàn nàn |

### Mã

```python
u = resp.usage
log.info("request", input=u.input_tokens, output=u.output_tokens,
         cache_read=u.cache_read_input_tokens,
         latency_ms=elapsed, stage="answer")
```

### Thực hành

1. Thêm trace cho một pipeline ba chặng.
2. Ghi độ trễ và một điểm chất lượng mỗi chặng.
3. Lấy mẫu 20 câu, chấm theo rubric.
4. Dựng biểu đồ chi phí theo ngày từ usage.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Vẽ 4 lớp cho hệ của bạn | 15 phút | Đủ bốn lớp |
| 2 | Thêm một điểm chất lượng mỗi chặng | 20 phút | Có biểu đồ |
| 3 | Chấm 20 mẫu | 20 phút | Có điểm trung bình và độ lệch |

### Bẫy

Theo dõi latency và error rate rồi coi là đủ. Hai thứ đó không nói nội dung đúng hay sai.
---

## 07 · Eval: biết là tốt hơn hay chỉ khác đi

**Mục tiêu**

- Dựng golden set từ lỗi thật.
- Đo năm thứ, không chỉ accuracy.
- Dùng ba cách chấm và kiểm chéo.

### Lý thuyết

"Tốt hơn" chỉ có nghĩa khi đo được bằng cùng một thước. Thước đó là **golden set**: đầu vào thật ghép với đầu ra đúng.

Năm thứ cần đo:

| Chỉ số | Câu hỏi |
|---|---|
| Accuracy | Trả lời đúng chưa |
| Latency | Có kịp cho người dùng không |
| Cost | Ở quy mô thật tốn bao nhiêu |
| Safety | Có lộ dữ liệu hay hứa điều không làm được không |
| Security | Có bị đầu vào độc hại đẩy khỏi đường ray không |

Ba cách chấm:

| Cách | Dùng cho | Cạm bẫy |
|---|---|---|
| Code check | Đúng/sai rõ ràng | Không bắt được sắc thái |
| Model judge | Giọng điệu, tiêu chí mềm | Cần hiệu chỉnh với người |
| Người đọc | Xác nhận hai cách trên đo đúng thứ cần đo | Đắt |

Set chỉ có ca happy path là demo, không phải eval. Phải có ca thất bại và ca đối kháng: mỉa mai, nhiều lỗi chính tả, câu cố tình bảo bỏ qua chỉ dẫn.

Điểm tinh tế: kiểm cả nơi hành vi **không** được xảy ra, không chỉ nơi nó phải xảy ra.

### Ví dụ

Một prompt được viết lại "gọn hơn", trả lời mượt hơn. Thứ Sáu ship. Tuần sau compliance phát hiện một nhóm câu trả lời hoàn tiền mất disclaimer bắt buộc.

| Thiếu gì | Hậu quả |
|---|---|
| Ca safety trong eval | Không ai thấy disclaimer biến mất |
| Chấm cả tiêu chí không định đổi | Không phát hiện hỏng kèm |

### Mã

```python
cases = [
    {"id": "refund-01", "input": ticket, "must_contain": ["disclaimer"],
     "must_not_contain": ["cam kết hoàn trong 24h"]},
]
score = sum(check(c) for c in cases) / len(cases)
```

### Thực hành

1. Lấy 25 ticket thật, ghi đầu ra đúng.
2. Viết một code check cho yêu cầu cứng.
3. Viết rubric cho model judge, chấm thử 20 ca.
4. So với người chấm, chỉnh rubric.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Dựng golden set 25 ca | 45 phút | Có ca thất bại và đối kháng |
| 2 | Viết code check | 20 phút | Chạy được, không phụ thuộc model |
| 3 | Hiệu chỉnh judge | 25 phút | Judge khớp người ở 20 ca |

### Bẫy

Chỉ chấm accuracy. Safety và security là chỉ số hạng nhất, mỗi cái có ca riêng và ngưỡng riêng.

---

## 08 · A/B test và tối ưu chi phí

**Mục tiêu**

- Chạy A/B có baseline.
- Đổi một thứ mỗi lần.
- Truy vấn đề về đúng tầng.

### Lý thuyết

Mọi thay đổi trên hệ đang chạy là một cá cược rằng nó tốt hơn và không phá gì.

| Bước | Việc |
|---|---|
| 1 | Chạy hệ hiện tại trên golden set, ghi điểm baseline |
| 2 | Đổi **một** thứ |
| 3 | Chạy lại trên cùng bộ |
| 4 | Giữ nếu thắng có ý nghĩa, hoàn nếu không |

Đổi ba thứ cùng lúc thì điểm có nhảy cũng không biết cái nào làm.

Demo không phải đo. Cảm giác "trả lời hay hơn" có tên: eval blindness.

### Ví dụ

Đổi sang model rẻ hơn vì demo nhanh và trông ổn. Một tuần sau khách phàn nàn.

| Kiểm tra | Kết quả |
|---|---|
| Golden set trước đổi | Không chạy |
| Golden set sau đổi | Điểm thấp hơn bản cũ |
| Kết luận | Tối ưu mù |

### Mã

```python
baseline = run_eval(system_v1)
candidate = run_eval(system_v2)
assert candidate.total >= baseline.total, "hoàn bản mới"
assert candidate.safety >= baseline.safety, "không được giảm safety"
```

### Thực hành

1. Ghi baseline trước khi sửa bất cứ gì.
2. Đổi một thứ, chạy lại.
3. Ghi chênh lệch từng chỉ số, kể cả chỉ số không định đổi.
4. Hoặc giữ, hoặc hoàn, có lý do.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Ghi baseline | 20 phút | Có số cho 5 chỉ số |
| 2 | Chạy một thay đổi đơn | 20 phút | Không đổi gì khác |
| 3 | Viết kết luận giữ hoàn | 10 phút | Dựa trên số, không cảm giác |

### Bẫy

Gộp nhiều thay đổi trong một lần release. Điểm có lên cũng không học được gì.

---

## 09 · Guardrail: prompt xin, code chặn

**Mục tiêu**

- Phân biệt guidance và control.
- Kể năm failure mode.
- Đặt guardrail đúng tầng.

### Lý thuyết

Trong system prompt, câu "đừng bao giờ hoàn tiền lớn mà không duyệt" là **guidance**. Nó định hình điều model thường làm, không định hình điều nó không thể làm.

| Từ trong yêu cầu | Đặt ở đâu |
|---|---|
| must, never, cannot | Code: check, gate, permission |
| should, prefer | Prompt |

Năm failure mode:

| Mode | Nghĩa |
|---|---|
| Hallucination | Khẳng định sai với vẻ chắc chắn |
| Prompt injection | Văn bản đọc vào chứa chỉ dẫn chiếm quyền |
| Tool misuse | Gọi tool thật với tham số sai hoặc sai lúc |
| Context poisoning | Thông tin xấu vào cửa sổ rồi được coi là thật |
| Drift | Hệ tốt lúc đầu, kém dần khi thế giới đổi |

Chỉ hallucination là model tự sai. Bốn cái còn lại là hệ thống cho nó đọc hoặc làm gì.

### Ví dụ

Agent hoàn tiền nhỏ tự động, trên ngưỡng chờ người duyệt. Một chiều đọc sai field tiền tệ, tạo lệnh hoàn nhiều số 0. Người duyệt bắt được trong vài giây.

| Phương án | Kết luận |
|---|---|
| Viết mạnh hơn trong prompt | Guidance |
| Thêm log | Không chặn |
| Gate trong code | Control |
| Đổi model | Không liên quan |

### Mã

```python
def issue_refund(amount, session):
    if amount > session.limit and not session.human_approved:
        raise PermissionError("Vượt hạn mức, cần người duyệt.")
    return payments.refund(amount)
```

### Thực hành

1. Liệt kê 5 rule bất biến của hệ bạn.
2. Kiểm rule nào đang nằm trong prompt.
3. Chuyển sang code, kiểm nó chặn thật.
4. Với mỗi failure mode, nêu một lớp bắt.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Phân loại 8 rule thành prompt hay code | 10 phút | Rule bất biến vào code |
| 2 | Viết một gate | 20 phút | Chặn được ca xấu |
| 3 | Gắn lớp cho 5 failure mode | 15 phút | Mỗi mode có lớp |

### Bẫy

Thêm disclaimer hoặc log rồi coi là guardrail. Control phải chạy trước khi hành động xảy ra.

---

## 10 · Compliance: dữ liệu đi đâu

**Mục tiêu**

- Vẽ bản đồ luồng dữ liệu trước khi nói tên luật.
- Phân biệt GDPR, HIPAA, FedRAMP.
- Chọn control theo "must".

### Lý thuyết

Trước mọi quy định, vẽ luồng dữ liệu: tạo ở đâu, đi qua đâu, nằm đâu, ai chạm được. Mỗi mũi tên là một chỗ dữ liệu sống và là chỗ cơ quan quản lý chỉ vào.

| Luật | Hỏi gì | Control |
|---|---|---|
| GDPR | Dữ liệu cá nhân nằm đâu, xóa được không, gửi thừa không | Ghim nơi inference và nơi lưu; xóa và tối thiểu hóa là việc của bạn |
| HIPAA | Thông tin sức khỏe được bảo vệ | API có hỗ trợ, kèm hợp đồng BAA đã ký; mã hóa, kiểm soát truy cập, audit log |
| FedRAMP | Môi trường chạy có được ủy quyền không | Ủy quyền môi trường, không ủy quyền model |

Câu chốt: FedRAMP không chứng nhận model; nó ủy quyền môi trường model chạy trong. Cùng một model, môi trường khác thì tuân thủ khác.

| Control | Chặn được gì |
|---|---|
| Zero data retention | Không lưu prompt và trả lời |
| Ghim vùng | Dữ liệu không ra ngoài vùng |
| Xóa trường nhạy cảm khỏi log | Log không thành nguồn rò rỉ |
| Người duyệt trước quyết định | Sai sót không tới người nhận |

Log ghi lại chuyện đã xảy ra; nó không ngăn chuyện xảy ra.

### Ví dụ

Dự án y tế hoàn thành, demo đẹp, không launch được vì legal hỏi "dữ liệu bệnh nhân đi đâu" và không ai vẽ được.

| Thiếu | Hệ quả |
|---|---|
| Bản đồ luồng | Không trả lời được câu hỏi cơ bản |
| BAA | Không được xử lý dữ liệu y tế |
| Vùng lưu | Không chứng minh được residency |

### Mã

Không có code đặc thù. Sản phẩm là bản đồ: hộp và mũi tên, mỗi mũi tên ghi dữ liệu gì và ai đọc được.

### Thực hành

1. Vẽ luồng dữ liệu của một hệ thật.
2. Đánh dấu chỗ dữ liệu nhạy cảm xuất hiện.
3. Với mỗi nhãn luật, ghi câu hỏi và control.
4. Kiểm control nào là "must" mà đang nằm trong prompt.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Vẽ bản đồ luồng | 20 phút | Mọi mũi tên có nhãn dữ liệu |
| 2 | Gắn 3 luật vào bản đồ | 15 phút | Mỗi luật một câu hỏi rõ |
| 3 | Chọn control cho 2 rủi ro | 10 phút | Cả hai là control, không phải log |

### Bẫy

Bật zero data retention rồi coi là tuân thủ đủ. Nó chỉ là một control trong nhiều.

---

## 11 · Bảo vệ thiết kế và triển khai cho team

**Mục tiêu**

- Tìm ràng buộc quyết định trong buổi discovery.
- Trình bày quyết định, không trình bày sơ đồ.
- Đặt cấu hình đúng tầng cho cả team.

### Lý thuyết

Discovery: hỏi tới khi tìm ra **một ràng buộc quyết định**. Thường là chi phí, hoặc compliance, hoặc điều không bao giờ được xảy ra.

Một thiết kế bảo vệ được có ba phần:

| Phần | Nội dung |
|---|---|
| Mua gì | Lợi ích nói bằng ngôn ngữ kinh doanh |
| Giá gì | Mặt trái, nói thật |
| Phục vụ trụ cột nào | Giá trị đã thống nhất ở discovery |

Sơ đồ cho biết xây gì, không cho biết vì sao chọn nó thay vì phương án rẻ hơn. Người ký duyệt chỉ đánh giá được phần "vì sao".

Với Claude Code cho team, ba tầng cấu hình:

| Tầng | Ai kiểm soát |
|---|---|
| Personal | Từng người |
| Team | Repo, ai clone cũng có |
| Managed | Tổ chức đẩy, cá nhân không tắt được |

Hai loại file, hai chức năng khác hẳn nhau:

| Loại | Bản chất |
|---|---|
| File hướng dẫn cho model | Ghi chú; model thường theo, đôi khi không |
| Settings, permission | Tường; tool ép bất kể model quyết gì |

### Ví dụ

Trợ lý phân loại claim bị dừng một tháng. Thiết kế đúng; câu trả lời sai.

| Câu hỏi của giám đốc | Câu trả lời đã đưa | Câu trả lời đúng |
|---|---|---|
| "Có khi nào gửi claim sai chỗ không" | "Độ chính xác rất cao" | "Có, một tỉ lệ nhỏ; số đó được chuyển người kiểm trước khi gửi" |

Thiết kế không đổi; chỉ câu nói đổi, và dự án được duyệt.

Team 40 người mở rộng quyền trong settings dùng chung để bớt hỏi. Một tuần sau, agent chạy script dọn dẹp lên production thay vì staging.

| Lỗi | Tầng đúng |
|---|---|
| Mở quyền chạy lệnh cho mọi người | Managed hoặc gate theo môi trường |
| Ghi "đừng chạm production" vào file hướng dẫn | Permission rule |

### Mã

```json
{
  "permissions": {
    "deny": ["Bash(*production*)", "Bash(rm -rf *)"]
  }
}
```

### Thực hành

1. Chạy discovery cho một dự án: hỏi "điều gì tuyệt đối không được xảy ra".
2. Viết một câu ba phần để bảo vệ thiết kế.
3. Liệt kê quyết định nào thuộc tầng team, tầng managed.
4. Chuyển một "ghi chú" thành "tường".

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Tìm ràng buộc quyết định | 15 phút | Một câu, loại bỏ được phương án |
| 2 | Viết câu ba phần | 15 phút | Có lợi ích, giá, trụ cột |
| 3 | Đặt 5 cấu hình vào 3 tầng | 15 phút | Rule bất biến ở managed hoặc permission |

### Bẫy

Trình bày sơ đồ kiến trúc. Nó không cho người ký duyệt thấy vì sao.

---

## 12 · Bốn ca mổ, cách đọc đề, ngày thi

**Mục tiêu**

- Nhận diện bốn chữ ký lỗi production.
- Đọc đề theo ràng buộc, không theo chủ đề.
- Làm bài hai lượt.

### Lý thuyết

Bốn ca mổ, bốn chữ ký:

| Chữ ký | Triệu chứng | Nguyên nhân thật |
|---|---|---|
| Context rot | Càng dài càng kém, quên ràng buộc cũ | Cửa sổ đầy, chi tiết ở giữa bị chôn |
| Index cũ | Tự tin, trôi chảy, sai đều | Re-ingest hoặc đổi embedding model |
| Tool nhiễu | Gọi sai tool, tốn token | Danh sách tool dài, mô tả mờ |
| Không đo | Dashboard xanh, khách phàn nàn | Không có điểm chất lượng |

Ba câu hỏi chạy trên mọi hệ hỏng: cái gì đổi, ở tầng nào, có đo được không.

Cách đọc đề, ba bước:

1. Đọc tìm **ràng buộc**, không tìm chủ đề. `must`, `never`, giới hạn, cơ quan quản lý, trần chi phí.
2. Loại theo **nguyên tắc**: đề đang kiểm nguyên tắc nào, phương án nào vi phạm.
3. Multiple response: chấm từng phương án đúng/sai độc lập với stem.

Ngày thi: hai lượt. Lượt một trả lời câu chắc, câu nào bắt đầu giằng co thì đặt đáp án tốt nhất, đánh dấu, đi tiếp. Không bao giờ để trống.

### Ví dụ

Câu mẫu chính thức: agent có 4 tool, nhân viên chỉ cần đọc ticket và soạn trả lời, lo ngại bị dụ dùng tool nguy hiểm.

| Phương án | Loại vì |
|---|---|
| Thêm log cho refund và delete | Không chặn |
| Xóa hai tool khỏi cấu hình | Đúng |
| Giữ tool, thêm xác nhận | Giảm, không bỏ |
| Đổi model lớn hơn | Sai hướng |

Ràng buộc nằm ở câu "chỉ cần đọc và soạn": capability thừa phải bị xóa.

### Mã

Không có code. Đây là bài về đọc và chọn.

### Thực hành

1. Lấy 5 câu, gạch chân ràng buộc trước khi đọc đáp án.
2. Viết nguyên tắc mỗi câu đang kiểm.
3. Loại phương án theo nguyên tắc.
4. Làm 20 câu trong 40 phút, hai lượt.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Gạch ràng buộc 10 stem | 15 phút | Mỗi câu một ràng buộc |
| 2 | Viết nguyên tắc cho 10 câu | 15 phút | Không câu nào ghi "chủ đề" |
| 3 | Làm 20 câu hai lượt | 40 phút | Không câu nào bỏ trống |

### Bẫy

Đọc lướt ba câu đầu rồi chọn. Mệnh đề quyết định thường nằm ở câu thứ ba hoặc thứ tư.
