# 09 · Capstone: đưa một quy trình thật vào production

Cross-domain · Video 09 (5:13)

## Ý chính

Capstone có bốn bước, và bước 1 quyết định phần lớn kết quả.

| Bước | Việc làm | Deliverable |
|---|---|---|
| 1 | Scope | Bảng scope, tiêu chí thành công, kill criterion |
| 2 | Build | Project, instructions, bộ prompt, bộ input thử |
| 3 | Validate | Bằng chứng đo được, control document |
| 4 | Brief | Bản trình bày một trang cho stakeholder |

Chọn quy trình theo ba điều kiện:

| Điều kiện | Vì sao |
|---|---|
| Có input thật | Không có thì không test được |
| Lặp lại | Không lặp thì không có giá trị |
| Kiểm được output đúng sai | Không kiểm được thì không validate được |

Chọn quy trình nhàm chán. Quy trình thú vị thường có phán đoán tranh cãi, output không kiểm chứng được, và phức tạp, đúng ba thứ làm capstone thất bại.

Scope vào một bước, không phải cả quy trình. Viết rõ phần nằm ngoài scope, vì đó là chỗ tranh cãi sẽ xảy ra.

Bước 2 phải xây cho người khác chạy được, không phải cho bạn chạy được. Quy trình production thất bại ở input kỳ quặc mà không ai thiết kế cho, không phải ở happy path.

Bước 3: control không có trigger chỉ là hy vọng. Một control phải trả lời bốn câu: cái gì có thể sai, cái gì bắt được, ai sở hữu, khi nó kích hoạt thì làm gì.

Bước 4: gọi sản phẩm là validated with known risks, không phải finished.

## Ví dụ

Scope sheet hoàn chỉnh:

```
Quy trình: rà soát ngoại lệ trong đối soát thanh toán.
Bước trong scope: phân loại 120 ngoại lệ mỗi tuần thành 5 nhóm
và gắn mức ưu tiên.

Ngoài scope (ghi rõ, không làm):
- Không xử lý ngoại lệ.
- Không liên hệ khách hàng.
- Không sửa dữ liệu gốc.

Tiêu chí thành công:
- Phân loại đúng từ 90% trở lên trên 40 ngoại lệ gán nhãn tay.
- Không bỏ sót ngoại lệ nào ở nhóm ưu tiên cao.
- Người rà soát giảm thời gian từ 6 giờ xuống dưới 2 giờ mỗi tuần.

Điều không được tệ đi:
- Không được tăng số ngoại lệ bị bỏ sót so với hiện tại.

Kill criterion:
- Nếu độ chính xác dưới 75% sau 3 vòng sửa, dừng dự án.

Input thật: file xuất từ hệ thống đối soát, 4 tuần gần nhất.
```

Control document:

| Cái gì có thể sai | Cái gì bắt được | Ai sở hữu | Khi kích hoạt |
|---|---|---|---|
| Phân loại sai nhóm ưu tiên cao | Kiểm 100% nhóm ưu tiên cao bằng người | Trưởng nhóm đối soát | Sửa nhãn, ghi lại ca sai |
| Bỏ sót ngoại lệ khi đọc file | Đối chiếu số lượng dòng vào và ra | Người chạy quy trình | Chạy lại từ file gốc |
| Tài liệu phân loại lỗi thời | Instruction báo ngày tài liệu mới nhất | Chủ project | Cập nhật tài liệu, chạy lại tuần đó |
| Người dùng tin output quá mức | Kiểm ngẫu nhiên 10% mỗi tuần | Trưởng nhóm | Ghi nhận, điều chỉnh hướng dẫn |

Bản brief cuối:

```
Claim: phân loại tự động đạt 92% trên 40 ngoại lệ gán nhãn tay,
giảm thời gian rà soát từ 6 giờ xuống 1,8 giờ mỗi tuần.

Số chưa đẹp: 2 trong 40 ca bị xếp nhầm nhóm, cả hai đều ở nhóm
trung bình, không ảnh hưởng thứ tự ưu tiên.

Giới hạn:
- Không xử lý ngoại lệ bằng ngoại tệ.
- Không đáng tin khi file nguồn thiếu cột mã đơn.
- Không thay thế quyết định của người rà soát.

Failure mode và cách phát hiện:
- Phân loại sai: kiểm 100% nhóm ưu tiên cao, 10% các nhóm khác.
- Bỏ sót: đối chiếu số dòng.
- Lỗi thời: cảnh báo ngày tài liệu ngay trong output.

Rủi ro tôi thấy khó chịu nhất: người dùng có thể ngừng kiểm tay
nhóm ưu tiên cao sau vài tuần ổn.

Ask: duyệt chạy song song 4 tuần, sau đó quyết định bỏ bước phân loại tay.
```

## Bài tập

Đây là bài tập lớn, làm trong khoảng 2 giờ, chia 4 chặng.

| Chặng | Việc làm | Deliverable | Thời gian |
|---|---|---|---|
| 1 | Chọn 3 quy trình ứng viên, chấm theo 3 điều kiện, chọn 1 | Bảng so sánh, có lý do loại | 25 phút |
| 2 | Viết scope sheet đủ 6 mục | File scope | 25 phút |
| 3 | Xây project: instructions, knowledge, 5 input thử | Project chạy được | 40 phút |
| 4 | Validate và viết control document | Bảng bằng chứng, 4 control | 30 phút |

Tự chấm bằng bảng sau. Dưới 8 điểm thì chưa nên trình bày.

| Tiêu chí | Điểm | Cách kiểm |
|---|---|---|
| Scope chỉ một bước, có phần ngoài scope | 0-2 | Đọc lại, có dòng "ngoài scope" |
| Tiêu chí thành công đo được | 0-2 | Có số, có cách đo |
| Có kill criterion thật | 0-1 | Là ngưỡng, không phải lời hứa |
| Test bằng input kỳ quặc, ghi lại chỗ vỡ | 0-2 | Có ít nhất một ca vỡ và cách sửa |
| Mỗi control có trigger và người sở hữu | 0-2 | Không có control nào chỉ là "theo dõi" |
| Brief nêu số chưa đẹp và một rủi ro khó chịu | 0-1 | Đọc thấy cả hai |

Kinh nghiệm chung: chặng 4 là chặng làm người ta phải quay lại chặng 2. Một tiêu chí không đo được nghĩa là scope đã viết sai, và phát hiện điều đó lúc này là mục đích của capstone.

## Đọc thêm

| Nguồn | Dùng cho |
|---|---|
| [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | Chọn pattern khi quy trình có nhiều bước |
| [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) | Bộ input và rubric cho bước validate |
| [Choosing the right model](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model) | Chọn tier cho từng bước sau khi đã có số đo |
