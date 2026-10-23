# 01 · Prompt Anatomy và Task Decomposition

Domain D1 (14%) · Video 01 (4:36)

## Ý chính

Prompt đáng tin có 5 khối. Thiếu khối nào thì sửa khối đó, không viết lại từ đầu.

| Khối | Trả lời | Dấu hiệu thiếu |
|---|---|---|
| Role | Áp chuẩn của ai | Output đúng nhưng sai chuẩn nghề |
| Context | Tình huống gì | Model tự đoán, bịa bối cảnh |
| Task | Động từ chính xác | Model chọn việc dễ nhất nghe giống yêu cầu |
| Constraint | Cấm gì | Output đúng nhưng không dùng được |
| Format | Đầu ra dùng ngay được chưa | Phải sửa tay trước khi dùng |

Thứ tự viết: Task, Context, Constraint, Format. Role để cuối vì ít khi tạo khác biệt.

| Chẩn đoán | Kết luận |
|---|---|
| Output đều đều, mục nào cũng một đoạn hợp lý | Yêu cầu quá lớn, cần decomposition |
| Output sai hướng ngay từ câu đầu | Task verb sai hoặc thiếu |
| Output đúng nhưng phải viết lại | Constraint hoặc Format thiếu |
| Output đúng chuẩn nhưng lệch ngữ cảnh | Context thiếu |

Task decomposition: cắt theo chỗ xuất hiện phán đoán, không cắt theo độ dài. Mỗi điểm phán đoán là một checkpoint.

## Ví dụ

Tình huống: bạn phải gửi báo cáo tuần về phản hồi khách hàng cho trưởng phòng.

Prompt hỏng:

```
Tóm tắt phản hồi khách hàng tuần này cho tôi.
```

Kết quả thường gặp: một đoạn văn đều đều, liệt kê chung chung, không có số, không phân loại, phải viết lại hoàn toàn.

Chẩn đoán theo bảng trên: thiếu Task verb (tóm tắt là động từ mở), thiếu Constraint (không nói được bịa), thiếu Format (không nói ai đọc, dùng làm gì).

Prompt sửa:

```
<context>
Dữ liệu: 148 phản hồi khách hàng tuần 12, xuất từ CRM, có các cột:
ngày, kênh, nội dung, điểm hài lòng 1-5, mã đơn hàng.
Người đọc: trưởng phòng vận hành, họp 15 phút sáng thứ hai.
</context>

<task>
Trích ra các vấn đề lặp lại, nhóm theo nguyên nhân gốc, và đếm số phản hồi mỗi nhóm.
</task>

<constraints>
- Chỉ dùng nội dung có trong dữ liệu, không suy đoán nguyên nhân ngoài dữ liệu.
- Nhóm nào dưới 3 phản hồi thì gộp vào "Khác".
- Không đề xuất giải pháp.
</constraints>

<format>
Bảng Markdown, cột: Nhóm vấn đề, Số phản hồi, Ví dụ đại diện (trích nguyên văn), Mức độ.
Tối đa 8 dòng. Dưới bảng: 3 dòng tóm tắt điều thay đổi so với tuần trước.
</format>
```

Khác biệt: Task có động từ cụ thể, Constraint chặn bịa và chặn lan sang phần đề xuất, Format nói rõ người đọc và kích thước.

Khi báo cáo vẫn chưa đạt, đổi một khối mỗi lần và nêu dự đoán trước khi chạy: "nếu thêm ràng buộc trích nguyên văn, bảng sẽ có bằng chứng kiểm được".

## Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Lấy một task thật đang làm. Viết đủ 5 khối, ghi rõ khối nào bạn thấy khó nhất và vì sao | 15 phút | Đọc lại, người khác làm theo được mà không hỏi |
| 2 | Chạy prompt chỉ có Task. Ghi lại output. Thêm lần lượt Context, Constraint, Format, mỗi lần một khối | 20 phút | Ghi được khối nào tạo khác biệt lớn nhất, kèm ví dụ trước và sau |
| 3 | Lấy một yêu cầu quá lớn. Chia thành chuỗi 3 bước, đặt checkpoint ở chỗ có phán đoán | 30 phút | So sánh được: chuỗi có checkpoint sửa ít hơn bao nhiêu lần |
| 4 | Chạy cùng một task với 3 cách mô tả Role khác nhau | 10 phút | Kết luận được Role có đổi output hay không, trong task của bạn |

Bài 3 là bài quan trọng nhất. Ghi lại số lần phải sửa tay ở mỗi cách, đó là thước đo thật.

## Đọc thêm

| Nguồn | Dùng cho |
|---|---|
| [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | Mục clarity, XML tags, role prompting |
| [Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) | Khi nào prompt engineering không phải câu trả lời |

Điểm khác biệt cần biết: tài liệu Anthropic khuyến nghị dùng XML tag để tách khối, đúng tinh thần 5 khối ở trên nhưng ở mức cú pháp.
