# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
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
  picture: '![](quest/3-picture.png)',
  problem: File.read("./public/problem/q-3.txt"),
  created_at: Time.now,
  updated_at: Time.now
)
Quest.create!(
  title: '3Sum',
  level: 'Medium',
  description: 'Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.<br />
  Notice that the solution set must not contain duplicate triplets.',
  picture: '![](quest/4-picture.png)',
  problem: File.read("./public/problem/q-4.txt"),
  created_at: Time.now,
  updated_at: Time.now
)
Quest.create!(
  title: 'First Missing Positive',
  level: 'Hard',
  description: 'Given an unsorted integer array `nums`, find the smallest missing positive integer.<br />
  You must implement an algorithm that runs in `O(n)` time and uses constant extra space.',
  picture: '![](quest/5-picture.png)',
  problem: File.read("./public/problem/q-5.txt"),
  created_at: Time.now,
  updated_at: Time.now
)

Prompt.create!(
  questId: 1,
  aseq: 1,
  hint: 'using puts or print in ruby',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  questId: 1,
  aseq: 2,
  hint: 'using double quotes in a string→ ""',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  questId: 2,
  aseq: 1,
  hint: 'A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it\'s best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  questId: 2,
  aseq: 2,
  hint: 'The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  questId: 3,
  aseq: 1,
  hint: 'Use two pointers to create the new array of 2n elements. The first starting at the beginning and the other starting at $(n+1)^{th}$ position. Alternate between them and create the new array.',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  questId: 4,
  aseq: 1,
  hint: 'So, we essentially need to find three numbers x, y, and z such that they add up to the given value. If we fix one of the numbers say x, we are left with the two-sum problem at hand!',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  questId: 4,
  aseq: 2,
  hint: 'For the two-sum problem, if we fix one of the numbers, say`x`<br />, we have to scan the entire array to find the next number`y`<br />which is `value - x`<br />where value is the input parameter. Can we change our array somehow so that this search becomes faster?',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  questId: 4,
  aseq: 3,
  hint: 'The second train of thought for two-sum is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?The second train of thought for two-sum is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  questId: 5,
  aseq: 1,
  hint: 'Think about how you would solve the problem in non-constant space. Can you apply that logic to the existing space?',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  questId: 5,
  aseq: 2,
  hint: 'We don\'t care about duplicates or non-positive integers',
  created_at: Time.now,
  updated_at: Time.now
)
Prompt.create!(
  questId: 5,
  aseq: 3,
  hint: 'Remember that O(2n) = O(n)',
  created_at: Time.now,
  updated_at: Time.now
)
