# Claude Certified Architect: Foundations (CCAR-F)

Ghi chú 37 module, dựng từ playlist YouTube "Claude Certified Architect - Foundations - Free Course" (38 video), tháng 10/2026. Nguồn: [playlist Architect](https://www.youtube.com/playlist?list=PLTw_BnRTtaD4).

> Khóa này dạy **quyết định kiến trúc**: khi nào cần agent, chia việc thế nào, chọn topology gì, cấu hình ra sao, và bảo vệ lựa chọn đó trước người phản biện. Khác khóa Developer ở chỗ đáp án thường là "cái đơn giản nhất còn đúng", không phải "cái đầy đủ nhất".
>
> Đề luyện 20 câu theo dạng scenario: [practice-exam.md](ccaf-architect/practice-exam.md).

## Kỳ thi

Tên chính thức: **Claude Certified Architect - Foundations (CCA-F)**, thi có giám sát.

| Hạng mục | Giá trị |
|---|---|
| Số câu | 60, mỗi câu 1 đúng và 3 nhiễu |
| Thời gian | 120 phút, khoảng 2 phút mỗi câu |
| Dạng | multiple choice; không trừ điểm đoán, bỏ trống tính sai |
| Scenario | 4 trong 6 kịch bản, mỗi kịch bản 15 câu |
| Thang điểm | 100 đến 1.000, đạt 720 |
| Lệ phí | 49 USD |
| Thi lại | 6 tháng một lần |
| Hình thức | trực tuyến có giám sát, ghi màn hình và camera |

720 là **điểm quy đổi**, không phải 72%. Không suy ra được số câu đúng cần thiết. Tỉ lệ theo domain trong báo cáo điểm là chẩn đoán, không phải điều kiện đạt.

## Năm domain chính thức

| # | Domain | Trọng số | Module |
|---|---|---|---|
| 1 | Agentic Architecture & Orchestration | 27% | 02, 03, 04, 15, 16, 17, 18, 19, 32, 33 |
| 2 | Tool Design & MCP Integration | 18% | 10, 11, 20 |
| 3 | Claude Code Configuration & Workflows | 20% | 05, 06, 07, 21, 22, 23, 24, 26 |
| 4 | Prompt Engineering & Structured Output | 20% | 08, 09, 25, 27, 28, 35 |
| 5 | Context Management & Reliability | 15% | 12, 13, 14, 29, 30, 31, 34, 36, 37 |

Giờ học theo ngân sách 40 giờ: D1 10,8; D2 7,2; D3 8,0; D4 8,0; D5 6,0.

Sau khi chia theo trọng số, điều chỉnh theo độ phủ: D5 xuất hiện như domain chính ở phần lớn scenario, nên trải ra nhiều buổi thay vì gom một chỗ.

## Sáu scenario

Đề chọn 4 trong 6, mỗi cái 15 câu:

| Scenario | Nội dung |
|---|---|
| Customer Support Resolution Agent | escalation, xác minh danh tính, giữ case fact |
| Code Generation with Claude Code | sửa nhiều file, plan mode, hook |
| Multi-Agent Research System | hub-and-spoke, `fork_session`, provenance |
| Developer Productivity | phân tầng `CLAUDE.md`, skill, rule |
| Claude Code for CI/CD | `-p`, JSON output, review độc lập |
| Structured Data Extraction | JSON schema, validation-retry, Message Batches |

## Phản mẫu đề thi luôn cài làm đáp án sai

Gặp một trong các mẫu sau trong lựa chọn, gần như chắc chắn sai:

| Phản mẫu | Đáp án đúng |
|---|---|
| Dừng vòng lặp bằng parse văn xuôi hoặc đếm vòng | `stop_reason` |
| Luật nghiệp vụ tất định đặt trong prompt | Hook |
| Lỗi chung chung, hoặc nuốt lỗi | Metadata lỗi có cấu trúc |
| Sentiment hoặc confidence tự báo làm tín hiệu escalate | Ba lý do hợp lệ ở module 31 |
| Review nhiều file trong một lượt | Lượt theo file cộng lượt tích hợp |
| Field `required` cho nguồn có thể thiếu | Field nullable |
| Rule của cả team đặt ở `~/.claude/CLAUDE.md` | Scope project, commit |

## Nguồn chính thức

| Nguồn | Địa chỉ |
|---|---|
| Cổng khóa học | [anthropic.skilljar.com](https://anthropic.skilljar.com/) |
| Bốn khóa bắt buộc | Claude Code in Action · Introduction to Model Context Protocol · Introduction to Agent Skills · Building with the Claude API |
| Study Guide PDF và practice exam | phát hành trong SkillJar khi đăng ký kỳ thi |

Ngoài phạm vi thi: hosting và transport của MCP server, prompt caching. Prompt caching vào phạm vi ở khóa Professional.

---

## 01 · How This Exam Works

Bài thi đo cả tốc độ đọc. Scenario dài một đoạn văn, 60 câu trong 120 phút, tức khoảng 2 phút mỗi câu.

| Việc | Cách làm |
|---|---|
| Phân bổ thời gian | Theo trọng số domain, không theo sở thích |
| Đọc stem | Đọc kỹ nhưng có nhịp, đừng đọc lại 3 lần |
| Hiểu điểm | 720 là thang quy đổi, không phải phần trăm |
| Ngoài phạm vi | Đọc danh sách loại trừ ngang hàng danh sách trong phạm vi |

### Ví dụ

Ngân sách 40 giờ, áp trọng số:

| Domain | Phép tính | Giờ |
|---|---|---|
| D1 | 40 × 27% | 10,8 |
| D2 | 40 × 18% | 7,2 |
| D3 | 40 × 20% | 8,0 |
| D4 | 40 × 20% | 8,0 |
| D5 | 40 × 15% | 6,0 |

Nhưng D5 là domain chính trong 4 trên 6 scenario. Nếu dồn 6 giờ vào một buổi cuối tuần thì đến lúc thi phần lớn đã quên. Thay vào đó chia 6 giờ thành 6 buổi 1 giờ, mỗi buổi gắn với một scenario.

Với câu hỏi kiểu "MCP server transport nào phù hợp", đáp án là bỏ qua: transport nằm ngoài phạm vi. Thời gian đó chuyển sang D1.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Lập bảng 40 giờ theo trọng số, rồi chia lại theo độ phủ | 20 phút | D5 xuất hiện ở ít nhất 4 buổi khác nhau |
| 2 | Đọc danh sách ngoài phạm vi, gạch bỏ 3 chủ đề bạn định học | 10 phút | Mỗi chủ đề gạch có lý do "không được chấm" |
| 3 | Bấm giờ đọc một scenario mẫu, trả lời trong 2 phút | 15 phút | Đọc xong trong 70 giây, còn 50 giây trả lời |

### Bẫy

Học theo hứng thú. Người giỏi MCP nhưng không lập luận được orchestration sẽ trượt vì D1 chiếm hơn một phần tư số điểm.

---

## 02 · Deciding Whether You Need an Agent

Ba hình thái, phân biệt bằng **ai chọn hành động kế tiếp**:

| Hình thái | Ai chọn bước sau | Dấu hiệu |
|---|---|---|
| Workflow | Người viết code | Liệt kê được toàn bộ nhánh trước |
| Agent | Model, dựa trên thứ vừa học | Đường đi hiện ra trong lúc chạy |
| Conversational | Không có kế hoạch | Trả lời từng lượt |

Câu hỏi duy nhất: **viết được toàn bộ trình tự ra trước không**. Được thì là workflow, kể cả khi mỗi bước rất khó. Có model, có tool, có vòng lặp mà mọi nhánh do người viết thì vẫn là workflow.

### Ví dụ

Hai hệ thống trông giống nhau:

| Hệ thống | Mô tả | Kết luận |
|---|---|---|
| Trích hóa đơn | Trích 12 field, kiểm tra, retry khi sai, ghi vào sổ | Workflow: điều kiện retry do code quyết, mọi nhánh đã viết |
| Điều tra lỗi job đêm | Không biết lỗi ở đâu, phải đọc log, thử giả thuyết | Agent: đường đi chỉ hiện ra khi khám phá |

Chi phí chọn sai: agent cho hệ thống thứ nhất tốn thời gian gấp nhiều lần và cho cùng kết quả, không có tín hiệu nào trong output báo rằng đã chọn sai hình thái.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Phân loại 5 hệ thống bạn biết thành workflow, agent, conversational | 15 phút | Mỗi kết luận nêu được ai chọn hành động kế tiếp |
| 2 | Lấy một task đang làm agent, thử viết toàn bộ nhánh ra giấy | 20 phút | Nếu viết được hết thì kết luận lại là workflow |
| 3 | Viết lý lẽ bảo vệ lựa chọn trước người phản biện | 10 phút | Nêu được cái mất nếu chọn hình thái kia |

### Bẫy

Nhầm độ khó với mức tự chủ. Task khó vẫn là workflow nếu viết được trình tự trước. Bài thi luôn đưa một hệ thống có model, tool, vòng lặp, xử lý lỗi, và đáp án đúng là workflow vì mọi nhánh do người viết.

---

## 03 · Decomposition and Execution Patterns

Chia việc theo **đường nối tự nhiên của tài liệu** (ranh giới file, bước khám phá), không chia theo số token. Chia theo token cắt ngang mạch suy nghĩ và không bước sau nào cứu được.

Mọi cách chia đều cần **bước tái hợp**. Một bước phải chịu trách nhiệm về tính nhất quán của kết quả cuối.

| Pattern | Dùng khi | Giá phải trả |
|---|---|---|
| Sequential | Bước sau cần output bước trước | Thời gian cộng dồn |
| Parallel | Các bước độc lập | Context nhân bản, nhiều điểm hỏng |
| Adaptive | Chưa biết phạm vi, phải khám phá trước | Chậm hơn kế hoạch cố định |

### Ví dụ

PR 14 file cần review bảo mật:

| Cách làm | Kết quả |
|---|---|
| Một prompt chứa cả 14 file | Phân tích nông đều, bỏ sót lỗi xuyên file |
| Chia theo token | Một mảnh cảnh báo mẫu nguy hiểm, mảnh khác duyệt chính mẫu đó |
| 14 lượt theo file, cộng 1 lượt tích hợp | Lượt tích hợp lần theo giá trị từ chỗ kiểm tra đến chỗ dùng |

Lượt tích hợp là bước tái hợp: nó bắt được thứ không lượt đơn lẻ nào thấy.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Chia một task lớn theo đường nối tự nhiên, ghi rõ đường nối | 15 phút | Không mảnh nào cắt giữa một luồng dữ liệu |
| 2 | Chỉ ra bước nào chịu trách nhiệm tính nhất quán cuối | 10 phút | Bước đó có input là output của tất cả bước khác |
| 3 | Chọn pattern theo phụ thuộc dữ liệu, viết ra giá phải trả | 15 phút | Nêu được cái gì nhân bản hoặc cộng dồn |

### Bẫy

Token chunking cộng nối kết quả. Nó giải bài toán context nên trông hiệu quả, nhưng đề thi luôn kèm một triệu chứng mâu thuẫn giữa các mảnh, và đáp án đúng thêm bước tái hợp.

---

## 04 · Multi-Agent Topologies

| Topology | Quan sát | Lỗi khi agent hỏng | Khi dùng |
|---|---|---|---|
| Hub and spoke | Một coordinator thấy mọi thứ | Coordinator thấy ngay | Mặc định cho hệ nhiều agent |
| Pipeline | Mỗi output vào đúng một input | Agent sau mới biết, phải xử lý ở mọi mối nối | Các tầng cố định, tuyến tính |
| Peer-to-peer | Không có điểm trung tâm | Mỗi agent phát hiện lỗi một lúc khác nhau | Tránh cho việc cần phối hợp |

Hai luật về subagent:

1. Mỗi subagent chỉ có tool cho vai trò của nó.
2. Coordinator chọn subagent nào chạy theo câu hỏi, không chạy cả pipeline.

### Ví dụ

Hệ nghiên cứu 4 agent: searcher, analyst, synthesizer, reporter.

| Câu hỏi | Chạy agent nào | Lý do |
|---|---|---|
| "Thủ đô của Pháp" | searcher, reporter | Sự kiện đơn giản, analyst không thêm giá trị |
| "Tổng hợp 6 tài liệu về thị trường" | cả bốn | Cần phân tích và tổng hợp |

Chạy cả bốn cho câu hỏi đầu vẫn cho kết quả đúng, nhưng tốn và có nguy cơ thêm nhiễu. Trường hợp tệ hơn: synthesizer được cấp web search, nó tự đi nghiên cứu thay vì tổng hợp, và báo cáo phủ một phần ba chủ đề dù mọi agent đều "thành công".

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Vẽ hub and spoke cho một hệ 4 agent của bạn | 15 phút | Mọi mũi tên đi qua coordinator |
| 2 | Viết lại thành pipeline, ghi chỗ nào phải thêm xử lý lỗi | 10 phút | Đếm được số mối nối phải xử lý |
| 3 | Chọn topology và nêu cái mất khi chọn topology kia | 15 phút | Nêu được observability hoặc latency |

### Bẫy

Pipeline cố định chạy hết mọi agent cho mọi câu hỏi. Nó trông kỹ lưỡng, nhưng làm loãng tập trung và cho báo cáo thiếu mà không ai thấy thiếu.

---

## 05 · Claude Code Configuration Hierarchy

Ba tầng file, đọc theo thứ tự enterprise, user, project.

| Tầng | Chứa gì | Ví dụ |
|---|---|---|
| Enterprise | Ràng buộc không được vi phạm | Bảo mật, tuân thủ, pháp lý |
| User | Sở thích cá nhân | Độ dài câu trả lời, định dạng |
| Project | Thỏa thuận của nhóm | ORM, framework test |

**Tầng cụ thể hơn thắng**, không phải tầng có quyền cao hơn về mặt tổ chức. Project thắng enterprise. Đây là thay thế directive xung đột, không phải trộn: enterprise vẫn áp dụng ở chỗ project im lặng.

### Ví dụ

Ba file cùng nói về truy vấn dữ liệu:

| Tầng | Nội dung |
|---|---|
| Enterprise | Luôn dùng parameterized query |
| User | Thích raw SQL cho câu đơn giản |
| Project | Dùng SQLAlchemy ORM cho mọi truy cập database |

Kết quả: project thắng, nhưng vẫn thỏa enterprise vì SQLAlchemy dùng parameterized query bên dưới. Nếu user thắng thì project mất tính nhất quán và có nguy cơ SQL injection.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết 3 rule giả định vào 3 tầng, xác định tầng nào thắng | 15 phút | Giải thích bằng độ cụ thể, không bằng cấp bậc |
| 2 | Tìm một rule đang để sai tầng trong cấu hình của bạn | 15 phút | Nêu được ai bị ảnh hưởng nếu giữ nguyên |
| 3 | Viết lý do vì sao không đưa lựa chọn framework vào enterprise | 10 phút | Nêu được cái mất về tính linh hoạt của từng nhóm |

### Bẫy

Nghĩ rằng 3 luật toàn cục cùng nói một hướng thì thắng 1 luật project. Sai. Chỉ độ cụ thể quyết định.

---

## 06 · Commands, Skills and Subagents

| Công cụ | Kích hoạt | Chạy ở đâu | Dùng khi |
|---|---|---|---|
| Slash command | Người gõ tên | Context chính | Cần người quyết định thời điểm |
| Skill | Tự động theo description | Có thể tách context | Cần áp dụng nhất quán mà không nhớ |
| Subagent | Coordinator giao | Context riêng | Việc nặng, cần cô lập |

Description của skill là điểm quyết định: viết như đang nói với đồng nghiệp khi nào nên bước vào.

### Ví dụ

| Nhu cầu | Chọn | Vì sao |
|---|---|---|
| Checklist review, gọi khi review | Command `/review` | Người quyết định thời điểm |
| Sinh sơ đồ kiến trúc mỗi khi bàn thiết kế | Skill, description nêu rõ "system design hoặc architecture overview" | Tự kích hoạt theo ngữ cảnh |
| Quét toàn repo tìm chỗ dùng một API | Subagent | Output lớn, cần context riêng |

Description quá rộng ("hỗ trợ thiết kế") làm skill bắn cả khi vẽ class diagram, một việc nó không làm tốt.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết description cho một skill của bạn | 10 phút | Người khác đọc biết chính xác khi nào nó chạy |
| 2 | Chuyển một prompt hay dán tay thành command | 15 phút | Chạy lại cho cùng kết quả ở hai máy |
| 3 | Xác định việc nào nên là subagent thay vì command | 10 phút | Nêu được vấn đề context sẽ gặp |

### Bẫy

Chọn subagent vì nghe "chuyên nghiệp hơn". Đề bài luôn có chi tiết "người dùng muốn tự kích hoạt", và đó là manh mối cho command.

---

## 07 · Claude Code in Automation

| Việc | Cơ chế đúng | Bẫy |
|---|---|---|
| Chạy không người | Cờ `-p` | `claude headless`, `batch` không tồn tại |
| Đưa context vào CI | `CLAUDE.md` | CI không có lịch sử phiên |
| Ép luật bất biến | Hook | Prompt, vì prompt chỉ là xác suất |
| Chọn chế độ trả lời | Theo nơi tiêu thụ output | Coi đó là cài đặt hiệu năng |

Hai họ hook, đừng lẫn: Claude Code hooks (shell, cấu hình theo repo hoặc team) và Agent SDK hooks (code trong tiến trình agent).

### Ví dụ

Pipeline treo khi gọi Claude. Chuỗi sửa đúng:

| Bước | Việc làm | Vì sao |
|---|---|---|
| 1 | Thêm `-p` | Chế độ không tương tác được tài liệu hóa |
| 2 | Đưa tiêu chí review vào `CLAUDE.md` | CI không có ngữ cảnh phiên như máy dev |
| 3 | Không dùng `stdin < /dev/null` | Chỉ che triệu chứng, không sửa nguyên nhân |

Chặn commit trực tiếp lên main: hook trả về "Commit blocked. Push to a branch and open a PR instead." Câu này vừa nêu lý do vừa chỉ đường.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết lệnh headless cho một pipeline giả định | 10 phút | Không có cờ bịa, có `-p` |
| 2 | Viết một hook chặn, kèm thông điệp chuyển hướng | 20 phút | Thông điệp nêu lý do và việc cần làm tiếp |
| 3 | Phân biệt một rule nên là prompt hay hook | 10 phút | Rule bất biến dùng hook, rule mềm dùng prompt |

### Bẫy

Chặn bằng hook nhưng trả lỗi trơ. Agent không có đường đi tiếp, tương tác dừng. Đề thi coi đó là lỗi thiết kế.

---

## 08 · Prompt Engineering at System Scale

System prompt là **hợp đồng giao diện**: vai trò, ranh giới, khi nào escalate, hình dạng output. Không phải sổ tay ghi mọi thứ.

| Triệu chứng | Kỹ thuật | Chi phí nhận |
|---|---|---|
| Phân loại rõ ràng, ổn định | Zero shot | Không |
| Model lưỡng lự ở ca biên | Few shot, ví dụ đúng chỗ mơ hồ | Token mỗi request |
| Cần suy luận nhiều bước | Chain of thought | Latency và token |

### Ví dụ

Agent support chọn nhầm tool khi người dùng nói "report":

| Cách sửa | Kết quả |
|---|---|
| Thêm mô tả tool chi tiết hơn | Không hiệu quả, system prompt vẫn lấn át |
| Xóa câu nhắc đến "report" nằm gần một instruction không liên quan | Hết nhầm |
| Thêm 5 ví dụ few-shot định tuyến | Tốn token mỗi request, vẫn có thể nhầm |

Few-shot dùng đúng chỗ: ba lần chạy ra ba định dạng khác nhau, và bạn cần đúng một hình dạng. Đưa 2-3 ví dụ thể hiện chính định dạng đó.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Đo độ dài system prompt hiện tại, tìm 3 câu có thể bỏ | 15 phút | Mỗi câu bỏ đi không làm mất ràng buộc nào |
| 2 | Với một lỗi về định dạng, chọn giữa thêm luật và thêm ví dụ | 15 phút | Nêu được chi phí token của lựa chọn |
| 3 | Viết một system prompt dưới 200 token làm đúng một việc | 20 phút | Không có chi tiết riêng của tool bên trong |

### Bẫy

Dùng chain of thought cho phân loại: thêm latency, không thêm chất lượng. Đề bài luôn có ràng buộc chi phí để loại phương án "dùng cả ba kỹ thuật".

---

## 09 · Structured Output and Evaluation

Schema bảo đảm **hình dạng**, không bảo đảm **sự thật**. Một tổng tiền không khớp dòng hàng vẫn là JSON hợp lệ.

| Tình huống | Cấu hình | Vì sao |
|---|---|---|
| Loại tài liệu chưa biết | `tool_choice: any` | Bắt buộc gọi tool, model tự chọn schema |
| Có thể trả lời bằng văn xuôi | `auto` | Sai: parser vỡ |
| Đã biết chắc loại | Force tên tool | Sai: đoán sai loại là hỏng |

| Quy tắc schema | Lý do |
|---|---|
| Không đánh `required` cho field nguồn có thể im lặng | Model sẽ bịa giá trị |
| Enum phải có `other` kèm chuỗi chi tiết | Enum dài vô hạn, enum ngắn mất dữ liệu |

### Ví dụ

Retry sau khi trích xuất sai:

| Lỗi | Mang gì vào lượt sau | Kết quả |
|---|---|---|
| Ngày sai định dạng | Tài liệu gốc, kết quả sai, lỗi "không khớp ISO 8601" | Model sửa đúng |
| Thiếu field không có trong tài liệu | Không có payload nào giúp | Dừng, gắn cờ |
| Tổng khác tổng dòng hàng | Trích cả hai giá trị | Gắn cờ xung đột, người quyết |

Ngày đến dưới 4 định dạng khác nhau: thêm few-shot ví dụ cả bốn định dạng, kèm luật chuẩn hóa "nếu mơ hồ thì gắn cờ, không đoán".

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết schema cho trích hóa đơn, không field nào `required` bừa | 20 phút | Mọi field thiếu được phép null |
| 2 | Chạy 10 tài liệu, phân loại lỗi thành retryable và không | 15 phút | Không retry ca thiếu thông tin |
| 3 | Thêm few-shot cho một loại tài liệu có cấu trúc lạ | 15 phút | Tỉ lệ trích đúng tăng, không cần pipeline mới |

### Bẫy

Đánh dấu mọi field `required` để "không thiếu gì". Nó tạo ra bịa đặt, và đề thi coi đó là đáp án sai kinh điển.

---

## 10 · Tool Design Fundamentals

Độ chi tiết của tool là cân bằng giữa **mơ hồ trong một tool** và **quá nhiều lựa chọn giữa các tool**.

| Triệu chứng | Sửa |
|---|---|
| Một tool làm nhiều việc, mô tả mờ | Tách thành nhiều tool |
| Quá nhiều tool, model chọn sai | Gộp lại |
| Muốn thêm tham số `mode` để chia việc | Sai: vẫn giữ mơ hồ trong một mô tả |

### Ví dụ

Tool `analyze_document` có `mode` gồm extract, summarize, verify.

| Phương án | Kết quả |
|---|---|
| Giữ một tool với `mode` | Model vẫn phải chọn mode trong một mô tả mờ |
| Tách ba tool, mỗi tool một câu ranh giới | Chọn đúng ngay lần đầu |
| Tách tiếp thành 18 tool | Độ phức tạp chọn lựa tăng, phải gộp lại |

Câu ranh giới viết như sau: "Nhận order ID, trả trạng thái và danh sách hàng. Dùng cho câu hỏi về đơn, không dùng cho thông tin tài khoản."

Lỗi tool trả về: `is_error: true`, loại `permission`, `retryable: false`, kèm mô tả người đọc được. Agent đọc loại lỗi để quyết định retry hay escalate, không đoán.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết lại mô tả hai tool dễ lẫn, thêm câu ranh giới | 15 phút | Đọc xong không cần suy nghĩ vẫn chọn đúng |
| 2 | Phân loại 5 lỗi tool thành 4 nhóm và cờ retryable | 15 phút | Mỗi nhóm có hành vi khác nhau |
| 3 | Tìm một tool nên tách hoặc nên gộp trong hệ của bạn | 15 phút | Nêu được triệu chứng cụ thể |

### Bẫy

Thêm routing layer cho lỗi chọn nhầm tool. Nó bỏ qua khả năng hiểu ngôn ngữ bạn đang trả tiền, và không sửa nguyên nhân nằm ở mô tả.

---

## 11 · MCP Integration Architecture

| Quyết định | Chọn | Vì sao |
|---|---|---|
| Server dùng chung cho team | Scope project, commit file cấu hình | Mọi người cùng cấu hình |
| Thử nghiệm cá nhân | Scope user | Không làm hỏng cấu hình team |
| Bí mật | Biến môi trường | Inline token chỉ cần một lần quên gitignore là mất |
| Tích hợp phổ biến | Dùng server cộng đồng | Tự viết là nợ bảo trì vĩnh viễn |
| Agent cần danh mục nội dung | MCP resources | Tool `list_all` tốn một call và dữ liệu cũ đi trong prompt |

### Ví dụ

Tích hợp GitHub cho cả team:

```
project/.mcp.json (commit)
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }
    }
  }
}
```

Token nằm trong biến môi trường, không nằm trong file. Cách còn lại, dán token thật rồi thêm file vào gitignore, hỏng ngay khi có người clone mà không có gitignore hoặc CI không tôn trọng nó.

`tool_choice` là điều khiển **một lượt**, không phải workflow engine. Luật "xác minh danh tính trước khi hoàn tiền" không thể ép bằng `force` ở lượt đầu, vì lượt sau model vẫn hoàn tiền được. Phải là **prerequisite gate** trong code.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết `.mcp.json` cho một server dùng chung, không có secret | 15 phút | Grep file không thấy token |
| 2 | Chỉ ra một luật nhiều lượt đang bị ép bằng tool_choice | 15 phút | Đề xuất gate thay thế |
| 3 | Quyết định scope cho ba server: team, cá nhân, thử nghiệm | 10 phút | Mỗi quyết định nêu lý do chia sẻ |

### Bẫy

Dùng `force` để ép một luật nghiệp vụ nhiều bước. Nó tạo cảm giác an toàn giả và không giữ được qua các lượt.

---

## 12 · Context Management

| Việc | Làm ở đâu | Không làm |
|---|---|---|
| Đặt ngân sách context | Đo từng nguồn tiêu thụ trước | Đoán |
| Cắt bớt | Tại biên, trong post-tool-use hook | Để model thấy hết rồi compact sau |
| Kết quả quá lớn | Cắt hoặc tóm tắt, **nói rõ đã cắt** | Bỏ im lặng |
| Nén hội thoại | Khối case facts riêng, ngoài phần tóm tắt | Dặn summarizer "giữ chi tiết quan trọng" |

### Ví dụ

`lookup_order` trả 43 field; hội thoại về trả hàng chỉ cần 5.

| Field giữ | Field bỏ |
|---|---|
| order_id, status, items, return_window, shipping_address | 38 field còn lại |

Nếu để cả 43 field rồi compact sau, model đã chú ý vào 38 field vô ích trước khi nén. Chi tiết hữu ích bị chôn.

Case facts block cho một vụ hoàn tiền:

```
Số tiền: 247,83
Ngày: 3 tháng 3
Mã đơn: 4471
Cam kết: hoàn tiền trong 5 ngày làm việc
```

Khối này chèn vào mọi prompt, không đi qua summarizer. Ở lượt 22, nếu chỉ còn câu "khách có vấn đề thanh toán", agent sẽ hỏi lại điều khách đã nói.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Đo token của 4 nguồn: system, tool schema, history, tool result | 20 phút | Có số cho từng nguồn |
| 2 | Viết hook cắt một tool result xuống còn field cần thiết | 20 phút | Có ghi chú "đã cắt" trong output |
| 3 | Viết case facts block cho một hội thoại dài của bạn | 15 phút | Mọi con số, ngày, mã đơn đều nguyên văn |

### Bẫy

Dặn summarizer giữ chi tiết quan trọng. Chính phán đoán của nó là chỗ hỏng, và đề thi coi đây là đáp án sai.
---

## 13 · Scenario Lab A: Customer Support Under Constraints

Đọc scenario để tìm **ràng buộc ràng buộc** (binding constraint), không phải tóm tắt đề. Ràng buộc là **bộ lọc loại trừ**, không phải bối cảnh.

| Ràng buộc | Loại bỏ |
|---|---|
| Hành động không đảo ngược (hoàn tiền) | Mọi cơ chế xác suất, gồm prompt và classifier |
| Mục tiêu tỉ lệ tự xử lý | Mọi ngữ cảnh escalate dựa trên tín hiệu nội bộ như confidence |
| Giới hạn latency | Kiến trúc nhiều tầng gọi nối tiếp |

### Ví dụ

Brief: agent support phải đạt 80% xử lý ngay lần đầu, có tool tra khách, tra đơn, hoàn tiền, escalate.

| Phương án | Bị loại vì |
|---|---|
| Để agent tự xử lý mọi ca | Đoán ở ca mơ hồ, tỉ lệ tự xử lý tụt |
| Escalate khi confidence thấp | Escalate cả ca agent xử lý được, cũng tụt |
| Tự xử lý ca rõ, escalate khi policy trống hoặc khách yêu cầu | Sống sót qua bộ lọc |

Mỗi phần của thiết kế phải truy về một ràng buộc: tool bị giới hạn vì ràng buộc thẩm quyền, gate hoàn tiền vì ràng buộc không đảo ngược, tiêu chí escalate vì mục tiêu tỉ lệ.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Đọc một brief thật, viết ra một câu ràng buộc ràng buộc | 10 phút | Nêu được nó loại bỏ phương án nào |
| 2 | Lập bảng ràng buộc và phương án bị loại | 15 phút | Không phương án nào bị loại chỉ vì "không thích" |
| 3 | Viết thiết kế 4 phần, mỗi phần trỏ về một ràng buộc | 20 phút | Không phần nào không có ràng buộc đỡ |

### Bẫy

Cân nhắc ưu nhược điểm giữa các phương án. Nếu đang cân nhắc nghĩa là đã bỏ sót một phép loại trừ.

---

## 14 · Scenario Lab B: Multi-Agent Research System

Cùng phương pháp, ràng buộc khác, nên kết luận khác. Điều quan trọng là **cái gì đã thay đổi so với scenario A**.

| Khác biệt | Loại bỏ |
|---|---|
| Nhiều agent, context cô lập | Mọi thiết kế dựa trên bộ nhớ chung |
| Báo cáo có trích dẫn | Handoff bằng văn xuôi; phải mang nguồn theo cấu trúc |
| Nguồn không đáng tin | Lấy trung bình các nguồn |
| Không có hành động không đảo ngược | Enforcement gate; mang từ scenario A sang là sai |

### Ví dụ

Bốn agent, mỗi agent trả về object:

```
{ claim, evidence_excerpt, source_url, published_at }
```

Nếu searcher trả về một đoạn văn xuôi, synthesizer không có URL để trích, và sẽ tạo trích dẫn từ ký ức. Báo cáo đọc rất mượt, nhưng mọi khẳng định không truy được về đâu.

Coordinator còn phải kiểm **độ phủ**: chia chủ đề thành 3 phần, cả 3 agent đều trả kết quả, nhưng không ai kiểm 3 phần đó có phủ hết chủ đề không.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | So sánh hai scenario, liệt kê 4 điểm khác | 10 phút | Mỗi điểm nêu được phương án bị loại |
| 2 | Viết schema handoff giữa hai agent | 15 phút | Có đủ claim, evidence, source, date |
| 3 | Thiết kế bước coordinator kiểm độ phủ | 15 phút | Phát hiện được chủ đề bị bỏ trống |

### Bẫy

Mang enforcement gate từ scenario A sang nơi không có hành động không đảo ngược. Nó thêm latency và chi phí cho một control không phục vụ gì.

---

## 15 · The Agentic Loop

Vòng lặp chỉ đọc `stop_reason`. Không parse văn xuôi để đoán "model đã xong chưa", không dùng bộ đếm vòng lặp làm điều kiện dừng chính.

| Thành phần | Vai trò |
|---|---|
| `stop_reason` | Tín hiệu dừng duy nhất đáng tin |
| `tool_result` có `tool_use_id` | Mọi tool call phải được trả lời, đủ số lượng |
| Giới hạn số vòng | Lưới an toàn, không phải cách kết thúc task |

### Ví dụ

Model trả về 3 tool call trong một lượt:

| Cách trả | Kết quả |
|---|---|
| 3 `tool_result` trong một user message | Đúng hợp đồng |
| Trả 2 trong 3 | Lỗi API, không phải bỏ qua im lặng |
| Trả mỗi kết quả một message | Model học rằng batch không được hoan nghênh |

Phân chia trách nhiệm: phân loại đầu vào mơ hồ và chọn tool là việc của model. "Không hoàn tiền trước khi xác minh danh tính" là việc của code, vì tỉ lệ lỗi của prompt khác 0 và với tiền thì 0 là mức duy nhất.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết vòng lặp chỉ dựa trên `stop_reason` | 20 phút | Không có chỗ nào đọc text để dừng |
| 2 | Xử lý trường hợp model trả 3 tool call | 15 phút | Trả đủ 3 result trong một message |
| 3 | Thêm giới hạn vòng, trả partial result khi hết | 15 phút | Không raise, nêu việc bị chặn |

### Bẫy

Parse câu "tôi đã xong" trong text, hoặc dùng số vòng làm điều kiện dừng chính. Cả hai đều là đáp án sai theo cấu trúc.

---

## 16 · Subagent Spawning and Context Passing

Spawn bằng **task tool**. Coordinator phải có `task` trong allowed tools; thiếu thì nó tự làm hết, không báo lỗi.

| Việc | Cách làm |
|---|---|
| Chạy song song | Nhiều task call trong **một** response |
| Chạy tuần tự | Một task mỗi lượt, dù sơ đồ vẽ song song |
| Giới hạn quyền | Mỗi subagent chỉ có tool của vai trò |
| Truyền context | Ghi tường minh vào prompt, không có kế thừa |

### Ví dụ

| Agent | Tool được cấp | Nếu cấp thừa |
|---|---|---|
| Searcher | web search | |
| Analyst | đọc tài liệu | |
| Synthesizer | không có web search | Nó tự đi nghiên cứu, báo cáo thiếu một phần ba chủ đề |

Handoff sai: searcher trả một đoạn văn. Handoff đúng: mảng object `{claim, evidence, source, published_at}`, dán nguyên vào prompt của synthesizer kèm câu "trích theo field source".

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết 3 agent definition, mỗi cái một bộ tool | 20 phút | Không agent nào có tool ngoài vai trò |
| 2 | Cho coordinator phát 2 task trong một response | 15 phút | Hai task chạy song song thật |
| 3 | Viết payload handoff có cấu trúc | 15 phút | Không có field nào là văn xuôi tự do |

### Bẫy

Nghĩ parallel subagent là lập trình async. Trong SDK, parallel chỉ là nhiều task block trong một response; hạ tầng tự lo.

---

## 17 · Enforcement Gates and Structured Handoff

Gate là code chặn tool cho tới khi điều kiện tiên quyết xong.

| Dùng gate khi | Dùng thứ khác khi |
|---|---|
| Hậu quả nghiêm trọng, không được sai lần nào | Tool chỉ bị chọn nhầm: sửa mô tả |
| Tiền, an toàn, pháp lý | Thứ tự chỉ chưa tối ưu: prompt hoặc mô tả |

### Ví dụ

Gate cho hoàn tiền:

```
if not session.verified_customer_id:
    return {
      is_error: True,
      category: "permission",
      retryable: False,
      message: "Thiếu verified customer ID. Gọi get_customer trước."
    }
```

Thông điệp nêu thiếu gì và tool nào cấp được, nên agent phục hồi trong một bước.

Handoff cho người sau 9 lượt xử lý:

| Field | Giá trị |
|---|---|
| ID khách, ID đơn | Lấy từ hệ thống, không lấy từ chat |
| Nguyên nhân gốc | Hàng hỏng, đã xác minh bằng ảnh |
| Policy | Loại hàng này không được bồi thường |
| Hành động đề xuất | Hoàn thiện nguyện hoặc đổi hàng |
| Lý do | Khoảng trống policy |

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết gate cho một tool có hậu quả tiền | 20 phút | Lỗi trả về nêu tool cấp điều kiện |
| 2 | Viết handoff 5 field cho một ca thật | 15 phút | Người đọc không cần mở transcript |
| 3 | Phân biệt ca cần gate và ca chỉ cần sửa mô tả | 10 phút | Mỗi ca nêu hậu quả cụ thể |

### Bẫy

Tăng cường system prompt cho luật phải giữ 100%. Prompt là xác suất, và đề thi gọi đây là đáp án sai kinh điển.

---

## 18 · Agent SDK Hooks

| Hook | Chạy khi | Dùng cho |
|---|---|---|
| Post tool use | Sau tool, trước khi model thấy | Chuẩn hóa dữ liệu không đồng nhất, cắt bớt output dài |
| Interception | Trước khi tool chạy | Chặn hành vi vi phạm chính sách |

### Ví dụ

Ba tool trả ba định dạng thời gian khác nhau:

| Tool trả | Hook đổi thành |
|---|---|
| `1755300000000` (epoch) | chuỗi ISO 8601 |
| chuỗi ISO 8601 | giữ nguyên |
| `status: 3` | `status: "refunded"` |

Làm bằng prompt thì tốn token mỗi lượt và vẫn có lúc hiểu sai. Nếu sở hữu MCP server thì sửa tại nguồn còn tốt hơn.

Hook chặn hoàn tiền trên 500: không chỉ chặn, mà trả về lý do và chỉ tool `escalate_to_human`. Chặn trơ làm agent tắc giữa đường.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết hook chuẩn hóa một định dạng lạ | 20 phút | Model không bao giờ thấy giá trị thô |
| 2 | Viết hook chặn có chuyển hướng | 20 phút | Agent gọi được tool thay thế |
| 3 | Phân loại 5 rule thành hook hoặc prompt | 10 phút | Rule bất biến dùng hook |

### Bẫy

Chuẩn hóa sau khi model đã trả lời. Lúc đó không sửa được lập luận đã dựa trên dữ liệu lẫn lộn.

---

## 19 · Session State, Resumption and Forking

Ba lựa chọn khi quay lại việc đang làm, chọn theo **độ cũ của dữ liệu**, không theo giá.

| Tình huống | Chọn |
|---|---|
| Context còn đúng | Resume |
| Vài file đã đổi, biết rõ file nào | Resume kèm reanalysis có mục tiêu |
| Baseline đổi rộng (refactor, merge lớn) | Phiên mới với summary |
| Cần nhiều nhánh không lẫn nhau | Fork |

### Ví dụ

Hôm qua đã map module billing, qua đêm refactor chuyển 40 file.

| Cách làm | Kết quả |
|---|---|
| Resume im lặng | Agent trả lời tự tin về đường dẫn không còn tồn tại |
| Resume, nêu tên 3 file đã đổi | Chỉ đọc lại 3 file đó |
| Phiên mới với summary | Giữ kết luận về phần không đổi, đọc lại phần đã đổi |

Phiên mới nhận **kết luận**: module làm gì, entry point, câu hỏi mở. Không nhận raw tool output.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Với 3 tình huống, chọn resume, fork hay fresh | 10 phút | Mỗi lựa chọn dựa trên độ cũ |
| 2 | Viết resume message nêu file đã đổi | 10 phút | Ngắn hơn re-explore nhưng đủ cụ thể |
| 3 | Viết summary cho một phiên mới | 15 phút | Không có raw output nào lọt vào |

### Bẫy

Luôn resume vì rẻ hơn. Khi dữ liệu cũ, resume đắt hơn vì phải gỡ các kết luận sai.

---

## 20 · Built-in Tool Selection

| Câu hỏi | Tool |
|---|---|
| Chuỗi này nằm ở đâu trong file | grep |
| File nào khớp mẫu đường dẫn | glob |
| File này chứa gì | read |
| Đổi đúng một chỗ | edit, neo bằng chuỗi duy nhất |

### Ví dụ

Câu hỏi "luồng refund làm gì":

| Bước | Tool | Lý do |
|---|---|---|
| Tìm entry point | grep "def refund" | Chưa biết file nào |
| Đọc file đó | read | Biết file rồi |
| Lần theo import | đọc từng file con | Hiểu logic |
| Đổi timeout | edit | Sửa một chỗ |

Đọc cả thư mục refunds sẽ lấy về test, util, config, đốt context và làm loãng chỉ dẫn.

Edit không tìm được neo duy nhất (`retries = 3` xuất hiện 5 lần): mở rộng neo bằng header phía trên. Nếu file nhỏ và cần đổi cả 5 chỗ thì read rồi write một lần.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Với 4 câu hỏi khác nhau, chọn tool trước khi chạy | 10 phút | Không câu nào chọn "đọc cả thư mục" |
| 2 | Sửa một chỗ bằng edit, gặp neo trùng thì mở rộng | 15 phút | Không dùng read+write ở lần đầu |
| 3 | Đếm token tiết kiệm so với đọc cả thư mục | 10 phút | Có số cụ thể |

### Bẫy

Đọc cả thư mục để trả lời một câu. Đề thi gọi đây là bẫy đốt context.

---

## 21 · Modular CLAUDE.md and the Memory Hierarchy

Chẩn đoán bằng `/memory`: nó cho biết **file nào đang được nạp**, không cho biết nội dung đúng hay sai.

| Quy tắc | Đặt ở |
|---|---|
| Áp dụng cho cả team | Scope project, nằm trong version control |
| Sở thích cá nhân | Scope user |
| Chuẩn phổ quát, luôn cần | `CLAUDE.md` gốc |
| Theo chủ đề | `.claude/rules/*.md`, ghép bằng `import` |

### Ví dụ

Quy ước commit message chạy đúng trên máy bạn, sai trên máy người mới.

| Chẩn đoán | Kết luận |
|---|---|
| `/memory` trên máy bạn thấy `~/.claude/CLAUDE.md` | Rule nằm ở scope user |
| `/memory` trên máy người mới chỉ thấy file project | Rule không được chia sẻ |

Sửa: chuyển rule sang `CLAUDE.md` ở repo và commit. Bảo người mới copy file user chỉ tái tạo lỗi trên máy thứ hai.

File gốc 900 dòng nạp vào mọi lượt, kể cả khi gói đó chỉ làm deployment. Tách `testing.md`, `api-conventions.md`, rồi `import` đúng file cần.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Chạy `/memory`, liệt kê file đang nạp | 5 phút | Biết rule nào đến từ đâu |
| 2 | Chuyển một rule cá nhân sang project scope | 15 phút | Máy thứ hai thấy rule sau khi clone |
| 3 | Tách file gốc theo chủ đề, thêm import | 20 phút | Gói không liên quan không nạp file thừa |

### Bẫy

Nghĩ Claude hỏng hoặc bịa. Triệu chứng lệch giữa các máy luôn là câu hỏi về scope cấu hình.

---

## 22 · Skill and Command Frontmatter

Scope quyết định bởi hai câu: **ai cần dùng**, và **luôn nạp hay khi gọi**.

| Ai cần | Cách nạp | Đặt ở |
|---|---|---|
| Cả team | Khi gọi | `.claude/commands/`, `.claude/skills/` |
| Cả team | Luôn | `CLAUDE.md` gốc |
| Cá nhân | Khi gọi | `~/.claude/...` |

### Ví dụ

Checklist review của team: mọi người cần, chỉ khi review.
- Không phải `user scope`: đồng đội không thấy.
- Không phải `CLAUDE.md`: nạp mọi lượt, tốn context vô ích.
- Đúng: `.claude/commands/review.md`, commit.

Frontmatter là cấu hình thực thi:

| Field | Chặn được |
|---|---|
| `context: fork` | Output khám phá tràn vào context chính |
| `allowed-tools` | Skill ghi/xóa ngoài phạm vi; runtime ép, không phải prompt |
| `argument-hint` | Skill đoán tham số khi gọi thiếu |

Biến thể cá nhân phải **đặt tên khác**, nếu không là ghi đè âm thầm hành vi của người khác khi cấu hình bị chia sẻ.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Với 3 skill, chọn scope và chế độ nạp | 10 phút | Mỗi lựa chọn nêu ai cần dùng |
| 2 | Thêm `allowed-tools` cho một skill ghi file | 15 phút | Không thể xóa ngoài phạm vi |
| 3 | Đổi một skill output lớn sang `context: fork` | 15 phút | Context chính chỉ nhận bản tóm tắt |

### Bẫy

Đặt cùng tên cho biến thể cá nhân. Đề thi coi đó là cách thay đổi hành vi của người khác mà họ không biết.

---

## 23 · Path-Specific Rules

Rule trong `.claude/rules/*.md` có YAML front matter chứa `paths` (glob). Rule chỉ nạp khi đang sửa file khớp glob: **kích hoạt có điều kiện, tất định**.

| Loại quy ước | Đặt ở |
|---|---|
| Thuộc về một loại file, ở đâu cũng vậy | Rule có glob, ví dụ `**/*.test.tsx` |
| Thuộc về một thư mục cụ thể | `CLAUDE.md` ở thư mục đó |

### Ví dụ

```yaml
---
paths: ["**/*.test.tsx"]
---
Mọi test dùng testing-library, không dùng enzyme.
```

| Cách làm | Hệ quả |
|---|---|
| Một rule với glob trên | Sửa một chỗ, áp cho 40 thư mục |
| 40 file `CLAUDE.md` trong 40 thư mục | Sửa một nơi, 39 nơi còn lại lệch |
| Một file gốc có mục "Testing" | Model phải suy luận, và vẫn nạp cả file |

Ngược lại, thư mục `vendor/` có quy ước riêng thuộc về vị trí, nên dùng `CLAUDE.md` tại thư mục đó.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết một rule có `paths` cho loại file của bạn | 10 phút | Mở file khớp thì rule nạp, file khác thì không |
| 2 | Phân loại 3 quy ước thành theo loại file hay theo thư mục | 10 phút | Mỗi cái nêu lý do |
| 3 | Kiểm chứng bằng `/memory` ở cả hai trường hợp | 5 phút | Thấy rule xuất hiện và biến mất đúng lúc |

### Bẫy

Từ "automatically" trong đề là bẫy: skill cần gọi, mục trong `CLAUDE.md` cần suy luận, chỉ rule theo đường dẫn mới tự kích hoạt tất định.

---

## 24 · Plan Mode versus Direct Execution

Ba tín hiệu cần plan mode: có nhiều cách làm đúng, có quyết định kiến trúc, và blast radius lớn. Kích thước không phải tín hiệu.

| Tín hiệu | Chế độ |
|---|---|
| Nhiều cách làm, phạm vi rộng | Plan, rồi execute từng bước |
| Cách làm rõ, một file | Direct |
| Chưa biết codebase | Plan, cộng explore subagent |

### Ví dụ

Đổi thư viện HTTP trên 45 file:

| Tín hiệu | Giá trị | Kết luận |
|---|---|---|
| Blast radius | 45 file | Rộng |
| Nhiều cách | Thay từng chỗ, viết adapter, refactor theo giai đoạn | Có |
| Đích | Đã biết chính xác thư viện mới | Rõ |

Kết quả: plan để chọn cách, execute để làm. Làm toàn bộ trong plan là over-engineer; làm toàn bộ direct thì sai cách là rollback 45 file.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Chấm 3 task theo 3 tín hiệu | 10 phút | Mỗi task ra một chế độ |
| 2 | Chạy một task khám phá bằng explore subagent | 20 phút | Context chính không thấy output thô |
| 3 | Viết plan rồi execute từng bước cho một task | 25 phút | Không bước nào phải làm lại |

### Bẫy

"Chạy direct rồi chuyển plan nếu phức tạp". Độ phức tạp đã ghi trong yêu cầu, không phải chờ nó xuất hiện.

---

## 25 · Iterative Refinement Techniques

| Vấn đề | Sửa |
|---|---|
| Ba lần chạy ra ba kết quả | Thay văn xuôi bằng 2-3 cặp input/output |
| Bug mô tả mơ hồ | Thay bằng test case cụ thể, input và output mong đợi |
| Yêu cầu thiếu ràng buộc | Phỏng vấn trước khi viết code |

### Ví dụ

"Chuẩn hóa địa chỉ cho hợp lý" cho ra ba định dạng khác nhau. Thay bằng cặp mẫu:

| Input | Output |
|---|---|
| `123 Main Street, Springfield` | `123 Main Street, Springfield, Illinois 62701` |
| `Apt 4B, 500 Oak Lane, Chicago Heights` | `500 Oak Lane, Apartment 4B, Chicago Heights, Illinois 60411` |

Mẫu ghim cả thứ tự field lẫn cách xử lý số căn hộ, những thứ văn xuôi không nói rõ.

Phỏng vấn: "trước khi viết code, hỏi tôi về invalidate, failure mode, yêu cầu nhất quán". Câu hỏi trả về thường lộ ra điều bạn chưa nghĩ, ví dụ chuyện gì xảy ra khi cache lạnh.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Thay một instruction mơ hồ bằng 3 cặp input/output | 15 phút | Hai người chấm ra cùng kết quả |
| 2 | Viết một test case cho bug thay vì mô tả nó | 10 phút | Test fail trước khi sửa |
| 3 | Gộp feedback theo mức tương tác | 10 phút | Hai góp ý chạm nhau nằm cùng lượt |

### Bẫy

Thêm chi tiết vào câu instruction. Vấn đề không phải thiếu thông tin mà là còn chỗ để diễn giải.

---

## 26 · CI Output Contracts and Review Isolation

| Thành phần | Giá trị |
|---|---|
| Chạy không tương tác | `-p` |
| Định dạng máy đọc | `--output-format json` |
| Hợp đồng dữ liệu | JSON schema với `path`, `line`, `severity`, `issue`, `suggested fix` |

### Ví dụ

Pipeline treo khi gọi Claude:

| Bước | Việc làm | Vì sao |
|---|---|---|
| 1 | Thêm `-p` | Hết treo |
| 2 | Thêm `--output-format json` | Hết prose |
| 3 | Thêm schema 5 field | Comment đăng đúng chỗ |

Review lại lần hai: PR thêm 3 commit, chạy lại bot đăng lại 14 comment cũ. Sửa bằng cách đưa output lần trước vào prompt và yêu cầu chỉ báo cái mới hoặc còn hỏng.

Phiên review phải khác phiên viết code. Cùng phiên thì model vẫn giữ lý lẽ đã tạo ra code.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết lệnh CI có `-p` và json schema | 15 phút | Không có cờ bịa |
| 2 | Chạy review hai lần, lần hai chỉ báo delta | 20 phút | Không comment trùng |
| 3 | Tách phiên review khỏi phiên sinh code | 10 phút | Reviewer nhận code và yêu cầu, không nhận transcript |

### Bẫy

Bỏ `stdin < /dev/null` thay cho `-p`. Nó che triệu chứng và đề thi không chấp nhận.

---

## 27 · Explicit Criteria and False Positives

Tiêu chí phải là **luật phân loại có/không**, không phải lời khuyên.

| Câu mơ hồ | Thay bằng |
|---|---|
| "Kiểm tra comment có chính xác không" | "Chỉ báo khi hành vi được mô tả mâu thuẫn với code" |
| "Chỉ báo finding có độ tin cậy cao" | Bỏ hẳn; điểm tự tin chưa hiệu chỉnh là vô nghĩa |
| "Mức nghiêm trọng: cao, trung bình, thấp" | Mỗi mức gắn với một ví dụ code cụ thể |

### Ví dụ

Nhóm finding hiệu năng sai 70% số lần.

| Tuần | Việc làm |
|---|---|
| Tuần 1 | Tắt cả nhóm hiệu năng |
| Tuần 2-3 | Dựng lại: định nghĩa thế nào là vấn đề hiệu năng thật, thêm few-shot so sánh mẫu chấp nhận được với mẫu hỏng |
| Tuần 4 | Bật lại |

Giữ nó bật và dặn "bỏ qua false positive" không hiệu quả: người dùng bỏ đọc cả nhóm bảo mật, và lỗi thật đi qua.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết lại một instruction mơ hồ thành luật có/không | 10 phút | Hai người áp ra cùng kết quả |
| 2 | Gắn mỗi mức severity với một ví dụ code | 15 phút | Không mức nào chỉ có tính từ |
| 3 | Lập kế hoạch tắt, dựng lại, bật lại một nhóm nhiễu | 10 phút | Có tiêu chí để bật lại |

### Bẫy

Dùng điểm tự tin để lọc. Model tự tin sai đúng ở nhóm tệ nhất, nên ngưỡng không lọc được gì.
---

## 28 · Batch Processing Strategy

Câu hỏi lọc: việc này chịu được chờ **không có SLA, tới 24 giờ** không. Không phải "thường chạy trong một giờ".

| Việc | Batch? |
|---|---|
| Báo cáo nợ kỹ thuật chạy đêm | Được |
| Check trước khi merge, người đang chờ | Không |
| Agent gọi tool nhiều lượt | Không, API không hỗ trợ |

### Ví dụ

SLA 30 giờ, cửa sổ xử lý tối đa 24 giờ.

| Cách tính | Kết quả |
|---|---|
| Dùng trường hợp tốt nhất (1 giờ) | Gửi sát hạn, trượt SLA khi hàng đợi dài |
| Dùng trường hợp xấu nhất | 30 − 24 = 6 giờ, gửi ít nhất 6 giờ một lần |

Lô 100 tài liệu, 9 tài liệu vượt giới hạn context. Không gửi lại cả 100: lấy `custom_id` của 9 cái lỗi, chia nhỏ tài liệu, tạo request mới giữ nguyên `custom_id`.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Phân loại 5 workload thành batch hoặc realtime | 10 phút | Mỗi quyết định dựa trên có ai chờ |
| 2 | Tính nhịp gửi cho một SLA cho trước | 10 phút | Dùng cửa sổ xấu nhất |
| 3 | Viết quy trình xử lý lại chỉ phần lỗi | 15 phút | Không gửi lại request đã thành công |

### Bẫy

Thiết kế theo tốc độ trung bình. Không có SLA, nên xây quy trình đồng bộ trên giả định tốt nhất là bẫy.

---

## 29 · Multi-Pass and Independent Review

Một lượt review trên nhiều file bị **pha loãng chú ý**, không phải thiếu dung lượng.

| Lượt | Phạm vi |
|---|---|
| Per-file | Lỗi cục bộ, style, logic trong một file |
| Integration | Luồng dữ liệu giữa các file, hợp đồng API, tính nhất quán |

### Ví dụ

PR 14 file, review một lượt:

| Hiện tượng | Nguyên nhân |
|---|---|
| File đầu kỹ, file cuối lướt | Chú ý trải mỏng |
| Cùng một mẫu code bị chê ở file 3, duyệt ở file 11 | Model mất dấu |
| Lỗi xuyên file không ai thấy | Không có lượt nào nhìn toàn cục |

Cách sửa: 14 lượt theo file, cộng 1 lượt tích hợp. Model lớn hơn hay context lớn hơn không thay được cấu trúc.

Không dùng bỏ phiếu đa số: bug chỉ bắt 1 trên 3 lần vẫn là bug thật, yêu cầu đồng thuận sẽ loại nó.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Chia một PR lớn thành lượt theo file và lượt tích hợp | 15 phút | Có bước nào nhìn được toàn cục |
| 2 | Chạy lại review bằng phiên mới | 15 phút | Kết quả khác lần tự review |
| 3 | Thử bỏ phiếu đa số trên 3 lần chạy, xem mất gì | 10 phút | Đếm được finding bị loại oan |

### Bẫy

Tăng context window hoặc dùng model mạnh hơn. Vấn đề là chất lượng chú ý, không phải sức chứa.

---

## 30 · Preserving Facts Across Long Conversations

Case facts block: bản ghi **nguyên văn** các sự kiện giao dịch, nằm ngoài lịch sử bị nén, chèn vào mọi prompt.

| Giữ nguyên văn | Không để summarizer quyết |
|---|---|
| Số tiền, ngày, mã đơn | Điều gì quan trọng |
| Trạng thái, lời hứa và hạn | Cách diễn đạt lại |

### Ví dụ

Lượt 4: "bị trừ 247,83 đô ngày 3 tháng 3, đơn 4471, hứa hoàn trong 5 ngày làm việc."

| Sau nhiều lần nén | Nội dung còn lại |
|---|---|
| Không có case facts block | "Khách có vấn đề thanh toán" |
| Có case facts block | Đủ số tiền, ngày, mã đơn, hạn cam kết |

Hệ quả của bản mất chi tiết: agent hỏi lại điều khách đã nói, hoặc hoàn sai số tiền.

Cắt bớt tool result tại biên là phòng ngừa; compaction là cứu hộ. Thứ tự input cũng quan trọng: model nhớ đầu và cuối tốt hơn giữa.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Trích 5 sự kiện nguyên văn từ một hội thoại dài | 15 phút | Không có chỗ nào diễn giải lại |
| 2 | Tách block theo từng vấn đề trong phiên nhiều vấn đề | 10 phút | Không lẫn ngữ cảnh giữa các vấn đề |
| 3 | Đặt chi tiết quan trọng ở đầu hoặc cuối input | 10 phút | Kiểm lại bằng câu hỏi về chi tiết đó |

### Bẫy

Dặn summarizer giữ chi tiết quan trọng. Chính phán đoán của nó là chỗ hỏng, và đề thi coi đây là đáp án sai.

---

## 31 · Escalation and Ambiguity Resolution

Đúng ba lý do chuyển cho người:

1. Khách yêu cầu gặp người.
2. Policy trống hoặc cần ngoại lệ.
3. Không tiến triển được sau khi đã điều tra.

| Không phải lý do | Vì sao |
|---|---|
| Ca phức tạp | Policy rõ thì agent xử được; phức tạp không phải ranh giới thẩm quyền |
| Khách đang bực | Cảm xúc không đo thẩm quyền; ca bực thường đơn giản |
| Confidence thấp | Model đã tự tin sai ở đúng ca khó, ngưỡng không cứu được |

### Ví dụ

| Ca | Đặc điểm | Kết luận |
|---|---|---|
| Đổi hàng hỏng, có ảnh | Phức tạp: xác minh ảnh, kiểm loại hỏng, tính chi phí | Tự xử lý, policy rõ |
| Hoàn tiền sau 45 ngày | Đơn giản, nhưng policy chỉ 30 ngày | Escalate, policy trống |

Ca thứ hai đơn giản hơn nhưng phải chuyển, vì ranh giới là thẩm quyền chứ không phải độ khó.

Thiếu thông tin để xác định đúng khách: hỏi thêm. Đoán theo tên gần giống dẫn tới hoàn tiền sai tài khoản.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Phân loại 6 ca theo ba lý do hợp lệ | 10 phút | Không ca nào chuyển vì cảm xúc |
| 2 | Viết luật hỏi thêm khi thiếu định danh | 10 phút | Không có nhánh đoán |
| 3 | Đo tỉ lệ escalate trên mẫu giả định | 15 phút | Nêu được ca nào chuyển sai |

### Bẫy

Escalate theo sentiment hoặc confidence. Cả hai đo sai biến và tạo escalate giả.

---

## 32 · Error Propagation Across Multi-Agent Systems

Subagent lỗi phải trả payload có cấu trúc:

| Field | Để coordinator làm gì |
|---|---|
| Loại lỗi | Phân biệt transient với sai query |
| Query đã thử | Thử lại có điều chỉnh |
| Kết quả một phần | Không bỏ phí công đã làm |
| Cách thay thế | Chọn hướng khác thay vì dừng cả workflow |

### Ví dụ

Searcher timeout giữa chủ đề, đã retry 3 lần.

| Cách trả | Coordinator nhận được gì |
|---|---|
| `"search unavailable"` | Không biết nên thử lại hay đổi query |
| Bốn field ở trên | Thử lại với query đã viết lại, giữ 2 kết quả một phần |

Kết quả rỗng từ nguồn khỏe mạnh là **finding hợp lệ**, không phải lỗi. Hai trạng thái phải khác nhau trong biểu diễn, nếu không báo cáo nói "không phát hiện vấn đề" khi thực ra nguồn không truy cập được.

Báo cáo phải có coverage annotation: mục E và F mỏng vì nguồn gián đoạn một phần.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết schema lỗi 4 field cho một subagent | 15 phút | Coordinator phân biệt được transient và bad query |
| 2 | Phân biệt empty result và access failure trong code | 15 phút | Hai trạng thái không dùng chung một giá trị |
| 3 | Viết coverage annotation cho một báo cáo | 10 phút | Nêu được mục nào mỏng và vì sao |

### Bẫy

Trả trạng thái chung chung sau khi đã retry. Nó trông có trách nhiệm nhưng bỏ mất thứ coordinator cần.

---

## 33 · Large Codebase Exploration and Crash Recovery

Context degradation là mất dần chi tiết cụ thể: câu trả lời vẫn trôi chảy nhưng chuyển từ tên class, đường dẫn sang mô tả chung chung. Khác với ignorance (chưa từng có thông tin).

| Cơ chế | Vai trò |
|---|---|
| Scratchpad | Ghi finding ngay khi tìm ra, không để cuối |
| Tóm tắt theo pha | Chuyển sang subagent pha sau |
| State manifest | Trạng thái công việc: xong, dở, đang làm khi crash |

### Ví dụ

Khám phá codebase lớn chia 4 pha:

| Pha | Việc làm | Đầu ra |
|---|---|---|
| 1 | Khám phá vùng 1, ghi class, đường dẫn, câu hỏi mở vào `findings.md` | Đoạn tóm tắt ngắn |
| 2 | Subagent nhận tóm tắt, khám phá vùng 2, ghi tiếp | Tóm tắt tích lũy |
| 3-4 | Lặp lại | Tóm tắt cuối |

Nếu giữ tất cả trong một hội thoại dài, đến pha 3 câu trả lời thành "các service thường có pattern..." thay vì tên class thật.

Crash ở giờ thứ 5: resume trả lại lịch sử chat, manifest trả lại tiến độ. Cần cả hai.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Chạy khám phá 2 pha với scratchpad | 25 phút | Finding được ghi ngay, không để cuối |
| 2 | Viết state manifest sau một pha | 10 phút | Nêu được xong, dở, chưa bắt đầu |
| 3 | Phát hiện degradation trong một phiên dài | 10 phút | Chỉ ra câu trả lời mất tên cụ thể |

### Bẫy

Hỏi lại mạnh hơn hoặc restart từ đầu. Reask không lấy lại context đã mất; restart đốt token.

---

## 34 · Human Review and Confidence Calibration

Con số chính xác tổng hợp che mất lỗi. Phải chia theo **loại tài liệu và từng field**.

| Bước | Việc làm |
|---|---|
| Chia đoạn | Tách theo loại tài liệu và field |
| Quyết định | Tự động riêng đoạn đạt; giữ người ở đoạn chưa đạt |
| Hiệu chỉnh | So điểm tự tin với tập nhãn để thành xác suất thật |
| Lấy mẫu | Lấy mẫu phân tầng định kỳ, vì đầu vào trôi |

### Ví dụ

| Đoạn | Tỉ lệ | Quyết định |
|---|---|---|
| Hóa đơn chuẩn, 90% khối lượng | 99% | Tự động |
| Phụ lục viết tay, 10% | 79% | Giữ người |
| Riêng field "remittance advice" trong phụ lục | gần 0% | Không bao giờ tự động |

Con số tổng 97% trông đủ tốt để bỏ review, nhưng field gần 0% vẫn cho câu trả lời sai với độ tự tin cao.

Hiệu chỉnh: điểm 0,94 không có nghĩa đúng 94% số lần. Phải so với tập 500 tài liệu có đáp án rồi ánh xạ lại.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Chia một pipeline thành đoạn theo loại và field | 15 phút | Mỗi đoạn có tỉ lệ riêng |
| 2 | Hiệu chỉnh điểm tự tin trên tập nhãn nhỏ | 20 phút | Điểm sau hiệu chỉnh khớp tỉ lệ thật |
| 3 | Lập lịch lấy mẫu phân tầng | 10 phút | Có tần suất và cỡ mẫu |

### Bẫy

Bỏ review dựa trên con số tổng, hoặc dùng một ngưỡng tự tin duy nhất. Cả hai đều bỏ qua đoạn đang hỏng.

---

## 35 · Provenance and Conflicting Sources

Mỗi finding từ subagent phải là object có cấu trúc: claim, trích dẫn nguyên văn, URL nguồn, ngày công bố. Bước tổng hợp được phép viết lại câu, nhưng phải giữ nguyên ba field còn lại.

| Nguồn xung đột | Xử lý |
|---|---|
| Hai con số khác nhau | Trả cả hai kèm nguồn và phương pháp; **không lấy trung bình** |
| Khác thời điểm | Ngày công bố biến mâu thuẫn thành chuỗi thời gian |

### Ví dụ

Hai nguồn nói quy mô thị trường là 4,2 tỷ và 7,1 tỷ.

| Cách làm | Kết quả |
|---|---|
| Lấy trung bình 5,65 tỷ | Con số không nguồn nào nói, và mất luôn phát hiện rằng các nguồn không đồng ý |
| Trả cả hai kèm định nghĩa thị trường và ngày | Người đọc thấy đây có thể là hai định nghĩa khác nhau, không phải mâu thuẫn |

Định dạng theo loại nội dung: tài chính dùng bảng, tin tức dùng văn xuôi, kết quả kỹ thuật dùng danh sách.

Mục "nguồn đã tham khảo" ở cuối báo cáo không thay được mapping claim với nguồn, vì mapping đã mất ở bước nén.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết schema claim nguồn cho một subagent | 10 phút | Có đủ 4 field |
| 2 | Xử lý hai nguồn xung đột, không lấy trung bình | 15 phút | Cả hai số còn nguyên kèm nguồn |
| 3 | Chỉ ra bước nén làm mất provenance trong pipeline của bạn | 10 phút | Nêu được chỗ cụ thể |

### Bẫy

Thêm mục "nguồn tham khảo" cuối báo cáo. Nó liệt kê nguồn nhưng không nối từng claim với nguồn tương ứng.

---
