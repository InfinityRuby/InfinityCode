quests = [
  {
    title: 'Hello InfinityCode!',
    level: 'Easy',
    description: '讓我們一起踏入 Ruby 的世界吧！<br />首先請繼續按照指示完成此題練習吧！請在右側程式編輯器中輸入：<br />`print "Hello InfinityCode!!"`',
    picture: '',
    problem: ''
  },
  {
    title: '兩數之和',
    level: 'Easy',
    description: '給定一個整數陣列 `nums` 以及一個整數目標值 `target` ，請在該陣列中找出相加總和為目標值的兩數。並回傳其數字於陣列中的索引值。<br />
    你可以假設每種輸入值只會對應一個答案。同時，整數陣列中的同一元素不得重複使用。<br />
    你可以按任意順序回傳答案。',
    picture: '',
    problem: File.read("./public/problem/q-2.txt")
  },
  {
    title: '陣列重組',
    level: 'Easy',
    description: '給你一個整數陣列 `nums` ，陣列中包含 `2n` 個元素，並依照 `[x1, x2, ..., xn, y1, y2, ..., yn]` 規則排序。<br />
    請將陣列按照 `[x1, y1, x2, y2, ..., xn, yn]` 的新規則進行重組並回傳。',
    picture: '![](/quest/3-picture.png)',
    problem: File.read("./public/problem/q-3.txt")
  },
  {
    title: '三數之和',
    level: 'Medium',
    description: '給你一個包含 `n` 個整數的陣列 `nums` ，判斷 `nums` 中是否存在三個元素 *a、b、c* ，使得三個數字總和為 0 。請你找出總和為 0 且元素不重複的組合。<br />
    **注意：**答案中不可以包含重複的陣列組合。',
    picture: '![](/quest/4-picture.png)',
    problem: File.read("./public/problem/q-4.txt")
  },
  {
    title: '缺少的第一個正整數',
    level: 'Hard',
    description: '給你一個尚未排序的整數陣列 `nums` ，請找出其中沒有出現且最小的正整數。<br />
    請你讓時間複雜度為 `O(n)` 並且只使用常數級別額外空間的解決方案。',
    picture: '![](/quest/5-picture.png)',
    problem: File.read("./public/problem/q-5.txt")
  },
  {
    title: '回文數字',
    level: 'Easy',
    description: 'Given an integer `x`, return `true` if `x` is palindrome integer.<br />
    An integer is a **palindrome** when it reads the same backward as forward. For example, `121` is palindrome while `123` is not.',
    picture: '![](/quest/6-picture.png)',
    problem: File.read("./public/problem/q-6.txt")
  },
  {
    title: '刪除列表的倒數第 N 個節點',
    level: 'Medium',
    description: 'Given the `head` of a linked list, remove the `$n^{th}$` node from the end of the list and return its head.<br />
    **Follow up:** Could you do this in one pass?',
    picture: '![](/quest/7-picture.png)',
    problem: File.read("./public/problem/q-7.txt")
  },
  {
    title: '有效的括號',
    level: 'Easy',
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.<br />
    An input string is valid if:<br />
    1. Open brackets must be closed by the same type of brackets.<br />
    2. Open brackets must be closed in the correct order.',
    picture: '![](/quest/8-picture.png)',
    problem: File.read("./public/problem/q-8.txt")
  },
  {
    title: '刪除有序數列中的重複項目',
    level: 'Easy',
    description: 'Given a sorted array *nums*, remove the duplicates in-place such that each element appears only *once* and returns the new length.<br />
    Do not allocate extra space for another array, you must do this by **modifying the input array in-place with O(1) extra memory.<br />
    **Clarification:**<br />
    Confused why the returned value is an integer but your answer is an array?<br />
    Note that the input array is passed in by **reference**, which means a modification to the input array will be known to the caller as well.<br />
    Internally you can think of this:',
    picture: '![](/quest/9-picture.png)',
    problem: File.read("./public/problem/q-9.txt")
  },
  {
    title: '外觀數列',
    level: 'Medium',
    description: 'The **count-and-say** sequence is a sequence of digit strings defined by the recursive formula:<br />
    - `countAndSay(1) = "1"`<br />
    - `countAndSay(n)` is the way you would "say" the digit string from `countAndSay(n-1)`, which is then converted into a different digit string.<br />
    To determine how you "say" a digit string, split it into the **minimal** number of groups so that each group is a contiguous section all of the **same character.** Then for each group, say the number of characters, then say the character. To convert the saying into a digit string, replace the counts with a number and concatenate every saying.<br />
    For example, the saying and conversion for digit string `"3322251"`:',
    picture: '![](/quest/10-picture.png)',
    problem: File.read("./public/problem/q-10.txt")
  },
  {
    title: 'x 的平方根',
    level: 'Easy',
    description: '給定一個非負整數 `x` ，計算並回傳 `x` *的平方根*。<br />
    由於回傳的型別是整數，如果有小數部分將 **無條件捨去**，並只保留 **整數部分** 的結果回傳。',
    picture: '![](/quest/11-picture.png)',
    problem: File.read("./public/problem/q-11.txt")
  },
  {
    title: '爬樓梯',
    level: 'Easy',
    description: '你正在爬樓梯，需要 `n` 階才能到達頂樓。<br />
    每次你可以選擇爬 `1` 或 `2` 個階梯。你有多少種不同的方法可以爬到頂樓呢？',
    picture: '![](/quest/12-picture.png)',
    problem: File.read("./public/problem/q-12.txt")
  },
  {
    title: '矩陣置零',
    level: 'Medium',
    description: 'Given an `m * n` matrix. If an element is **0**, set its entire row and column to **0**. Do it in-place.<br />
    **Follow up:**<br />
    - A straight forward solution using O(*m*n*) space is probably a bad idea.<br />
    - A simple improvement uses O(*m* + *n*) space, but still not the best solution.<br />
    - Could you devise a constant space solution?',
    picture: '![](/quest/13-picture.png)',
    problem: File.read("./public/problem/q-13.txt")
  },
  {
    title: '顏色排序',
    level: 'Medium',
    description: 'Given an array `nums` with `n` objects colored red, white, or blue, sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.<br />
    We will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.<br />
    You must solve this problem without using the library\'s sort function.',
    picture: '![](/quest/14-picture.png)',
    problem: File.read("./public/problem/q-14.txt")
  },
  {
    title: '最小覆蓋的字串',
    level: 'Hard',
    description: 'Given two strings `s` and `t` of lengths `m` and `n` respectively, return *the minimum window in `s` which will contain all the characters in `t`*. If there is no such window in `s` that covers all characters in `t`, return *the empty string `""`*.<br />
    **Note** that If there is such a window, it is guaranteed that there will always be only one unique minimum window in `s`.',
    picture: '![](/quest/15-picture.png)',
    problem: File.read("./public/problem/q-15.txt")
  }
]

