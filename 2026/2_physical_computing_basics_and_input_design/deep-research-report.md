# フィジカルコンピューティング：基礎・入力・出力の深掘りリサーチ

## フィジカルコンピューティングの基本概念
フィジカルコンピューティングは、センサーなどで「現実世界の状態」を取り込み（入力）、プログラムで解釈・判断し（処理）、光・音・動きなどで「現実世界へ働きかける」（出力）インタラクティブなシステムを扱う考え方として説明されることが多いです。教育・創作の文脈では、単なる工学技術というより、身体／空間／素材とデジタルの関係を設計する“創作フレーム”として扱われる点が特徴です。citeturn4search2turn4search10

芸術大学の学生に伝えるうえで有効なのは、「入力→処理→出力」を“表現の文法”として捉える導入です。たとえば、入力は観客の行為・環境の変化（押す／振る／近づく／温度が変わる）、出力は作品の反応（光る／鳴る／動く／表示が変わる）であり、その間の処理こそが作者の意図（ルール、リズム、抑揚、インタラクションの作法）になります。こうした枠組みは、インタラクティブシステムが「周囲を感じ、反応する」ことで成立する点で、HCIや体験設計とも地続きです。citeturn4search2turn4search14

もう一つの重要点は「センサー値をどう反応に結びつけるか（マッピング）」が制作の核になりやすいことです。センサー値は連続的・ノイズを含むことが多く、閾値・スケーリング・平滑化・遅延・ヒステリシス（戻りの幅）など、表現に直結する調整項目が必ず出てきます。これは「正解のコード」よりも「意図に合う挙動」を探る反復になりやすく、作品制作のプロセス（試作→観察→調整）と相性が良い点として授業設計に活かせます。citeturn3search1turn4search14

## micro:bit と MakeCode の学習環境
この授業でmicro:bitとMakeCodeを使う設計は、「入力→処理→出力」を最短距離で体験させる目的に合っています。micro:bitは、5×5 LEDマトリクス、ボタン、加速度センサー、コンパス、温度センサー、外部接続用のピンなど、作品の“最小構成パーツ”が1枚の基板にまとまっており、作品の反応をその場で観察して修正できます。citeturn0search3turn0search0

さらにmicro:bit v2では、マイクとスピーカー、タッチ（ロゴ）などが追加され、音を「入力（拍手・声量など）」と「出力（鳴らす）」の両方で扱いやすくなりました。citeturn0search19turn3search11

MakeCodeはブラウザで動くエディタで、ブロック操作からテキスト（JavaScript/TypeScript）への往復を前提に設計されています。entity["company","Microsoft","software company"]のMakeCodeは、ブロック・Static TypeScript（MakeCode上の“JavaScript”表記）・Static Pythonを扱い、ブロックやPythonがStatic TypeScriptへ変換されてコンパイルされる、と公式に説明されています。citeturn3search8turn3search0turn0search8

ハイブリッド授業（現地＝実機、リモート＝シミュレーター）との相性も良く、たとえばボタン入力はブラウザ上のシミュレーター操作でも成立することが、MakeCode側の説明として明記されています。citeturn3search33  
現地参加者の「書き込み（フラッシュ）」手順についても、USB接続時に`MICROBIT`ドライブとして見える／ドラッグ&ドロップで転送する、という“作業の具体性”が学習体験を支えます。citeturn3search5

image_group{"layout":"carousel","aspect_ratio":"16:9","query":["BBC micro:bit v2 board close up","Microsoft MakeCode micro:bit editor screenshot","micro:bit 5x5 LED matrix display example","micro:bit v2 built-in speaker microphone"],"num_per_query":1}

## 入力の理解を深めるポイント
授業メモにある「ボタン・加速度・温度」を、表現の観点で“入力の性質”として整理すると説明が通りやすくなります。MakeCodeの入力（Input）リファレンスでは、ボタン、ジェスチャー（Shake等）、加速度、光、温度、方位（コンパス）などが一覧化され、イベント型（onButtonPressed / onGesture）と値取得型（temperature / acceleration 等）の両方が用意されています。citeturn3search1turn3search33

ボタン入力は「イベント」として扱えるため、インタラクション設計の導入に向きます。ボタンA/B、同時押し（A+B）などがあり、実機がない場合でもシミュレーター上で同じイベントを発火できる、と説明されています。citeturn3search33

加速度センサーは、値（X/Y/Zの加速度）として読むだけでなく、「振った」「傾けた」といったジェスチャーへ抽象化できる点が、身体性のある入力として強いです。MakeCodeはジェスチャー検出や加速度・回転角などのAPIを提供しており、作品を“身体で操作する”入口になります。citeturn3search1turn0search0

温度センサーは、センサーの“限界と解釈”を学ぶ格好の題材です。MakeCodeの温度取得は、micro:bitのCPU（チップ）の温度を参照し、通常は環境温度に近いが、負荷が高いと温まり得る、と説明されています。つまり「温度」というラベルでも“測っている対象が何か”を問い直す必要があり、アート／デザインでいう素材特性の読み替え（現象の翻訳）につながります。citeturn3search25turn0search3

