import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)


document.addEventListener('turbolinks:load', () => {
  const questAmount = document.querySelector(".quest-amount")
  const easyHtml = document.querySelector(".easy")
  const mediumHtml = document.querySelector(".medium")
  const hardHtml = document.querySelector(".hard")
  if (questAmount && easyHtml && mediumHtml && hardHtml) {
    fetch(`/api/v1/users/1/completed_rate`)
      .then(request => request.json())
      .then(percent => {
        const easy = percent.easy
        const medium = percent.medium
        const hard = percent.hard
        const totalQuest = percent.total_quest
        const totalEasy = percent.total_easy
        const totalMedium = percent.total_medium
        const totalHard = percent.total_hard
        const totalPercent = (percent.total_percentage * 100).toFixed(0);

        questAmount.textContent = `${totalPercent}%`
        easyHtml.lastElementChild.innerHTML = `<span>${easy}題/${totalEasy}題</span>`
        mediumHtml.lastElementChild.innerHTML = `<span>${medium}題/${totalMedium}題</span>`
        hardHtml.lastElementChild.innerHTML = `<span>${hard}題/${totalHard}題</span>`

        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
          type: 'pie',
          data: {
            datasets: [{
                label: '',
                data: [easy, medium, hard, totalQuest - easy - medium - hard ],
                backgroundColor: [
                  'rgba(16, 185, 129)',
                  'rgba(251, 152, 39)',
                  'rgba(239, 68, 68)',
                  'rgba(226, 224, 223)'
                ],
            }]
          },
        })
        const easyPie = document.getElementById('easy');
        new Chart(easyPie, {
          type: 'pie',
          data: {
            datasets: [{
              label: '',
              data: [easy, totalEasy - easy],
              backgroundColor: [
                'rgba(16, 185, 129)',
                'rgba(226, 224, 223)'
              ],
            }]
          },
        })
        const mediumPie = document.getElementById('medium');
        new Chart(mediumPie, {
          type: 'pie',
          data: {
            datasets: [{
              label: '',
              data: [medium, totalMedium - medium],
              backgroundColor: [
                'rgba(251, 152, 39)',
                'rgba(226, 224, 223)'
              ],
            }]
          },
        })
        const hardPie = document.getElementById('hard');
        new Chart(hardPie, {
          type: 'pie',
          data: {
            datasets: [{
              label: '',
              data: [hard,totalHard - hard],
              backgroundColor: [
                'rgba(239, 68, 68)',
                'rgba(226, 224, 223)'
              ],
            }]
          },
        })
      }
    )
  }
})