prompts = [
  {
    quest_id: 1,
    aseq: 1,
    hint: '請使用 Ruby 中印出字串的 `puts` 或是 `print` 方法。'
  },
  {
    quest_id: 1,
    aseq: 2,
    hint: '請使用雙引號將字串前後包住 → ""'
  },
  {
    quest_id: 2,
    aseq: 1,
    hint: '可以採暴力解法去搜尋每一對可能的數字組合，這個方法可用但效率非常慢。但同樣地，為了先完整將此題解出來，你可以先使用暴力解法。待成功後，再持續修正改善你的解法。'
  },
  {
    quest_id: 2,
    aseq: 2,
    hint: '第二個思考方向是，在不改變數字陣列的情況下，我們能以某種方式使用額外的空間嗎？像是用一個雜湊表 (hash map) 來加速查詢速度？'
  },
  {
    quest_id: 3,
    aseq: 1,
    hint: '使用兩個變數當作指標，去建立出包含 2n 個元素的新陣列。第一個從陣列開頭開始，而另一個從 $(n+1)^{th}$ 位置開始。輪流將其元素取出至新陣列，並移動指標依序取出。'
  },
  {
    quest_id: 4,
    aseq: 1,
    hint: '所以實質上我們需要找到三個數字 a、b、c ，以至於他們的總和會剛好等於目標值 。假如我們想調整其中一個數字 a ，剩下的兩數就等同「兩數之和」這題的概念了。'
  },
  {
    quest_id: 4,
    aseq: 2,
    hint: '針對「兩數之和」的問題，如果我們修正其一數字 `a` ，<br />我們必須去掃描整個陣列找到下一個數字 `b`<br />也就是 `目標值 - a`<br />然而目標值是輸入的參數。我們可以用某種方式改變我們的陣列，以至於讓搜尋速度更快嗎?'
  },
  {
    quest_id: 5,
    aseq: 1,
    hint: '想想看你會如何解決非常數問題？你能運用相同邏輯想法在既有的空間嗎？'
  },
  {
    quest_id: 5,
    aseq: 2,
    hint: '我們並不在意重複或是非正整數的問題'
  },
  {
    quest_id: 5,
    aseq: 3,
    hint: '切記 O(2n) = O(n)'
  },
  {
    quest_id: 6,
    aseq: 1,
    hint: 'Beware of overflow when you reverse the integer.'
  },
  {
    quest_id: 7,
    aseq: 1,
    hint: 'Maintain two pointers and update one with a delay of n steps.'
  },
  {
    quest_id: 8,
    aseq: 1,
    hint: 'An interesting property about a valid parenthesis expression is that a sub-expression of a valid expression should also be a valid expression. (Not every sub-expression) e.g.'
  },
  {
    quest_id: 8,
    aseq: 2,
    hint: 'What if whenever we encounter a matching pair of parenthesis in the expression, we simply remove it from the expression? This would keep on shortening the expression. e.g.'
  },
  {
    quest_id: 8,
    aseq: 3,
    hint: 'The stack data structure can come in handy here in representing this recursive structure of the problem. We can\'t really process this from the inside out because we don\'t have an idea about the overall structure. But, the stack can help us process this recursively i.e. from outside to inwards.'
  },
  {
    quest_id: 9,
    aseq: 1,
    hint: 'In this problem, the key point to focus on is the input array being sorted. As far as duplicate elements are concerned, what is their positioning in the array when the given array is sorted? Look at the image above for the answer. If we know the position of one of the elements, do we also know the positioning of all the duplicate elements?'
  },
  {
    quest_id: 9,
    aseq: 2,
    hint: 'In this problem, the key point to focus on is the input array being sorted. As far as duplicate elements are concerned, what is their positioning in the array when the given array is sorted? Look at the image above for the answer. If we know the position of one of the elements, do we also know the positioning of all the duplicate elements?'
  },
  {
    quest_id: 9,
    aseq: 3,
    hint: 'Essentially, once an element is encountered, you simply need to bypass its duplicates and move on to the next unique element.'
  },
  {
    quest_id: 10,
    aseq: 1,
    hint: 'The following are the terms from n=1 to n=10 of the count-and-say sequence'
  },
  {
    quest_id: 10,
    aseq: 2,
    hint: 'To generate the $n^t$ term, just count and say the $n-1^t$ term.'
  },
  {
    quest_id: 11,
    aseq: 1,
    hint: 'Try exploring all integers. (Credits: @annujoshi)'
  },
  {
    quest_id: 11,
    aseq: 2,
    hint: 'Use the sorted property of integers to reduced the search space. (Credits: @annujoshi)'
  },
  {
    quest_id: 12,
    aseq: 1,
    hint: 'To reach nth step, what could have been your previous steps? (Think about the step sizes)'
  },
  {
    quest_id: 13,
    aseq: 1,
    hint: 'If any cell of the matrix has a zero we can record its row and column number using additional memory. But if you don\'t want to use extra memory then you can manipulate the array instead. i.e. simulating exactly what the question says.'
  },
  {
    quest_id: 13,
    aseq: 2,
    hint: 'Setting cell values to zero on the fly while iterating might lead to discrepancies. What if you use some other integer value as your marker? There is still a better approach for this problem with 0(1) space.'
  },
  {
    quest_id: 13,
    aseq: 3,
    hint: 'We could have used 2 sets to keep a record of rows/columns which need to be set to zero. But for an O(1) space solution, you can use one of the rows and and one of the columns to keep track of this information.'
  },
  {
    quest_id: 13,
    aseq: 4,
    hint: 'We can use the first cell of every row and column as a flag. This flag would determine whether a row or column has been set to zero.'
  },
  {
    quest_id: 14,
    aseq: 1,
    hint: 'A rather straight forward solution is a two-pass algorithm using counting sort.'
  },
  {
    quest_id: 14,
    aseq: 2,
    hint: 'Iterate the array counting number of 0\'s, 1\'s, and 2\'s.'
  },
  {
    quest_id: 14,
    aseq: 3,
    hint: 'Overwrite array with the total number of 0\'s, then 1\'s and followed by 2\'s.'
  },
  {
    quest_id: 15,
    aseq: 1,
    hint: 'Use two pointers to create a window of letters in S, which would have all the characters from T.'
  },
  {
    quest_id: 15,
    aseq: 2,
    hint: "Since you have to find the minimum window in \nS\nwhich has all the characters from\nT\n, you need to expand and contract the window using the two pointers and keep checking the window for all the characters. This approach is also called Sliding Window Approach."
  }
]

