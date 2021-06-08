Quest.create!(
  title: 'Hello InfinityCode!',
  level: 'Easy',
  description: 'Let\'s get started with Ruby!<br />Go ahead and type the following code in the code-editor:<br />`print "Hello InfinityCode!!`"',
  picture: '',
  problem: '',
  created_at: Time.now,
  updated_at: Time.now
)
Quest.create!(
  title: 'Two Sum',
  level: 'Easy',
  description: 'Given an `array` of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.<br />
  You may assume that each input would have exactly one solution, and you may not use the same element twice.<br />
  You can return the answer in any order.',
  picture: '',
  problem: File.read("./public/problem/q-2.txt"),
  created_at: Time.now,
  updated_at: Time.now
)
Quest.create!(
  title: 'Shuffle the Array',
  level: 'Easy',
  description: 'Given the array `nums` consisting of `2n` elements in the form `[x1,x2,...,xn,y1,y2,...,yn]`.<br />
  *Return the array in the form* `[x1,y1,x2,y2,...,xn,yn]`.',
  picture: '![](/quest/3-picture.png)',
  problem: File.read("./public/problem/q-3.txt"),
  created_at: Time.now,
  updated_at: Time.now
)
Quest.create!(
  title: '3Sum',
  level: 'Medium',
  description: 'Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.<br />
  Notice that the solution set must not contain duplicate triplets.',
  picture: '![](/quest/4-picture.png)',
  problem: File.read("./public/problem/q-4.txt"),
  created_at: Time.now,
  updated_at: Time.now
)
Quest.create!(
  title: 'First Missing Positive',
  level: 'Hard',
  description: 'Given an unsorted integer array `nums`, find the smallest missing positive integer.<br />
  You must implement an algorithm that runs in `O(n)` time and uses constant extra space.',
  picture: '![](/quest/5-picture.png)',
  problem: File.read("./public/problem/q-5.txt"),
  created_at: Time.now,
  updated_at: Time.now
)
Quest.create!(
  title: 'Palindrome Number',
  level: 'Easy',
  description: 'Given an integer `x`, return `true` if `x` is palindrome integer.<br />
  An integer is a **palindrome** when it reads the same backward as forward. For example, `121` is palindrome while `123` is not.',
  picture: '![](/quest/6-picture.png)',
  problem: '',
  created_at: Time.now,
  updated_at: Time.now
)
Quest.create!(
  title: 'Remove Nth Node From End of List',
  level: 'Medium',
  description: 'Given the `head` of a linked list, remove the `$n^{th}$` node from the end of the list and return its head.<br />
  **Follow up:** Could you do this in one pass?',
  picture: '![](/quest/7-picture.png)',
  problem: '',
  created_at: Time.now,
  updated_at: Time.now
)
Quest.create!(
  title: 'Valid Parentheses',
  level: 'Easy',
  description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.<br />
  An input string is valid if:<br />
  1. Open brackets must be closed by the same type of brackets.<br />
  2. Open brackets must be closed in the correct order.',
  picture: '![](/quest/8-picture.png)',
  problem: '',
  created_at: Time.now,
  updated_at: Time.now
)
Quest.create!(
  title: 'Remove Duplicates from Sorted Array',
  level: 'Easy',
  description: 'Given a sorted array *nums*, remove the duplicates in-place such that each element appears only *once* and returns the new length.<br />
  Do not allocate extra space for another array, you must do this by **modifying the input array in-place with O(1) extra memory.<br />
  **Clarification:**<br />
  Confused why the returned value is an integer but your answer is an array?<br />
  Note that the input array is passed in by **reference**, which means a modification to the input array will be known to the caller as well.<br />
  Internally you can think of this:',
  picture: '![](/quest/9-picture.png)',
  problem: '',
  created_at: Time.now,
  updated_at: Time.now
)

