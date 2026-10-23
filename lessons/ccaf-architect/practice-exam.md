# Đề luyện: Claude Certified Architect, Foundations

20 câu theo dạng scenario, dựng từ nội dung 37 module của khóa. Đây là **đề tự soạn để luyện**, không phải đề thi chính thức.

Cách làm: 40 phút, không mở tài liệu. Ghi đáp án ra giấy, rồi chấm ở phần [Đáp án](#đáp-án) cuối file.

| Phần | Câu | Chủ đề |
|---|---|---|
| A | 1-5 | Customer support agent dưới ràng buộc |
| B | 6-10 | Hệ nghiên cứu nhiều agent |
| C | 11-14 | Pipeline review code |
| D | 15-17 | Batch và SLA |
| E | 18-19 | Cấu hình và phạm vi |
| F | 20 | Vòng lặp agent |

---

## Phần A: Customer support agent

**Câu 1.** Agent support có tool tra khách, tra đơn, hoàn tiền, escalate. Yêu cầu: đạt 80% xử lý ngay lần đầu. Cách nào đúng nhất?

A. Cho agent tự xử lý mọi ca, escalate chỉ khi gặp lỗi hệ thống.
B. Escalate mọi ca có điểm tự tin dưới 0,7.
C. Tự xử lý ca policy rõ, escalate khi policy trống hoặc khách yêu cầu gặp người.
D. Thêm một classifier định tuyến trước agent để chia ca dễ và khó.

**Câu 2.** Khách hoàn tiền một đơn mua 45 ngày trước, policy chỉ cho 30 ngày. Agent nên làm gì?

A. Tự quyết hoàn tiền vì số tiền nhỏ.
B. Escalate vì policy không phủ trường hợp này.
C. Hỏi lại khách xem có muốn gặp người không.
D. Từ chối và kết thúc hội thoại.

**Câu 3.** Khách đang rất bực nhưng vấn đề là đổi hàng hỏng có ảnh, policy rõ ràng. Agent nên làm gì?

A. Escalate vì cảm xúc tiêu cực.
B. Tự xử lý theo policy.
C. Escalate vì ca phức tạp.
D. Chuyển cho người vì điểm tự tin thấp.

**Câu 4.** Agent hoàn tiền cho tài khoản không khớp tên vì chọn kết quả gần giống nhất. Sửa gốc là gì?

A. Thêm câu vào system prompt "hãy chắc chắn về danh tính".
B. Khi thiếu thông tin định danh, hỏi thêm thay vì đoán.
C. Thêm bước xác nhận của con người cho mọi khoản hoàn tiền.
D. Giảm số tool agent được dùng.

**Câu 5.** Người phản biện hỏi vì sao không dùng confidence threshold để quyết định escalate. Lý lẽ đúng nhất?

A. Confidence chưa hiệu chỉnh, và model tự tin sai đúng ở các ca khó.
B. Confidence luôn thấp với ca phức tạp.
C. Confidence chỉ dùng được cho phân loại văn bản.
D. Confidence tốn thêm token mỗi lượt.

---

## Phần B: Hệ nghiên cứu nhiều agent

**Câu 6.** Bốn agent: searcher, analyst, synthesizer, reporter. Câu hỏi đơn giản "thủ đô của Pháp". Coordinator nên chạy gì?

A. Cả bốn, để đảm bảo chất lượng.
B. Searcher và reporter.
C. Analyst và synthesizer.
D. Chỉ reporter, dùng kiến thức sẵn có.

**Câu 7.** Báo cáo cuối có trích dẫn nhưng ba trích dẫn không tồn tại. Nguyên nhân gốc?

A. Model yếu.
B. Searcher trả kết quả bằng văn xuôi, mất URL trước khi tới synthesizer.
C. Prompt của reporter thiếu yêu cầu trích dẫn.
D. Nhiệt độ sinh quá cao.

**Câu 8.** Cả bốn agent đều báo thành công, nhưng báo cáo chỉ phủ một phần ba chủ đề. Lỗi ở đâu?

A. Các agent con yếu.
B. Synthesizer viết quá ngắn.
C. Coordinator chia phạm vi sai và không kiểm độ phủ.
D. Model cần context window lớn hơn.

**Câu 9.** Hai nguồn nói quy mô thị trường là 4,2 tỷ và 7,1 tỷ. Xử lý đúng?

A. Lấy trung bình 5,65 tỷ cho gọn.
B. Chọn con số mới hơn.
C. Trả cả hai kèm nguồn, phương pháp và ngày.
D. Bỏ cả hai vì không đáng tin.

**Câu 10.** Agent search timeout giữa chủ đề, đã retry ba lần. Nó nên trả gì cho coordinator?

A. `"search unavailable"`.
B. Kết quả rỗng, đánh dấu thành công.
C. Loại lỗi, query đã thử, kết quả một phần, cách thay thế.
D. Raise exception để dừng toàn bộ workflow.

---

## Phần C: Pipeline review code

**Câu 11.** PR 14 file, review một lượt cho kết quả: file đầu kỹ, file cuối sơ sài, cùng một mẫu code bị chê ở file 3 và duyệt ở file 11. Nguyên nhân?

A. Model không đủ thông minh.
B. Context window quá nhỏ.
C. Pha loãng chú ý khi một lượt phải nhìn quá nhiều file.
D. Prompt thiếu tiêu chí.

**Câu 12.** Cách sửa đúng cho câu 11?

A. Dùng model mạnh hơn.
B. Tăng context window.
C. Tách lượt theo từng file, thêm một lượt tích hợp xuyên file.
D. Chia PR thành nhiều PR nhỏ hơn.

**Câu 13.** Chạy lại review sau 3 commit mới, bot đăng lại 14 comment cũ. Sửa?

A. Xóa comment cũ sau khi đăng.
B. Đưa output lần trước vào prompt, chỉ báo cái mới hoặc còn hỏng.
C. Tăng ngưỡng severity để ít comment hơn.
D. Chạy review trên phiên khác.

**Câu 14.** Vì sao không dùng phiên đã viết code để review chính code đó?

A. Tốn token hơn.
B. Phiên đó vẫn giữ lý lẽ đã tạo ra code nên khó tự phát hiện lỗi.
C. Model không đọc lại được file đã sửa.
D. Không hỗ trợ trong công cụ.

---

## Phần D: Batch và SLA

**Câu 15.** Việc nào phù hợp với batch API?

A. Check trước khi merge mà developer đang chờ.
B. Báo cáo nợ kỹ thuật chạy qua đêm.
C. Agent gọi tool nhiều lượt.
D. Chat trả lời khách theo thời gian thực.

**Câu 16.** Kết quả phải có trong 30 giờ, batch có thể mất tới 24 giờ. Nhịp gửi tối thiểu?

A. Mỗi 30 giờ.
B. Mỗi 24 giờ.
C. Mỗi 6 giờ.
D. Mỗi 1 giờ.

**Câu 17.** Lô 100 tài liệu, 9 tài liệu lỗi vì vượt context. Xử lý đúng?

A. Gửi lại cả 100.
B. Gửi lại 9 tài liệu nguyên bản.
C. Chia nhỏ 9 tài liệu, gửi lại theo `custom_id`, giữ 91 cái đã xong.
D. Bỏ 9 tài liệu đó.

---

## Phần E: Cấu hình và phạm vi

**Câu 18.** Một rule chạy đúng trên máy bạn, sai trên máy đồng nghiệp mới clone repo. Nguyên nhân và cách sửa?

A. Claude bị lỗi; cài lại.
B. Rule nằm ở scope user; chuyển sang scope project và commit.
C. Đồng nghiệp dùng phiên bản Claude Code cũ; nâng cấp.
D. Rule quá dài; rút gọn.

**Câu 19.** Enterprise quy định parameterized query, user thích raw SQL, project chọn SQLAlchemy ORM. Agent dùng gì?

A. Enterprise, vì cấp cao nhất.
B. User, vì là sở thích cá nhân của người dùng hiện tại.
C. Project, vì cụ thể nhất, và vẫn thỏa enterprise.
D. Hỏi lại người dùng mỗi lần.

---

## Phần F: Vòng lặp agent

**Câu 20.** Vòng lặp agent đang dùng bộ đếm 5 vòng làm điều kiện dừng chính. Vấn đề?

A. Không có vấn đề, miễn là đủ lớn.
B. Task cần 10 tool call sẽ bị cắt; điều kiện dừng đúng là `stop_reason`.
C. Nên dùng 10 vòng.
D. Nên parse câu "tôi đã xong" trong text.

---

## Đáp án

| Câu | Đáp án | Vì sao |
|---|---|---|
| 1 | C | Ràng buộc là tỉ lệ tự xử lý; escalate theo policy gap hoặc yêu cầu khách, không theo confidence hay độ khó |
| 2 | B | Policy không phủ là policy gap, phải escalate dù ca đơn giản |
| 3 | B | Cảm xúc không phải ranh giới thẩm quyền; policy rõ thì tự xử lý |
| 4 | B | Thiếu thông tin định danh thì hỏi thêm, không đoán theo tên gần giống |
| 5 | A | Điểm tự tin chưa hiệu chỉnh là tín hiệu cần hiệu chỉnh, không phải bộ lọc |
| 6 | B | Chạy cả pipeline cho câu hỏi đơn giản thêm chi phí và nhiễu, không thêm giá trị |
| 7 | B | Provenance mất ở bước chuyển văn xuôi; synthesizer tạo trích dẫn từ ký ức |
| 8 | C | Coordinator quyết định trần của hệ; phải kiểm độ phủ chủ đề |
| 9 | C | Không lấy trung bình; trả cả hai kèm nguồn, phương pháp, ngày |
| 10 | C | Lỗi phải có cấu trúc để coordinator hành động được |
| 11 | C | Vấn đề là chất lượng chú ý, không phải sức chứa |
| 12 | C | Lượt theo file cộng lượt tích hợp; model lớn hơn không sửa được cấu trúc |
| 13 | B | Review tăng dần: chỉ báo delta so với lần trước |
| 14 | B | Reviewer độc lập, không mang lý lẽ của người viết |
| 15 | B | Batch chỉ cho việc chịu được chờ, không ai đang đợi |
| 16 | C | 30 − 24 = 6 giờ, dùng cửa sổ xấu nhất |
| 17 | C | `custom_id` cho phép gửi lại đúng phần lỗi |
| 18 | B | Rule dùng chung phải ở scope project, commit |
| 19 | C | Tầng cụ thể nhất thắng, và vẫn thỏa ràng buộc bảo mật |
| 20 | B | Chỉ `stop_reason` là tín hiệu dừng đáng tin; giới hạn vòng là lưới an toàn |

## Tự chấm

| Số câu đúng | Kết luận |
|---|---|
| 18-20 | Sẵn sàng làm đề dài |
| 15-17 | Đọc lại module ứng với câu sai |
| 12-14 | Còn yếu phần loại trừ theo ràng buộc |
| dưới 12 | Đọc lại module 02, 13, 36 trước khi làm tiếp |
