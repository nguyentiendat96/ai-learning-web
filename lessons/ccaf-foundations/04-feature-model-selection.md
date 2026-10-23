# 04 · Chọn feature và chọn model

Domain D3 (12%) · Video 04 (4:17)

## Ý chính

Chi phí lớn nhất thường không phải token, mà là dựng lại context mỗi lần làm lại cùng một việc. Chọn feature bằng ba câu hỏi:

| Câu hỏi | Có | Không |
|---|---|---|
| Việc này có lặp lại | Project | Chat thường |
| Cần thông tin ngoài | Search, Research hoặc connector | Dùng kiến thức sẵn có |
| Output được giữ hoặc sửa | Artifact | Inline |

Project cho việc không lặp lại là overhead thuần. Đây là lỗi phổ biến ngay sau khi học về project.

Chọn model theo lượng phán đoán và giá của lỗi, không theo mức độ quan trọng của việc.

| Loại subtask | Tier phù hợp |
|---|---|
| Trích xuất, phân loại, định dạng | Tier rẻ, làm cẩn thận |
| Viết, tổng hợp có hướng dẫn rõ | Tier giữa |
| Lập luận nhiều bước, quyết định mơ hồ | Tier đắt |

Task quan trọng nhưng phán đoán thấp, ví dụ trích ngày từ hợp đồng, là task tier rẻ. Trả giá tier đắt không làm nó chính xác hơn, chỉ thêm chi phí.

Với task đơn bước, đặc tả rõ, ngắn, các tier thường cho output gần như giống nhau. Hãy kiểm bằng thực nghiệm trước khi trả giá cao.

Lineup hiện tại, kiểm tháng 10/2026:

| Model | Model ID | Giá vào / ra mỗi 1M token | Context | Dùng cho |
|---|---|---|---|---|
| Claude Fable 5.1 | `claude-fable-5-1` | 10 / 50 USD | 1M | Lập luận khó, agent chạy dài |
| Claude Opus 5.5 | `claude-opus-5-5` | 4 / 20 USD | 1M | Coding và knowledge work dài hơi, mặc định cho phần lớn việc |
| Claude Sonnet 5.5 | `claude-sonnet-5-5` | 2 / 10 USD | 1M | Việc hằng ngày cần nhanh và đủ tốt |
| Claude Haiku 5.5 | `claude-haiku-5-5` | từ 0,10 / 0,50 USD | 1M | Phân loại, trích xuất, khối lượng lớn |

Giá và tên model thay đổi. Kiểm lại ở [Models overview](https://platform.claude.com/docs/en/models/overview) trước khi dùng cho quyết định ngân sách.

Contamination: hội thoại dài hỏng theo hai đường.

| Đường | Biểu hiện | Cách xử lý |
|---|---|---|
| Volume | Chi tiết cũ biến mất khỏi câu trả lời | Tóm tắt, hoặc đưa tài liệu vào project |
| Contamination | Output quay lại hướng đã bị loại | Khởi động lại với handover |

Tóm tắt một hội thoại đã nhiễm thì bản tóm tắt cũng nhiễm. Cách đúng là restart với bản bàn giao ghi trạng thái, không ghi lịch sử.

## Ví dụ

Task: xử lý yêu cầu bồi thường bảo hiểm, 60 yêu cầu mỗi tuần.

Phân rã và chọn tier:

| Bước subtask | Phán đoán | Lỗi tốn gì | Tier | Feature |
|---|---|---|---|---|
| Trích ngày, số tiền, mã hợp đồng từ PDF | Thấp | Sửa được, phát hiện được | Haiku 5.5 | Chat hoặc tool |
| Phân loại loại tổn thất theo danh mục | Thấp, có danh mục đóng | Sửa được | Haiku 5.5 | Chat |
| Viết bản tóm tắt hồ sơ cho người xử lý | Trung bình | Người đọc vẫn kiểm | Sonnet 5.5 | Project |
| Đánh giá có dấu hiệu bất thường cần điều tra | Cao | Bỏ sót thì tốn kém, không đảo ngược | Opus 5.5 | Project, có checkpoint |

Kết luận thường gặp: dùng một model cho cả pipeline là sai cả hai chiều. Bước 1 và 2 dư thừa năng lực, bước 4 thiếu.

Ví dụ contamination:

```
Bạn: Tóm tắt hợp đồng theo hướng rủi ro pháp lý.
AI:   [bản phân tích]
Bạn: Không, tôi cần hướng vận hành, không phải pháp lý.
AI:   [bản mới, vẫn nghiêng pháp lý]
Bạn: Tóm tắt lại toàn bộ hội thoại rồi làm lại theo hướng vận hành.
AI:   [bản tóm tắt đã chứa khung pháp lý, bản mới vẫn lệch]
```

Bản bàn giao đúng:

```
Trạng thái:
- Hợp đồng số 4471, hiệu lực 2024-2026, giá trị 2,4 tỷ.
- Mục tiêu: bản tóm tắt cho đội vận hành, 1 trang, tập trung nghĩa vụ
  thực hiện hằng tháng.
- Đã loại: phân tích rủi ro pháp lý, tranh chấp, điều khoản phạt.
- Ràng buộc: mọi mục phải kèm số điều khoản.
```

Điểm cần thấy: bản bàn giao không kể lại chuyện gì đã xảy ra, chỉ nêu trạng thái và những gì đã bị loại.

## Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Phân rã một task thật thành 4-6 subtask, điền bảng phán đoán và giá lỗi | 20 phút | Có ít nhất hai subtask nằm ở hai tier khác nhau |
| 2 | Dự đoán tier cho từng subtask, rồi chạy phần phán đoán nặng trên hai model | 20 phút | Kết luận được tier nào thừa, tier nào thiếu, có ví dụ output |
| 3 | Chẩn đoán một hội thoại dài của bạn: volume hay contamination | 15 phút | Nêu được bằng chứng cụ thể trong transcript |
| 4 | Viết bản bàn giao cho hội thoại đó, khởi động lại | 15 phút | Bản mới không lặp lại hướng đã bị loại |

Bài 2 phải ghi dự đoán trước khi chạy. Không ghi thì không học được gì từ kết quả.

## Đọc thêm

| Nguồn | Dùng cho |
|---|---|
| [Models overview](https://platform.claude.com/docs/en/models/overview) | Bảng model, giá, context, ngày kiểm |
| [Choosing the right model](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model) | Hai cách chọn model ban đầu: efficiency-first và capability-first |
| [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) | Context rot, compaction, cách context đầy lên |
| [What are projects?](https://support.claude.com/en/articles/9517075-what-are-projects) | Project là gì, chứa gì |