## 出力の理解を深めるポイント
出力は「見える／聞こえる」フィードバックとして学習効果が高く、LEDとスピーカーは“即時に反応が分かる”代表例です。MakeCodeではLED表示（show leds / show string / show icon等）と音（play tone等）がリファレンスとして整理されており、授業内で参照しながら進めやすい構造です。citeturn3search26turn3search22

LEDは5×5の格子として説明され、パターンを点灯させる例（`basic.showLeds`）も公式に提示されています。視覚表現としては、文字スクロール・アイコン・抽象パターン・簡易アニメーションなど、“情報”にも“情緒”にも寄せられるのが利点です。citeturn3search6turn3search2

音出力は、周波数（Hz）と時間で制御する`music.playTone`が基本形で、micro:bit v2の内蔵スピーカー利用や、ピン出力への切替もAPIとして用意されています。加えて、ブラウザの種類などによりシミュレーターで音が動作しない場合がある、という注意も明記されているため、ハイブリッド授業では「現地＝確実に鳴る」「リモート＝鳴らない場合もある」を事前に共有するとトラブルが減ります。citeturn3search3turn3search11turn3search19

## 芸術・デザイン教育で参照しやすい事例
芸術大学向けには、「入力→処理→出力」が“巨大化・高解像度化した同型”として見える事例が特に効きます。授業メモに近い文脈で、作品の仕組みを“センサー（入力）／メディア（出力）／ルール（処理）”に分解して語れる参照例を挙げます。

entity["organization","teamLab","art collective"]の作品群は、光・映像・音が空間全体を満たし、鑑賞者の関与によって作品が変容する（相互作用する）ことをコンセプト説明として前面に出しています。たとえば作品説明の中で「人々の相互作用で変化する」旨が示されており、観客参加型インスタレーションの代表例として扱いやすいです。citeturn1search6turn1search0

一方、entity["people","Zimoun","sound artist"]のサウンド・インスタレーションは、単純な機械要素（小型モーター等）の反復・集合が、空間規模の音響／リズム体験へ立ち上がる例です。entity["point_of_interest","Exploratorium","San Francisco, CA, US"]の展示解説では、段ボール箱と綿球、モーターを組み合わせたサウンド彫刻の具体的構成（各箱が打たれて音が生まれる）が記述されており、入力（機械駆動）と出力（音の生成）の因果が観察しやすい教材になります。citeturn1search1

観客検出と環境制御の例としては、entity["organization","Random International","art studio"]の《Rain Room》が有名です。entity["point_of_interest","Los Angeles County Museum of Art","Los Angeles, CA, US"]の展示ページでは「人の身体が検出される場所で雨が止まる」旨が説明され、スタジオ側の作品説明でも、来場者が雨の中を濡れずに移動できる体験が中心に据えられています。センサー（検出）→制御（止水）→環境変化（雨の制御）という構造が明快で、micro:bitのボタンや加速度を“人検出”の縮小模型として捉える説明にもつなげやすいです。citeturn1search10turn1search4

image_group{"layout":"carousel","aspect_ratio":"16:9","query":["teamLab interactive installation projection Tokyo","Zimoun cardboard box motor sound installation","Random International Rain Room installation visitors","interactive art motion sensors projection mapping"],"num_per_query":1}

## AI時代のトレンドと授業内での扱い方
授業メモにある「AI（Copilot・ChatGPT等）でコード生成・修正」については、学習目標（自分の言葉で説明できる）と結び付けて、“AIを使うほど説明責任が増える”設計にすると教育効果が上がります。

コード生成支援の代表例として、entity["company","GitHub","developer platform"]のCopilotは、エディタ内の文脈（カーソル周辺や開いているファイル等）からコード候補を提示し、ユーザーが採用・編集していく形として説明されています。つまり「自動で完成する」より「提案から共同編集する」設計であり、授業では“採用条件（何を満たせばOKか）を言語化する”練習に向きます。citeturn2search20turn2search0turn2search8

entity["company","OpenAI","AI research company"]の開発者向けガイドでは、モデルにテキスト生成（コードや構造化データを含む）をさせる際のプロンプト工夫（具体化、コンテキスト提示など）を体系として提示しています。これを授業に移すなら、学生に「欲しい挙動を仕様として書く→AIにコード化させる→コードの説明を要求する→挙動確認→仕様へ戻って修正」という往復を体験させるのが効果的です。citeturn2search37turn2search17turn2search1

センサー×AIの“手触り”を授業で出すなら、micro:bit公式のCreateAI系教材が、そのまま導線になります。micro:bit CreateAIは、加速度データを収集し、動きのパターンを学習したモデルをmicro:bit上で動かす（Webベース）と説明されており、「センサー値→分類→出力」という一段上の処理を扱えます。Day2で作った入出力の回路に「学習済みの判断器」が挿入される形で、Day3の応用制作へ自然に接続できます。citeturn1search19turn1search11turn1search8

