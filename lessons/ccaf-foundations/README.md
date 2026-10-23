# CCAF Foundations: bộ tài liệu học

Bộ tài liệu dựng từ playlist YouTube "Claude Certified Associate - Foundations - Free Course" (10 video, kênh Skills Pragati), đọc tháng 10/2026, có bổ sung nguồn ngoài cho phần ví dụ và bài tập.

## Cấu trúc

| File | Nội dung | Domain |
|---|---|---|
| [ccaf-foundations.md](./ccaf-foundations.md) | Bản tóm tắt toàn khóa, đọc trước khi thi | all |
| [01-prompt-anatomy.md](./01-prompt-anatomy.md) | 5 khối prompt, task decomposition | D1 |
| [02-output-validation.md](./02-output-validation.md) | Kiểm chứng output, escalation | D2 |
| [03-audience-shaping.md](./03-audience-shaping.md) | Audience, tiêu chí, format | D2 |
| [04-feature-model-selection.md](./04-feature-model-selection.md) | Chọn feature, chọn model, contamination | D3 |
| [05-workflow-design.md](./05-workflow-design.md) | Fit assessment, augment/redesign | D4 |
| [06-projects-knowledge.md](./06-projects-knowledge.md) | Instructions vs knowledge, drift | D5 |
| [07-governance.md](./07-governance.md) | Phân loại dữ liệu, policy, đạo đức | D6 |
| [08-troubleshooting.md](./08-troubleshooting.md) | Root cause, feedback loop, tối ưu | D7 |
| [09-capstone.md](./09-capstone.md) | Scope, build, validate, trình bày | all |
| [transcripts/](./transcripts/) | Transcript gốc 10 video (JSON) | source |

## Cách học

1. Đọc `ccaf-foundations.md` một lượt để có bản đồ. Khoảng 30 phút.
2. Học từng module theo thứ tự 01 đến 09. Mỗi module: đọc ý chính, làm theo ví dụ, làm bài tập.
3. Ghi lại bài làm vào một thư mục riêng của bạn, không sửa file trong bộ này.
4. Trước khi thi: chỉ đọc lại bảng "Câu hỏi tự kiểm" ở cuối bản tóm tắt.

Mỗi module có cùng cấu trúc: Ý chính, Ví dụ, Bài tập, Đọc thêm. Bài tập ghi rõ thời gian và tiêu chí đạt, để tự chấm được mà không cần đáp án.

| Domain | Trọng số | Module | Thời gian học gợi ý |
|---|---|---|---|
| D1 Prompting & task execution | 14% | 01 | 1 giờ |
| D2 Output evaluation & validation | 21% | 02, 03 | 2 giờ |
| D3 Product & model selection | 12% | 04 | 1 giờ |
| D4 Workflow integration & solution design | 16% | 05 | 1,5 giờ |
| D5 Configuration & knowledge management | 12% | 06 | 1 giờ |
| D6 Governance, risk & responsible use | 15% | 07 | 1,5 giờ |
| D7 Troubleshooting & optimization | 10% | 08 | 1 giờ |
| Cross-domain | capstone | 09 | 2 giờ |

## Nguồn ngoài dùng trong bộ tài liệu

Chỉ những trang dưới đây được trích. Đã kiểm tra còn sống tháng 10/2026.

| Nguồn | URL | Dùng ở |
|---|---|---|
| Prompting best practices | [platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | 01, 02, 03 |
| Prompt engineering overview | [platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) | 01 |
| Models overview | [platform.claude.com/docs/en/models/overview](https://platform.claude.com/docs/en/models/overview) | 04 |
| Choosing the right model | [platform.claude.com/docs/en/about-claude/models/choosing-a-model](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model) | 04 |
| Context windows | [platform.claude.com/docs/en/build-with-claude/context-windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) | 04 |
| What are projects? | [support.claude.com/en/articles/9517075-what-are-projects](https://support.claude.com/en/articles/9517075-what-are-projects) | 06 |
| Building effective agents | [anthropic.com/engineering/building-effective-agents](https://www.anthropic.com/engineering/building-effective-agents) | 05 |
| Define success criteria and build evaluations | [platform.claude.com/docs/en/test-and-evaluate/develop-tests](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) | 02, 08, 09 |
| Usage Policy | [anthropic.com/legal/aup](https://www.anthropic.com/legal/aup) | 07 |

## Ghi chú về nguồn

| Vấn đề | Xử lý |
|---|---|
| Transcript do YouTube tự tạo, có lỗi nhận dạng | Đã sửa các lỗi rõ nghĩa khi viết lại; transcript thô giữ nguyên trong `transcripts/` |
| Video 00 chỉ là trailer | Không có module riêng |
| Số liệu model và giá thay đổi theo thời gian | Ghi ngày kiểm cạnh bảng, kiểm lại trước khi dùng cho quyết định thật |
| Khóa học không nêu tên model cụ thể | Phần ví dụ dùng lineup hiện tại, đối chiếu Models overview |
