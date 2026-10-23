# Nguồn cộng đồng về bốn chứng chỉ Claude

Ghi chép vòng nghiên cứu ngày 24/10/2026. Mọi mục đều là nguồn không chính thức, đã kiểm tra tồn tại; chưa kiểm nội dung từng câu.

## Đã tìm thấy

| Nguồn | Có gì | Dùng được cho |
|---|---|---|
| [daronyondem/claude-architect-exam-guide](https://github.com/daronyondem/claude-architect-exam-guide) | Guide 11 nhóm kiến thức, mỗi nhóm có "What to Know" và "Common Pitfalls", kèm cheat sheet và reading list | CCA-F, cấu trúc lý thuyết |
| [hamzafarooq/claude-certified-architect](https://github.com/hamzafarooq/claude-certified-architect) | Practice exam 64 câu, 5 cheat sheet theo domain, phân tích câu mẫu chính thức | CCA-F, đề luyện và đối chiếu |
| [OlivierAlter/Claude-Certified-Architect-Foundations-Certification-Exam](https://github.com/OlivierAlter/Claude-Certified-Architect-Foundations-Certification-Exam) | 77 câu có giải thích, chia theo trọng số 19/13/14/14/11 | CCA-F, ngân hàng câu |
| [vinipx/cca-prep](https://github.com/vinipx/cca-prep) | 170 câu, mock exam 60 câu 120 phút, 46 flashcard, 18 anti-pattern | CCA-F, luyện sâu |
| [davidalex89/claude-cert-study-path](https://github.com/davidalex89/claude-cert-study-path) | Lộ trình cho cả bốn kỳ thi, có quiz, practice, flashcard | Cả bốn khóa |
| [WagnerCaetano/study-claude-certification](https://github.com/WagnerCaetano/study-claude-certification) | Study guide tổng hợp | Đối chiếu |
| [nirvijaya/northwind-mcp-labs](https://github.com/nirvijaya/northwind-mcp-labs) | Bài tập MCP có code | CCDV-F, bài thực hành |
| [aderegil/claude-certified-architect](https://github.com/aderegil/claude-certified-architect) | Lab 6 scenario, 5 domain, 30 task | CCA-F, thực hành |

## Điểm đáng chú ý

- Nhiều nguồn độc lập nói cùng một cấu trúc: 60 câu, 120 phút, 720 điểm, 5 domain 27/18/20/20/15. Khớp với tài liệu Google đã đọc.
- Một nguồn ghi 77 câu chia 19/13/14/14/11, tức bản mở rộng chứ không phải đề thật.
- Có nguồn ghi "official sample questions" nhưng không dẫn được nguồn gốc; cần kiểm trước khi trích.
- Chưa thấy nguồn cộng đồng nào cho CCAO-F và CCAR-P có chất lượng tương đương.

## Việc cần làm ở vòng sau

| Việc | Vì sao |
|---|---|
| Đọc 5 cheat sheet của hamzafarooq, đối chiếu với 35 module hiện có | Tìm mục còn thiếu |
| Kiểm 18 anti-pattern của vinipx | Bổ sung bảng bẫy |
| Xem practice exam của OlivierAlter có giải thích | Lấy dạng câu, không lấy nguyên văn |
| Tìm nguồn cho CCAO-F và CCAR-P | Hai khóa còn trống |
| Kiểm giấy phép từng repo trước khi trích | Tránh dùng nội dung không được phép |

## Vòng 2, 24/10/2026: nguồn cho CCAO-F và CCDV-F

| Nguồn | Có gì | Dùng cho |
|---|---|---|
| [Amey-Thakur/CLAUDE-CERTIFICATIONS](https://github.com/Amey-Thakur/CLAUDE-CERTIFICATIONS) | Cả bốn chứng chỉ, blueprints, 320 câu luyện, mock exam, 110 flashcard | Đối chiếu toàn bộ |
| [evggzzz/ccao-f-guide](https://github.com/evggzzz/ccao-f-guide) | CCAO-F, chỉ dùng nguồn Anthropic, 7 domain, CC BY 4.0 | Đối chiếu CCAO-F, giấy phép rõ |
| [raybeecham/claude-certified-associate-foundations](https://github.com/raybeecham/claude-certified-associate-foundations) | Study guide theo scenario, có lab | Bài tập CCAO-F |
| [vkorost/claude-certified-developer-guide](https://github.com/vkorost/claude-certified-developer-guide) | CCDV-F, 23 chương, tác giả ghi "tested against the live exam" | Đối chiếu CCDV-F |
| [mattvall1/claude_exams](https://github.com/mattvall1/claude_exams) | Đề luyện CCAO-F và CCA-F | Ngân hàng câu |

Lưu ý: mô tả "tested against the live exam" là lời tác giả, chưa kiểm chứng. Không dùng câu hỏi nguyên văn của bất kỳ nguồn nào.

## Vòng 3: đọc cheat sheet Domain 1 và bộ câu mẫu

Nguồn: `hamzafarooq/claude-certified-architect`, tệp `cheat-sheet/domain1.md` và `cheat-sheet/sample-questions.md`.

Xác nhận thêm ba luật toàn cục mà bộ CCA-F đã có: tất định thắng xác suất khi hậu quả thật; truy lỗi về nguồn; sửa vừa đủ.

Bổ sung đáng đưa vào giáo trình:

| Chủ đề | Chi tiết mới | Đưa vào |
|---|---|---|
| Chống mẫu nhiễu vòng lặp | Kiểm `content[0].type == "text"` cũng là phản mẫu, vì response `tool_use` có thể mở đầu bằng text | Bài 08 |
| Trách nhiệm coordinator | 7 việc: decompose, select, partition, pass context, aggregate, refine, route for observability | Bài 02 |
| Bảng truy lỗi | Thiếu chủ đề = decompose hẹp; trùng lặp = partition ẩu; nông đều = prompt/tool budget; mất nguồn = context passing làm rơi metadata | Bài 02 |
| Input tổng hợp quá dài | Khi 75K token, model bỏ giữa; cách sửa là tái cấu trúc đầu vào, không tăng cửa sổ | Bài 07 |
| Uỷ quyền kiểm chứng | Synthesis tự kiểm 85% ca đơn giản hay vẫn quay về coordinator: đánh đổi latency với kiểm soát | Bài 02 |
| Lỗi một phần | Ba kết cục: thành công, rỗng hợp lệ, lỗi có cấu trúc; phải khác nhau trong biểu diễn | Bài 09 |

## Nguyên tắc khi dùng

1. Không chép nguyên văn câu hỏi của người khác vào bộ của mình.
2. Mỗi mục lấy từ nguồn cộng đồng phải ghi nguồn ngay trong file.
3. Chỉ coi là đúng khi khớp tài liệu Anthropic hoặc khớp từ hai nguồn độc lập trở lên.
