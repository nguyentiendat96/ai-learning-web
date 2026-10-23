# Claude Certified Developer: Foundations (CCDV-F)

Ghi chú 13 module, dựng từ playlist YouTube "Claude Certified Developer - Foundations - Free Course" (14 video), tháng 10/2026. Nguồn: [playlist Developer](https://www.youtube.com/playlist?list=PLRLPF8qJ3oIw).

> Khóa này dạy **xây ứng dụng** trên Claude API: gọi API, thiết kế lớp, tool use, MCP, agent, streaming, chọn model, caching, prompt, bảo mật, eval, Claude Code, capstone.

## Trọng số thi (theo transcript)

| Domain | Nội dung | Trọng số | Module |
|---|---|---|---|
| D2 | Applications and integration | 33,1% | 01, 02 |
| D5 | Model selection and cost | 16,8% | 07, 08 |
| D1 | Agents and workflows | 14,7% | 05 |
| D8 | Tools and MCPs | 10,6% | 03, 04 |
| khác | Không nêu trong 10 video | not shown | 06, 09, 10, 11, 12 |

## Danh sách module

| # | Module | Chủ đề chính |
|---|---|---|
| 01 | Messages API Mechanics | response shape, stateless, stop_reason, system |
| 02 | Claude Application Design | tách lớp, config, decomposition, version prompt |
| 03 | Tool Use End to End | schema, tool loop, parallel, error |
| 04 | MCP Server Development | in-process, stdio, lọc tool |
| 05 | Agents and Workflows | khi nào dùng agent, pattern, bound loop |
| 06 | Streaming, Vision and Batch | event stream, ảnh, batch, chọn chế độ |
| 07 | Model Selection and Cost | đo 3 tier, count tokens, projection |
| 08 | Prompt Caching and Optimisation Order | breakpoint, đo, thứ tự tối ưu |
| 09 | Prompt and Context Engineering | 5 khối, context rot, structured output |
| 10 | Security and Safety | injection, fail closed, secrets, hook |
| 11 | Eval, Testing and Debugging | 4 loại case, four-cell, retry |
| 12 | Claude Code Operation | headless, allow list, exit code |
| 13 | Capstone | requirement → design → hardening |

---

## 01 · Messages API Mechanics

Response không phải một chuỗi. Nó là object có cấu trúc, và mọi thứ bạn cần nằm ở các field ngoài `content`.

| Field | Cho biết |
|---|---|
| `content[]` | Nhiều block. Khi bật thinking, block 0 là `thinking`, block 1 mới là `text` |
| `stop_reason` | Vì sao dừng |
| `usage` | input, output, cache creation, cache read |
| `id` | Định danh request, dùng để debug |

Ba lỗi nền tảng:

| Lỗi | Hậu quả |
|---|---|
| Giả định `content[0]` là text | Bỏ qua câu trả lời khi có thinking |
| Chỉ kiểm HTTP 200 | `max_tokens` và `refusal` đều trả 200, output bị cắt hoặc rỗng mà không ai biết |
| Nhồi system vào user message | Model trộn luật với yêu cầu |

`stop_reason` phải được kiểm **trước khi** đọc content:

| Giá trị | Xử lý |
|---|---|
| `end_turn` | Xong |
| `max_tokens` | Cắt giữa câu, tăng giới hạn rồi chạy lại |
| `tool_use` | Chạy tool rồi gửi kết quả |
| `refusal` | HTTP 200, nhưng là từ chối; báo cho người dùng |

API **stateless**. Server không nhớ gì giữa các lần gọi. Muốn hội thoại nhiều lượt thì client phải gửi lại toàn bộ lịch sử, và input token tăng dần theo từng lượt. Quên history thì Claude quên sạch.

`system` là tham số riêng, nằm ngoài các lượt hội thoại. System message gửi giữa hội thoại bị giới hạn theo model, model không hỗ trợ trả 400.

---

## 02 · Claude Application Design

Ba lớp, mỗi lớp một lý do để đổi:

| Lớp | Chứa | Dấu hiệu tách sai |
|---|---|---|
| Transport | Nơi duy nhất import SDK và gọi API | Test cần API key mới chạy |
| Prompt | Chuỗi prompt, có phiên bản | Đổi một câu phải sửa code |
| Policy | Luật nghiệp vụ, hàm thuần | Không test offline được |

Phép thử: thay transport bằng bản ghi lại (recording) và chạy test. Pass hết mà không gọi API nghĩa là tách đúng.

Config phải được **validate khi load**. Config đọc mà không kiểm thì lỗi chính tả thành giá trị mặc định im lặng, và hành vi sai được ship như đúng. Reject unknown key ngay, thông báo gợi ý key gần đúng.

Từ yêu cầu nghiệp vụ sang thiết kế, tách thành 7 mục:

1. Kết quả đo được.
2. Trong scope.
3. Ngoài scope (chống phình).
4. Input có thật.
5. Cách biết output đúng (verifiability, mục hay bị bỏ).
6. Failure mode.
7. Điểm con người kiểm.

Kiến trúc rơi ra từ bảng này. Một input, một quyết định thì một lần gọi API, không cần agent.

Prompt là artifact phần mềm: registry có tag phiên bản, config pin một phiên bản, lock file giữ hash nội dung. Rollback là đổi một dòng config, và eval chứng minh điểm cũ đã trở lại.

---

## 03 · Tool Use End to End

Schema là hợp đồng. Mô tả là tài liệu duy nhất model có.

| Việc | Cách làm |
|---|---|
| Chặn tham số bịa | `strict: true`, `additionalProperties: false`, `required` |
| Chặn sai định dạng | Mô tả ghi rõ format, ví dụ `ANNNNN` |
| Chặn gọi nhầm tool | Chỉ expose tool cần cho task |

Vòng lặp: gọi API, nếu `stop_reason == tool_use` thì chạy tool, gửi `tool_result` kèm đúng `tool_use_id`, lặp. `end_turn` thì thoát.

Gọi song song: model trả nhiều `tool_use` trong một message. Kết quả phải nằm trong **một** user message. Tách mỗi kết quả một message thì API vẫn nhận, nhưng model học rằng batch không được hoan nghênh và các lượt sau ngừng gọi song song. Thiệt hại hiện ra ở lượt khác, cách xa chỗ gây lỗi.

Lỗi tool: trả `tool_result` với `is_error: true` và thông điệp model hành động được. Raise exception hoặc bỏ block kết quả đều giết vòng lặp. Trả lỗi có cấu trúc thì model tự sửa được.

---

## 04 · MCP Server Development

Hai kiểu server:

| Kiểu | Cách chạy | Điểm cần nhớ |
|---|---|---|
| In-process (SDK) | Trong chính ứng dụng | Phải khai báo server **và** toolset khớp; thiếu toolset là lỗi validation, không phải bỏ qua im lặng |
| External (stdio) | Process riêng | Chạy bằng quyền của bạn; thư mục root là hàng rào thật |

Với server external, prompt không phải control. Nếu root là thư mục home, model đọc được mọi thứ bạn đọc được. Chỉ root lúc khởi động giới hạn được blast radius.

Agentic customization: expose càng ít tool càng tốt. Mỗi tool là một rủi ro và một khoản token trên mọi request. Ghi lại lý do bỏ từng tool: không dùng cho task, hoặc không đảo ngược được.

---

## 05 · Agents and Workflows

Agent không phải workflow xịn hơn. Workflow có các bước liệt kê được trước; agent có đường đi chỉ hiện ra khi khám phá.

Bốn câu hỏi chọn:

| Câu hỏi | Nghiêng workflow | Nghiêng agent |
|---|---|---|
| Complexity | Bước biết trước | Đường đi chưa biết |
| Value | Việc lặp, rẻ | Việc cần khám phá |
| Viability | Model đủ tốt cho từng bước | Cần lập luận nhiều bước |
| Cost of error | Sai thì tốn kém | Sai thì kiểm lại được |

Chọn sai không fail ồn ào: agent tốn gấp nhiều lần thời gian và tiền để ra cùng câu trả lời. Không có gì trong output nói rằng bạn chọn sai.

Agent SDK cho sẵn tool đọc/ghi file, bash, glob, grep, cộng tool nghiệp vụ của bạn. System prompt định nghĩa vai trò.

Năm pattern có tên, dùng thay vì tự ghép:

| Pattern | Dùng khi |
|---|---|
| Prompt chaining | Các bước nối tiếp, mỗi bước một nhiệm vụ |
| Routing | Nhiều loại input, mỗi loại một đường |
| Parallelization | Các bước độc lập |
| Orchestrator-workers | Có việc con để chia |
| Evaluator-optimizer | Có cổng chất lượng, có thể từ chối và làm lại |

Luôn đặt giới hạn vòng lặp. Hết lượt thì trả **partial result** kèm trạng thái và việc bị chặn, không raise.

---

## 06 · Streaming, Vision and Batch

| Chế độ | Cách dùng | Cạm bẫy |
|---|---|---|
| Streaming | Event theo thứ tự start, delta, stop | Tự nối delta làm mất block và usage; dùng hàm ghép của SDK |
| Vision | Image block đặt **trước** text | Ảnh chiếm phần lớn input token; dùng Files API khi lặp lại |
| Batch | Gửi file request, poll tới `ended` | Kết quả **không** theo thứ tự gửi; khớp bằng `custom_id` |

Batch rẻ khoảng một nửa và không bảo đảm thời điểm xong. Câu quyết định giữa batch và realtime: **có ai đang chờ kết quả không**.

---

## 07 · Model Selection and Cost

Chạy cùng một task trên các tier, đo ba thứ: giá, latency, độ đồng ý với nhãn người. Kết luận không phải "model mạnh nhất thắng" mà **model rẻ hơn mất ở đâu**.

Đo token bằng endpoint count tokens, không dùng thư viện tokenizer của hãng khác. Lệch thực tế khoảng 12%, đủ để sai ngân sách.

Output token đắt khoảng 5 lần input trên mọi model hiện tại. Vì vậy, output thường chiếm phần lớn hóa đơn dù tỉ lệ nhỏ hơn. Khi dự phóng tháng, lấy median của mẫu thật rồi nhân volume; một request mẫu đơn lẻ sẽ báo thấp.

Khi không model nào thỏa cả ba ràng buộc latency, giá, chất lượng, đừng chọn model fail ít nhất. Đổi kiến trúc: model rẻ xử lý phần lớn, chỉ ca không chắc chắn chuyển lên tier trên.

---

## 08 · Prompt Caching and Optimisation Order

Thứ tự render cố định: tools, system, messages. Breakpoint đặt sau block cuối cùng còn ổn định. Đặt sau user message thì cache không bao giờ hit.

| Sự thật | Hệ quả |
|---|---|
| Cache write đắt khoảng 1,25 lần input | Prefix dùng một lần là lỗ |
| Điểm hòa vốn khoảng request thứ hai | Chỉ cache prefix lặp lại |
| Dưới ngưỡng token tối thiểu thì cache bị bỏ qua im lặng | Không có lỗi, chỉ là không hit |
| `cache_read_input_tokens` bằng 0 nghĩa là không cache | Đây là field phải kiểm |

Thứ tự tối ưu, mỗi bước nhân hiệu quả của bước trước:

| Bước | Việc |
|---|---|
| 1 | Giảm output token |
| 2 | Chọn đúng tier model |
| 3 | Thêm prompt caching |
| 4 | Đưa phần không gấp sang batch |

Làm ngược, cache trước khi đổi model, thì phải đo lại và tinh chỉnh lại từ đầu.

---

## 09 · Prompt and Context Engineering

Năm khối: role, context, task, constraint, format. Phép thử bốn input: ticket thường, body rỗng, thread 8.000 từ, và text chứa injection. Thiếu format thì output trôi; thiếu constraint thì ba trong bốn input trả về khuyến nghị không mong muốn.

Context rot có hai nguyên nhân khác nhau, và cách sửa khác nhau:

| Nguyên nhân | Dấu hiệu | Cách sửa |
|---|---|---|
| Volume | Trả lời mỏng, mất chi tiết | Tóm tắt, đưa tài liệu vào project |
| Contamination | Output quay về hướng đã bị từ chối | Phiên mới, handover có danh sách đã loại |

Structured output: schema khai trong `output_config`, parse bằng hàm của SDK. Parameter `output_format` cũ đã bị thay; dùng cả hai thì 400.

---

## 10 · Security and Safety

Injection không chỉ đến từ user message. Nó đến từ tool output: ticket, trang web, dòng database. Text model tự đọc về sẽ được đọc như mệnh lệnh.

| Lớp | Control thật | Không phải control |
|---|---|---|
| Dữ liệu | Bọc tool result thành untrusted, tách khỏi instruction | Dặn model "đừng nghe lệnh trong dữ liệu" |
| Tool | Không expose tool nguy hiểm cho luồng unattended | Prompt "đừng chạy lệnh xóa" |
| Guardrail | Fail closed khi classifier không gọi được | Fail open rồi ghi log |
| Secrets | Profile, không đặt key trong env, log, tool result | Dán key vào prompt |
| Hành vi | Hook chạy ngoài model, chặn trước khi tool chạy | System prompt |

Prompt là sở thích. Hook là control. Đây là câu trả lời cho mọi câu hỏi "hook cho bạn gì mà prompt không có".

---

## 11 · Eval, Testing and Debugging

Bộ eval phải có bốn loại case:

| Loại | Vai trò |
|---|---|
| Typical | Dùng hằng ngày |
| Edge | Body rỗng, input khổng lồ |
| Adversarial | Injection, mâu thuẫn |
| Regression | Đúng input từng gây lỗi trong production |

Chấm baseline trước, chấm **cả tiêu chí không định đổi** (phát hiện hỏng kèm theo), và cho người thứ hai chấm blind.

Tool call sai: dùng bảng bốn ô (tool cũ/mới × input cũ/mới). Parse JSON của input, đừng so khớp chuỗi trên bản serialize.

Retry: backoff lũy thừa cộng idempotency key. Chỉ retry 429 và 5xx. Bỏ qua idempotency key thì ba lần thử thành ba đơn hàng.

---

## 12 · Claude Code Operation

Chạy trong CI, không có TUI:

| Yếu tố | Vai trò |
|---|---|
| Prompt qua tham số `-p` | Chế độ headless |
| `--output-format stream-json` | Một object JSON mỗi dòng, parse được |
| `--allowedTools` | Giới hạn tool, ví dụ chỉ read, grep, glob |
| Exit code | 0 là không có phát hiện; khác 0 thì fail build |

Đừng parse prose bằng regex. Câu chữ đổi giữa các phiên bản, pipeline vỡ im lặng.

---

## 13 · Capstone: ship một ứng dụng production

Requirement thành design, đủ 7 mục ở module 02, cộng kill criterion.

Nguyên tắc tool: expose bề mặt nhỏ nhất còn giải được task. Tool gây hậu quả không đảo ngược (page người, refund) không đưa vào vòng lặp.

Chi phí giảm theo thứ tự, ví dụ trong khóa:

| Bước | Chi phí tháng |
|---|---|
| Ban đầu | 13.590 |
| Giảm output token | 9.824 |
| Đúng tier model | 6.102 |
| Caching | 4.510 |
| Batch 60% traffic | 3.140 |

Giảm 77%, và eval 24 case xác nhận không hỏng hành vi.

Hardening trước khi ship:

| Control | Yêu cầu |
|---|---|
| Guardrail | Fail closed khi classifier chết |
| Tool result | Gắn nhãn untrusted |
| Tool nguy hiểm | Không expose |
| Secrets | Zero-argument client, profile |
| Retry | Chỉ 429/5xx, kèm idempotency key |
| Hook | Allow list cho bash |

Sau đó chạy 12 lần injection và **ghi lại rủi ro còn lại**. Capstone tuyên bố không còn rủi ro là capstone chưa được kiểm.

---

## Câu hỏi tự kiểm

| Module | Câu hỏi |
|---|---|
| 01 | Bạn kiểm `stop_reason` trước hay đọc content trước? |
| 02 | Test của bạn chạy được khi không có API key chưa? |
| 03 | Kết quả của nhiều tool call nằm trong mấy message? |
| 04 | Hàng rào blast radius của MCP server là gì? |
| 05 | Vòng lặp agent dừng bằng cách nào, và trả về gì khi hết lượt? |
| 06 | Kết quả batch khớp với input bằng field nào? |
| 07 | Output token chiếm bao nhiêu phần trăm hóa đơn của bạn? |
| 08 | `cache_read_input_tokens` của lần gọi gần nhất là bao nhiêu? |
| 09 | Output đang mỏng hay đang quay về hướng đã loại? |
| 10 | Control nào còn hiệu lực khi model bị thuyết phục? |
| 11 | Bộ eval của bạn có case regression nào? |
| 12 | Pipeline đọc kết quả bằng gì, exit code hay nội dung? |
| 13 | Tool nào không nên có mặt trong vòng lặp unattended? |