test_cases = [
  {
    quest_id: 1,
    input: "",
    output: "Hello InfinityCode!!"
  },
  {
    quest_id: 2,
    input: "two_sum([2, 7, 11, 15], 9)",
    output: "[0, 1]"
  },
  {
    quest_id: 2,
    input: "two_sum([2, 7, 11, 15], 9)",
    output: "[0, 1]"
  },
  {
    quest_id: 2,
    input: "two_sum([3, 2, 4], 6)",
    output: "[1, 2]"
  },
  {
    quest_id: 2,
    input: "two_sum([3, 3], 6)",
    output: "[0, 1]"
  },
  {
    quest_id: 3,
    input: "shuffle([2, 5, 1, 3, 4, 7], 3)",
    output: "[2, 3, 5, 4, 1, 7]"
  },
  {
    quest_id: 4,
    input: "three_sum([-1, 0, 1, 2, -1, -4])",
    output: "[[-1, -1, 2], [-1, 0, 1]]"
  },
  {
    quest_id: 5,
    input: "first_missing_positive([1, 2, 0])",
    output: "3"
  },
  {
    quest_id: 6,
    input: "first_missing_positive(x = 121)",
    output: "true"
  },
  {
    quest_id: 7,
    input: "first_missing_positive(head = [1,2,3,4,5], n = 2)",
    output: "[1,2,3,5]"
  },
  {
    quest_id: 8,
    input: "first_missing_positive(s = '()')",
    output: "true"
  },
  {
    quest_id: 9,
    input: "first_missing_positive(nums = [1,1,2])",
    output: "2, nums = [1,2]"
  },
  {
    quest_id: 10,
    input: "first_missing_positive(n = 1)",
    output: "1"
  },
  {
    quest_id: 11,
    input: "first_missing_positive(2 = 4)",
    output: "2"
  },
  {
    quest_id: 12,
    input: "first_missing_positive(n = 2)",
    output: "2"
  },
  {
    quest_id: 13,
    input: "first_missing_positive(matrix = [[1,1,1],[1,0,1],[1,1,1]]])",
    output: "[[1,0,1],[0,0,0],[1,0,1]]"
  },
  {
    quest_id: 14,
    input: "first_missing_positive(nums = [2,0,2,1,1,0])",
    output: "[0,0,1,1,2,2]"
  },
  {
    quest_id: 15,
    input: "first_missing_positive(s = \"ADOBECODEBANC\", t = \"ABC\")",
    output: "BANC"
  }
]

