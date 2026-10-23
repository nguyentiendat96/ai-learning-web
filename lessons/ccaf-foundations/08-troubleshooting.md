# 08 · Troubleshooting output kém

Domain D7 (10%) · Video 08 (3:57)

## Ý chính

Khi quy trình bắt đầu kém, phản xạ là viết lại prompt. Prompt hiếm khi là nguyên nhân thật.

Quy trình chẩn đoán:

| Bước | Việc làm | Bằng chứng cần có |
|---|---|---|
| 1 | Lấy một output fail cụ thể, kèm input của nó | Trích nguyên văn, không mô tả |
| 2 | Lấy một output từng tốt để chứng minh là regression | Cùng loại input, khác thời điểm |
| 3 | Diff mọi điều kiện: input, người dùng, cấu hình, phiên bản | Bảng so sánh |
| 4 | Tách prompt khỏi input bằng test bốn ô | Kết quả từng ô |
| 5 | Hỏi chuẩn "tốt" có thay đổi không | Người dùng xác nhận |

Test bốn ô:

| Ô | Prompt | Input | Kết quả nói lên điều gì |
|---|---|---|---|
| 1 | Cũ | Cũ | Mốc so sánh |
| 2 | Mới | Cũ | Prompt có phải nguyên nhân |
| 3 | Cũ | Mới | Input có phải nguyên nhân |
| 4 | Mới | Mới | Lỗi chỉ xuất hiện khi cả hai đổi |

Nếu ô 1 cũng hỏng thì vấn đề không nằm ở prompt lẫn input. Đó là lúc kiểm ô thứ năm: chuẩn của người dùng đã cao lên, không có gì hỏng cả.

Vòng lặp thật cần baseline:

| Bước | Việc làm | Thiếu thì sao |
|---|---|---|
| Baseline | Đo output hiện tại trước khi đổi | Mọi tuyên bố sau đó không phản chứng được |
| Bộ input cố định | 5 input đại diện, giữ nguyên | Kết quả không so sánh được giữa các lần |
| Rubric | 3 mức, tiêu chí rõ | Chấm theo cảm nhận |
| Một thay đổi | Chỉ đổi một biến | Không biết thay đổi nào tạo kết quả |
| Đo lại | Chấm cả tiêu chí cũ | Không thấy chỗ bị hỏng kèm theo |
| Chấm blind | Không nhìn lúc tạo output | Bị neo theo thứ vừa xem |

Tối ưu hiệu suất, bốn đòn, theo thứ tự:

| Đòn | Việc làm |
|---|---|
| Configuration | Đưa context lặp lại vào instructions hoặc project |
| Source | Sửa nguồn bị lệch format thay vì thêm bước làm sạch |
| Tier | Khớp tier với subtask, không dùng một tier cho cả pipeline |
| Steps | Bỏ bước không còn tạo ra giá trị |

Thời gian thật thường không nằm ở generation mà ở correction và reformatting. Đo trước khi tối ưu.

Không cắt verification hay điểm quyết định của con người. Nếu một bước tồn tại vì rủi ro, tối ưu cách làm cho nó rẻ hơn, không bỏ nó.

## Ví dụ

Tình huống: báo cáo tuần tự nhiên kém từ tháng trước. Ba người dùng, cùng một prompt.

Bước 1, output fail:

```
Tuần này doanh thu tăng tốt. Các nhóm đều đóng góp tích cực.
Nhìn chung bức tranh khả quan.
```

Không có số, không có so sánh, câu nào cũng đúng và vô dụng.

Bước 2, output từng tốt, cùng loại input:

```
Doanh thu 2,41 tỷ, tăng 6,2% so với tuần trước, tăng 3,1% so cùng kỳ.
Nhóm A đóng góp 1,8 tỷ, nhóm B 0,4 tỷ, nhóm C 0,2 tỷ.
```

Bước 3, diff điều kiện:

| Điều kiện | Trước | Sau |
|---|---|---|
| Prompt | Không đổi | Không đổi |
| Nguồn dữ liệu | Bảng tính tháng 8 | Bảng tính tháng 9, thêm 4 cột trống |
| Người dùng | Một người | Ba người |
| Cấu hình | Không có project | Có project, knowledge thêm 12 tài liệu |

Bước 4, test bốn ô:

| Ô | Prompt | Input | Kết quả |
|---|---|---|---|
| 1 | Cũ | Cũ | Tốt |
| 2 | Mới | Cũ | Tốt |
| 3 | Cũ | Mới | Kém |
| 4 | Mới | Mới | Kém |

Kết luận: prompt không phải nguyên nhân, input mới là. Cột trống trong bảng tính tháng 9 làm bước tính toán trả về rỗng, và model bù bằng câu chung chung. Đây là ví dụ của việc model che lỗi dữ liệu, không phải lỗi model.

Sửa: chuẩn hóa nguồn dữ liệu, thêm instruction "nếu một chỉ số không tính được thì báo thiếu, không viết nhận định chung".

Vòng lặp sau khi sửa:

| Tiêu chí | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|
| Có đủ 3 chỉ số bắt buộc | Không có | Có 1-2 | Đủ 3 |
| Số khớp nguồn | Sai | Đúng một phần | Khớp hoàn toàn |
| Không có câu nhận định vô nghĩa | Có | Ít | Không |

Baseline trước khi sửa: 5 input, cả 5 ở mức 1. Sau khi sửa: 4 mức 3, 1 mức 2.

## Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết baseline cho một quy trình: 5 input, rubric 3 mức | 20 phút | Chấm lại lần hai ra cùng kết quả |
| 2 | Chạy test bốn ô cho một lỗi có thật | 20 phút | Kết luận được nguyên nhân nằm ở prompt, input hay chuẩn |
| 3 | Đo thời gian thực tế theo 4 nhóm: generation, correction, reformatting, chờ | 20 phút | Biết nhóm nào lớn nhất, bằng số |
| 4 | Chọn một đòn tối ưu và đo lại sau khi áp dụng | 15 phút | Có số trước và sau, và không tiêu chí nào bị giảm |

Bài 3 hay cho kết quả bất ngờ: phần lớn thời gian không nằm ở model.

## Đọc thêm

| Nguồn | Dùng cho |
|---|---|
| [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) | Thiết kế bộ input, rubric, eval |
| [Choosing the right model](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model) | Đổi model so với đổi prompt: khi nào cái nào đúng |
| [Models overview](https://platform.claude.com/docs/en/models/overview) | Effort và tier, hai đòn tối ưu khác nhau |
