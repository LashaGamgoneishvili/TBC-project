/////////  question section - accordion //////////

const questions = document.querySelectorAll(".question");
const questionHead = document.querySelectorAll(".question-head");

export function accordion() {
  for (let i = 0; i < questionHead.length; i++) {
    questionHead[i].addEventListener("click", function () {
      console.log("acordion");
      const isActive = questions[i].classList.contains("active");

      // Remove "active" class from all questions
      questions.forEach((res) => res.classList.remove("active"));

      // add "active" class on the clicked question
      if (!isActive) {
        questions[i].classList.add("active");
      } else {
        questions[i].classList.remove("active");
      }
    });
  }
}
