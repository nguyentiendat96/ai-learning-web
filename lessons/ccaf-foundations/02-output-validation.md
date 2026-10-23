# 02 · Đánh giá output trông đúng

Domain D2 (21%) · Video 02 (5:10)

## Ý chính

Fluency không phải accuracy. Câu trả lời càng trôi chảy, càng dễ bỏ qua lỗi. Bịa đặt tập trung ở chỗ có độ chính xác cao: trích dẫn, số liệu, tên riêng. Lập luận chung quanh đó thường vẫn đúng, và chính kiểu đúng một phần này làm người đọc mất cảnh giác.

Ba lượt kiểm, luôn theo thứ tự:

| Lượt | Việc làm | Sai thường gặp |
|---|---|---|
| 1 | Đánh dấu mọi claim kiểm chứng được, chưa phán xét | Vừa thấy claim đã kiểm ngay, bỏ sót claim khác |
| 2 | Sắp theo hậu quả | Kiểm theo thứ tự xuất hiện trong bài |
| 3 | Kiểm tại nguồn | Hỏi lại chính AI "có chắc không" |

Hai kiểu hỏng:

| Kiểu | Nghĩa | Cách bắt |
|---|---|---|
| Inaccuracy | Có chi tiết sai | Kiểm từng claim |
| Incompleteness | Đúng hết, thiếu thứ làm đổi kết luận | So với reference viết trước |

Incompleteness khó thấy vì mọi câu đều đúng. Phải có reference bên ngoài, và phải viết trước khi đọc output. Viết sau thì checklist đã bị nhiễm.

Quy trình 5 bước, khoảng 10 phút:

1. Phân loại output theo kiểu: phân tích, tóm tắt, khuyến nghị.
2. Trích claim quan trọng.
3. Làm lộ giả định ẩn.
4. Xếp hạng theo hậu quả.
5. Kiểm phần trên đường ranh giới, ghi lại phần đã chọn không kiểm.

Bước 5 là bước hay bị bỏ. Nó biến rủi ro vô hình thành câu nói được với người nhận.

Escalation: niềm tin vào output không phải căn cứ để gửi. Năm yếu tố, chấm nhanh:

| Yếu tố | Câu hỏi | Nếu xấu |
|---|---|---|
| Reversibility | Gửi sai có rút lại được không | Không rút được thì nâng mức |
| Blast radius | Sai thì lan tới đâu | Lan rộng thì nâng mức |
| Authority | Mình có quyền quyết không | Không có quyền thì chuyển |
| Verifiability | Mình kiểm được không, người khác kiểm được không | Mình không kiểm được nhưng người khác được thì chuyển |
| Regulatory exposure | Có ràng buộc pháp lý không | Có thì chuyển |

Verifiability là yếu tố tinh tế nhất, vì nó không hiện ra như một rủi ro. Câu hỏi đúng: "cái này có phải của mình để gửi không", không phải "cái này có đúng không".

## Ví dụ

Output mẫu:

```
Theo báo cáo của Gartner năm 2024, 78% doanh nghiệp châu Âu đã dùng
trợ lý AI trong vận hành, tăng từ 41% năm 2023. Ba rào cản chính là
chi phí, thiếu kỹ năng, và lo ngại tuân thủ. Xu hướng này dự kiến
đạt 90% vào 2026.
```

Lượt 1, đánh dấu claim kiểm chứng được:

| Claim | Kiểm chứng được | Hậu quả nếu sai |
|---|---|---|
| Gartner 2024 | Có | Cao, dùng để trích dẫn trong tài liệu nội bộ |
| 78% doanh nghiệp châu Âu | Có | Cao |
| Tăng từ 41% năm 2023 | Có | Trung bình |
| Ba rào cản là chi phí, kỹ năng, tuân thủ | Có, nhưng phụ thuộc nguồn | Trung bình |
| Dự kiến 90% vào 2026 | Có | Thấp, nếu đã ghi là dự kiến |

Lượt 2, sắp theo hậu quả: kiểm hai số liệu trước, phần còn lại sau.

Lượt 3, kiểm tại nguồn: tra báo cáo gốc. Trường hợp thường gặp là báo cáo không tồn tại, hoặc tồn tại nhưng số khác, hoặc số đúng nhưng phạm vi khác (doanh nghiệp lớn thay vì toàn bộ).

Phần incompleteness: nếu câu hỏi ban đầu là "có nên đầu tư trợ lý AI không", output trên thiếu hoàn toàn chiều ngược lại, gồm chi phí triển khai và các case thất bại. Mọi câu trong output đều đúng, nhưng kết luận mà người đọc rút ra thì sai. Chỉ reference viết trước mới bắt được.

Ghi chú cuối cho người nhận, mẫu:

```
Đã kiểm tại nguồn: hai số liệu Gartner (không khớp, xem ghi chú).
Chưa kiểm: danh sách ba rào cản, và dự báo 2026.
Không dùng hai ý này cho quyết định ngân sách.
```

## Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết reference list 10 mục cho một output bạn sắp nhận, trước khi đọc output | 10 phút | List có mục mà output không nhắc tới |
| 2 | Chấm output theo accuracy và completeness, mỗi thứ 1-5, ghi lý do bằng trích dẫn | 15 phút | Hai điểm khác nhau, và giải thích được vì sao |
| 3 | Chạy quy trình 5 bước trên một output thật, viết note gửi kèm | 20 phút | Note nêu rõ phần không kiểm, không chỉ phần đã kiểm |
| 4 | Chấm 4 output của bạn theo 5 yếu tố escalation | 15 phút | Có ít nhất một case kết luận "chuyển", kèm lý do |

Bài 4 hay bị làm sai theo hướng "output đúng nên tự gửi". Ghi riêng cột Verifiability, đừng gộp vào cột "độ tin cậy".

## Đọc thêm

| Nguồn | Dùng cho |
|---|---|
| [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) | Cách viết tiêu chí đo được thay vì cảm nhận |
| [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | Mục giảm bịa đặt, yêu cầu trích dẫn nguồn |
