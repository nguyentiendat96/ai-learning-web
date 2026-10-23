# Claude Certified Associate: Foundations (CCAO-F)

Giáo trình 12 bài, dựng từ khóa "CCAO-F: Full Course, All 12 Lessons" (116 phút), tháng 10/2026. Nguồn: [video khóa CCAO-F](https://www.youtube.com/watch?v=O94JiAuQ9zY).

Mỗi bài có sáu phần: mục tiêu, lý thuyết, ví dụ, thực hành, bài tập, bẫy. Phần thực hành làm được ngay trong Claude; phần bài tập có tiêu chí tự chấm.

## Bốn động tác

| Động tác | Nghĩa | Dấu hiệu cần dùng |
|---|---|---|
| **Verify** | Kiểm claim với nguồn gốc trước khi dùng | Có số liệu, trích dẫn, khẳng định về thực tế |
| **Match** | Khớp công cụ với việc | Trước khi chọn feature, model, cách viết prompt |
| **Gate** | Bảo vệ dữ liệu và policy trước, rồi mới làm | Dữ liệu cá nhân, tài liệu ràng buộc, quy định |
| **Escalate** | Nhận ra việc không phải quyền của mình | Lĩnh vực rủi ro cao, policy im lặng |

## Kỳ thi

| Hạng mục | Giá trị |
|---|---|
| Số câu | 60 |
| Thời gian | 120 phút, khoảng 2 phút mỗi câu |
| Dạng | multiple choice và multiple response |
| Điểm đạt | 720 trên thang 100 đến 1.000 |
| Trọng số | D1 14%, D2 21%, D3 12%, D4 16%, D5 12%, D6 15%, D7 10% |

Multiple response luôn ghi rõ cần chọn mấy đáp án. Con số đó là thông tin: cần chọn hai nghĩa là đề muốn hai động tác, không phải một đáp án hoàn hảo.

Đăng ký hiện qua mạng đối tác của Anthropic. Kiểm trang đăng ký hiện hành trước khi đặt lịch.

---

## 01 · The Answer Pattern and the Blueprint

**Mục tiêu**

- Nhận ra bốn động tác trong mọi câu hỏi.
- Đọc cấu trúc đề và phân bổ thời gian học theo trọng số.
- Hiểu vì sao đáp án đúng thường là bước nhỏ, không phải giải pháp toàn diện.

### Lý thuyết

Mỗi câu trong đề có cùng một khung: một lối tắt hấp dẫn, một biện pháp giả, một phản ứng thái quá, và một động tác nghề nghiệp.

| Thành phần | Hình dạng | Ví dụ |
|---|---|---|
| Lối tắt | Làm nhanh vì nghe hợp lý | Gửi luôn vì Claude nghe chắc chắn |
| Biện pháp giả | Trông như kiểm soát nhưng không | Hỏi model tự chấm độ tin cậy |
| Phản ứng thái quá | Từ chối việc khi có đường an toàn | Bỏ hẳn việc phân tích |
| Động tác | Bước nhỏ, đúng chỗ | Mở nguồn, kiểm trích dẫn |

Bốn động tác phủ bảy domain:

| Domain | Động tác chủ đạo |
|---|---|
| Prompting & task execution | Match |
| Output evaluation & validation | Verify |
| Product & model selection | Match |
| Workflow integration | Match, verify |
| Configuration & knowledge | Match |
| Governance & responsible use | Gate, escalate |
| Troubleshooting | Verify, match |

Trọng số là ngân sách học, không phải thứ tự học. Domain nặng nhất là output evaluation, chiếm khoảng một phần năm số điểm, nên đây là chỗ đầu tư nhiều nhất.

### Ví dụ

Câu mẫu chính thức của Anthropic: Maya tóm tắt một quy định mới, bản tóm tắt trích "subsection 4B2", sếp hỏi gửi đi không.

| Lựa chọn | Động tác | Vì sao sai |
|---|---|---|
| Gửi luôn vì nghe chắc chắn | Không | Sự tự tin không phải bằng chứng |
| Hỏi Claude tự chấm độ tin cậy | Không | Model tự tin trong khi sai |
| Sửa cho trang trọng hơn | Không | Định dạng không sửa được sự thật |
| Mở quy định, kiểm 4B2 | Verify | Đúng |

Câu thứ hai, cùng khung: Dan đưa bảng tính đầy tên và số tài khoản, policy cấm chia sẻ dữ liệu cá nhân được quản lý.

| Lựa chọn | Vì sao sai |
|---|---|
| Tải lên vì "chỉ nội bộ" | Nội bộ không phải ngoại lệ policy |
| Tải lên và dặn Claude đừng lưu | Chỉ dẫn cho model không phải control |
| Bỏ hẳn việc phân tích | Từ chối khi có đường an toàn cũng là lỗi |
| Ẩn danh định danh rồi phân tích | Đúng, đây là gate |

### Thực hành

1. Mở một việc đang làm có dùng Claude.
2. Ghi ra giấy: việc này cần verify, match, gate hay escalate.
3. Tìm một chỗ bạn đã dùng lối tắt thay vì động tác.
4. Viết lại bước đó thành động tác đúng.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Với 5 tình huống, gán một trong bốn động tác | 15 phút | Mỗi tình huống chỉ một động tác chính |
| 2 | Viết lại hai câu mẫu trên từ trí nhớ | 10 phút | Kể được vì sao từng phương án sai |
| 3 | Lập bảng 40 giờ học theo trọng số | 15 phút | Domain nặng nhất có nhiều giờ nhất |

### Bẫy

Đọc đề rồi chọn đáp án "toàn diện nhất". Đáp án đúng thường là một bước nhỏ đúng chỗ.

---

## 02 · Prompting and Task Execution (D1, 14%)

**Mục tiêu**

- Viết briefing bốn phần thay cho một chồng mệnh lệnh.
- Chia việc lớn thành bước duyệt được.
- Chọn hình dạng prompt theo loại việc.

### Lý thuyết

Maya viết 40 phút, 15 chỉ dẫn, và nhận về bản báo cáo nhạt hơn mọi prompt ngắn trong tuần. Vấn đề không phải độ dài mà là dài sai chỗ và im lặng đúng chỗ.

Briefing cho một người mới có bốn phần:

| Phần | Câu hỏi | Ví dụ |
|---|---|---|
| Bối cảnh | Tình huống gì, dữ liệu nào | Chiến dịch quý 3, số liệu từ file đính kèm |
| Yêu cầu | Làm chính xác việc gì | Lập báo cáo 6 mục, mỗi mục một biểu |
| Người đọc | Ai đọc, họ làm gì tiếp | Giám đốc cần quyết ngân sách quý 4 |
| Thành công | Thế nào là tốt | Mọi số có nguồn, dưới 2 trang |

Chỉ dẫn khẳng định hiệu quả hơn một bức tường phủ định. Một bản mẫu dạy nhiều hơn mười câu tả giọng.

Chia việc: một báo cáo quý không phải một việc, mà là chuỗi kéo số liệu, tìm thay đổi, viết, định dạng. Sai ở bước 1 sẽ bị chôn trong bản hoàn chỉnh.

| Khái niệm | Nghĩa | Ví dụ |
|---|---|---|
| Gom nhóm | Nhiều câu nhỏ liên quan trong một message | Hỏi ba chỉ số cùng lúc |
| Decomposition | Một việc lớn chia bước duyệt được | Kéo số, duyệt, viết, duyệt, định dạng |

Phản hồi nên nằm trong cùng hội thoại, nêu giữ gì và đổi gì. Mở chat mới với prompt to hơn là bỏ hết ngữ cảnh đã có.

Bốn loại việc, bốn hình dạng:

| Loại | Trọng tâm |
|---|---|
| Analysis | Đặc tả tối đa: số liệu nào, khoảng thời gian, cách tính, định dạng |
| Research | Khớp phạm vi với công cụ tra cứu |
| Drafting | Mẫu giọng và người đọc |
| Brainstorming | Nêu mục tiêu và biên, đòi nhiều phương án khác nhau |

### Ví dụ

Năm đề xuất nhà cung cấp, cần bảng điểm và khuyến nghị.

| Lựa chọn | Kết quả |
|---|---|
| "So sánh và chọn giúp tôi" | Không có tiêu chí, không kiểm được |
| Một prompt dài chứa mọi tiêu chí và mọi định dạng | Bản hoàn chỉnh trong một lần, không kiểm được |
| Năm chat riêng rồi tự gộp | Không chat nào thấy hai đề xuất cạnh nhau |
| Nhờ liệt kê tiêu chí và dữ liệu cần trước, duyệt, rồi chấm từng tiêu chí | Đúng |

Maya còn một mẹo rẻ hơn cả chia bước: nhờ liệt kê dữ liệu cần và giả định sẽ dùng, rồi duyệt trước khi làm. Kế hoạch trả về cho thấy một giả định sai, và một câu duyệt cứu cả bản nháp.

### Thực hành

1. Chọn một việc bạn làm lại hằng tuần.
2. Viết briefing bốn phần.
3. Thêm câu: "liệt kê dữ liệu bạn cần và giả định bạn sẽ dùng, để tôi duyệt trước".
4. Chạy, đọc kế hoạch, sửa giả định sai.
5. Chạy tiếp, rồi phản hồi cụ thể: giữ gì, đổi gì.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Viết lại một prompt dài thành 4 phần | 15 phút | Không còn câu "đừng" nào |
| 2 | Chia một deliverable thành 4 bước duyệt được | 15 phút | Sai ở bước 1 phát hiện trước khi viết bước 4 |
| 3 | Chạy "liệt kê kế hoạch trước" cho một việc thật | 10 phút | Kế hoạch lộ ra ít nhất một giả định sai |
| 4 | Viết prompt cho bốn loại việc khác nhau | 20 phút | Mỗi loại có trọng tâm khác nhau |

### Bẫy

Nghĩ prompt dài là kỹ. Vấn đề là dài sai chỗ, và thiếu đúng bốn thứ: bối cảnh, yêu cầu, người đọc, tiêu chí tốt.

---

## 03 · Catching Confident Lies (D2, 21%)

**Mục tiêu**

- Giải thích được vì sao model tạo trích dẫn không tồn tại.
- Dùng ba thói quen giảm bịa đặt.
- Phát hiện lỗi thiếu nội dung (completeness), không chỉ lỗi sai.

### Lý thuyết

Maya đưa lên slide: "73% người mua lập danh sách trước khi gặp sales, theo khảo sát của The Everling Group". Công ty đó không tồn tại.

Model không tra cứu trong cơ sở dữ liệu sự thật; nó dự đoán chữ tiếp theo. Chuỗi "theo báo cáo của" thường được nối tiếp bằng tên công ty, tên khảo sát, một con số gọn. Nó hoàn thành **hình dạng** của trích dẫn, không lấy trích dẫn.

Ba kiểu sai:

| Kiểu | Dấu hiệu | Cách kiểm |
|---|---|---|
| Dữ liệu huấn luyện cũ | Giá, lãnh đạo, quy định nói như hiện tại | Kiểm nguồn hiện hành |
| Trích dẫn bịa | Tên báo cáo, tổ chức, số liệu trông thật | Mở nguồn |
| Lỗi nghe hợp lý | Không có nguồn để mở | Kiểm bằng dữ liệu gốc |

Ba thói quen giảm mạnh lỗi:

1. Cho phép nói "tôi không biết đủ thông tin". Tài liệu Anthropic nói rõ: cho phép thừa nhận không chắc làm giảm mạnh thông tin sai.
2. Yêu cầu trích nguyên văn đoạn hỗ trợ cho từng claim.
3. Tự mở nguồn với việc quan trọng.

**Completeness** khó hơn: mọi câu đều đúng nhưng thiếu mục làm đổi kết luận. Một bản tóm tắt 6 thị trường thành 5 insight có thể bỏ hẳn 2 thị trường mà không câu nào báo.

Dấu hiệu: hỏi cùng một câu hai lần, ra hai đáp án khác nhau. Bất đồng giữa các lần nghĩa là cả hai đều chưa xác minh.

### Ví dụ

Bản phân tích thị phần có trích dẫn, sẽ lên webinar công khai.

| Lựa chọn | Vì sao |
|---|---|
| Gửi vì đã có trích dẫn | Trích dẫn chưa mở thì chưa xác minh |
| Nhờ Claude tự kiểm lại | Cùng một máy, cùng kiểu sai |
| Kiểm một số trông lạ | Số bịa nguy hiểm thường trông bình thường |
| Mở từng báo cáo được trích, đối chiếu từng số | Đúng |

Câu hỏi completeness: danh sách yêu cầu ban đầu có 6 thị trường, bản tóm tắt có 5 insight. Đếm và đối chiếu, đừng đọc xem có chỗ nào trông trống không.

### Thực hành

1. Lấy một output có số liệu.
2. Đánh dấu mọi claim kiểm được.
3. Yêu cầu trích nguyên văn cho từng claim, rút claim không có trích.
4. Mở nguồn của hai claim quan trọng nhất.
5. So bản tóm tắt với danh sách yêu cầu gốc để tìm mục bị bỏ.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Yêu cầu trích nguyên văn cho 10 claim, rút claim không có trích | 15 phút | Ít nhất một claim bị rút |
| 2 | Kiểm completeness bằng danh sách yêu cầu ban đầu | 10 phút | Tìm được mục bị bỏ |
| 3 | Hỏi cùng câu hai lần, so sánh | 5 phút | Ghi lại chỗ lệch |

### Bẫy

Hỏi "bạn có chắc không". Câu trả lời là văn bản sinh ra từ cùng cơ chế đã tạo ra claim.

---

## 04 · The Validation Playbook (D2, 21%)

**Mục tiêu**

- Chạy quy trình kiểm chứng một trang mọi lần.
- Nhận ra khi câu trả lời không phải quyền của mình.
- Chuyển sang người có chuyên môn đúng cách.

### Lý thuyết

Priya hỏi: "Ai đã kiểm cái này trước khi gửi?" Đọc lại hai lần không phải câu trả lời.

Quy trình một trang:

| Bước | Việc làm | Chặn được |
|---|---|---|
| 1 | Đính tài liệu nguồn, yêu cầu chỉ dùng tài liệu đó | Model lấy kiến thức chung |
| 2 | Thêm "nếu không đủ thông tin, nói không biết" | Bịa để lấp chỗ trống |
| 3 | Mỗi claim kèm trích nguyên văn; không có trích thì bỏ claim | Claim không nguồn |
| 4 | Tự mở nguồn, đọc từng số tại chỗ | Trích dẫn bịa |
| 5 | Hỏi lại câu quan trọng ở phiên khác, so hai kết quả | Bất đồng giữa các lần |

Thứ tự quan trọng: trong model thì giảm lỗi, ngoài model mới là chốt.

Khi nào escalate:

| Dấu hiệu | Hành động |
|---|---|
| Thuộc lĩnh vực rủi ro cao | Người có chuyên môn duyệt trước khi tới người nhận |
| Policy im lặng hoặc cần ngoại lệ | Chuyển người có thẩm quyền |
| Câu trả lời sẽ được công bố | Kiểm từng claim, không kiểm mẫu |

Lĩnh vực rủi ro cao theo policy: pháp lý, y tế, bảo hiểm, tín dụng và đầu tư, tuyển dụng, nhà ở, tuyển sinh, báo chí công bố. Trong các lĩnh vực này, người có chuyên môn phải duyệt, và người nhận phải được biết AI đã tham gia. Claude tự review bản nháp của nó không tính là review.

### Ví dụ

Hợp đồng 100 trang, cần đánh giá điều khoản phạt và chấm dứt.

| Lựa chọn | Vì sao sai |
|---|---|
| Dặn "hãy cẩn thận, tài liệu quan trọng" | Giọng điệu không neo claim vào văn bản |
| Chia thành 20 đoạn ngắn | Rủi ro là bịa nội dung điều khoản |
| Nhờ Claude tự chấm confidence | Cùng cơ chế sinh |
| Yêu cầu trích nguyên văn điều khoản trước, phân tích chỉ dựa trên trích | Đúng |

Câu thuế trên hóa đơn khách: mọi bước trên vẫn cần, nhưng câu trả lời không còn là quyền của Maya. Nó được chuyển cho người có chuyên môn, trước khi công bố, và khách được thông báo.

### Thực hành

1. Chọn một tài liệu thật có số liệu.
2. Chạy đủ 5 bước.
3. Ghi lại claim bị rút và lý do.
4. Với mỗi câu trả lời, hỏi: việc này có thuộc lĩnh vực rủi ro cao không.
5. Nếu có, viết tên người duyệt vào quy trình trước khi gửi.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Chạy đủ 5 bước trên một tài liệu thật | 25 phút | Có ít nhất một claim bị rút |
| 2 | Phân loại 5 câu trả lời: nghiệp vụ thường hay rủi ro cao | 10 phút | Mỗi câu nêu người duyệt tương ứng |
| 3 | Viết hai bản cho hai người đọc khác nhau | 15 phút | Nêu rõ người đọc và việc họ phải làm |
| 4 | Viết checklist 5 bước cho team | 15 phút | Người khác làm theo được mà không hỏi |

### Bẫy

Coi "tôi đã đọc lại" là kiểm chứng. Kiểm chứng là mở nguồn.

---

## 05 · Product and Model Selection (D3, 12%)

**Mục tiêu**

- Chọn feature theo điểm yếu cần sửa.
- Chọn tier model theo ba trục.
- Xử lý hội thoại dài đúng cách.

### Lý thuyết

| Feature | Sửa điểm yếu nào | Dùng khi |
|---|---|---|
| Chat thường | Mặc định | Việc một lần, không cần nhớ |
| Project | Context reset | Việc lặp lại, có tài liệu nền |
| Research | Cần nhiều nguồn | Điều tra, tổng hợp có trích dẫn |
| Artifact | Output cần sống riêng | Deliverable sẽ sửa, chia sẻ, lên phiên bản |

Không feature nào là "chế độ thông minh hơn". Mỗi cái sửa một điểm yếu cụ thể.

Nhóm tra cứu có luật riêng:

| Công cụ | Dùng cho |
|---|---|
| Search | Tìm một sự kiện |
| Thinking | Lập luận trên dữ liệu đã có |
| Research | Gom nhiều nguồn và trích dẫn |

Ba tier:

| Tier | Dùng cho |
|---|---|
| Nhanh, rẻ | Việc rõ ràng, khối lượng lớn |
| Giữa | Mặc định hợp lý |
| Mạnh nhất | Trả lời sai tốn hơn chi phí tính toán |

Ba trục chọn: chất lượng cần đến đâu, có ai đang chờ không, chạy bao nhiêu lần. Volume là trục hay bị quên: một câu hỏi trên model đắt là tiền lẻ, cùng lựa chọn đó nhân một nghìn lần là một dòng ngân sách.

Hội thoại dài:

| Cách | Khi nào |
|---|---|
| Restart | Chat đã trôi sang chủ đề khác |
| Summarize | Cần giữ mạch nhưng bớt chi tiết |
| Persist | Sự thật nền không đổi, cần giữ lâu |

### Ví dụ

100 email trả lời khách hằng ngày, cần nhanh và rẻ.

| Lựa chọn | Vì sao sai |
|---|---|
| Model mạnh nhất cho mọi email | Năng lực không dùng tới là tiền thuần |
| Tắt bớt feature để giảm chi phí | Vẫn chạy sai tier |
| Đổi sang nền tảng khác | Vấn đề đi theo |
| Tier nhanh, rẻ cho việc đơn giản khối lượng lớn | Đúng |

Maya có hai việc trong cùng buổi sáng: 100 câu trả lời ngắn và một phân tích sâu. Dùng cùng một tier cho cả hai là lỗi khớp, không phải lỗi model.

### Thực hành

1. Liệt kê 5 việc bạn làm với Claude trong tuần.
2. Với mỗi việc, chọn feature và ghi điểm yếu nó sửa.
3. Với mỗi việc, chọn tier và ghi trục quyết định.
4. Chạy lại một việc đang dùng tier đắt, thử tier rẻ hơn, so kết quả.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Chọn feature cho 6 việc thật | 10 phút | Mỗi lựa chọn nêu điểm yếu được sửa |
| 2 | Chọn tier cho từng bước của một quy trình | 15 phút | Có ít nhất hai tier khác nhau |
| 3 | Với một chat dài, chọn restart, summarize hay persist | 10 phút | Nêu lý do theo độ bền của sự thật |

### Bẫy

Chọn model mạnh nhất "cho chắc". Đề thưởng cho việc chọn xuống khi việc đã rõ.

---

## 06 · Workflow Integration (D4, 16%)

**Mục tiêu**

- Vẽ tuần làm việc thật trước khi tự động hóa.
- Chọn bước có đòn bẩy, không phải bước dễ khoe.
- Thiết kế pilot có tiêu chí viết trước.

### Lý thuyết

Dan muốn chuyển prompt của Maya cho cả team ngay thứ Sáu. Đó là cách các đợt triển khai Claude chết: một công cụ không phải một quy trình.

| Bước | Việc làm | Sai thường gặp |
|---|---|---|
| 1 | Vẽ tuần thật: tài liệu, luồng, lịch | Hỏi mọi người tuần họ đi đâu, thay vì xem dữ liệu |
| 2 | Chia bước, đánh dấu bước theo luật và bước cần phán đoán | Bỏ qua bước phán đoán |
| 3 | Tìm chỗ thời gian chảy mất | Chọn bước demo đẹp |
| 4 | Phân tích trước khi tự động hóa | Xây skill trước khi quy trình chốt |
| 5 | Pilot một người, một bước, một tuần | Triển khai cả team |
| 6 | Viết tiêu chí đạt trước | Viết sau, cong theo kết quả |
| 7 | Đo, rồi mở rộng | Mở rộng vì thấy hay |

Maya tưởng bước tốn thời gian là viết social copy; sau khi vẽ tuần, bước ngốn thời gian là ghép bảng review thứ Sáu.

### Ví dụ

Cần requirements cho việc tự động hóa hóa đơn, đã có tài liệu quy trình và 3 tháng log ngoại lệ.

| Lựa chọn | Vì sao |
|---|---|
| Nhờ Claude viết requirements luôn | Không có bằng chứng nội bộ, ra bản chung chung |
| Chạy research xem công ty khác làm sao | Ràng buộc thật nằm trong tài liệu của chính bạn |
| Xây skill mã hóa quy trình trước khi phân tích | Đóng băng một quy trình chưa chốt |
| Tải tài liệu và log, chia bước, phân loại, tìm khoảng trống, rồi viết | Đúng |

Tiêu chí viết trước, ví dụ: mọi số trong bản nháp phải có trích dẫn nguồn; vòng review của người dưới một giờ.

### Thực hành

1. Trong một tuần, ghi lại mọi việc lặp lại và thời gian thực tế.
2. Chọn bước tốn thời gian nhất.
3. Chia bước đó thành các bước con, đánh dấu bước nào cần phán đoán.
4. Viết 2 tiêu chí đạt cho một thay đổi nhỏ.
5. Chạy thử một tuần, đo, rồi quyết định.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Vẽ tuần làm việc của bạn theo từng bước | 20 phút | Chỉ ra bước ngốn thời gian nhất |
| 2 | Viết 2 tiêu chí đạt trước khi thử một thay đổi | 10 phút | Cả hai đo được |
| 3 | Thiết kế pilot một người, một tuần | 15 phút | Có ngày đo và người quyết định mở rộng |
| 4 | Viết bản đồ trước và sau cho một bước | 15 phút | Chỉ rõ ai làm gì ở mỗi bên |

### Bẫy

Tự động hóa bước demo đẹp. Đòn bẩy nằm ở bước tốn thời gian, không phải bước dễ khoe.
---

## 07 · Configuration and Knowledge (D5, 12%)

**Mục tiêu**

- Phân biệt instructions và knowledge.
- Đặt đúng tầng cấu hình: cá nhân, project, tổ chức.
- Giữ knowledge không bị lỗi thời.

### Lý thuyết

Maya dán cùng một đoạn brand voice vào chat mới lần thứ năm trong tuần. Việc cần làm không phải viết prompt hay hơn, mà tìm đúng nhà cho context.

| Nơi | Trả lời câu hỏi | Chứa |
|---|---|---|
| Instructions | Claude nên hành xử thế nào | Giọng điệu, luật đứng, điều cấm |
| Knowledge | Sự thật ở đây là gì | Tài liệu, bảng giá, mẫu |

Tên project và description dành cho người; Claude không đọc chúng. Đổi tên project thành "luôn trang trọng" không làm output trang trọng.

Instructions có ba tầng:

| Tầng | Phạm vi | Chứa |
|---|---|---|
| Cá nhân | Mọi chat của bạn | Sở thích riêng |
| Project | Trong project | Thỏa thuận của nhóm |
| Tổ chức | Mọi người trong công ty | Chính sách |

Luật bền, đúng mọi lúc, thuộc instructions. Việc một lần thuộc prompt. Khi cá nhân mâu thuẫn tổ chức, tổ chức thắng.

Kho knowledge cần được sắp:

| Việc | Lý do |
|---|---|
| Tên file mô tả nội dung và ngày | Tránh trích nhầm quý |
| Nhóm tài liệu liên quan | Model tìm đúng cụm |
| Gọi tên file khi cần | Chỉ đúng nguồn |
| Xóa tài liệu bị thay thế | Tài liệu cũ vẫn được dùng nếu còn đó |

Connector thừa hưởng quyền của bạn: Claude thấy những gì bạn thấy được. Hành động cần người duyệt; thư nháp không tự gửi.

### Ví dụ

Nhóm pháp lý muốn mọi phiên review hợp đồng dùng checklist và giọng trang trọng, không ảnh hưởng việc khác.

| Lựa chọn | Vì sao sai |
|---|---|
| Dán checklist đầu mỗi phiên | Chính là việc Maya đang làm mỗi sáng |
| Đặt vào instructions cá nhân | Phạm vi sai: mọi chat của người đó đều bị ảnh hưởng |
| Đổi tên project | Claude không đọc tên |
| Instructions của project + checklist trong knowledge | Đúng |

Một project có tên "Luôn trang trọng" nhưng bên trong không có instruction nào vẫn trả lời bình thường.

### Thực hành

1. Mở một project đang dùng.
2. Liệt kê mọi thứ đang nằm trong instructions; đánh dấu mục nào thật ra là sự thật, không phải cách hành xử.
3. Chuyển các mục sự thật sang knowledge.
4. Đổi tên file knowledge theo nội dung và ngày.
5. Xóa hoặc thay tài liệu đã lỗi thời.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Phân loại 10 mục vào instructions hoặc knowledge | 15 phút | Không mục nào lẫn |
| 2 | Đặt tên và nhóm lại 10 tài liệu | 10 phút | Tên nói nội dung và ngày |
| 3 | Xác định tầng instruction cho 3 luật | 10 phút | Luật bền lên tầng rộng hơn |
| 4 | Viết quy trình kiểm knowledge mỗi tháng | 15 phút | Có người chịu trách nhiệm |

### Bẫy

Nhét luật vào tài liệu knowledge. Rule book nằm trong knowledge không được coi là luật đứng.

---

## 08 · Governance and Responsible Use (D6, 15%)

**Mục tiêu**

- Định vị một đề xuất vào ba tầng policy.
- Nhận ra dữ liệu nào phải xử lý trước khi đưa vào prompt.
- Biết khi nào phải dừng và hỏi người sở hữu policy.

### Lý thuyết

Dan: "Viết email tư vấn tài chính cá nhân hóa cho khách, và giữ kín để legal khỏi chậm." Câu đó chứa hai bẫy cùng lúc.

Ba tầng policy:

| Tầng | Nội dung |
|---|---|
| Chuẩn chung | Không lừa dối, không nội dung y tế pháp lý tài chính gây nhầm, không media giả, không lạm dụng dữ liệu cá nhân |
| Rủi ro cao | Người có chuyên môn duyệt trước khi tới người nhận; người nhận được biết AI tham gia |
| Bổ sung | Hướng dẫn thêm cho chatbot tiêu dùng |

Bốn câu hỏi định vị:

1. Việc này có lừa dối không.
2. Nó có tư vấn hoặc quyết định điều quan trọng cho một người thật không.
3. Dữ liệu đầu vào thuộc lớp nào.
4. Policy của tổ chức nói gì, ai sở hữu.

Các lớp dữ liệu cần xử lý riêng: định danh chính phủ, số tài khoản, hồ sơ y tế, thẻ thanh toán, mật khẩu, tài liệu dưới NDA.

| Cách xử lý | Dùng khi |
|---|---|
| Ẩn danh hoặc bỏ định danh | Dữ liệu khách |
| Giảm chi tiết | Ngày sinh thành nhóm tuổi |
| Tổng hợp | Doanh thu theo vùng |
| Từ chối | Việc bị cấm rõ ràng |

### Ví dụ

| Tình huống | Kết luận |
|---|---|
| Email tư vấn tài chính cá nhân hóa | Claude nháp, chuyên gia có chứng chỉ duyệt, khách được biết AI tham gia |
| Năm testimonial bịa cho landing page | Không; dùng phản hồi khảo sát thật, kiểm từng trích |
| Phân tích "chỉ nội bộ" trên dữ liệu có tên | Vẫn phải gate |
| Bật incognito để "cho đúng quy định" | Incognito không đổi thỏa thuận dữ liệu |

### Thực hành

1. Lấy một đề xuất dùng Claude đang bàn.
2. Trả lời bốn câu hỏi định vị.
3. Xác định lớp dữ liệu đầu vào và cách xử lý.
4. Viết câu trả lời cho người đề xuất: làm được, làm với điều kiện gì, ai duyệt.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Định vị 5 đề xuất vào ba tầng policy | 15 phút | Mỗi cái nêu người duyệt |
| 2 | Phân loại 6 loại dữ liệu và cách xử lý | 10 phút | Không loại nào "cứ dùng" |
| 3 | Viết câu trả lời cho một yêu cầu "giữ kín" | 10 phút | Nêu người sở hữu policy, không tự quyết |
| 4 | Viết checklist gate cho team | 15 phút | Có bước dừng rõ ràng |

### Bẫy

Coi disclaimer ở cuối là biện pháp. Review phải xảy ra trước khi quyết định tới người nhận.

---

## 09 · Troubleshooting and Optimization (D7, 10%)

**Mục tiêu**

- Bỏ ba phản xạ sai: regenerate, đổi model, viết to hơn.
- Chạy thang bốn bước.
- Đọc triệu chứng để tìm đúng nguyên nhân.

### Lý thuyết

Thứ Năm, cùng prompt, cùng chat, output thành nhạt.

| Phản xạ | Vì sao sai |
|---|---|
| Bấm regenerate | Không thêm thông tin, chỉ gieo lại xúc xắc |
| Đổi model | Model không tạo được context chưa từng được cấp |
| Viết thêm chỉ dẫn in hoa | Làm phức tạp thêm; hướng đúng là đơn giản hóa |

Thang bốn bước:

1. Nói lại yêu cầu đơn giản, rõ.
2. Thêm context như briefing người mới.
3. Chia việc phức tạp thành bước.
4. Phản hồi cụ thể: giữ gì, đổi gì.

Bảng triệu chứng:

| Triệu chứng | Nguyên nhân | Sửa |
|---|---|---|
| Output chung chung | Thiếu đặc tả | Thêm chi tiết và một ví dụ tốt |
| Lạc đề | Mục tiêu không rõ | Nói lại mục tiêu |
| Sai định dạng | Chưa từng đưa mẫu định dạng | Đưa mẫu |
| Câu trả lời phức tạp mà lung lay | Việc cần chia nhỏ | Chia bước |

Dấu hiệu bịa: hai lần chạy cùng câu ra hai kết luận. Nhờ model giải thích từng bước có thể lộ giả định sai, ví dụ nó vẫn đang tuân theo ràng buộc cũ.

### Ví dụ

Bản brief nhạt, thang bốn bước đều pass: yêu cầu rõ, context đủ.

| Kiểm tra | Phát hiện |
|---|---|
| Chạy lại cùng câu, so hai bản | Hai bản khác nhau: dấu hiệu bịa |
| Nhờ giải thích từng bước | Model vẫn tuân theo ràng buộc cũ từ thứ Ba |
| Kết luận | Context cũ chưa bị loại, không phải model yếu |

### Thực hành

1. Lấy một output kém gần đây.
2. Chấm theo bảng triệu chứng.
3. Chạy thang bốn bước, mỗi lần một bước.
4. Ghi lại bước nào tạo khác biệt.
5. Nếu vẫn kém, chạy lại hai lần để kiểm dấu hiệu bịa.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Chạy thang bốn bước trên một output kém | 20 phút | Xác định bước nào là nguyên nhân |
| 2 | Phân loại 5 triệu chứng theo bảng | 10 phút | Mỗi cái ra một cách sửa |
| 3 | Nhờ model giải thích lập luận để tìm giả định sai | 10 phút | Nêu được giả định cụ thể |

### Bẫy

Bấm regenerate. Đề coi đó là gieo lại xúc xắc rồi gọi là debug.

---

## 10 · Question Lab

**Mục tiêu**

- Luyện bốn động tác thành phản xạ.
- Nhận ra đáp án đúng luôn là động tác nhàm chán.
- Tự tạo câu hỏi từ công việc của mình.

### Lý thuyết

Tám thẻ, bảy domain trộn, mỗi thẻ một người lạ. Mục đích không phải nhớ nội dung mà là nhận dạng động tác dưới áp lực.

| Thẻ | Tình huống | Động tác |
|---|---|---|
| 1 | Mẫu báo cáo tuần dùng lại, sửa, chia sẻ | Match: artifact |
| 2 | Bản tóm tắt báo cáo năm có con số kiện tụng lạ | Verify: trích nguyên văn, bỏ claim không nguồn |
| 3 | Tự động hóa quyết định bảo hiểm cho claim nhỏ | Escalate: chuyên gia duyệt từng ca |
| 4 | Email ra mắt đúng ngữ pháp nhưng sai brand | Match: briefing đủ 4 phần + mẫu |
| 5 | Nhóm cần luật chung cho mọi phiên | Match: project instructions |
| 6 | Dữ liệu khách có tên, "chỉ nội bộ" | Gate: ẩn danh trước |
| 7 | Hai lần chạy ra hai kết luận | Verify: dấu hiệu bịa, đòi trích |
| 8 | Rule của team chỉ chạy trên máy một người | Match: scope project, commit |

Sau tám thẻ, nhận xét chung: không đáp án nào là mẹo thông minh.

### Ví dụ

Thẻ 3, viết đầy đủ lập luận:

| Bước | Nội dung |
|---|---|
| Ràng buộc | Quyết định bảo hiểm ảnh hưởng trực tiếp một người |
| Loại bỏ | Ngưỡng confidence, disclaimer, audit hàng tháng đều không thay review |
| Động tác | Escalate: chuyên gia duyệt từng ca, người nhận biết AI tham gia |
| Vì sao | Không có ngoại lệ theo giá trị claim |

### Thực hành

1. Tự viết 4 thẻ mới từ công việc của bạn.
2. Mỗi thẻ ghi một động tác đúng.
3. Đổi thẻ cho đồng nghiệp, chấm chéo.
4. Ghi lại thẻ nào bạn làm sai và vì sao.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Làm 8 thẻ trong 16 phút, không mở tài liệu | 16 phút | Từ 6 đúng trở lên |
| 2 | Viết lại lý do sai của 3 phương án nhiễu | 10 phút | Mỗi lý do là một lối tắt người thật hay dùng |
| 3 | Tự tạo 4 thẻ mới | 15 phút | Mỗi thẻ có một động tác đúng |

### Bẫy

Tìm đáp án "thông minh nhất". Đề thiết kế để đáp án đúng là bước nhỏ, đúng chỗ.

---

## 11 · Exam Day

**Mục tiêu**

- Dùng cơ chế multiple response đúng.
- Chia hai lượt làm bài.
- Đọc báo cáo điểm đúng.

### Lý thuyết

| Việc | Cách làm |
|---|---|
| Multiple response | Đề ghi rõ chọn mấy; loại dần tới đúng số đó |
| Lượt 1 | Trả lời ngay câu nhận ra, đánh dấu câu lưỡng lự, đi tiếp |
| Lượt 2 | Quay lại câu đánh dấu, hỏi "scenario này đòi động tác nào" |
| Câu bí | Loại tới đúng số đáp án, chọn cái mạnh nhất, bỏ qua |
| Điểm | 720 trên thang quy đổi; không có đường cong |
| Báo cáo | Phần trăm từng domain là chẩn đoán, không phải điều kiện đạt |

Bài thi chấm theo chuẩn cố định: so với một mức đặt trước, không so với người cùng phòng. Vì vậy nó thưởng cho người làm đúng động tác chuẩn mọi lần, không phải người thỉnh thoảng xuất sắc.

### Ví dụ

Câu multiple response ghi "chọn 2", còn 3 đáp án khả dĩ.

| Cách xử lý | Kết quả |
|---|---|
| Chọn cả 3 | Sai, đề chỉ cho 2 |
| Chọn 1 vì chắc hơn | Thiếu một đáp án đúng |
| Loại thêm một tới đúng 2 | Đúng |
| Bỏ qua | Mất điểm chắc chắn |

### Thực hành

1. Làm 20 câu trong 40 phút, bật đồng hồ.
2. Đánh dấu mọi câu quá 2 phút.
3. Chấm, rồi xem câu sai thuộc domain nào.
4. Làm lại chỉ các câu đó sau một ngày.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Làm 20 câu trong 40 phút, hai lượt | 40 phút | Lượt 1 không dừng quá 2 phút mỗi câu |
| 2 | Với 5 câu multiple response, loại tới đúng số | 10 phút | Không chọn thừa hay thiếu |
| 3 | Đọc báo cáo mẫu, chọn domain học lại | 10 phút | Chọn theo cột thấp nhất |

### Bẫy

Dừng lại đấu với một câu khó. Không câu nào đáng để mất ba câu chưa đọc.

---

## 12 · Capstone: One Workday

**Mục tiêu**

- Chạy bảy domain trong một ngày làm việc thật.
- Nhận ra các domain không tách rời.
- Biến bốn động tác thành thói quen.

### Lý thuyết

| Thời điểm | Việc | Domain |
|---|---|---|
| Sáng | Brief ra mắt: 4 phần + mẫu + duyệt kế hoạch trước | D1 |
| Giữa sáng | Con số trên thông cáo có footnote: mở nguồn, phát hiện số quý trước | D2 |
| Trưa | 100 trả lời ngắn chạy tier nhanh; một phân tích sâu chạy tier mạnh | D3 |
| Đầu chiều | Bản cập nhật đi qua hộp review của người có tên | D4 |
| Chiều | Không ai dán brand voice; chat mở trong project đã có sẵn | D5 |
| Giữa chiều | Dan đưa danh sách khách có tên và email, "chỉ nội bộ" | D6 |
| Cuối chiều | Một output nhạt: chạy thang bốn bước thay vì regenerate | D7 |

Điểm của capstone: cùng một ngày, cùng một người, cùng bốn động tác. Đề thi trộn domain trong một scenario, nên người học thuộc từng môn riêng sẽ không nhận ra.

### Ví dụ

Hộp review của người có tên trong quy trình là domain nào? Câu trả lời là workflow integration, vì review là một bước trong quy trình, là verify được thể chế hóa. Nhưng nếu người review phải có chuyên môn, nó đồng thời là governance. Câu hỏi đúng là "scenario đang hỏi khía cạnh nào".

### Thực hành

1. Chọn một ngày làm việc thật.
2. Ghi lại mỗi lần dùng Claude và động tác đã dùng.
3. Cuối ngày, đếm domain nào xuất hiện.
4. Viết lại một quy trình của bạn thành checklist bốn bước.

### Bài tập

| # | Việc làm | Thời gian | Tiêu chí đạt |
|---|---|---|---|
| 1 | Chạy một ngày làm việc thật, ghi domain | 1 ngày | Ghi được ít nhất 5 domain |
| 2 | Với mỗi lần dùng Claude, ghi động tác | 1 ngày | Không lần nào không gán được |
| 3 | Viết lại một quy trình thành checklist 4 bước | 30 phút | Người khác làm theo được |
| 4 | Chạy lại quy trình đó một tuần sau | 1 tuần | So được trước và sau |

### Bẫy

Học bảy domain như bảy môn riêng. Đề trộn chúng trong cùng một scenario.