badges = [
  {
    description: '發表超過 10 篇文章',
    image: '/badges/1-post-10.png'
  },
  {
    description: '發表超過 50 篇文章',
    image: '/badges/1-post-50.png'
  },
  {
    description: '發表超過 100 篇文章',
    image: '/badges/1-post-100.png'
  },
  {
    description: '發表超過 500 篇文章',
    image: '/badges/1-post-500.png'
  },
  {
    description: '留言超過 10 次',
    image: '/badges/2-comment-10.png'
  },
  {
    description: '留言超過 50 次',
    image: '/badges/2-comment-50.png'
  },
  {
    description: '留言超過 100 次',
    image: '/badges/2-comment-100.png'
  },
  {
    description: '留言超過 500 次',
    image: '/badges/2-comment-500.png'
  },
  {
    description: '金幣收集超過 10 個',
    image: '/badges/3-coin-10.png'
  },
  {
    description: '金幣收集超過 50 個',
    image: '/badges/3-coin-50.png'
  },
  {
    description: '金幣收集超過 100 個',
    image: '/badges/3-coin-100.png'
  },
  {
    description: '金幣收集超過 500 個',
    image: '/badges/3-coin-500.png'
  },
  {
    description: '註冊超過 10 天',
    image: '/badges/4-signup-10.png'
  },
  {
    description: '註冊超過 50 天',
    image: '/badges/4-signup-50.png'
  },
  {
    description: '註冊超過 100 天',
    image: '/badges/4-signup-100.png'
  },
  {
    description: '註冊超過 500 天',
    image: '/badges/4-signup-500.png'
  },
  {
    description: '匿名發文',
    image: '/badges/5-anonymous-post.png'
  },
  {
    description: '更改使用者姓名',
    image: '/badges/5-change-username.png'
  },
  {
    description: '排行榜第一',
    image: '/badges/5-rank-1.png'
  },
  {
    description: '上傳大頭貼',
    image: '/badges/5-upload-img.png'
  },
  {
    description: '完成簡單所有題目',
    image: '/badges/6-finish-easy.png'
  },
  {
    description: '完成中等所有題目',
    image: '/badges/6-finish-medium.png'
  },
  {
    description: '完成困難所有題目',
    image: '/badges/6-finish-hard.png'
  },
  {
    description: '解題超過 10 題',
    image: '/badges/7-quest-10.png'
  },
  {
    description: '解題超過 100 題',
    image: '/badges/7-quest-100.png'
  },
  {
    description: '解題超過 500 題',
    image: '/badges/7-quest-500.png'
  }
]

