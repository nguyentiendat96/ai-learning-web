# 05 · Thiết kế workflow quanh Claude

Domain D4 (16%) · Video 05 (5:20)

## Ý chính

Câu trả lời có giá trị nhất của một buổi đánh giá fit thường là "chưa nên". Quy trình bị tự động hóa vì có người hào hứng, không vì nó phù hợp. Thất bại hiện ra vài tháng sau: một workflow không ai dùng nhưng không ai nói ra.

Năm tiêu chí, chấm từng bước của quy trình thật:

| Tiêu chí | Câu hỏi | Mức nguy hiểm khi fail |
|---|---|---|
| Input availability | Đầu vào có sẵn, đúng định dạng | Trung bình, sửa được |
| Output verifiability | Có cách biết output đúng hay sai | Cao |
| Judgment locus | Phán đoán chỉ định được hay là chính công việc | Cao |
| Error tolerance | Sai thì chịu được không | Phụ thuộc ngành |
| Volume | Tần suất nhân thời gian | Thấp, chỉ ảnh hưởng ROI |

Hai tiêu chí giữa gánh phần lớn trọng lượng. Không ai kiểm được output thì hệ thống đang sản xuất tài liệu không kiểm chứng được. Phán đoán không chỉ định được thì không nên giao cho model.

Hầu hết quy trình thật là partial fit. Câu trả lời đúng thường là tự động hóa phần này thôi.

Augment hay redesign:

| Lựa chọn | Làm gì | Đổi gì | Giá |
|---|---|---|---|
| Augment | Giữ hình dạng, tăng tốc một bước | Ít | Thấp, dễ áp dụng |
| Redesign | Đổi quy trình vì ràng buộc cũ đã nới | Nhiều | Cao, cần change management |

Phép thử: binding constraint có thực sự dịch chuyển. Nếu ràng buộc cũ vẫn còn thì redesign chỉ tạo hỗn loạn.

Đường an toàn: augment trước, chạy shadow mode, rồi redesign bằng số liệu từ shadow mode.

Cảnh báo quan trọng nhất của module: redesign có thể làm dịch chuyển ngầm một control. Nếu trách nhiệm với lỗi chuyển từ người này sang người khác hoặc sang model, phải nêu tên và được duyệt. Không được gộp vào mục tiêu hiệu suất.

Bốn động tác để dùng Claude nghĩ cùng, không phải viết hộ:

| Động tác | Prompt | Dấu hiệu thất bại |
|---|---|---|
| Premortem | Giả định kế hoạch đã thất bại, viết 5 lý do | Chỉ nêu lý do ai cũng biết |
| Stakeholder mapping | Liệt kê bên bị ảnh hưởng, điều họ mất | Bỏ sót bên có quyền phủ quyết |
| Assumption surfacing | Liệt kê giả định, xếp theo mức dễ vỡ | Trả về điều hiển nhiên |
| Adversarial review | Tấn công kế hoạch như người phản đối | Khen rồi góp ý nhẹ |

## Ví dụ

Quy trình: xử lý hóa đơn nhà cung cấp, 400 hóa đơn mỗi tháng, 3 người làm.

| Bước | Input availability | Verifiability | Judgment | Error tolerance | Kết luận |
|---|---|---|---|---|---|
| Nhận và phân loại hóa đơn | Cao | Cao, sai thì thấy ngay | Thấp | Cao | Tự động được |
| Nhập dữ liệu vào hệ thống | Cao | Cao, đối chiếu được | Thấp | Trung bình | Tự động, có kiểm ngẫu nhiên |
| Đối chiếu với đơn đặt hàng | Trung bình | Trung bình | Trung bình | Thấp | Chỉ hỗ trợ, người quyết |
| Xử lý ngoại lệ và tranh chấp | Thấp | Thấp | Cao | Thấp | Giữ nguyên |

Kết luận: automate hai bước đầu, giữ hai bước sau. Đây là augment, không phải redesign. Binding constraint của quy trình là xử lý ngoại lệ, và ràng buộc đó không dịch chuyển.

Nếu ai đó đề xuất bỏ bước đối chiếu vì model làm tốt, đó là control bị dịch chuyển ngầm: trách nhiệm phát hiện sai chuyển từ người sang model, và không ai còn chịu trách nhiệm khi model bỏ sót.

Brief gửi stakeholder, mẫu:

```
Claim: tự động hai bước đầu giảm 40% thời gian xử lý.
Bằng chứng: 60 hóa đơn chạy shadow mode, 58 khớp sau kiểm.

Giới hạn:
- Không xử lý hóa đơn ngoại tệ.
- Không xử lý hóa đơn thiếu mã đơn hàng, chiếm 12% tháng trước.

Failure mode và cách phát hiện:
- Phân loại sai: kiểm ngẫu nhiên 10% hằng tuần.
- Bỏ sót hóa đơn: đối chiếu số lượng với sổ nhận hằng ngày.

Ask: duyệt chạy song song 2 tháng trước khi tắt quy trình cũ.
```

Mọi giới hạn đều kiểm được. "Nó không hoàn hảo" thì không kiểm được, nên không phải giới hạn.

## Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Chấm 5 tiêu chí cho từng bước của một quy trình thật | 25 phút | Có bước kết luận "không nên", kèm lý do |
| 2 | Viết kế hoạch shadow mode: chạy bao lâu, đo gì, so với gì | 20 phút | Biết trước khi nào thì dừng, không phải sau khi thấy kết quả |
| 3 | Chạy 4 động tác trên một kế hoạch của bạn | 25 phút | Ít nhất một động tác nêu ra điều bạn chưa nghĩ tới |
| 4 | Viết brief 4 phần cho kế hoạch đó | 20 phút | Mỗi giới hạn đều kiểm được bởi người đọc |

Bài 3: nếu cả 4 động tác đều chỉ trả về điều bạn đã biết, ghi lại và prompt mạnh hơn. Kết quả đó cũng là một phát hiện.

## Đọc thêm

| Nguồn | Dùng cho |
|---|---|
| [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | Năm pattern workflow: chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer |
| [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) | Đo shadow mode bằng tiêu chí, không bằng cảm nhận |
