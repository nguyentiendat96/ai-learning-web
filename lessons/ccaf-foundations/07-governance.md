# 07 · Governance, dữ liệu nhạy cảm và responsible use

Domain D6 (15%) · Video 07 (5:03)

> Đây là khung ra quyết định, không phải tư vấn pháp lý. Quy định của tổ chức và luật áp dụng mới là căn cứ cuối cùng.

## Ý chính

Quyết định dán hay không dán dữ liệu diễn ra trong khoảng hai giây. Phương pháp chậm sẽ không được dùng, nên cần ba xô:

| Xô | Định nghĩa | Ví dụ |
|---|---|---|
| Safe | Bạn sẵn sàng email nó cho đồng nghiệp | Tài liệu công khai, dữ liệu đã công bố |
| Restricted | Dùng được sau khi biến đổi | Dữ liệu khách hàng đã bỏ định danh |
| Never | Có quy định, hợp đồng hoặc luật nói không | Bí mật thương mại theo hợp đồng, dữ liệu bị cấm chuyển ra ngoài |

Năm phép biến đổi cho xô giữa:

| Phép | Làm gì | Ví dụ |
|---|---|---|
| Remove | Bỏ trường định danh | Xóa tên, số điện thoại |
| Replace | Thay bằng giá trị giả | Tên thành "khách A" |
| Generalize | Làm thô giá trị | Ngày sinh thành nhóm tuổi |
| Aggregate | Gộp thành tổng | Doanh thu theo vùng thay vì theo người |
| Synthesize | Tạo dữ liệu mẫu cùng hình dạng | Dùng dữ liệu giả để thử prompt |

Phép thử tổ hợp: từng trường riêng lẻ vô hại nhưng cộng lại có thể định danh một người. Năm trường như tuổi, giới tính, quận, nghề, mức lương có thể chỉ ra đúng một người.

Phân loại quá tay cũng có giá, và giá đó vô hình: không ai báo cáo việc phân tích họ đã không chạy. Đừng biến xô Never thành mặc định.

Tính phù hợp thuộc về task, không thuộc về công cụ. Cùng một dữ liệu có thể ổn để tóm tắt nhưng sai để ra quyết định về một người. Bốn câu hỏi:

1. Ai chịu hậu quả.
2. Nếu việc này được biết ra, bạn có thấy ổn không.
3. Có con người thực sự chịu trách nhiệm không.
4. Việc này có thay thế một hành vi được quản lý không.

Disclosure test: một bước "có người review" không phải control nếu người review không thực tế có thể nói không. Hỏi: đã từng có ai nói không chưa. Ở khối lượng lớn, review không có quyền thì chỉ là hình thức.

Đọc policy:

| Bước | Việc làm | Sai thường gặp |
|---|---|---|
| 1 | Đọc điều kiện kích hoạt theo nghĩa đen | Đọc theo ý mình muốn |
| 2 | Tìm điều khoản có điều kiện khớp tình huống | Chọn điều khoản gần chủ đề nhất |
| 3 | Không có điều khoản nào chi phối thì escalate | Tự cho là được phép |
| 4 | Câu chữ mơ hồ thì hỏi mục đích điều khoản | Tự diễn giải rộng |
| 5 | Phán đoán sẽ lặp lại thì xin quyết định | Tự quyết và giữ kín tiền lệ |

Khi mọi policy đều pass mà vẫn thấy sai, việc cần làm không phải tìm câu trả lời sạch mà tạo một quyết định có lý lẽ và ghi lại:

1. Nêu các bên bị ảnh hưởng.
2. Nêu các lợi ích chính đáng đang xung đột.
3. Kiểm tra nếu làm ở quy mô lớn thì sao.
4. Ghi lại lý luận và người ra quyết định.

Bản ghi là deliverable. Không có bản ghi thì quyết định không tồn tại khi bị hỏi lại.

## Ví dụ

Phân loại 8 đầu vào:

| Đầu vào | Xô | Lý do |
|---|---|---|
| Báo cáo thường niên đã công bố | Safe | Công khai |
| Danh sách khách hàng có tên và số điện thoại | Never nếu chưa được phép, Restricted sau khi thay tên | Định danh trực tiếp |
| Hợp đồng lao động của một nhân viên | Never | Dữ liệu cá nhân, có ràng buộc hợp đồng |
| Doanh thu theo quận, 10 quận | Safe hoặc Restricted tùy quy mô | Tổng hợp, nhưng quận nhỏ có thể định danh |
| Email nội bộ về một sự cố | Restricted | Có thể chứa tên và thông tin chưa công bố |
| Mã lỗi hệ thống không kèm dữ liệu người | Safe | Không định danh |
| Bảng lương đã ẩn tên, còn chức danh và thâm niên | Restricted, kiểm tổ hợp | Tổ hợp có thể chỉ ra một người |
| Biên bản họp có tên khách hàng | Restricted sau khi thay tên | Nội dung hợp lệ, định danh cần bỏ |

Ca policy mơ hồ, ví dụ điều khoản ghi "không đưa dữ liệu mật vào công cụ AI chưa đăng ký":

| Cách đọc | Kết luận |
|---|---|
| Đọc rộng: không đưa dữ liệu mật vào mọi công cụ AI | Sai, vượt điều kiện kích hoạt |
| Đọc đúng: chỉ cấm công cụ chưa đăng ký | Dùng công cụ đã đăng ký là được phép |
| Không đọc: dùng công cụ chưa đăng ký nhưng "chắc không sao" | Sai, và không có bản ghi |

Điều cần thấy: điều khoản bị đọc rộng hơn điều kiện của nó, theo cả hai hướng. Đọc hẹp quá thì bỏ qua ràng buộc, đọc rộng quá thì chặn việc hợp lệ.

## Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Phân loại 8 đầu vào thật từ công việc của bạn vào 3 xô | 15 phút | Mỗi mục có lý do, không chỉ có nhãn |
| 2 | Chạy phép thử tổ hợp trên một bảng dữ liệu của bạn | 15 phút | Tìm được ít nhất một tổ hợp có thể định danh |
| 3 | Lấy một điều khoản policy thật, đọc điều kiện kích hoạt theo nghĩa đen | 20 phút | Nêu được một trường hợp điều khoản không áp dụng dù nghe có vẻ áp dụng |
| 4 | Viết bản ghi quyết định 4 phần cho một ca khó | 25 phút | Người ngoài đọc hiểu vì sao quyết định như vậy |

Bài 3 là bài dễ sai nhất. Ghi nguyên văn điều khoản trước khi diễn giải.

## Đọc thêm

| Nguồn | Dùng cho |
|---|---|
| [Anthropic Usage Policy](https://www.anthropic.com/legal/aup) | Các nhóm hành vi bị cấm và yêu cầu sử dụng có trách nhiệm |
| [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | Mục cải thiện tính trung thực của output |