answer_status = ["Success", "Failure"]

ActiveRecord::Base.transaction do
  quests.each do |quest|
    Quest.create!(
      title: quest[:title],
      level: quest[:level],
      description: quest[:description],
      picture: quest[:picture],
      problem: quest[:problem]
    )
  end

  prompts.each do |prompt|
    Prompt.create!(
      quest_id: prompt[:quest_id],
      aseq: prompt[:aseq],
      hint: prompt[:hint]
    )
  end

  test_cases.each do |test_case|
    Case.create!(
      quest_id: test_case[:quest_id],
      input: test_case[:input],
      output: test_case[:output]
    )
  end

  badges.each do |badge|
    Badge.create!(
      description: badge[:description],
      image: badge[:image]
    )
  end

  if User.count > 0
    last_user_id = User.last.id

    10.times do
      Post.create(
        title: Faker::Lorem.paragraph,
        content: Faker::Lorem.paragraph(sentence_count: 2),
        user_id: Faker::Number.between(from: 1, to: last_user_id)
      )
    end

    10.times do
      Comment.create(
        content: Faker::Lorem.paragraph,
        user_id: Faker::Number.between(from: 1, to: last_user_id),
        post_id: Faker::Number.between(from: 1, to: 10)
      )
    end

    10.times do
      Coin.create(
        user_id: Faker::Number.between(from: 1, to: last_user_id),
        coin_change: Faker::Number.between(from: -10, to: 10),
        description: 'test'
      )
    end

    10.times do
      Answer.create!(
        quest_id: Faker::Number.between(from: 1, to: 5),
        user_id: Faker::Number.between(from: 1, to: last_user_id),
        code: '',
        status: answer_status[Faker::Number.between(from: 0, to: 1)]
      )
    end
  end
end