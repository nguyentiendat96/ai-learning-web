# Claude Certified Associate: Foundations (CCAF)

Ghi chú khóa học, dựng từ transcript 10 video của playlist YouTube "Claude Certified Associate - Foundations - Free Course" (kênh Skills Pragati), tháng 10/2026. Transcript gốc: [`transcripts/`](./transcripts/). Đây là bản tóm tắt để ôn; bộ tài liệu đầy đủ có ví dụ và bài tập nằm ở [README.md](./README.md).

## Mục lục

| Phần | Nội dung |
|---|---|
| [Blueprint](#blueprint-kỳ-thi-7-domain) | 7 domain và trọng số |
| [Video](#danh-sách-video) | Danh sách 10 video |
| [01](#01-prompt-anatomy-và-task-decomposition-d1-14) | Prompt anatomy, task decomposition |
| [02](#02-nhận-diện-câu-trả-lời-trông-đúng-d2-21) | Đánh giá output |
| [03](#03-uốn-output-cho-đúng-người-đọc-d2-21) | Audience adaptation |
| [04](#04-chọn-feature-và-model-d3-12) | Feature và model |
| [05](#05-thiết-kế-workflow-quanh-claude-d4-16) | Workflow design |
| [06](#06-projects-instructions-và-knowledge-d5-12) | Projects và knowledge |
| [07](#07-governance-dữ-liệu-nhạy-cảm-và-responsible-use-d6-15) | Governance |
| [08](#08-troubleshooting-output-kém-d7-10) | Troubleshooting |
| [09](#09-capstone-đưa-một-quy-trình-thật-vào-production) | Capstone |
| [Tự kiểm](#câu-hỏi-tự-kiểm-sau-mỗi-module) | Một câu hỏi mỗi module |

## Blueprint kỳ thi: 7 domain

| Domain | Nội dung | Trọng số | Module |
|---|---|---|---|
| D1 | Prompting & task execution | 14% | 01 |
| D2 | Output evaluation & validation | 21% | 02, 03 |
| D3 | Product & model selection | 12% | 04 |
| D4 | Workflow integration & solution design | 16% | 05 |
| D5 | Configuration & knowledge management | 12% | 06 |
| D6 | Governance, risk & responsible use | 15% | 07 |
| D7 | Troubleshooting & optimization | 10% | 08 |
| Cross-domain | Capstone | not shown | 09 |

## Danh sách video

| # | Tiêu đề | Thời lượng | Domain |
|---|---|---|---|
| 00 | Full Course Overview | 2:54 | none |
| 01 | Prompt Anatomy and Task Decomposition | 4:36 | D1 |
| 02 | Spotting What Is Wrong With a Good-Looking Answer | 5:10 | D2 |
| 03 | Shaping Output for a Real Audience | 2:36 | D2 |
| 04 | Choosing the Product Feature and the Model | 4:17 | D3 |
| 05 | Designing the Workflow Around Claude | 5:20 | D4 |
| 06 | Projects, Instructions and Knowledge Sources | 4:53 | D5 |
| 07 | Governance, Data Sensitivity and Responsible Use | 5:03 | D6 |
| 08 | Troubleshooting Poor Output | 3:57 | D7 |
| 09 | Capstone: Put One Real Process Into Production | 5:13 | cross-domain |

Video 00 chỉ là trailer: lặp lại mục tiêu 9 module, không có nội dung riêng.

---

## 01. Prompt Anatomy và Task Decomposition (D1, 14%)

Hầu hết các lần "sửa prompt" thất bại vì chỉ đổi từ ngữ thay vì thêm cấu trúc còn thiếu. Một prompt đáng tin có 5 khối:

| Khối | Trả lời câu hỏi | Ví dụ |
|---|---|---|
| Role | Áp chuẩn của ai? | "Bạn là chuyên viên kiểm soát nội bộ" |
| Context | Tình huống gì, để khỏi đoán? | Dữ liệu, bối cảnh, ràng buộc sẵn có |
| Task | Động từ chính xác là gì? | "tách", "trích xuất", "đánh dấu" |
| Constraint | Cấm cái gì? | "không suy ra ngoài nguồn", "không bịa số" |
| Format | Đầu ra dùng được ngay chưa? | bảng, CSV, các bước đánh số |

Thứ tự chạy: Task, Context, Constraint, Format.

Hai nhận xét đáng nhớ: Role nghe hữu ích nhưng thường thay đổi rất ít; Constraint nghe mơ hồ nhưng thường thay đổi mọi thứ.

Yêu cầu quá lớn không fail ồn ào. Nó trả về thứ trông đầy đủ nhưng nông đều, dấu hiệu là mục nào cũng một đoạn văn nghe hợp lý mà rỗng.

Task decomposition chia việc thành các mảnh kiểm chứng được. Câu hỏi then chốt không phải "cắt ở đâu" mà "judgment xuất hiện ở đâu, và mình có muốn thấy nó trước khi phần còn lại được xây lên trên nó không". Đó là chỗ đặt checkpoint.

Chuỗi thực hành: prompt quá lớn, map các điểm phán đoán, thiết kế chuỗi, chạy có checkpoint, so sánh kết quả.

Năm lớp lỗi output, dùng để chẩn đoán thay vì đoán mò:

| Lớp | Nghĩa |
|---|---|
| Target | Trả lời sai câu hỏi |
| Shape | Đúng nội dung, sai hình dạng |
| Depth | Nông |
| Facts | Bịa hoặc sai dữ kiện |
| Scope | Lan quá hoặc hụt phạm vi |

Mỗi lớp có cách sửa khác nhau. Đổi một thứ mỗi lần, và lặp trên prompt chứ không phải trên hội thoại. Trước khi chạy, nêu dự đoán: "nếu thêm X, output phải đổi theo hướng Y".

"Be more specific" là câu lệnh tốn kém nhất: nó tạo áp lực bịa, không thêm thông tin. Dừng lại và cung cấp đúng thứ bạn biết.

Mỗi loại task yếu ở một khối khác nhau, nên đừng dùng một thói quen cho tất cả:

| Loại task | Khối quyết định | Hỏng khi |
|---|---|---|
| Analysis | Constraint trỏ về nguồn | không giới hạn vào source |
| Research | Context: nói rõ bạn đã biết gì | không nói điều đã biết |
| Drafting | Voice samples | mô tả tone thay vì đưa mẫu giọng |
| Brainstorming | Constraint về độ trải | đòi số lượng mà không đòi độ khác biệt |

Với brainstorming, đếm ý thực sự khác nhau chứ không đếm gạch đầu dòng. Nếu không có ý nào làm bạn thấy khó chịu, constraint spread còn quá yếu.

## 02. Nhận diện câu trả lời "trông đúng" (D2, 21%)

Fluency và accuracy độc lập với nhau. Bịa đặt tập trung ở các chi tiết chính xác cao như trích dẫn và số liệu, trong khi lập luận chung vẫn đúng. Chính kiểu đúng một phần này nguy hiểm hơn sai hoàn toàn, vì nó tắt phản xạ nghi ngờ.

Ba lượt kiểm tra:

| Lượt | Việc làm |
|---|---|
| 1 | Đánh dấu mọi claim kiểm chứng được, chưa phán xét |
| 2 | Sắp theo hậu quả, kiểm cái quan trọng trước |
| 3 | Kiểm tại nguồn, không hỏi lại AI |

Năm trích dẫn đúng làm cho trích dẫn bịa thứ sáu trở nên đáng tin.

Hai kiểu hỏng khác nhau:

| Kiểu | Định nghĩa | Cách bắt |
|---|---|---|
| Inaccuracy | Có gì đó trong câu trả lời sai | Kiểm từng claim |
| Incompleteness | Mọi thứ đúng, nhưng thiếu thứ làm đổi kết luận | So với reference bên ngoài |

Incompleteness khó hơn vì mọi phép kiểm trên chữ nghĩa đều pass. Cách duy nhất là so với checklist, template hoặc kiến thức đồng nghiệp, và phải viết reference trước khi đọc câu trả lời, nếu không checklist bị nhiễm bởi thứ vừa đọc. Đừng nhầm độ dài với độ đầy đủ.

Quy trình 5 bước, khoảng 10 phút, chạy được mọi lần:

1. Phân loại output theo kiểu.
2. Trích các claim thực sự quan trọng.
3. Làm lộ giả định ẩn.
4. Xếp hạng theo hậu quả.
5. Chỉ kiểm những gì nằm trên đường ranh giới, và ghi lại thứ bạn chọn không kiểm.

Bước cuối biến rủi ro vô hình thành rủi ro hữu hình: người nhận biết chính xác được dựa vào đâu.

Khi nào chuyển cho người khác: niềm tin vào output không phải đầu vào của quyết định này. Cân 5 yếu tố dưới đây, trong đó cặp đầu giải quyết phần lớn case và yếu tố thứ tư là trigger tinh tế nhất.

| Yếu tố | Câu hỏi |
|---|---|
| Reversibility | Có đảo ngược được không |
| Blast radius | Hỏng thì lan đến đâu |
| Authority | Mình có thẩm quyền không |
| Verifiability | Mình có kiểm được không |
| Regulatory exposure | Có ràng buộc pháp lý không |

Với verifiability: nếu mình không kiểm được mà người khác kiểm được, riêng điều đó đủ lý do chuyển. Câu hỏi không phải "cái này có đúng không" mà "cái này có phải của mình để gửi không". Escalation không phải thoái thác, mà là bàn giao phân tích cộng với mức độ không chắc chắn.

## 03. Uốn output cho đúng người đọc (D2, 21%)

Một output chính xác mà người đọc không hành động được thì đã thất bại. Audience adaptation không phải chuyện tone. Bốn chiều cần điền:

| Chiều | Câu hỏi | Ghi chú |
|---|---|---|
| Prior knowledge | Người này đã biết gì? | Gánh phần lớn |
| Decision | Họ sẽ làm gì khác sau khi đọc? | Gánh phần lớn |
| Attention | Họ có bao nhiêu sự chú ý? | |
| Register | Giọng điệu phù hợp? | |

Nếu câu trả lời cho "họ sẽ làm gì khác" là "hiểu biết hơn" thì chưa xác định được decision, và output sẽ trôi vào quên lãng.

Decision khác nhau giữa hai audience thì regenerate từ nguồn. Chỉ khác knowledge hoặc attention thì adapt.

Khi có hai bản nháp và không có tiêu chí, bạn sẽ chọn bản đọc mượt hơn, trong khi fluency và độ dài tương quan rất yếu với fitness for purpose. Viết tiêu chí trước khi đọc candidate; tiêu chí viết sau chỉ là hợp lý hóa lựa chọn đã có.

| Thuộc tính tiêu chí | Nghĩa |
|---|---|
| Observable | Quan sát được |
| Discriminating | Phân biệt được |
| Weighted | Có trọng số |
| Must-have | Fail là loại, dù tổng điểm cao |
| Nice-to-have | Cộng điểm, không loại |

Chọn format theo việc output sẽ đi đâu:

| Output sẽ | Format |
|---|---|
| Đọc một lần trong chat | Giữ inline |
| Được lưu, sửa, chia sẻ | Artifact |
| Đi vào một tool | Dữ liệu có cấu trúc: bảng hoặc CSV |
| Là một quy trình | Các bước đánh số |

Câu hỏi không bao giờ là "cái nào đẹp nhất" mà "cái này sẽ được dùng làm gì". Artifact bị lạm dụng vì nghe chuyên nghiệp: một câu trả lời 3 dòng đặt trong panel riêng tệ hơn cùng câu đó inline. Phép thử là persistence và use, không phải tầm quan trọng.

## 04. Chọn feature và model (D3, 12%)

Chi phí vô hình là dựng lại context mỗi lần, không tích lũy, không tái dùng. Chọn feature bằng 3 câu hỏi:

| Câu hỏi | Nếu có |
|---|---|
| Task có lặp lại? | Project |
| Cần thông tin bên ngoài? | Search hoặc Research |
| Output có được giữ hoặc sửa? | Artifact |

Nếu task không lặp lại, project là overhead thuần, lỗi người ta mắc ngay sau khi học về project. Đôi khi chat thường là câu trả lời đúng.

Chọn tier model theo lượng phán đoán cần và giá của một lỗi, không theo stakes. Task stakes cao nhưng judgment thấp, ví dụ trích ngày tháng từ hợp đồng, là task tier rẻ làm cẩn thận. Sự thật hữu ích nhất: với task đơn bước, đặc tả rõ, ngắn, cả ba tier thường cho output gần như giống nhau, nên trả tiền cho tier cao không mua được gì.

Hội thoại dài suy giảm vì hai lý do độc lập:

| Nguyên nhân | Biểu hiện | Cách xử lý |
|---|---|---|
| Volume | Chi tiết cũ không còn được phản chiếu | Summarize, hoặc đưa tài liệu nguồn vào project |
| Contamination | Output trôi về framing đã bị từ chối | Restart với handover đã tuyển chọn |

Contamination nguy hiểm ở chỗ cách sửa trực giác là sai: summary của một hội thoại nhiễm độc là summary nhiễm độc. Cách đúng là restart với handover chứa state (quyết định, ràng buộc) chứ không phải history, kèm danh sách hướng đã bị loại.

Khi thấy mình giải thích lại cùng một context qua nhiều chat, lớp bền vững đó thuộc về project instructions, project knowledge hoặc memory.

## 05. Thiết kế workflow quanh Claude (D4, 16%)

Output giá trị nhất của một buổi đánh giá fit thường là "không". Quy trình bị tự động hóa vì có người hào hứng, và thất bại hiện ra vài tháng sau dưới dạng workflow mà ai cũng lặng lẽ ngừng dùng.

Năm tiêu chí fit, chấm từng bước của quy trình thật:

| Tiêu chí | Câu hỏi |
|---|---|
| Input availability | Đầu vào có sẵn không |
| Output verifiability | Có biết output đúng sai không |
| Judgment locus | Phán đoán nằm ở đâu |
| Error tolerance | Sai thì chịu được không |
| Volume | Khối lượng nhân độ lặp |

Verifiability và judgment locus gánh phần lớn trọng lượng. Nếu không ai biết output đúng hay sai, bạn vừa tự động hóa việc sản xuất tài liệu không kiểm chứng được. Judgment chỉ định được như "đánh dấu mọi khoản trên 5.000" thì ổn; judgment là chính công việc thì không. Hầu hết quy trình thật là partial fit, và câu trả lời đúng thường là tự động hóa phần này thôi.

Bước chán nhất là bước ai cũng muốn tự động hóa, nhưng độ chán không tương quan với độ fit.

Augment hay redesign: mọi quy trình được định hình bởi cái gì đắt ở thời điểm nó được thiết kế.

| Lựa chọn | Làm gì | Giá |
|---|---|---|
| Augment | Giữ hình dạng quy trình, tăng tốc một bước | An toàn, dễ áp dụng |
| Redesign | Đổi quy trình vì ràng buộc cũ đã nới | Giá trị lớn hơn, tốn niềm tin và change management |

Phép thử: binding constraint có thực sự dịch chuyển không. Chưa dịch chuyển thì augment. Đã dịch chuyển và gọi tên được thì redesign đáng cân nhắc. Đường mạnh nhất thường là augment trước, chạy shadow mode lấy bằng chứng, rồi redesign bằng dữ liệu.

Lỗi nghiêm trọng phổ biến nhất: redesign làm thay đổi ngầm một control. Nếu accountability cho một lỗi bị dịch chuyển, phải nêu tên và được duyệt, không được lẻn vào dưới danh nghĩa tối ưu hiệu suất.

Bốn động tác dùng Claude để nghĩ thay vì để sản xuất:

| Động tác | Việc làm |
|---|---|
| Premortem | Giả định nó đã thất bại, viết lý do |
| Stakeholder mapping | Ai bị ảnh hưởng, ai phản đối |
| Assumption surfacing | Làm lộ giả định |
| Adversarial review | Tấn công kế hoạch |

Phép thử duy nhất: có nêu ra được thứ bạn chưa nghĩ tới không. Chỉ trả về điều bạn đã biết thì prompt mạnh hơn, hoặc chấp nhận kế hoạch đã vững.

Brief cho stakeholder: kế hoạch AI thất bại không phải vì kỹ thuật mà vì kỳ vọng đặt cao hơn thứ được giao. Nêu giới hạn không phải khiêm tốn, đó là cơ chế làm cho tuyên bố giá trị trở nên đáng tin. Bốn phần:

1. Claim định lượng kèm bằng chứng và sample size.
2. Giới hạn tường minh, những gì nó sẽ không làm.
3. Failure mode kèm cơ chế phát hiện, không phải lời trấn an.
4. Ask rõ ràng, đóng khung như quyết định của stakeholder.

Hedge không phải limit. "Nó không hoàn hảo" không phải trung thực mà là cái bẫy; limit phải đủ cụ thể để người nghe kiểm được nó có đúng hay không.

## 06. Projects, Instructions và Knowledge (D5, 12%)

| | Trả lời | Ví dụ |
|---|---|---|
| Instructions | Việc này nên làm thế nào | Luật đứng, tone, ràng buộc, hình dạng output mặc định |
| Knowledge | Việc này làm với cái gì | Tài liệu, dữ liệu, ví dụ |

Phép thử: nếu sự thật nền thay đổi, cái này có đổi không. Có thì là knowledge.

Instructions tốt phải có điều không được làm, hình dạng output mặc định, và làm gì khi thiếu thông tin. Knowledge tốt phải current, authoritative, necessary, consistent. "Viết briefing tháng" không phải instruction, đó là thứ bạn sẽ yêu cầu.

Phép thử đồng nghiệp: giao project cho một người khác, giả định ẩn lộ ra rất nhanh.

Hai kiểu fail ngược nhau của knowledge management: upload fail âm thầm (tài liệu đính kèm từ mấy tháng trước có thể đã lỗi thời, không có cảnh báo), connector fail theo hướng ngược (với tới nhiều hơn dự định, làm lộ tài liệu nhạy cảm).

Ba câu hỏi phạm vi, hỏi trước khi bật connector:

1. Nó với tới được gì?
2. Dữ liệu trong phạm vi đó là của ai?
3. Còn ai khác dùng project này?

Loại bỏ có chủ đích những gì quá nhạy cảm, quá biến động, mâu thuẫn hoặc chỉ ở rìa. Gắn tín hiệu lỗi thời bằng cách ghi ngày vào tiêu đề tài liệu và thêm một instruction yêu cầu đánh dấu nội dung cũ; biến fail vô hình thành fail hữu hình.

Project không hỏng, nó trôi. Bốn kiểu drift:

| Drift | Biểu hiện |
|---|---|
| Knowledge | Tài liệu nguồn bị thay thế, trả lời tự tin nhưng lỗi thời |
| Instruction | Luật đứng không còn phản ánh thực tế, output bị sửa tay |
| Scope | Task đổi, project không đổi, mỗi hội thoại phải sửa nhiều hơn |
| Ownership | Người dựng project rời đi, không ai biết vì sao có luật đó |

Ownership drift mở đường cho ba kiểu kia. Ba control để chặn:

| Control | Cách làm |
|---|---|
| Named owner | Ghi bằng văn bản trong instructions |
| Review cadence | Gắn với một sự kiện định kỳ thật, không phải lời nhắc lịch |
| Drift signal | Instruction buộc project tự báo cáo cấu hình mỗi lần dùng |

Drift signal mạnh nhất vì bám vào công việc đang diễn ra. Project đã drift vẫn cho output trôi chảy, đúng format, và đó chính là lý do nó tồn tại mà không ai nhận ra.

## 07. Governance, dữ liệu nhạy cảm và responsible use (D6, 15%)

Cách chậm sẽ không được dùng, nên khi dán dữ liệu vào Claude bạn có khoảng 2 giây để quyết định, bằng ba xô:

| Xô | Định nghĩa |
|---|---|
| Safe | Bạn sẽ email nó cho đồng nghiệp |
| Restricted | Dùng được sau khi biến đổi |
| Never | Có luật, hợp đồng hoặc quy định cụ thể nói không |

Năm phép biến đổi cho xô giữa: remove, replace, generalize, aggregate, synthesize. Phần lớn dữ liệu chuyên môn nằm ở đây. Lỗi phổ biến nhất là dán vài trường tưởng như vô hại mà cộng lại thì định danh được một người; luôn hỏi tổ hợp này tiết lộ điều gì.

Over-classification tốn kém ngang under-classification và khó thấy hơn nhiều, vì không ai báo cáo bản phân tích họ đã không chạy.

Tính phù hợp thuộc về task, không thuộc về tool: một thứ có thể hoàn toàn ổn để dán vào nhưng hoàn toàn sai để thực hiện. Bốn câu hỏi cho mỗi cách dùng:

1. Ai chịu hậu quả?
2. Nếu việc này được biết ra, bạn có thấy thoải mái không?
3. Có con người thực sự chịu trách nhiệm không?
4. Việc này có thay thế một hành vi được quản lý không?

Disclosure test: "một người review" không phải control nếu người đó không thực tế có thể nói không. Hỏi xem đã từng có ai nói không chưa. Ở khối lượng lớn, human review fail nếu reviewer không có quyền thật.

Đọc policy đúng cách: tìm điều khoản mà điều kiện kích hoạt của nó khớp với tình huống bạn, không phải điều khoản gần chủ đề nhất. Đọc điều kiện theo nghĩa đen trước. Không điều khoản nào chi phối thì đó là lỗ hổng để escalate, không phải giấy phép tiếp tục. Khi câu chữ mơ hồ, hỏi điều khoản đó dùng để làm gì. Nếu phán đoán của bạn sẽ lặp lại, xin quyết định chứ đừng lặng lẽ tự quyết.

Khi mọi policy đều pass mà vẫn thấy sai, kỹ năng không phải tìm câu trả lời sạch mà lý luận qua mâu thuẫn để quyết định có chủ đích và bảo vệ được: nêu các bên bị ảnh hưởng, nêu các lợi ích chính đáng đang xung đột, kiểm tra ở quy mô lớn, rồi ghi lại lý luận. Bản ghi đó chính là deliverable.

## 08. Troubleshooting output kém (D7, 10%)

Khi quy trình bắt đầu kém đi, phản xạ là viết lại prompt, nhưng prompt hiếm khi là nguyên nhân thật. Root cause diagnosis:

1. Lấy một ví dụ fail cụ thể và một case từng tốt, để chứng minh đây là regression.
2. Diff mọi điều kiện: input, người dùng, cấu hình.
3. Chạy four-cell isolation test để tách prompt khỏi input trong vài phút.
4. Kiểm cả trường hợp không có gì hỏng: chuẩn của người dùng đơn giản là đã cao lên.

Chẩn đoán mà không có ví dụ cụ thể chỉ là phỏng đoán đội lốt phương pháp. Yêu cầu đúng một output fail cụ thể.

Feedback loop thật: đổi prompt, thấy output tốt hơn, đi tiếp, thì đó không phải vòng lặp mà là một quan sát không có đối chứng. Vòng lặp thật cần baseline trước (đo output hiện tại khi chưa đổi gì), một bộ input cố định với rubric nhất quán, đổi một thứ, rồi đo lại. Đo cả các output lân cận để biết có làm hỏng chỗ khác không, và chấm blind để tránh anchoring. Không có baseline thì mọi tuyên bố đều không thể phản chứng; có baseline thì phỏng đoán thành bằng chứng.

Tối ưu hiệu suất: câu hỏi đầu tiên là có đáng tối ưu không, vì nguy cơ là mất một quy trình đang chạy tốt để đổi lấy lợi ích nhỏ. Thời gian thật thường không nằm ở chỗ bạn nghĩ: correction và reformatting thường chiếm phần lớn, không phải generation.

| Đòn | Việc làm |
|---|---|
| Configuration | Đưa context lặp lại vào configuration |
| Source | Sửa nguồn bị lệch format |
| Tier | Khớp tier với subtask |
| Steps | Bỏ các bước không còn làm việc gì |

Không bao giờ cắt verification hay human decision point, chỉ làm chúng rẻ hơn. Nếu một bước tồn tại vì một rủi ro, tối ưu cách làm chứ không phải câu hỏi có làm hay không.

## 09. Capstone: đưa một quy trình thật vào production

Bước 1, scope. Lỗi scope là loại đắt nhất vì mọi thứ xây lên trên đều thừa hưởng nó.

| Việc | Yêu cầu |
|---|---|
| Chọn quy trình | Có input thật, lặp lại, kiểm được output đúng sai |
| Chọn cái nhàm chán nhất | Process thú vị tương quan với complexity, judgment tranh cãi, output không kiểm chứng được |
| Scope | Vào một bước, không phải cả quy trình; viết rõ phần ngoài scope |
| Success criteria | Đủ cụ thể để phát hiện mình đã không đạt |
| Guard | Nêu cái gì không được tệ đi |
| Kill criterion | Ngưỡng thật sự khiến bạn bỏ cuộc |

Bước 2, xây cho người khác chạy được. Quy trình production fail ở input awkward mà không ai thiết kế cho, không phải happy path.

| Việc | Cách làm |
|---|---|
| Feature shape | Project, không phải memory |
| Failure mode | Instructions đóng chúng tường minh, ví dụ không được đoán category trong im lặng |
| Knowledge | Curate đúng lượng task cần |
| Prompt hàng tuần | Giữ ngắn, để tacit knowledge nằm trong configuration |
| Test | Input cố tình awkward: thiếu field, không chỉ nội dung thưa |

Mặc định sẽ có ít nhất một chỗ vỡ khi test.

Bước 3, validate. Hai deliverable: bằng chứng đo theo tiêu chí ở bước 1, và control document nêu cái gì có thể sai, cái gì bắt được, ai sở hữu, khi nó kích hoạt thì làm gì.

Control không có trigger, tức không có thứ khiến người ta phải nhìn, chỉ là hy vọng. Và tiêu chí không đo được là tiêu chí viết tồi; phát hiện điều đó ngay bây giờ chính là mục đích. Đánh giá độc lập trước: nếu bạn hình thành đánh giá sau khi đã xem output, toàn bộ validation vô giá trị.

Bước 4, trình bày. Một quy trình không được duyệt thì không tồn tại. Brief 4 phần như module 05, thêm hai điểm: tự nguyện nêu rủi ro bạn thấy khó chịu nhất trước khi họ tìm ra, và chuẩn bị nhượng bộ một điểm vì điều đó chứng tỏ bạn biết phần nào là kết cấu chịu lực.

Gọi nó là validated with known risks, không phải finished. Cách mô tả đó vừa chính xác vừa thuyết phục hơn.

## Câu hỏi tự kiểm sau mỗi module

| Module | Câu hỏi duy nhất cần trả lời được |
|---|---|
| 01 | Prompt thiếu khối nào trong 5 khối? |
| 02 | Claim nào chưa được kiểm tại nguồn, và tôi đã ghi lại điều gì không kiểm? |
| 03 | Người đọc sẽ làm gì khác sau khi đọc? |
| 04 | Task này có lặp lại không, và subtask này cần bao nhiêu judgment? |
| 05 | Binding constraint có thực sự dịch chuyển, hay tôi chỉ đang tăng tốc một bước? |
| 06 | Đây là standards (instruction) hay facts (knowledge)? |
| 07 | Điều khoản nào thực sự chi phối tình huống này? |
| 08 | Ví dụ fail cụ thể đâu, và baseline là gì? |
| 09 | Tiêu chí này có đo được không, và control của nó có trigger không? |
