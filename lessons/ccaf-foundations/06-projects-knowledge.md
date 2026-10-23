# 06 · Projects, Instructions và Knowledge

Domain D5 (12%) · Video 06 (4:53)

## Ý chính

Project gồm hai loại nội dung, và lẫn chúng là lỗi cấu hình phổ biến nhất.

| | Trả lời | Nội dung |
|---|---|---|
| Instructions | Việc này làm thế nào | Luật đứng, tone, ràng buộc, hình dạng output, điều cấm |
| Knowledge | Việc này làm với cái gì | Tài liệu, dữ liệu, ví dụ, mẫu |

Phép thử: nếu sự thật nền thay đổi thì cái này có đổi không. Có thì là knowledge.

Instructions tốt phải nói ba thứ:

1. Điều không được làm.
2. Hình dạng output mặc định.
3. Làm gì khi thiếu thông tin.

Knowledge tốt phải current, authoritative, necessary, consistent. Nếu một tài liệu không cần cho task thì bỏ, vì nó vừa chiếm context vừa tạo nhiễu.

Phép thử đồng nghiệp: giao project cho người khác dùng thử. Chỗ nào họ hỏi lại chính là chỗ instruction còn thiếu.

Hai kiểu hỏng của knowledge:

| Kiểu | Chuyện gì xảy ra | Cách chặn |
|---|---|---|
| Upload lỗi thời | Tài liệu cũ vẫn nằm đó, không cảnh báo | Ghi ngày trong tiêu đề, thêm instruction đánh dấu nội dung cũ |
| Connector quá rộng | Với tới dữ liệu ngoài dự định | Hỏi ba câu phạm vi trước khi bật |

Ba câu hỏi phạm vi, hỏi trước khi bật connector:

1. Nó với tới được gì.
2. Dữ liệu trong phạm vi đó là của ai.
3. Còn ai khác dùng project này.

Bốn kiểu drift. Project không hỏng, nó trôi:

| Drift | Biểu hiện | Nguyên nhân |
|---|---|---|
| Knowledge | Trả lời tự tin nhưng lỗi thời | Tài liệu nguồn bị thay thế |
| Instruction | Output bị sửa tay nhiều | Luật đứng không còn đúng thực tế |
| Scope | Mỗi hội thoại phải sửa nhiều hơn | Task đổi, project không đổi |
| Ownership | Không ai giải thích được một luật | Người dựng project đã rời đi |

Ownership drift mở đường cho ba kiểu còn lại. Ba control:

| Control | Cách làm |
|---|---|
| Named owner | Ghi tên người chịu trách nhiệm trong instructions |
| Review cadence | Gắn với sự kiện thật, ví dụ kỳ chốt sổ, không phải nhắc lịch |
| Drift signal | Instruction buộc project báo cáo cấu hình mỗi lần dùng |

## Ví dụ

Project: hỗ trợ viết báo cáo bán hàng hằng tuần.

Instructions, bản tốt:

```
Bạn viết báo cáo bán hàng tuần cho trưởng phòng kinh doanh.

Cách làm:
- Luôn bắt đầu bằng ba con số: doanh thu, số đơn, giá trị đơn trung bình.
- So sánh với tuần trước và cùng kỳ năm trước.
- Nêu nguyên nhân chỉ khi có trong dữ liệu.

Không được làm:
- Không suy đoán nguyên nhân ngoài dữ liệu.
- Không đề xuất hành động.
- Không làm tròn số doanh thu.

Khi thiếu dữ liệu:
- Nêu rõ "thiếu" và tên chỉ số, không bỏ qua im lặng.

Hình dạng:
- Bảng 6 dòng, sau đó 3 dòng nhận định.
- Tiếng Việt, không dùng từ tiếng Anh khi có từ tương đương.

Chủ project: Nguyễn Văn A, nhóm Phân tích.
Rà soát: sau mỗi kỳ chốt sổ tháng.
```

Knowledge, bản tốt:

| Tài liệu | Ghi chú |
|---|---|
| `2026-09-danh-muc-san-pham.xlsx` | Có ngày trong tên |
| `2026-09-chinh-sach-gia.md` | Đang hiệu lực |
| `mau-bao-cao-3-thang-gan-nhat.md` | Ba mẫu tốt nhất, không phải toàn bộ lịch sử |
| `dinh-nghia-chi-so.md` | Định nghĩa từng chỉ số, tránh hiểu khác nhau |

Những gì không đưa vào: báo cáo cũ hơn 3 tháng, biên bản họp, tài liệu sản phẩm đã ngừng.

Drift signal, đặt trong instructions:

```
Mỗi lần trả lời, thêm một dòng cuối:
"Đang dùng: <số tài liệu knowledge> tài liệu, cập nhật mới nhất <ngày>."
Nếu tài liệu mới nhất cũ hơn 30 ngày, thêm cảnh báo.
```

Dòng này chạy miễn phí vì nó bám vào việc đang làm, và làm lỗi thời hiện ra ngay trong output.

## Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Liệt kê 10 nhu cầu của một project thật, phân loại instruction hay knowledge | 15 phút | Không mục nào lẫn hai loại |
| 2 | Viết instructions đủ 3 phần: cấm, hình dạng, thiếu dữ liệu | 20 phút | Người khác đọc xong làm được mà không hỏi |
| 3 | Giao project cho một đồng nghiệp, ghi lại mọi câu họ hỏi | 15 phút | Mỗi câu hỏi ánh xạ được thành một dòng instruction còn thiếu |
| 4 | Chạy rà soát 4 kiểu drift trên project của bạn | 20 phút | Mỗi kiểu có kết luận có hoặc không, kèm bằng chứng |

Bài 3 là bài duy nhất kiểm được instructions có thật sự đủ hay không.

## Đọc thêm

| Nguồn | Dùng cho |
|---|---|
| [What are projects?](https://support.claude.com/en/articles/9517075-what-are-projects) | Workspace, lịch sử chat, knowledge base |
| [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | Viết instruction rõ, dùng XML tag để tách phần |
