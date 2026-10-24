# Claude Certified Architect: Foundations (CCA-F)

Giáo trình 12 bài, gộp từ 35 module và đối chiếu tài liệu Anthropic, tháng 10/2026. Nguồn: [playlist Architect](https://www.youtube.com/playlist?list=PLTw_BnRTtaD4) và [khóa 16 bài](https://www.youtube.com/watch?v=cLa3Qf9SUYs).

Mỗi bài có: mục tiêu, lý thuyết, ví dụ, mã, thực hành, bài tập, bẫy. Phần thi tách riêng ở [mục Thi](exam.html).

## Kỳ thi

| Hạng mục | Giá trị |
|---|---|
| Số câu | 60 |
| Thời gian | 120 phút |
| Điểm đạt | 720 trên thang 100 đến 1.000 |
| Scenario | 4 trong 6 kịch bản, mỗi cái 15 câu |
| Lệ phí | 49 USD, thi lại sau 6 tháng |

Năm domain: agentic architecture 27%, cấu hình Claude Code 20%, prompt và structured output 20%, tool và MCP 18%, context và reliability 15%.

---

## 01 · Bài thi và quyết định đầu tiên

**Mục tiêu**

- Đọc đúng thể lệ, phân bổ thời gian theo trọng số.
- Phân loại một hệ thống thành workflow, agent hay hội thoại.
- Áp nguyên tắc can thiệp vừa đủ.

### Lý thuyết

Bài thi đo cả tốc độ đọc. Scenario dài một đoạn văn, 60 câu trong 120 phút, khoảng 2 phút mỗi câu.

Ba hình thái, phân biệt bằng **ai chọn hành động kế tiếp**:

| Hình thái | Ai chọn bước sau | Dấu hiệu |
|---|---|---|
| Workflow | Người viết code | Liệt kê được toàn bộ nhánh trước |
| Agent | Model | Đường đi hiện ra trong lúc chạy |
| Hội thoại | Không có kế hoạch | Trả lời từng lượt |

Câu hỏi duy nhất: viết được toàn bộ trình tự ra trước không. Được thì là workflow, kể cả khi mỗi bước rất khó. Có model, có tool, có vòng lặp mà mọi nhánh do người viết thì vẫn là workflow.

Can thiệp vừa đủ: sửa đúng nguyên nhân với chi phí thấp nhất.

| Triệu chứng | Sửa đúng | Sửa thừa |
|---|---|---|
| Chọn nhầm một trong hai tool | Viết lại mô tả | Thêm routing classifier |
| Review nhiều file bị nông | Chia theo file, thêm bước tổng hợp | Tăng context window |
| Cần chặn một hành vi tài chính | Code gate | Prompt mạnh hơn |

Ranh giới: hành động không đảo ngược thì dùng code, không dùng prompt.

### Ví dụ

Hệ thống trích hóa đơn có model, tool, retry, ghi sổ. Nhìn như agent.

| Câu hỏi | Trả lời |
|---|---|
| Viết được trình tự trước không | Được: đọc, kiểm, retry nếu sai, ghi |
| Ai quyết định retry | Code |
| Kết luận | Workflow |

Chi phí chọn sai: agent tốn thời gian gấp nhiều lần, ra cùng kết quả, và không có tín hiệu nào trong output báo đã chọn sai.

### Mã

Không có code đặc thù. Đây là bài về câu hỏi. Khi làm đề, viết hai cột: "các bước" và "ai chọn bước sau".

### Thực hành

1. Chọn ba hệ thống bạn biết.
2. Với mỗi cái, viết toàn bộ nhánh ra giấy.
3. Viết được hết thì kết luận workflow.
4. Ghi lại cái mất nếu chọn hình thái kia.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Phân loại 5 hệ thống | 15 phút | Mỗi kết luận nêu ai chọn bước |
| 2 | Thử viết hết nhánh của một "agent" | 20 phút | Kết luận lại nếu viết được |
| 3 | Lập bảng giờ học theo trọng số | 10 phút | Domain nặng nhất nhiều giờ nhất |

### Bẫy

Nhầm độ khó với mức tự chủ. Đề luôn đưa hệ thống có model, tool, vòng lặp, và đáp án đúng là workflow vì mọi nhánh do người viết.

---

## 02 · Chia việc, pattern, topology

**Mục tiêu**

- Chia việc theo đường nối tự nhiên, không theo token.
- Chọn pattern theo phụ thuộc dữ liệu.
- Chọn topology và nêu cái mất.

### Lý thuyết

Chia theo **đường nối của tài liệu**: ranh giới file, bước khám phá. Chia theo số token cắt ngang mạch suy nghĩ và không bước sau nào cứu được.

Mọi cách chia đều cần **bước tái hợp**: một bước chịu trách nhiệm tính nhất quán của kết quả cuối.

| Pattern | Dùng khi | Giá |
|---|---|---|
| Sequential | Bước sau cần output bước trước | Thời gian cộng dồn |
| Parallel | Các bước độc lập | Context nhân bản, nhiều điểm hỏng |
| Adaptive | Chưa biết phạm vi | Chậm hơn kế hoạch cố định |

Trong Agent SDK, parallel nghĩa là coordinator phát nhiều task call trong **một** response. Gọi mỗi lượt một task là tuần tự, dù sơ đồ vẽ song song.

| Topology | Quan sát | Lỗi khi hỏng |
|---|---|---|
| Hub and spoke | Một coordinator thấy mọi thứ | Coordinator thấy ngay |
| Pipeline | Mỗi output vào đúng một input | Phải xử lý ở mọi mối nối |
| Peer-to-peer | Không có điểm trung tâm | Mỗi agent phát hiện một lúc khác nhau |

Hai luật subagent: mỗi subagent chỉ có tool của vai trò; coordinator chọn subagent theo câu hỏi, không chạy cả pipeline.

### Trách nhiệm của coordinator

| Việc | Nội dung |
|---|---|
| Decompose | Chia việc |
| Select | Chọn subagent theo câu hỏi |
| Partition | Chia phạm vi, không chồng lấn |
| Pass context | Gửi đủ dữ liệu, không dựa vào kế thừa |
| Aggregate | Ghép kết quả |
| Refine | Lặp lại chỗ còn thiếu |
| Route | Giữ một chỗ quan sát được |

Bảng truy lỗi:

| Triệu chứng | Nguyên nhân gốc |
|---|---|
| Thiếu hẳn một mảng chủ đề | Decompose quá hẹp |
| Trùng lặp nguồn, token tăng gấp đôi | Partition ẩu, hai agent cùng một việc |
| Nông đều mọi chủ đề | Prompt hoặc ngân sách tool của subagent |
| Mất trích dẫn nguồn | Context passing làm rơi metadata |

Uỷ quyền kiểm chứng: nếu phần lớn ca cần kiểm là tra cứu đơn giản, cho agent tổng hợp một tool tra cứu hẹp rẻ hơn về latency so với quay về coordinator; ca phức tạp vẫn qua coordinator. Đánh đổi là thêm một đường quan sát.

### Ví dụ

PR 14 file cần review bảo mật.

| Cách | Kết quả |
|---|---|
| Một prompt chứa 14 file | Nông đều, bỏ sót lỗi xuyên file |
| Chia theo token | Mảnh này cảnh báo mẫu nguy hiểm, mảnh kia duyệt chính mẫu đó |
| 14 lượt theo file, cộng 1 lượt tích hợp | Lượt tích hợp lần theo giá trị từ chỗ kiểm đến chỗ dùng |

Hệ nghiên cứu 4 agent: câu hỏi "thủ đô của Pháp" chỉ cần searcher và reporter. Chạy cả bốn vẫn đúng nhưng tốn và thêm nhiễu.

### Mã

```python
# Parallel trong Agent SDK: nhiều task call trong MỘT response
tasks = [
    {"type": "task", "agent": "searcher", "prompt": "..."},
    {"type": "task", "agent": "analyst", "prompt": "..."},
]
# gửi cả hai trong cùng lượt; SDK chạy song song
```

### Thực hành

1. Chia một việc lớn theo đường nối tự nhiên.
2. Ghi rõ bước nào chịu tính nhất quán.
3. Chọn pattern theo phụ thuộc dữ liệu.
4. Vẽ hub and spoke cho 4 agent, đếm mối nối nếu đổi sang pipeline.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Chia việc, ghi đường nối | 15 phút | Không mảnh nào cắt giữa luồng dữ liệu |
| 2 | Chỉ ra bước tái hợp | 10 phút | Bước đó nhận output của tất cả |
| 3 | So hub and spoke với pipeline | 15 phút | Đếm được số mối nối phải xử lý |

### Bẫy

Token chunking cộng nối kết quả. Đề luôn kèm triệu chứng mâu thuẫn giữa các mảnh, đáp án phải có bước tái hợp.

---

## 03 · Cấu hình Claude Code

**Mục tiêu**

- Phân biệt ba tầng cấu hình và ai thắng.
- Chọn giữa command, skill, subagent.
- Đặt rule đúng scope.

### Lý thuyết

Ba tầng file, đọc enterprise, user, project.

| Tầng | Chứa | Ví dụ |
|---|---|---|
| Enterprise | Ràng buộc không được vi phạm | Bảo mật, tuân thủ |
| User | Sở thích cá nhân | Độ dài, định dạng |
| Project | Thỏa thuận nhóm | ORM, framework test |

Tầng cụ thể hơn thắng, không phải tầng có quyền tổ chức cao hơn. Đây là thay thế directive xung đột, không phải trộn: enterprise vẫn áp ở chỗ project im lặng.

| Công cụ | Kích hoạt | Chạy ở đâu |
|---|---|---|
| Slash command | Người gõ tên | Context chính |
| Skill | Tự động theo description | Có thể tách context |
| Subagent | Coordinator giao | Context riêng |

### Đường dẫn quyết định phạm vi

| Tầng | Đường dẫn | Chia sẻ qua git |
|---|---|---|
| User | `~/.claude/CLAUDE.md` | Không |
| Project | `.claude/CLAUDE.md` hoặc `CLAUDE.md` gốc | Có |
| Thư mục | `<subdir>/CLAUDE.md` | Có, chỉ ảnh hưởng khi làm trong thư mục đó |

`CLAUDE.md` trong thư mục con chỉ tác động xuống dưới, không lên trên.

Chẩn đoán: hai đồng nghiệp cùng repo, cùng nhánh, hành vi khác nhau. Kiểm tầng user trước, vì file đó không đi qua git.

### Ví dụ

| Nhu cầu | Chọn | Vì sao |
|---|---|---|
| Checklist review, gọi khi review | Command | Người quyết định thời điểm |
| Sinh sơ đồ mỗi khi bàn thiết kế | Skill, description hẹp | Tự kích hoạt theo ngữ cảnh |
| Quét toàn repo tìm chỗ dùng API | Subagent | Output lớn, cần context riêng |

### Mã

```json
{
  "model": "claude-opus-5-5",
  "permissions": {
    "deny": ["Bash(rm -rf *)", "Read(./.env)"]
  }
}
```

File này commit để cả team dùng cùng model và cùng luật chặn. `CLAUDE.md` không ghi đè lẫn nhau: chúng cộng dồn.

### Thực hành

1. Chạy `/memory`, xem file nào đang nạp.
2. Chuyển một rule cá nhân sang project scope, commit.
3. Biến một prompt hay dán thành command.
4. Viết description cho một skill, kiểm nó không bắn sai.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết 3 rule vào 3 tầng, xác định ai thắng | 15 phút | Giải thích bằng độ cụ thể |
| 2 | Chuyển prompt thành command | 15 phút | Hai máy cho cùng kết quả |
| 3 | Viết description skill hẹp | 10 phút | Nêu được khi nào không chạy |

### Bẫy

Nghĩ ba luật toàn cục cùng hướng thắng một luật project. Chỉ độ cụ thể quyết định.

---

## 04 · Headless, CI và hook

**Mục tiêu**

- Chạy Claude không người đúng cơ chế.
- Phân biệt hai họ hook.
- Viết hook chặn có chuyển hướng.

### Lý thuyết

| Việc | Cơ chế đúng | Bẫy |
|---|---|---|
| Chạy không người | Cờ `-p` | `claude headless`, `batch` không tồn tại |
| Context trong CI | `CLAUDE.md` | CI không có lịch sử phiên |
| Ép luật bất biến | Hook | Prompt, vì prompt là xác suất |
| Chọn chế độ trả lời | Theo nơi tiêu thụ output | Coi là cài đặt hiệu năng |

Hai họ hook: Claude Code hooks (shell, theo repo hoặc team) và Agent SDK hooks (code trong tiến trình agent). Stem có "pipeline", "team" là họ thứ nhất; "agent", "tool result" là họ thứ hai.

### Ví dụ

Pipeline treo khi gọi Claude.

| Bước | Việc | Vì sao |
|---|---|---|
| 1 | Thêm `-p` | Hết treo |
| 2 | `--output-format json` | Hết prose |
| 3 | Schema 5 field | Comment đăng đúng chỗ |
| 4 | Không dùng `stdin < /dev/null` | Chỉ che triệu chứng |

### Mã

```bash
claude -p "Review staged diff for security issues" \
  --output-format json \
  --allowedTools "Read,Grep,Glob"
```

Hook chặn phải trả lý do và đường đi tiếp:

```python
def before_tool(name, args, session):
    if name == "bash" and args["command"].startswith("rm -rf"):
        raise PermissionError(
            "Chặn xóa đệ quy. Dùng nhánh riêng rồi mở PR."
        )
```

### Thực hành

1. Viết lệnh headless có `-p` và json.
2. Đặt một hook chặn.
3. Cố tình chặn bằng lỗi trơ, quan sát agent tắc.
4. Sửa hook trả lý do và tool thay thế.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết lệnh CI đúng | 15 phút | Không cờ bịa |
| 2 | Viết hook có chuyển hướng | 20 phút | Agent gọi được tool thay thế |
| 3 | Phân loại 5 rule thành hook hay prompt | 10 phút | Rule bất biến dùng hook |

### Bẫy

Chặn bằng hook nhưng trả lỗi trơ. Đề coi đó là lỗi thiết kế, không phải an toàn.

---

## 05 · Prompt quy mô hệ thống và structured output

**Mục tiêu**

- Viết system prompt như hợp đồng giao diện.
- Chọn few-shot hay chain of thought theo lỗi, không theo sở thích.
- Dùng schema đúng và biết schema không bảo đảm sự thật.

### Lý thuyết

System prompt là hợp đồng: vai trò, ranh giới, khi nào escalate, hình dạng output. Không phải sổ tay ghi mọi thứ.

| Triệu chứng | Kỹ thuật | Chi phí |
|---|---|---|
| Phân loại rõ, ổn định | Zero shot | Không |
| Lưỡng lự ở ca biên | Few shot, 2-4 ví dụ khác nhau | Token mỗi request |
| Cần suy luận nhiều bước | Chain of thought | Latency |

Dùng CoT cho phân loại là bẫy: thêm chi phí, không thêm chất lượng.

Structured output: schema ràng buộc hình dạng, không ràng buộc sự thật.

| Tình huống | Cấu hình |
|---|---|
| Loại tài liệu chưa biết | `tool_choice: any` |
| Có thể trả lời văn xuôi | `auto`, nhưng parser vỡ |
| Đã biết chắc loại | Force tên tool |

| Quy tắc schema | Lý do |
|---|---|
| Không `required` cho nguồn có thể im lặng | Model bịa giá trị |
| Enum có `other` kèm chi tiết | Enum dài vô hạn |
| Validate sau khi nhận | Schema chỉ làm ca xấu hiếm hơn |

### Tiêu chí ba nhóm

Cấu trúc: **báo gì, ghi nhận gì, bỏ qua gì**. Ba nhóm rõ ràng, không dùng tính từ về độ tự tin.

Khi một nhóm sai nhiều: tắt hẳn nhóm đó, sửa tiêu chí và few-shot, rồi bật lại. Giữ nó bật với lời dặn "hãy thận trọng" không hiệu quả và làm mất niềm tin vào cả các nhóm đúng.

Mức nghiêm trọng phải neo bằng ví dụ code, không bằng tính từ.

### System prompt qua nhiều lượt

System prompt phải gửi trong mọi request; API không nhớ gì giữa các lần gọi. Bỏ nó ở lượt sau thì hành vi lệch ngay, không phải từ từ.

Một hiệu ứng khác có thật: dù prompt không đổi, mức chú ý vào nó giảm khi hội thoại dài ra, vì output gần đây tranh chỗ. Sửa bằng cấu trúc: nhắc lại chỉ dẫn quan trọng ở mốc tự nhiên, đánh phiên bản prompt cho phiên dài, và đưa luật cứng vào code hoặc tool.

Chia system prompt thành các khối: vai trò, phong cách, an toàn, ví dụ. Thẻ kiểu XML không phải phép thuật nhưng tăng độ rõ và cho phép tham chiếu lại về sau, ví dụ nhắc lại quy tắc trong khối an toàn.

Khi trạng thái đổi giữa phiên, ví dụ đơn đã giao hoặc gói dịch vụ đổi, chỗ đúng để nêu là system prompt của lần gọi sau, không phải nhét trong tool result. Nhưng cân nhắc cache: system prompt nằm ở đầu prefix, sửa nó là mất cache của cả hội thoại. Với traffic cao, giữ system prompt ổn định và chèn khối trạng thái gần lượt người dùng.

Nguyên tắc và điều kiện: dùng nguyên tắc cho việc cần phán đoán, dùng điều kiện rõ cho trigger an toàn. Biến mọi thứ thành điều kiện thì model chỉ còn khớp từ khóa và phân loại sai người nói khác thường. Luật phải đúng 100 phần trăm thì đưa ra khỏi prompt, vào code.

### Ví dụ

Bản tóm tắt báo cáo năm có con số kiện tụng lạ.

| Phương án | Kết luận |
|---|---|
| Gửi vì có trích dẫn | Trích dẫn chưa mở thì chưa xác minh |
| Nhờ model tự kiểm | Cùng cơ chế sinh |
| Yêu cầu trích nguyên văn, bỏ claim không nguồn | Đúng |
| Kiểm completeness bằng danh sách gốc | Bắt được mục bị bỏ |

### Mã

```python
resp = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    system=(
        "Bạn phân loại ticket. Trả JSON đúng schema. "
        "Nếu không đủ thông tin, trả category=unclear, không đoán."
    ),
    messages=[{"role": "user", "content": ticket}],
)
```

Với tài liệu không rõ loại, dùng `tool_choice: any` để buộc gọi tool và để model chọn schema.

### Thực hành

1. Viết system prompt dưới 200 token làm đúng một việc.
2. Thêm few-shot cho ca biên, đo tỉ lệ sai.
3. Viết schema có field nullable.
4. Thêm validate sau schema, thử một output thiếu field.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết system prompt gọn | 20 phút | Không chi tiết riêng của tool |
| 2 | So zero shot và few-shot | 15 phút | Có số lần sai |
| 3 | Viết schema nullable | 15 phút | Không field nào bắt buộc bừa |

### Bẫy

Đánh dấu mọi field `required`. Nó tạo bịa đặt, và đề coi là đáp án sai kinh điển.

---

## 06 · Thiết kế tool và MCP

**Mục tiêu**

- Chọn độ chi tiết tool.
- Viết mô tả đủ bốn câu.
- Đặt MCP server đúng scope, đúng primitive.

### Lý thuyết

| Triệu chứng | Sửa |
|---|---|
| Một tool làm nhiều việc, mô tả mờ | Tách |
| Quá nhiều tool, model chọn sai | Gộp |
| Thêm tham số `mode` để chia việc | Sai: vẫn mơ hồ trong một mô tả |

Mô tả là tài liệu duy nhất model có. Bốn câu: làm gì, dùng khi nào, không dùng khi nào, tham số nghĩa gì và tool không làm được gì.

MCP:

| Quyết định | Chọn |
|---|---|
| Server dùng chung | Scope project, commit file cấu hình |
| Thử nghiệm cá nhân | Scope user |
| Bí mật | Biến môi trường |
| Tích hợp phổ biến | Server cộng đồng |
| Danh mục nội dung | Resources, không phải tool list_all |

Ba primitive, ba bên điều khiển: tools do model, resources do app, prompts do người dùng.

### Năm thành phần của mô tả tool

| Thành phần | Nội dung |
|---|---|
| Mục đích chính | Một câu |
| Hợp đồng đầu vào | Định dạng, kiểu, ràng buộc |
| Ví dụ câu hỏi phù hợp | Chuỗi cụ thể |
| Giới hạn | Những gì tool không làm |
| Ranh giới với tool tương tự | "Dùng cho X. Với Y, dùng tool Z" |

Thứ tự sửa khi chọn nhầm tool:

| Cách | Hạng | Vì sao |
|---|---|---|
| Mở rộng mô tả | 1, đúng | Rẻ, đúng nguyên nhân |
| Few-shot định tuyến | 2 | Chữa triệu chứng, tốn token mỗi call |
| Gộp tool | 3 | Mất phân biệt ngữ nghĩa, refactor đắt |
| Huấn luyện classifier | 4, sai | Thêm một call, thêm điểm hỏng |

Dấu hiệu cần tách tool: mô tả có chữ "hoặc" hoặc "tùy theo" giữa các hành vi.

Ba kết cục của một lần gọi tool: lỗi truy cập (`is_error: true`), chạy được nhưng rỗng (`is_error: false`, kết quả rỗng), và có dữ liệu. Gộp hai cái đầu làm hỏng mọi logic phục hồi.

### Tool ở quy mô lớn và luồng xác nhận

| Vấn đề | Thiết kế đúng |
|---|---|
| API trả kết quả phân trang | Trả trang đầu, tổng số, con trỏ; không tự lấy hết |
| Quá nhiều tool, chọn sai | Tool khám phá trả danh sách rút gọn, rồi nạp tool được chọn |
| Một tool find_and_execute | Sai: giấu quyết định, có thể hành động sai quá sớm |

Độ tin cậy: đừng trả điểm thô cho model tự diễn giải. Hiệu chỉnh ngưỡng trên tập nhãn, rồi trả kèm cờ và lý do.

```
{"fields": {...}, "requires_review": true,
 "review_reasons": ["amount_below_confidence_threshold"]}
```

Hành động phá hủy: không dùng tham số dry_run, vì model có thể gọi với giá trị sai. Dùng hai bước: tool xem trước trả tác động và token xác nhận một lần, tool thực thi bắt buộc token đó. Nội dung xác nhận phải nêu đối tượng, chi phí, tác động không đảo ngược.

Lỗi MCP có hai tầng: lỗi giao thức (sai schema, tool không tồn tại) và lỗi thực thi (bản ghi không có, dịch vụ 503). Lỗi nghiệp vụ là lỗi thực thi, không phải lỗi giao thức.

Retry đặt ở nơi có thông tin: lỗi tạm thời thì tool tự retry; lỗi cần đổi đầu vào thì để model sửa; có thể nhân đôi tác dụng phụ thì cần người duyệt.

Ghi mà timeout sau khi đã gửi: không biết tác dụng phụ đã xảy ra chưa. Trả lỗi kèm câu "không rõ đã gửi chưa, đừng retry khi chưa kiểm", không đánh dấu an toàn để retry, và khuyến khích tra trạng thái trước.

### Ví dụ

| Lỗi | Nguyên nhân | Sửa |
|---|---|---|
| Chọn nhầm tool | Mô tả thiếu câu ranh giới | Viết lại mô tả |
| Sai tham số | Không nêu định dạng | Nêu ví dụ `A10493` |
| Agent bỏ qua tool | Không nêu "dùng khi nào" | Thêm câu đó |

### Mã

```python
tools = [{
    "name": "get_order_status",
    "description": (
        "Tra trạng thái đơn. Nhận order_id dạng ANNNNN. "
        "Dùng cho câu hỏi về đơn, không dùng cho tài khoản hay hoàn tiền."
    ),
    "input_schema": {
        "type": "object",
        "properties": {"order_id": {"type": "string", "description": "Dạng ANNNNN"}},
        "required": ["order_id"],
        "additionalProperties": False,
    },
    "strict": True,
}]
```

Cấu hình MCP không chứa secret:

```json
{
  "mcpServers": {
    "inventory": {
      "command": "python",
      "args": ["-m", "inventory_mcp"],
      "env": { "INVENTORY_TOKEN": "${INVENTORY_TOKEN}" }
    }
  }
}
```

### Thực hành

1. Viết lại mô tả một tool đủ bốn câu.
2. Đo tỉ lệ gọi đúng trước và sau.
3. Phân loại 6 capability vào ba primitive.
4. Viết cấu hình MCP không chứa token.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết mô tả đủ bốn câu | 20 phút | Có câu "không dùng khi" |
| 2 | Đo tỉ lệ gọi đúng | 15 phút | Có số trước và sau |
| 3 | Phân loại primitive | 10 phút | Mỗi cái nêu bên điều khiển |

### Bẫy

Sửa lỗi chọn tool bằng cách thêm câu vào system prompt. Bước chọn chỉ đọc mô tả.
---

## 07 · Context và hai scenario lab

**Mục tiêu**

- Đặt ngân sách context và cắt tại biên.
- Giữ sự kiện giao dịch ngoài phần tóm tắt.
- Đọc scenario để tìm ràng buộc ràng buộc.

### Lý thuyết

| Việc | Làm ở đâu | Không làm |
|---|---|---|
| Ngân sách | Đo từng nguồn trước | Đoán |
| Cắt bớt | Tại biên, trong post-tool-use hook | Để model thấy hết rồi compact |
| Kết quả quá lớn | Cắt, nói rõ đã cắt | Bỏ im lặng |
| Nén hội thoại | Case facts block ngoài tóm tắt | Dặn summarizer giữ chi tiết |

Context rot: cửa sổ càng đầy, độ chính xác càng giảm. Model nhớ đầu và cuối tốt hơn giữa.

Scenario lab dạy một kỹ năng: tìm ràng buộc ràng buộc, rồi dùng nó làm bộ lọc loại trừ.

| Ràng buộc | Loại bỏ |
|---|---|
| Hành động không đảo ngược | Mọi cơ chế xác suất |
| Mục tiêu tỉ lệ tự xử lý | Escalate theo confidence |
| Không có hành động không đảo ngược | Enforcement gate |
| Báo cáo có trích dẫn | Handoff bằng văn xuôi |

### Đầu vào tổng hợp quá dài

Khi đầu vào cho bước tổng hợp khoảng 75K token, model trích được 15K đầu và 10K cuối, bỏ giữa. Sửa bằng cách tái cấu trúc đầu vào: đưa kết luận quan trọng lên đầu mỗi khối, chia thành nhiều lượt tổng hợp theo chủ đề, hoặc tóm tắt từng nguồn trước khi ghép. Tăng cửa sổ không sửa được vấn đề.

### Case facts dạng khối

```
<case_facts>
- Mã khách: 4471
- Đơn: #8891, đặt 2026-03-03
- Hoàn tiền: 247,83
- Hạn khách nêu: thứ Sáu 2026-05-22
</case_facts>
```

Tóm tắt làm mất trước hết số tiền, ngày, mã đơn, phần trăm, lời hứa. Khối này chèn nguyên văn mọi prompt và không đi qua bước tóm tắt.

### Chọn chiến lược context theo thứ cần giữ

| Nhu cầu | Cách |
|---|---|
| Mạch gần đây | Giữ nguyên vài lượt gần nhất |
| Mạch dài qua nhiều phiên | Tóm tắt lũy tiến, có cấu trúc |
| Sở thích hiện tại | Object trạng thái |
| Số liệu chính xác | Truy xuất từ nguồn hoặc kho dữ kiện |
| Canon sáng tác | Khối tham chiếu cố định |
| Tool nặng | Trích field cần, bỏ payload dài |

Tóm tắt tốt có bốn mục: quyết định, sở thích hiện tại, câu hỏi mở, dữ kiện quan trọng. Tóm tắt kiểu kể chuyện làm mất đúng những con số người dùng hỏi lại.

Cửa sổ trượt đúng khi log cho thấy phần lớn tin nhắn chỉ tham chiếu 3-5 lượt gần nhất; giữ 8-10 lượt cộng system prompt. Với kết quả RAG, áp cửa sổ riêng, giữ 2-3 lần gần nhất, thay vì gộp tất cả vào một bản tóm tắt.

Khối tham chiếu cố định giữ thứ phải nguyên vẹn suốt phiên: bible truyện, định nghĩa riêng của người dùng, thông tin an toàn như dị ứng. Tách khỏi phần hội thoại để bước tóm tắt không chạm vào.

Object trạng thái là nguồn sự thật hiện tại: cập nhật mỗi lần người dùng đổi ý và chèn vào mọi request. Khi hai sở thích mâu thuẫn và quyết định quan trọng, nêu mâu thuẫn và hỏi; không tự chọn một bên.

### Ví dụ

Scenario A: agent support, mục tiêu 80% xử lý ngay lần đầu.

| Phương án | Bị loại vì |
|---|---|
| Tự xử lý mọi ca | Đoán ở ca mơ hồ |
| Escalate khi confidence thấp | Escalate ca xử lý được |
| Tự xử lý ca rõ, escalate khi policy trống | Sống sót |

Scenario B: hệ nghiên cứu 4 agent, báo cáo có trích dẫn. Điểm khác biệt so với A là context cô lập và yêu cầu truy nguồn, nên enforcement gate không còn chỗ đứng.

### Mã

```python
# Case facts: nguyên văn, ngoài phần tóm tắt, chèn mọi prompt
CASE = """Số tiền: 247,83
Ngày: 3 tháng 3
Mã đơn: 4471
Cam kết: hoàn trong 5 ngày làm việc"""
```

### Thực hành

1. Đo token của 4 nguồn trong một hội thoại dài.
2. Viết hook cắt một tool result xuống field cần thiết.
3. Viết case facts cho một vụ thật.
4. Với một brief, gạch ra ràng buộc và các phương án bị loại.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Đo token theo nguồn | 20 phút | Có số từng nguồn |
| 2 | Viết case facts block | 15 phút | Mọi con số nguyên văn |
| 3 | Lập bảng ràng buộc, phương án bị loại | 15 phút | Không phương án nào bị loại vì cảm tính |

### Bẫy

Cân nhắc ưu nhược điểm giữa các phương án. Nếu đang cân nhắc nghĩa là đã bỏ sót một phép loại trừ.

---

## 08 · Vòng lặp agent và spawn subagent

**Mục tiêu**

- Viết vòng lặp chỉ dựa trên `stop_reason`.
- Truyền context tường minh cho subagent.
- Phát task song song đúng cách.

### Lý thuyết

Vòng lặp: gửi request, đọc `stop_reason`, chạy tool, gửi kết quả, lặp.

| Thành phần | Vai trò |
|---|---|
| `stop_reason` | Tín hiệu dừng duy nhất đáng tin |
| `tool_result` có `tool_use_id` | Mọi tool call phải được trả lời, đủ số |
| Giới hạn số vòng | Lưới an toàn, không phải cách kết thúc |

Spawn bằng task tool. Coordinator phải có `task` trong allowed tools; thiếu thì nó tự làm hết, không báo lỗi.

| Việc | Cách |
|---|---|
| Song song | Nhiều task call trong một response |
| Tuần tự | Một task mỗi lượt |
| Giới hạn quyền | Mỗi subagent chỉ tool của vai trò |
| Truyền context | Ghi tường minh, không có kế thừa |

Một phản mẫu nữa: kiểm `content[0].type == "text"` để biết đã xong. Response `tool_use` có thể mở đầu bằng block text, nên cách kiểm này cắt vòng lặp sớm.

### Ví dụ

Model trả 3 tool call trong một lượt.

| Cách trả | Kết quả |
|---|---|
| 3 `tool_result` trong một user message | Đúng |
| Trả 2 trong 3 | Lỗi API |
| Mỗi kết quả một message | Model học rằng batch không được hoan nghênh |

| Agent | Tool | Nếu cấp thừa |
|---|---|---|
| Searcher | web search | |
| Synthesizer | không có web search | Tự đi nghiên cứu, báo cáo thiếu một phần ba |

### Mã

```python
while True:
    resp = client.messages.create(
        model="claude-opus-5-5", max_tokens=2048,
        messages=messages, tools=tools,
    )
    if resp.stop_reason != "tool_use":
        break
    results = []
    for block in resp.content:
        if block.type == "tool_use":
            out = run_tool(block.name, block.input)
            results.append({"type": "tool_result",
                            "tool_use_id": block.id, "content": out})
    messages.append({"role": "assistant", "content": resp.content})
    messages.append({"role": "user", "content": results})
```

### Thực hành

1. Viết vòng lặp không đọc text để dừng.
2. Xử lý lượt có 3 tool call.
3. Thêm giới hạn vòng, trả partial result khi hết.
4. Viết payload handoff có cấu trúc giữa hai agent.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết vòng lặp đúng | 20 phút | Không parse text |
| 2 | Xử lý 3 tool call | 15 phút | Trả đủ trong một message |
| 3 | Viết payload có claim, evidence, source, date | 15 phút | Không field nào văn xuôi tự do |

### Bẫy

Parse câu "tôi đã xong" trong text, hoặc dùng số vòng làm điều kiện dừng chính.

---

## 09 · Gate, handoff và hook của SDK

**Mục tiêu**

- Đặt gate cho hành vi không được sai.
- Viết handoff thay cho transcript.
- Dùng hook để chuẩn hóa và chặn.

### Lý thuyết

Gate là code chặn tool tới khi điều kiện tiên quyết xong.

| Dùng gate khi | Dùng thứ khác khi |
|---|---|
| Hậu quả nghiêm trọng, không được sai lần nào | Tool chỉ bị chọn nhầm: sửa mô tả |
| Tiền, an toàn, pháp lý | Thứ tự chỉ chưa tối ưu: prompt |

Chặn phải trả lỗi có cấu trúc nêu thiếu gì và tool nào cấp được.

Handoff cho người: payload thay transcript.

| Field | Trả lời |
|---|---|
| ID khách, ID đơn | Việc gì |
| Nguyên nhân gốc | Chuyện gì |
| Bằng chứng | Dựa vào đâu |
| Số tiền | Rủi ro bao nhiêu |
| Đề xuất và lý do | Cần làm gì |

Hai họ hook:

| Hook | Chạy khi | Dùng cho |
|---|---|---|
| Post tool use | Sau tool, trước khi model thấy | Chuẩn hóa, cắt bớt |
| Interception | Trước khi tool chạy | Chặn vi phạm |

### Ba kết cục phải khác nhau

Thành công, rỗng hợp lệ (nguồn chạy được, không có kết quả), và lỗi có cấu trúc phải khác nhau trong biểu diễn. Gộp ba thành một giá trị làm báo cáo nói "không phát hiện vấn đề" khi thực ra nguồn không truy cập được.

### Ví dụ

Ba tool trả ba định dạng thời gian: epoch, ISO, mã số 3.

| Tool trả | Hook đổi |
|---|---|
| `1755300000000` | ISO 8601 |
| ISO | giữ nguyên |
| `status: 3` | `refunded` |

Hoàn tiền trên 500: hook chặn và chỉ tool `escalate_to_human`. Chặn trơ làm agent tắc.

### Mã

```python
def post_tool_use(name, result):
    if name == "get_customer" and isinstance(result.get("created"), int):
        result["created"] = to_iso(result["created"])
    if name == "billing" and isinstance(result.get("status"), int):
        result["status"] = {3: "refunded"}.get(result["status"], "unknown")
    return result
```

### Thực hành

1. Viết gate cho một tool có hậu quả tiền.
2. Viết handoff 5 field cho một ca thật.
3. Viết hook chuẩn hóa một định dạng lạ.
4. Viết hook chặn có chuyển hướng.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết gate | 20 phút | Lỗi nêu tool cấp điều kiện |
| 2 | Viết handoff | 15 phút | Người đọc không cần transcript |
| 3 | Viết 2 hook | 25 phút | Một chuẩn hóa, một chặn |

### Bẫy

Tăng cường system prompt cho luật phải giữ 100%. Prompt là xác suất.

---

## 10 · Session, tool dựng sẵn, bộ nhớ cấu hình

**Mục tiêu**

- Chọn resume, fork hay phiên mới theo độ cũ.
- Chọn tool dựng sẵn đúng câu hỏi.
- Đặt rule đúng tầng và đúng scope.

### Lý thuyết

| Tình huống | Chọn |
|---|---|
| Context còn đúng | Resume |
| Vài file đã đổi, biết rõ | Resume kèm reanalysis có mục tiêu |
| Baseline đổi rộng | Phiên mới với summary |
| Cần nhiều nhánh | Fork |

| Câu hỏi | Tool |
|---|---|
| Chuỗi này ở đâu trong file | grep |
| File nào khớp mẫu | glob |
| File này chứa gì | read |
| Đổi đúng một chỗ | edit, neo duy nhất |

Edit không tìm được neo: mở rộng neo bằng ngữ cảnh. File nhỏ và đổi nhiều chỗ thì read rồi write.

| Quy tắc | Đặt ở |
|---|---|
| Cả team | Scope project, commit |
| Cá nhân | Scope user |
| Theo loại file | Rule có glob `paths` |
| Theo thư mục | `CLAUDE.md` tại thư mục đó |

### Ví dụ

Refactor qua đêm chuyển 40 file.

| Cách | Kết quả |
|---|---|
| Resume im lặng | Trả lời tự tin về đường dẫn không còn |
| Resume, nêu 3 file đổi | Đọc lại đúng 3 file |
| Phiên mới với summary | Giữ kết luận phần không đổi |

Bốn mươi thư mục, mỗi nơi một rule test là bốn mươi bản sẽ lệch. Một rule có glob `**/*.test.tsx` thay được cả bốn mươi.

### Mã

```yaml
---
paths: ["**/*.test.tsx"]
---
Mọi test dùng testing-library, không dùng enzyme.
```

```json
{
  "context": "fork",
  "allowed-tools": ["Read", "Grep"],
  "argument-hint": "<đường dẫn module>"
}
```

### Thực hành

1. Với ba tình huống, chọn resume, fork hay phiên mới.
2. Viết resume message nêu file đã đổi.
3. Viết một rule có `paths`, kiểm nó nạp đúng lúc.
4. Viết frontmatter cho skill output lớn.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Chọn session cho 3 ca | 10 phút | Dựa trên độ cũ |
| 2 | Viết rule có glob | 15 phút | Nạp đúng file, không nạp file khác |
| 3 | Viết frontmatter | 15 phút | Có giới hạn tool |

### Bẫy

Luôn resume vì rẻ hơn. Khi dữ liệu cũ, resume đắt hơn vì phải gỡ kết luận sai.

---

## 11 · Từ plan mode đến review nhiều lượt

**Mục tiêu**

- Chọn plan hay direct theo ba tín hiệu.
- Thay văn xuôi bằng ví dụ và test.
- Thiết kế CI output và review tăng dần.

### Lý thuyết

Plan mode khi: có nhiều cách làm đúng, có quyết định kiến trúc, blast radius lớn. Kích thước không phải tín hiệu.

| Tín hiệu | Chế độ |
|---|---|
| Nhiều cách, phạm vi rộng | Plan rồi execute |
| Cách rõ, một file | Direct |
| Chưa biết codebase | Plan cộng explore subagent |

| Vấn đề | Sửa |
|---|---|
| Ba lần ra ba kết quả | Thay văn xuôi bằng cặp input/output |
| Bug mô tả mơ hồ | Test case cụ thể |
| Yêu cầu thiếu ràng buộc | Phỏng vấn trước khi viết code |

CI:

| Thành phần | Giá trị |
|---|---|
| Chạy không tương tác | `-p` |
| Máy đọc | `--output-format json` |
| Hợp đồng | `path`, `line`, `severity`, `issue`, `fix` |

Review tăng dần: đưa output lần trước, chỉ báo delta. Review độc lập: phiên khác phiên viết code.

Batch: chỉ cho việc chịu được chờ tới 24 giờ. Kết quả về không theo thứ tự, ghép bằng `custom_id`.

Review nhiều file: chia lượt theo file cộng một lượt tích hợp. Vấn đề là pha loãng chú ý, không phải dung lượng.

### Ví dụ

PR 14 file review một lượt: file đầu kỹ, file cuối lướt, cùng mẫu code bị chê ở file 3 và duyệt ở file 11. Sửa bằng 14 lượt file cộng 1 lượt tích hợp.

### Mã

```bash
claude -p "Review staged diff, output JSON per schema" \
  --output-format json \
  --allowedTools "Read,Grep,Glob"
```

```python
requests = [{
  "custom_id": f"ticket-{i}",
  "params": {"model": "claude-opus-5-5", "max_tokens": 512,
             "messages": [{"role": "user", "content": t}]},
} for i, t in enumerate(tickets)]
job = client.beta.messages.batches.create(requests=requests)
```

### Thực hành

1. Chấm 3 task theo 3 tín hiệu plan.
2. Thay một instruction mơ hồ bằng 3 cặp input/output.
3. Viết lệnh CI có schema.
4. Chạy review hai lần, lần hai chỉ báo delta.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Chấm task theo tín hiệu | 10 phút | Mỗi task ra một chế độ |
| 2 | Viết 3 cặp mẫu | 15 phút | Hai người chấm cùng kết quả |
| 3 | Chạy review tăng dần | 20 phút | Lần hai không trùng |

### Bẫy

Bỏ qua bước tích hợp. Review không có lượt tổng hợp sẽ bỏ lỗi xuyên file.

---

## 12 · Escalation, lỗi đa agent, độ tin cậy

**Mục tiêu**

- Chuyển cấp đúng ba lý do.
- Truyền lỗi đủ để coordinator hành động.
- Chia độ chính xác theo đoạn, giữ provenance.

### Lý thuyết

Đúng ba lý do chuyển người: khách yêu cầu, policy trống hoặc cần ngoại lệ, không tiến triển sau khi điều tra.

| Không phải lý do | Vì sao |
|---|---|
| Ca phức tạp | Policy rõ thì xử được |
| Khách bực | Cảm xúc không đo thẩm quyền |
| Confidence thấp | Model tự tin sai ở ca khó |

Lỗi subagent phải trả: loại lỗi, query đã thử, kết quả một phần, cách thay thế. Kết quả rỗng không phải lỗi.

| Vấn đề | Sửa |
|---|---|
| Context degradation | Scratchpad, tóm tắt theo pha, manifest |
| Con số tổng che lỗi | Chia theo loại tài liệu và field |
| Confidence chưa hiệu chỉnh | So với tập nhãn |
| Nguồn xung đột | Trả cả hai kèm nguồn, không lấy trung bình |
| Mất nguồn khi tóm tắt | Claim, evidence, URL, date xuyên mọi bước |

### Ví dụ

| Tình huống | Kết luận |
|---|---|
| Đổi hàng hỏng có ảnh, policy rõ | Tự xử lý |
| Hoàn tiền sau 45 ngày, policy 30 ngày | Escalate |
| 90% hóa đơn chuẩn đạt 99%, 10% phụ lục đạt 79% | Giữ người ở phụ lục |
| Hai nguồn nói 4,2 và 7,1 tỷ | Trả cả hai kèm phương pháp và ngày |

### Mã

```python
return {
    "status": "error",
    "failure_type": "timeout",
    "query_attempted": q,
    "partial_results": found,
    "alternatives": ["rephrase_query", "different_engine"],
}
```

### Thực hành

1. Phân loại 6 ca theo ba lý do escalate.
2. Viết payload lỗi 4 field.
3. Chia một pipeline thành đoạn, mỗi đoạn một tỉ lệ.
4. Viết schema claim/evidence/URL/date.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Phân loại 6 ca escalate | 10 phút | Không ca nào vì cảm xúc |
| 2 | Viết payload lỗi | 15 phút | Đủ 4 field |
| 3 | Chia đoạn độ chính xác | 15 phút | Mỗi đoạn có tỉ lệ riêng |

### Bẫy

Lấy trung bình hai nguồn xung đột. Con số đó không nguồn nào nói, và mất luôn phát hiện rằng các nguồn không đồng ý.