Quest.create!(
  title: 'Count and Say',
  level: 'Medium',
  description: 'The **count-and-say** sequence is a sequence of digit strings defined by the recursive formula:<br />
  - `countAndSay(1) = "1"`<br />
  - `countAndSay(n)` is the way you would "say" the digit string from `countAndSay(n-1)`, which is then converted into a different digit string.<br />
  To determine how you "say" a digit string, split it into the **minimal** number of groups so that each group is a contiguous section all of the **same character.** Then for each group, say the number of characters, then say the character. To convert the saying into a digit string, replace the counts with a number and concatenate every saying.<br />
  For example, the saying and conversion for digit string `"3322251"`:',
  picture: '![](/quest/10-picture.png)',
  problem: '',
  created_at: Time.now,
  updated_at: Time.now
)
Quest.create!(
  title: 'Sqrt(x)',
  level: 'Easy',
  description: 'Given a non-negative integer `x`, compute and return *the square root of* `x`.<br />
  Since the return type is an integer, the decimal digits are **truncated**, and only **the integer part** of the result is returned.',
  picture: '![](/quest/11-picture.png)',
  problem: '',
  created_at: Time.now,
  updated_at: Time.now
)
Quest.create!(
  title: 'Climbing Stairs',
  level: 'Easy',
  description: 'You are climbing a staircase. It takes `n` steps to reach the top.<br />
  Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?',
  picture: '![](/quest/12-picture.png)',
  problem: '',
  created_at: Time.now,
  updated_at: Time.now
)
Quest.create!(
  title: 'Set Matrix Zeroes',
  level: 'Medium',
  description: 'Given an `m * n` matrix. If an element is **0**, set its entire row and column to **0**. Do it in-place.<br />
  **Follow up:**<br />
  - A straight forward solution using O(*m*n*) space is probably a bad idea.<br />
  - A simple improvement uses O(*m* + *n*) space, but still not the best solution.<br />
  - Could you devise a constant space solution?',
  picture: '![](/quest/13-picture.png)',
  problem: '',
  created_at: Time.now,
  updated_at: Time.now
)
Quest.create!(
  title: 'Sort Colors',
  level: 'Medium',
  description: 'Given an array `nums` with `n` objects colored red, white, or blue, sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.<br />
  We will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.<br />
  You must solve this problem without using the library\'s sort function.',
  picture: '![](/quest/14-picture.png)',
  problem: '',
  created_at: Time.now,
  updated_at: Time.now
)
Quest.create!(
  title: 'Minimum Window Substring',
  level: 'Hard',
  description: 'Given two strings `s` and `t` of lengths `m` and `n` respectively, return *the minimum window in `s` which will contain all the characters in `t`*. If there is no such window in `s` that covers all characters in `t`, return *the empty string `""`*.<br />
  **Note** that If there is such a window, it is guaranteed that there will always be only one unique minimum window in `s`.',
  picture: '![](/quest/15-picture.png)',
  problem: '',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  quest_id: 1,
  aseq: 1,
  hint: 'using puts or print in ruby',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  quest_id: 1,
  aseq: 2,
  hint: 'using double quotes in a string→ ""',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  quest_id: 2,
  aseq: 1,
  hint: 'A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it\'s best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  quest_id: 2,
  aseq: 2,
  hint: 'The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  quest_id: 3,
  aseq: 1,
  hint: 'Use two pointers to create the new array of 2n elements. The first starting at the beginning and the other starting at $(n+1)^{th}$ position. Alternate between them and create the new array.',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  quest_id: 4,
  aseq: 1,
  hint: 'So, we essentially need to find three numbers x, y, and z such that they add up to the given value. If we fix one of the numbers say x, we are left with the two-sum problem at hand!',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  quest_id: 4,
  aseq: 2,
  hint: 'For the two-sum problem, if we fix one of the numbers, say`x`<br />, we have to scan the entire array to find the next number`y`<br />which is `value - x`<br />where value is the input parameter. Can we change our array somehow so that this search becomes faster?',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  quest_id: 4,
  aseq: 3,
  hint: 'The second train of thought for two-sum is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?The second train of thought for two-sum is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  quest_id: 5,
  aseq: 1,
  hint: 'Think about how you would solve the problem in non-constant space. Can you apply that logic to the existing space?',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  quest_id: 5,
  aseq: 2,
  hint: 'We don\'t care about duplicates or non-positive integers',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  quest_id: 5,
  aseq: 3,
  hint: 'Remember that O(2n) = O(n)',
  created_at: Time.now,
  updated_at: Time.now
)

10.times do
  Post.create(
    title: Faker::Lorem.paragraph,
    content: Faker::Lorem.paragraph(sentence_count: 2),
    user_id: 1
  )
end

10.times do
  Comment.create(
    content: Faker::Lorem.paragraph,
    user_id: 1,
    post_id: Faker::Number.between(from: 1, to: 10)
  )
end

10.times do
  Coin.create(
    user_id: 1,
    coin_change: Faker::Number.between(from: -10, to: 10),
    coin_amount: Faker::Number.between(from: 10, to: 50),
    description: 'test'
  )
end

Case.create!(
  quest_id: 1,
  input: "",
  output: "\"Hello InfinityCode!!\""
)

Case.create!(
  quest_id: 2,
  input: "two_sum([2, 7, 11, 15], 9)",
  output: "[0, 1]"
)

Case.create!(
  quest_id: 2,
  input: "two_sum([3, 2, 4], 6)",
  output: "[1, 2]"
)

Case.create!(
  quest_id: 2,
  input: "two_sum([3, 3], 6)",
  output: "[0, 1]"
)

Case.create!(
  quest_id: 3,
  input: "shuffle([2, 5, 1, 3, 4, 7], 3)",
  output: "[2, 3, 5, 4, 1, 7]"
)

Case.create!(
  quest_id: 4,
  input: "three_sum([-1, 0, 1, 2, -1, -4])",
  output: "[[-1, -1, 2], [-1, 0, 1]]"
)

Case.create!(
  quest_id: 5,
  input: "first_missing_positive([1, 2, 0])",
  output: "3"
)

5.times do 
  Answer.create!(
    quest_id: Faker::Number.between(from: 1, to: 5),
    user_id: 1,
    code:'',
    status: 'Success'
  )
end

5.times do 
  Answer.create!(
    quest_id: Faker::Number.between(from: 1, to: 5),
    user_id: 1,
    code:'',
    status: 'Failure'
  )
end