より広いトレンドとしては、端末側（エッジ）で推論するTinyML／エッジAIが普及し、マイコン級デバイスでもモデルを動かす技術が整ってきました。たとえばTensorFlow Lite for Microcontrollersは、C++で動作し、Arm Cortex-M系など32ビットMCUでの利用が想定されている、と公式に説明されています。またGoogleのLiteRT for Microcontrollersの概要でも、非常に小さなメモリフットプリントでマイコン上にモデルを載せる設計思想が示されています。citeturn2search6turn2search26

実制作寄りのプラットフォームとしては、entity["company","Edge Impulse","edge AI platform company"]が、データ収集・学習・最適化・デプロイまでの手順をドキュメントとして提供し、「Pythonで学習コードを書く」以前に“データとモデルの反復”を体験できる構成になっています。作品制作における反復（素材実験）と相性が良い枠組みです。citeturn2search7turn2search15turn2search3

さらに近年の「Physical AI（フィジカルAI）」という語は、AIが物理世界を知覚し、判断し、行動する（ロボットや自動運転など）方向性を指す説明として、entity["company","NVIDIA","semiconductor company"]などが用語解説を公開しています。定義としては、センサー情報を統合して現実世界で複雑な行動を実行する自律システム、という整理が提示されています。Day2で扱うmicro:bitの入力→出力はスケールこそ小さいものの、「知覚→判断→作用」という根は同じだと接続して語れます。citeturn0search2turn0search30turn0search38

## 参考URL集
下記は、授業メモの内容（概念、micro:bit/MakeCode実習、芸術事例、AIトレンド）を裏取りでき、学生にもそのまま配布しやすい一次情報／公式ドキュメント中心のリンクです。micro:bitとMakeCodeは公式の機能概要・APIリファレンスが充実しており、特にInput（センサー）とMusic/LED（出力）は授業中に“辞書”として使えます。citeturn0search3turn0search12turn0search4turn3search1turn3search26  
またCreateAIは「センサー×AI」を授業に組み込む際の最短導線として、公式ガイドがまとまっています。citeturn1search19turn1search11  
アート事例は、作り手／展示館の公式説明を優先すると「どんな体験を狙い、どう反応するか」を信頼できる文章で引用しやすくなります。citeturn1search6turn1search1turn1search10turn1search4  
AI支援（コード生成）は、CopilotとOpenAIの公式ガイドが“使い方の前提（提案→採用→編集、プロンプト設計）”を説明しているため、学習目標（説明できる）と整合しやすいです。citeturn2search0turn2search20turn2search37turn2search17

```text
[フィジカルコンピューティング基礎・教材設計]
https://en.wikipedia.org/wiki/Physical_computing
https://www.computer.org/csdl/magazine/co/2020/04/09062372/1iTqAgm4hag
https://ixdf.org/literature/topics/tangible-interaction
https://itp.nyu.edu/itp/introduction-to-physical-computing/
https://tigoe.com/courses.html

[micro:bit 機能・ハード]
https://microbit.org/get-started/features/overview/
https://tech.microbit.org/hardware/
https://support.microbit.org/support/solutions/articles/19000119052-details-of-micro-bit-v2

[MakeCode（micro:bit）全体・ドキュメント]
https://makecode.microbit.org/
https://makecode.microbit.org/docs
https://makecode.microbit.org/reference
https://makecode.com/language
https://makecode.microbit.org/javascript

[入力（センサー）API]
https://makecode.microbit.org/reference/input
https://makecode.microbit.org/reference/input/on-button-pressed
https://makecode.microbit.org/reference/input/temperature

[出力（LED・音）API]
https://makecode.microbit.org/device/screen
https://makecode.microbit.org/reference/basic/show-leds
https://makecode.microbit.org/reference/music/play-tone
https://makecode.microbit.org/reference/music/set-built-in-speaker-enabled
https://makecode.microbit.org/reference/pins/set-audio-pin

[センサー×AI（micro:bit CreateAI）]
https://microbit.org/ai/
https://microbit.org/get-started/user-guide/microbit-createai/
https://microbit.org/teach/lessons/introduction-to-machine-learning/

[アート事例（公式説明）]
https://www.teamlab.art/concept/lightsculpture-point/
https://www.exploratorium.edu/exhibits/405-prepared-dc-motors-cotton-balls-cardboard-boxes-46x46x46
https://www.lacma.org/art/exhibition/rain-room
https://www.random-international.com/rain-room

[Physical AI / エッジAI（トレンド）]
https://www.nvidia.com/en-us/glossary/generative-physical-ai/
https://blog.st.com/physical-ai/
https://docs.edgeimpulse.com/
https://docs.edgeimpulse.com/hardware
https://www.tensorflow.org/lite/microcontrollers?hl=ja
https://ai.google.dev/edge/litert/microcontrollers/overview

[コード生成AI（使い方の前提）]
https://docs.github.com/ja/copilot/how-tos/get-code-suggestions/get-ide-code-suggestions
https://github.com/features/copilot
https://developers.openai.com/api/docs/guides/prompt-engineering/
https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
```