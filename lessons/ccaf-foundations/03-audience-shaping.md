# 03 · Uốn output cho đúng người đọc

Domain D2 (21%) · Video 03 (2:36)

## Ý chính

Output chính xác mà người đọc không hành động được thì vẫn là output hỏng. Audience adaptation không phải chỉnh tone, mà là điền bốn chiều trước khi viết:

| Chiều | Câu hỏi | Ảnh hưởng |
|---|---|---|
| Prior knowledge | Họ đã biết gì | Quyết định phần nào giải thích, phần nào bỏ |
| Decision | Họ sẽ làm gì khác sau khi đọc | Quyết định nội dung nào đứng đầu |
| Attention | Họ đọc bao lâu, ở đâu | Quyết định độ dài và format |
| Register | Giọng phù hợp | Quyết định từ ngữ, không quyết định nội dung |

Hai chiều đầu gánh phần lớn. Nếu câu trả lời cho Decision là "hiểu rõ hơn" thì chưa có decision, và output sẽ không dẫn tới hành động nào.

Xử lý khi hai audience khác nhau:

| Khác nhau ở | Cách làm |
|---|---|
| Decision | Regenerate từ nguồn, không sửa bản cũ |
| Prior knowledge hoặc attention | Adapt bản cũ |
| Register | Adapt bản cũ |

Viết lại từ nguồn khi decision đổi, vì bản cũ đã cấu trúc theo một quyết định khác.

Tiêu chí chấm phải viết trước khi đọc candidate. Tiêu chí tốt:

| Thuộc tính | Nghĩa | Phép thử |
|---|---|---|
| Observable | Hai người chấm ra cùng kết quả | Đọc lên, người khác chấm được ngay |
| Discriminating | Phân biệt được bản tốt và bản kém | Có ít nhất một bản fail |
| Weighted | Có trọng số | Biết tiêu chí nào nặng hơn |
| Must-have | Fail là loại | Không cộng bù bằng điểm chỗ khác |

Format chọn theo việc output sẽ đi đâu, không theo cái nào trông đẹp:

| Output sẽ | Format |
|---|---|
| Đọc một lần rồi bỏ | Inline trong chat |
| Được lưu, sửa, chia sẻ | Artifact hoặc tài liệu riêng |
| Đưa vào tool khác | Bảng, CSV, JSON |
| Là quy trình cho người làm | Các bước đánh số |

Artifact bị dùng quá mức vì nghe chuyên nghiệp. Phép thử: cái này có được giữ lại và sửa không. Nếu không, để inline.

## Ví dụ

Cùng một phát hiện: "Tỉ lệ lỗi nhập liệu tăng từ 2,1% lên 4,8% trong quý, tập trung ở chi nhánh mở sau tháng 6."

Bản cho trưởng phòng vận hành:

```
Quý này tỉ lệ lỗi nhập liệu tăng gấp đôi, từ 2,1% lên 4,8%.
Toàn bộ mức tăng nằm ở bốn chi nhánh mở sau tháng 6.
Hai chi nhánh còn lại đi ngang.

Việc cần quyết: có dừng mở chi nhánh mới trong quý 4 để
ổn định quy trình nhập liệu không.
```

Bản cho nhóm kỹ thuật:

```
Lỗi nhập liệu: 2,1% lên 4,8% trong quý.
Phân rã theo nguồn: 4 chi nhánh mới đóng góp 100% mức tăng.
Chi nhánh cũ không đổi.

Giả thuyết: form nhập liệu phiên bản mới được phát hành cùng
lúc với đợt mở chi nhánh, tháng 7.
Cần kiểm: đối chiếu log lỗi với ngày phát hành form, tách hiệu ứng
chi nhánh mới khỏi hiệu ứng form mới.
```

Hai bản khác nhau ở Decision, nên phải viết lại từ dữ liệu gốc, không phải rút gọn bản này thành bản kia. Bản đầu dẫn tới quyết định mở chi nhánh, bản sau dẫn tới một phép kiểm kỹ thuật.

Bảng tiêu chí viết trước, ví dụ cho bản dành cho trưởng phòng:

| Tiêu chí | Loại | Cách chấm |
|---|---|---|
| Nêu được một quyết định cụ thể | Must-have | Đọc xong trả lời được "cần quyết gì" |
| Mọi số có nguồn trong dữ liệu gốc | Must-have | Đối chiếu từng số |
| Không quá 6 dòng | Nice-to-have | Đếm dòng |
| Không dùng thuật ngữ kỹ thuật | Nice-to-have | Liệt kê từ chuyên môn |

## Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Lấy một output đã viết. Điền bảng 4 chiều cho hai người đọc khác nhau | 15 phút | Hai dòng Decision khác nhau, không phải cùng một câu diễn đạt lại |
| 2 | Viết 3 tiêu chí must-have trước khi đọc hai bản nháp có sẵn | 15 phút | Một bản fail rõ ràng, và bạn thấy được điều đó trước khi đọc |
| 3 | Cùng một nội dung, tạo 3 phiên bản: inline, bảng, tài liệu giữ lại | 20 phút | Giải thích được phiên bản nào dùng cho việc gì |
| 4 | Chấm lại một output cũ của bạn bằng tiêu chí vừa viết | 10 phút | Có ít nhất một phát hiện bạn chưa từng thấy |

Bài 2 phải làm đúng thứ tự: viết tiêu chí trước, mở bản nháp sau. Nếu đã đọc rồi thì làm lại với bộ nháp khác.

## Đọc thêm

| Nguồn | Dùng cho |
|---|---|
| [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | Mục định dạng output, độ dài, XML tags |
| [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) | Chuyển tiêu chí thành bộ chấm đo được |
